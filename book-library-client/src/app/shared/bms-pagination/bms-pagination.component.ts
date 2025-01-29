import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable, of} from "rxjs";

const DEFAULT_PAGE_SIZE = 10;

@Component({
  selector: 'app-bms-pagination',
  templateUrl: './bms-pagination.component.html',
  styleUrls: ['./bms-pagination.component.scss']
})
export class BmsPaginationComponent<T> implements OnInit {

  @Input() records: Array<T> | null | undefined = [];
  @Input() pageSize = DEFAULT_PAGE_SIZE;
  @Input() showPagination = true;
  private _startIndex = 0;
  private _endIndex = 0;
  private _page = 1;
  private _total$?: Observable<number>;
  totalRecords: number = 0;

  @Output() pageClick = new EventEmitter<number>();

  ngOnInit(): void {
    if (this.records && this.records.length > 0) {
      this.totalRecords = this.records?.length;
      this._total$ = of(this.totalRecords);
      this.calculateIndex();
    }
  }

  get startIndex() {
    return this._startIndex;
  }

  get endIndex() {
    return this._endIndex;
  }

  get total$() {
    return this._total$;
  }

  set page(page: number) {
    this._page = page;
    this.calculateIndex();
    this.pageClick.emit((this._page - 1));
  }

  get page() {
    return this._page;
  }


  private calculateIndex() {
    this._startIndex = (this._page - 1) * this.pageSize + 1;
    this._endIndex = this.calculateEndIndex();
  }

  private calculateEndIndex() {

    let result = this.totalRecords - this._startIndex;

    let endIndex=result < DEFAULT_PAGE_SIZE?result + 1:DEFAULT_PAGE_SIZE;

    return (this._startIndex - 1) + endIndex;
  }

}
