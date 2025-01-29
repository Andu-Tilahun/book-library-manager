import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmsDataTableComponent } from './bms-data-table.component';
import { NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '@pipes/pipes.module';
import {CustomAlertComponent} from "@app/custom-alert/custom-alert.component";

@NgModule({
    declarations: [BmsDataTableComponent, CustomAlertComponent],
  imports: [CommonModule, NgbPaginationModule, TranslateModule, PipesModule, NgbDropdownModule],
    exports: [BmsDataTableComponent, CustomAlertComponent],
})
export class BmsDataTableModule {}
