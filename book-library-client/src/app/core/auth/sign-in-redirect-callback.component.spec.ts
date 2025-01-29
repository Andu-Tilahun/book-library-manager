import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { SignInRedirectCallbackComponent } from './sign-in-redirect-callback.component';

describe('SignInRedirectCallbackComponent', () => {
  let component: SignInRedirectCallbackComponent;

  let authService: jasmine.SpyObj<AuthService>;
  let activatedRoute: ActivatedRoute;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['completeLogin']);
    activatedRoute = new ActivatedRoute(); //jasmine.createSpyObj('ActivatedRoute', [], ['queryParams']);
    component = new SignInRedirectCallbackComponent(
      authService,
      activatedRoute,
    );
  });

  describe('#ngOnInit', () => {
    it('should call `completeLogin` from auth service', () => {
      activatedRoute.queryParams = of({ code: 'code', state: 'state' });
      component.ngOnInit();
      expect(authService.completeLogin).toHaveBeenCalled();
    });
  });
});
