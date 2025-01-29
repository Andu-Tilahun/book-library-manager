import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserManagementComponent} from "@app/user-management/user-management.component";

const routes: Routes = [{
  path: '',
  component: UserManagementComponent,
  children: [

    {
      path: 'user',
      loadChildren: () =>
        import('./user/user.module').then(
          m => m.UserModule,
        ),
    },

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserManagementRoutingModule { }
