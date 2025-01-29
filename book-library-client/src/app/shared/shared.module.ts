import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BmsPageViewComponent} from './bms-page-view/bms-page-view.component';
import {TranslateModule} from '@ngx-translate/core';
import {ConfigOption, FormlyModule} from '@ngx-formly/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import {BmsModalModule} from './bms-modal/bms-modal.module';
import {NgbAlertModule, NgbDropdownModule, NgbPaginationModule, NgbToastModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {PipesModule} from './pipes/pipes.module';
import {GlobalErrorComponent} from './global-error/global-error.component';
import {BmsMainContainerComponent} from './bms-main-container/bms-main-container.component';
import { BmsPaginationComponent } from './bms-pagination/bms-pagination.component';
import {BmsDataTableModule} from '@app/shared/bms-data-table/bms-data-table.module';


@NgModule({
    declarations: [
        BmsPageViewComponent,
        GlobalErrorComponent,
        BmsMainContainerComponent,
        BmsPaginationComponent,
    ],
  exports: [
    BmsPageViewComponent,
    ReactiveFormsModule,
    //FormlyBootstrapModule,
    FormlyModule,
    TranslateModule,
    BmsMainContainerComponent,
    TableModule,
    ButtonModule,
    BmsPaginationComponent,
  ],
    imports: [
        CommonModule,
        TranslateModule,
        FormlyModule,
        ReactiveFormsModule,
        BmsModalModule,
        NgbAlertModule,
        PipesModule,
        FormsModule,
        TableModule,
        ButtonModule,
        NgbPaginationModule,
        NgbTooltipModule,
        BmsDataTableModule,
        NgbToastModule,
    ],
})
export class SharedModule {
}
