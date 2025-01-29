import { AuthService } from '../services/auth.service';
import { SignOutRedirectCallbackComponent } from './sign-out-redirect-callback.component';

describe('SignOutRedirectCallbackComponent', () => {
  let component: SignOutRedirectCallbackComponent;

  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['completeLogout']);
    component = new SignOutRedirectCallbackComponent(authService);
  });

  describe('#ngOnInit', () => {
    it('should call `completeLogin` from auth service', () => {
      component.ngOnInit();
      expect(authService.completeLogout).toHaveBeenCalled();
    });
  });
});
