import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import {NgbAccordionModule, NgbAlertModule} from "@ng-bootstrap/ng-bootstrap";
import {TranslateModule} from "@ngx-translate/core";
import {SharedModule} from "@app/shared/shared.module";
import {BmsModalModule} from "@app/shared/bms-modal/bms-modal.module";
import {UserManagementModule} from "@app/user-management/user-management.module";
import {BmsDataTableModule} from "@app/shared/bms-data-table/bms-data-table.module";
import { UserListComponent } from './user-list/user-list.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserDetailModalComponent } from './user-detail-modal/user-detail-modal.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    UserListComponent,
    UserCreateComponent,
    UserDetailModalComponent,
    UserDetailComponent,
  ],
    imports: [
        CommonModule,
        UserRoutingModule,
        NgbAlertModule,
        BmsModalModule,
        SharedModule,
        TranslateModule,
        NgbAccordionModule,
        UserManagementModule,
        BmsDataTableModule,
        FormsModule,
    ],
})
export class UserModule { }
