import { Pipe, PipeTransform } from '@angular/core';
import { DataTableColumn } from '@model/data-table.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'dataTableCellValuePipe',
})
export class DataTableCellValuePipe<T> implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {}

  transform(column: DataTableColumn<T>, data: T): SafeHtml {
    if (column) {
      if (column.value) {
        return (
          this.domSanitizer.bypassSecurityTrustHtml(column.value(data)) || ''
        );
      }

      if (column.columnReference) {
        return this.getValue(data, column.columnReference);
      }

      // TODO data types that needs formatting for data types like date, currency, decimal numbers and so on
    }
    return '';
  }

  private getValue(data: T, key: string): string {
    const keys = key.split('.');
    let value: any = data;

    for (const k of keys) {
      if (value && k in value) {
        value = value[k as keyof typeof value];
      } else {
        return '';
      }
    }
    return String(value || '');

  }

}
