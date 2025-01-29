import { NgModule } from '@angular/core';
import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { DataTableCellValuePipe } from '@pipes/data-table-cell-value.pipe';
import { CustomDatePipe } from '@pipes/custom-date.pipe';
import { NestedValuePipe } from './nested-value-pipe';

const PIPES: any[] = [DataTableCellValuePipe, CustomDatePipe, NestedValuePipe];

@NgModule({
  declarations: PIPES,
  exports: PIPES,
  providers: [DatePipe, DecimalPipe, CurrencyPipe, CustomDatePipe],
})
export class PipesModule {}
