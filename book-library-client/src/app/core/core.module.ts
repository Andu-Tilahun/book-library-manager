import { ErrorHandler, NgModule, Optional, SkipSelf } from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
  HttpClientXsrfModule,
} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import {
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SignInRedirectCallbackComponent } from './auth/sign-in-redirect-callback.component';
import { SignOutRedirectCallbackComponent } from './auth/sign-out-redirect-callback.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import {
  NgbAccordionModule,
  NgbCollapseModule,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerService } from './services/spinner.service';
import { HttpService } from './services/http.service';
import { GlobalErrorHandler } from './services/global-error.service';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SessionService } from '@core/services/session.service';
import {RoutingService} from "@core/services/routing.service";

export function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    SignInRedirectCallbackComponent,
    SignOutRedirectCallbackComponent,
    HeaderComponent,
    SideNavComponent,
    SpinnerComponent,
  ],
  imports: [
    TranslateModule,
    CommonModule,
    HttpClientModule,
    NgbAccordionModule,
    NgbDropdownModule,
    NgbCollapseModule,
    TranslateModule.forRoot({
      // defaultLanguage: 'am-ET',
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    ReactiveFormsModule,
    FormlyBootstrapModule,
    RouterModule,
    FormsModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    SpinnerService,
    HttpService,
    SessionService,
    RoutingService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ],
  exports: [
    HttpClientModule,
    HttpClientXsrfModule,
    ReactiveFormsModule,
    FormlyModule,
    SideNavComponent,
    HeaderComponent,
    SpinnerComponent,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
