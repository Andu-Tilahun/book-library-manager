import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { UserDetails } from '../models/user-model';
import { of } from 'rxjs';
import { HttpService } from '@core/services/http.service';

describe('AuthService', () => {
  let authService: AuthService;

  let httpService: jasmine.SpyObj<HttpService>;
  let router: jasmine.SpyObj<Router>;

  const mockUserDetails = {
    username: 'UserName',
    firstName: 'FName',
    middleName: 'MName',
    lastName: 'LName',
    picture: 'pic',
    csrfToken: 'Test-CSRF-Token',
  } as UserDetails;

  beforeEach(() => {
    httpService = jasmine.createSpyObj('HttpService', ['get']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    authService = new AuthService(httpService, router,null);
  });

  describe('#login', () => {
    it('should', () => {
      spyOn(window, 'open');
      authService.login();
      expect(window.open).toHaveBeenCalled();
    });
  });

  describe('#loginWithInit', () => {
    it('should navigate to the current route', () => {
      const currentRoute = '/';
      httpService.get.and.returnValue(of(mockUserDetails));
      authService.loginWithInit(currentRoute);
      expect(router.navigate).toHaveBeenCalledWith([currentRoute], {
        replaceUrl: true,
      });
    });

    xit('should NOT navigate to the current route if user ', () => {
      const currentRoute = '/';
      httpService.get.and.returnValue(of(undefined));
      spyOn(authService, 'fetchUserDetails');
      authService.loginWithInit(currentRoute);
      authService.fetchUserDetails().subscribe();
      expect(router.navigate).not.toHaveBeenCalledWith([currentRoute], {
        replaceUrl: true,
      });
    });
  });

  describe('#fetchUserDetails', () => {
    it('should', () => {
      httpService.get.and.returnValue(of(mockUserDetails));
      authService.fetchUserDetails().subscribe(userDetails => {
        expect(userDetails).toBe(mockUserDetails);
      });
      expect(httpService.get).toHaveBeenCalled();
    });
  });

  describe('#completeLogout', () => {
    it('should cleanup user information', () => {
      spyOn(window, 'open');
      authService.completeLogout();
      expect((authService as any).loggedInUserDetails).not.toBeDefined();
      (authService as any).userLoggedInSubject$.subscribe((value: boolean) => {
        expect(value).toBeFalse();
      });

      (authService as any).csrfTokenSubject$.subscribe((value: string) => {
        expect(value).toBe('');
      });
    });

    it('should redirect to login page', () => {
      spyOn(window, 'open');
      authService.completeLogout();
      expect(window.open).toHaveBeenCalled();
    });
  });
});
