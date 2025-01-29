import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpStatus } from '../models/http.model';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private router?: Router;
  private authService?: AuthService;
  private ngZone?: NgZone;

  constructor(private injector: Injector) {}

  handleError(error: any) {
    if (!environment.production) {
      // TODO log service implementation
      console.error('GlobalErrorHandler - \n', error);
    }

    if (error instanceof HttpErrorResponse) {
      if (error.status === HttpStatus.UNAUTHORIZED) {
        this.authService = this.injector.get(AuthService);
        this.authService.login();
      } else {
        // if (error.status === HttpStatus.INTERNAL_SERVER_ERROR) {
        //   this.ngZone = this.injector.get(NgZone);
        //   this.ngZone.run(() => {
        //     this.router = this.injector.get(Router);
        //     this.router.navigateByUrl('/error', { replaceUrl: true });
        //   });
        // }
      }
    }
  }
}
