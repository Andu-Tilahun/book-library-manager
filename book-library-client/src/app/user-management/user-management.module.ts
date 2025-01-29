import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementComponent } from './user-management.component';
import {SharedModule} from "@app/shared/shared.module";
import {BmsModalModule} from "@app/shared/bms-modal/bms-modal.module";
import {NgbAccordionModule, NgbAlertModule, NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormlyBootstrapModule} from "@ngx-formly/bootstrap";
import {FormlyModule} from "@ngx-formly/core";
import {NgSelectModule} from "@ng-select/ng-select";

@NgModule({
  declarations: [
    UserManagementComponent,
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    SharedModule,
    BmsModalModule,
    NgbAccordionModule,
    NgbPaginationModule,
    NgbAlertModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    NgSelectModule,
    FormsModule
  ],
})
export class UserManagementModule { }
