import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './core/guards/auth.guard';
import {SignInRedirectCallbackComponent} from './core/auth/sign-in-redirect-callback.component';
import {SignOutRedirectCallbackComponent} from './core/auth/sign-out-redirect-callback.component';
import {GlobalErrorComponent} from './shared/global-error/global-error.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'user-management',
    pathMatch: 'full',
  },


  {
    path: 'user-management',
    loadChildren: () =>
      import('./user-management/user-management.module').then(m => m.UserManagementModule),
    canActivate: [AuthGuard],
  },

  {
    path: 'book-management',
    loadChildren: () =>
      import('./book-management/book-management.module').then(m => m.BookManagementModule),
    canActivate: [AuthGuard],
  },

  {
    path: 'sign-in-callback',
    component: SignInRedirectCallbackComponent,
  },
  {
    path: 'sign-out-callback',
    component: SignOutRedirectCallbackComponent,
  },
  {
    path: 'error',
    component: GlobalErrorComponent,
    canActivate: [AuthGuard],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
