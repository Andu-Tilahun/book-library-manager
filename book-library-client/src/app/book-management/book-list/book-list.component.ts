import {Component, OnInit} from '@angular/core';
import {forkJoin, map, Observable, of} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TranslateService} from "@ngx-translate/core";
import {BookService} from "@app/book-management/services/book.service";
import {Book, SearchBookResponse} from "@app/book-management/models/book.model";
import {DataTableColumn} from "@model/data-table.model";
import {SearchUserResponse, User} from "@app/user-management/user/models/user.model";
import {catchError, filter, switchMap} from "rxjs/operators";
import {ApiResponse} from "@model/response.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  successAlert: Alert | null = null;

  books$?: Observable<Book[]>;

  readonly dataTableColumns: DataTableColumn<Book>[] = [
    {
      header: 'PAGES.BOOK_MANAGEMENT.BOOK.TITLE',
      columnReference: 'title',
    },
    {
      header: 'PAGES.BOOK_MANAGEMENT.BOOK.AUTHOR',
      columnReference: 'author',
    },
    {
      header: 'PAGES.BOOK_MANAGEMENT.BOOK.ISBN',
      columnReference: 'isbn',
    },
    {
      header: 'PAGES.BOOK_MANAGEMENT.BOOK.PUBLISHER',
      columnReference: 'publisher',
    },
  ];

  constructor(
    public bookService: BookService,
    private modalService: NgbModal,
    private translateService: TranslateService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.fetchBooks();
  }



  private fetchBooks():Observable<SearchBookResponse> {
    // @ts-ignore
    return this.books$ = this.bookService.fetchAllBook().pipe(
      filter((response: SearchBookResponse) => !!response?.data),
      map(
        (response: SearchBookResponse) =>
          response.data as Array<Book>,
      ),
    );

  }

  onNewBookClick() {
    this.router.navigate(['/book-management/create/']);
  }

  onDetailBookClick($event: any) {

  }
}
export interface Alert {
  type: string;
  message: string;
}
