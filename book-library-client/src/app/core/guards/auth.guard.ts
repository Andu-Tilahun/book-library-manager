import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { catchError, filter } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    if(state.url == '/home'){
      return of(false);
    }else {
      return this.authService.isLoggedIn().pipe(
        tap(userLoggedIn => {
          if (!userLoggedIn) {
            this.authService.loginWithInit(state.url);
          }
        }),
        filter(userLoggedIn => userLoggedIn),
        catchError(() => {
          return of(false);
        }),
      );
    }

  }
}
