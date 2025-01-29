import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class SpinnerService {
  private spinnerSubject$ = new Subject<boolean>();
  private httpRequestCounter = 0;
  private showSpinner = false;

  private delayTimeToShow = 300;
  private delayTimeToHide = 100;

  constructor() {
    this.spinnerSubject$.next(false);
  }

  get spinnerVisibilityState() {
    return this.spinnerSubject$;
  }

  incrementRequestCounter(): void {
    this.httpRequestCounter++;
    if (!this.showSpinner) {
      this.showSpinner = true;
      setTimeout(() => {
        if (this.showSpinner) {
          this.spinnerSubject$.next(true);
        }
      }, this.delayTimeToShow);
    }
  }

  decrementRequestCounter(): void {
    this.httpRequestCounter--;
    if (this.httpRequestCounter <= 0) {
      this.showSpinner = false;
      setTimeout(() => {
        if (!this.showSpinner) {
          this.spinnerSubject$.next(false);
        }
      }, this.delayTimeToHide);
    }
  }
}
