import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;

  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', [
      'isLoggedIn',
      'loginWithInit',
    ]);
    authGuard = new AuthGuard(authService);
  });

  describe('#canActivate', () => {
    beforeEach(() => {
      authService.isLoggedIn.and.returnValue(of(true));
    });

    it('should call `isLoggedIn`', () => {
      authGuard
        .canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
        .pipe()
        .subscribe((result: boolean) => {
          expect(result).toBeTrue();
        });
      expect(authService.isLoggedIn).toHaveBeenCalled();
    });

    it('should NOT call `loginWithInit` if user already logged in', () => {
      authGuard
        .canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
        .pipe()
        .subscribe();
      expect(authService.loginWithInit).not.toHaveBeenCalled();
    });

    it('should call `loginWithInit` is user is NOT logged In', () => {
      authService.isLoggedIn.and.returnValue(of(false));
      authGuard
        .canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
        .pipe()
        .subscribe();
      expect(authService.loginWithInit).toHaveBeenCalled();
    });
  });
});
