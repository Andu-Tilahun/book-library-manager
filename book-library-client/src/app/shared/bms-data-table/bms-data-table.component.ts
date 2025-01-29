import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { Observable, of } from 'rxjs';
import {ColumnType, DataTableColumn, MenuOptions} from '@model/data-table.model';

const DEFAULT_PAGE_SIZE = 10;

@Component({
  selector: 'bms-data-table',
  templateUrl: './bms-data-table.component.html',
  styleUrls: ['./bms-data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmsDataTableComponent<T> implements OnInit, OnChanges {

  @Input() columns: DataTableColumn<T>[] = [];
  @Input() records: Array<T> | null | undefined = [];
  @Input() pageSize = DEFAULT_PAGE_SIZE;

  @Input() showPagination = true;
  @Input() clickable = false;
  @Input() showIndex = false;


  @Input() actionColumnHeader: string | undefined = undefined;
  @Input() noOfEmptyRows = 5;
  @Input() noDataMessage = '';
  @Input() columnConditions: { [key: string]: (record: T) => boolean } = {};


  // Other existing code...


  // Other existing code...



  // Will have impact if and only if `@clickable` is set to TRUE
  @Output() rowClick = new EventEmitter<T>();

  totalRecords: number = 0;
  readonly emptyRows: Array<number> = Array(this.noOfEmptyRows);

  private _total$?: Observable<number>;
  private _slicedData$?: Observable<Array<T>>;
  private _page = 1;
  private _startIndex = 0;
  private _endIndex = 0;

  constructor() {}

  ngOnInit(): void {
    if (this.columns.length > 0) {
      this.paginateInputData();
    }
  }

  ngOnChanges() {
    if (this.columns.length > 0) {
      this.paginateInputData();
    }
  }



  get page() {
    return this._page;
  }

  get startIndex() {
    return this._startIndex;
  }

  get endIndex() {
    return this._endIndex;
  }

  get slicedData$() {
    return this._slicedData$;
  }

  get total$() {
    return this._total$;
  }

  get noOfColumns() {
    return this.columns.length;
  }

  set page(page: number) {
    this._page = page;
    this.paginateInputData();
  }
  shouldShowColumn(columnKey: string, record: T): boolean {
    const condition = this.columnConditions[columnKey];
    return condition ? condition(record) : true;
  }
  onRowClicked(data: T) {
    if (this.clickable) {
      this.rowClick.emit(data);
    }
  }

  private paginateInputData(): void {
    if (this.records && this.records.length > 0) {
      this._startIndex = (this._page - 1) * this.pageSize + 1;
      const totRecords = this.records.length;
      if (totRecords != this.totalRecords) {
        this.totalRecords = totRecords;
        this._total$ = of(this.totalRecords);
      }

      const slicedData = this.records.slice(
        this._startIndex == 0 ? this._startIndex : this._startIndex - 1,
        this.pageSize * this._page,
      );

      this._endIndex =
        (this._page - 1) * this.pageSize + Math.round(slicedData.length);

      this._slicedData$ = of(slicedData);
    } else {
      this.totalRecords = 0;
    }
  }

  protected readonly ColumnType = ColumnType;
}
