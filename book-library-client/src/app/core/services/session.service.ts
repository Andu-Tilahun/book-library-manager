import { Injectable, OnDestroy } from '@angular/core';
import {
  connectable,
  mergeMap,
  Observable, of,
  Subject,
  takeUntil,
  timer,
} from 'rxjs';
import { AuthService } from '@core/services/auth.service';
import {catchError, filter, take} from 'rxjs/operators';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BmsInfoModalComponent } from '@app/shared/bms-modal/bms-info-modal/bms-info-modal.component';


@Injectable()
export class SessionService implements OnDestroy {
  private sessionTimeout: number = 900000;
  private keepAliveTimeout = 60000;
  private warningTimeout: number = 840000;

  private lastInteractionTime: number = Date.now();
  private keepAliveLastInteractionTime: number = Date.now();

  private _killSessionSubject: Subject<boolean> = new Subject();
  private _killSession$ = this._killSessionSubject.asObservable();

  private _keepAliveSubject: Subject<boolean> = new Subject();
  private _keepAlive$ = this._keepAliveSubject.asObservable();

  private warningShown = false;

  constructor(
    private authService: AuthService,
    private modalService: NgbModal,
  ) {}

  get killSession$(): Observable<boolean> {
    return this._killSession$;
  }

  ngOnDestroy(): void {
    this._killSessionSubject.unsubscribe();
    this._keepAliveSubject.unsubscribe();
  }

  init(): void {
    this.initKeepAlive();
    this.initTimeOut();
  }

  setLastInteractionTime() {
    this.lastInteractionTime = Date.now();
    this.keepAliveLastInteractionTime = Date.now();
  }

  private initKeepAlive(): void {
    connectable(
      this.keepAlive().pipe(
        take(1),
        mergeMap(() => this._keepAlive$),
        takeUntil(this._killSessionSubject),
        mergeMap(() => this.authService.isUserLoggedIn$.pipe(take(1))),
        filter(isLoggedIn => !!isLoggedIn),
        mergeMap(() =>
          this.keepAlive().pipe(
            filter(() => !this.warningShown),
            take(1),
          ),
        ),
      ),
    ).connect();
  }

  private initTimeOut(): void {
    timer(5000, 5000)
      .pipe(
        takeUntil(this._killSessionSubject),
        mergeMap(() => this.authService.isLoggedIn()),
        filter(isLoggedIn => !!isLoggedIn),
      )
      .subscribe(() => {
        const now = Date.now();

        const keepALiveIdleTime = Math.max(
          0,
          now - this.keepAliveLastInteractionTime,
        );

        if (keepALiveIdleTime >= this.keepAliveTimeout) {
          this._keepAliveSubject.next(true);
          this.keepAliveLastInteractionTime = Date.now();
        }

        const idleTime = Math.max(0, now - this.lastInteractionTime);

        if (idleTime < this.warningTimeout) {
          return;
        }

        if (idleTime > this.warningTimeout && idleTime < this.sessionTimeout) {
          if (!this.warningShown) {
            this.showWarningModal();
          }
          return;
        }

        this.killSession();
      });
  }

  private keepAlive(): Observable<any> {
    return this.authService.keepAlive().pipe(
      catchError((error) => {
        if(error?.status === 401) {
          this.killSession();
        }
        return of({} )
      }),
    );
  }

  private killSession() {
    this._killSessionSubject.next(true);
  }

  private showWarningModal() {
    this.warningShown = true;
    const modalRef: NgbModalRef = this.modalService.open(
      BmsInfoModalComponent,
      { centered: true },
    );

    modalRef.componentInstance.modalTitle = 'APP.SESSION_WARNING_MODAL.TITLE';
    modalRef.componentInstance.modalMessage =
      'APP.SESSION_WARNING_MODAL.MESSAGE';
    modalRef.componentInstance.dismissBtnText =
      'APP.SESSION_WARNING_MODAL.BTN_DISMISS_TXT';

    modalRef.result.then((data: boolean) => {
      if (data) {
        this.keepAlive().pipe().subscribe();
        this.resetConfigurations();
      }
    });
  }

  private resetConfigurations() {
    this.warningShown = false;
    this.setLastInteractionTime();
  }
}
