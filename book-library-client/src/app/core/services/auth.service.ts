import { ElementRef, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { filter, switchMap, take } from 'rxjs/operators';
import { HttpService } from '@core/services/http.service';
import { Endpoints } from '@core/models/endpoint.model';
import { ResponseAuthInitResponse } from '@model/auth-init-response-model';
import { User } from '@app/user-management/user/models/user.model';
import {HttpXsrfTokenExtractor} from '@angular/common/http';

@Injectable()
export class AuthService {
  private loggedInUserDetails: User | undefined;

  private loggedInUserSubject$ = new BehaviorSubject<User>({} as User);
  private readonly loggedInUser$: Observable<User>;
  private userLoggedInSubject$ = new BehaviorSubject<boolean>(false);
  private _isUserLoggedIn$: Observable<boolean>;

  private csrfTokenSubject$ = new BehaviorSubject<string>('');
  private csrfToken$: Observable<string>;

  userPrivileges: string[] = [];

  constructor(private httpService: HttpService,
              private router: Router,
              private tokenExtractor: HttpXsrfTokenExtractor) {
    this._isUserLoggedIn$ = this.userLoggedInSubject$.asObservable();
    this.loggedInUser$ = this.loggedInUserSubject$.asObservable();
    this.csrfToken$ = this.csrfTokenSubject$.asObservable();
    this.loggedInUserDetails = undefined;

  }

  get isUserLoggedIn$() {
    return this._isUserLoggedIn$;
  }

  login() {
    this.redirectToLogin();
  }

  loginWithInit(currentRoute: string) {
    this.fetchUserDetails()
      .pipe(
        tap((responseApiResponse: ResponseAuthInitResponse) => {
          if (!responseApiResponse) {
            this.redirectToLogin();
          }
        }),
        filter(
          (authInitResponse: ResponseAuthInitResponse) => !!authInitResponse,
        ),
        take(1),
      )
      .subscribe((authInitResponse: ResponseAuthInitResponse) => {
        const user: User = authInitResponse.data?.user as User;
        const csrfToken = this.tokenExtractor.getToken()  || '';
        this.loggedInUserDetails = user;
        this.userLoggedInSubject$.next(true);
        this.loggedInUserSubject$.next(user);

        this.csrfTokenSubject$.next(csrfToken);
        this.router.navigate([currentRoute], { replaceUrl: true });
      });
  }

  completeLogin(code: string, state: string): void {
    console.log(code, state)
    this.initiateTokenRequest(code, state)
      .pipe(
        switchMap(() => this.fetchUserDetails()),
        filter(
          (authInitResponse: ResponseAuthInitResponse) => !!authInitResponse,
        ),
        take(1),
      )
      .subscribe((authInitResponse: ResponseAuthInitResponse) => {
        const user: User = authInitResponse.data?.user as User;
        const csrfToken = this.tokenExtractor.getToken()  || '';
        this.userLoggedInSubject$.next(true);
        this.loggedInUserSubject$.next(user);
        this.csrfTokenSubject$.next(csrfToken);

        this.router.navigate(['/'], { replaceUrl: true });
      });
  }

  logout(logoutForm: ElementRef) {
    logoutForm.nativeElement.submit();
  }

  completeLogout(): void {
    this.loggedInUserDetails = undefined;
    this.userLoggedInSubject$.next(false);
    this.csrfTokenSubject$.next('');
    this.redirectToLogin();
  }

  keepAlive(): Observable<any> {
    return this.httpService.get(
      Endpoints.KEEP_ALIVE_USER_SESSION,
    );
  }

  fetchUserDetails(): Observable<ResponseAuthInitResponse> {
    return this.httpService.get<ResponseAuthInitResponse>(
      Endpoints.INIT_USER_SESSION,
    );
  }

  isLoggedIn(): Observable<boolean> {
    return this.isUserLoggedIn$;
  }

  getCsrfToken(): string {
    return this.csrfTokenSubject$.value;
  }

  getCsrfToken$(): Observable<string> {
    return this.csrfToken$;
  }

  getLoggedInUser(): Observable<User> {
    return this.loggedInUser$;
  }

  getCurrentUser(): User {
    return this.loggedInUserSubject$.getValue();
  }

  getCurrentUserId(): string {
    const user = this.loggedInUserSubject$.getValue();
    return user.id || '';
  }

  private redirectToLogin() {
    alert('ss')
    window.open(environment.baseUrl + Endpoints.USER_AUTHORIZATION, '_self');
  }

  private initiateTokenRequest(code: string, state: string): Observable<any> {
    return this.httpService.get(Endpoints.GET_TOKEN(code, state));
  }




}
