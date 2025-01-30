import {Component, Input} from '@angular/core';
import {Book} from "@app/book-management/models/book.model";
import {FormlyFieldConfig} from "@ngx-formly/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {TranslateService} from "@ngx-translate/core";
import {DomSanitizer} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {AuthService} from "@core/services/auth.service";
import {FormGroup} from "@angular/forms";
import {take} from "rxjs/operators";
import {BookService} from "@app/book-management/services/book.service";

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent {
  @Input()
  book: Book = {} as Book;

  form = new FormGroup({});

  fields: FormlyFieldConfig[] = [
    {
      template: '<div class="mb-2"><strong>' + this.translate.instant('PAGES.BOOK_MANAGEMENT.BOOK.INFO') + '</strong></div><hr />',
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          key: 'title',
          type: 'input',
          props: {
            readonly: true,
            label: this.translate.instant('PAGES.BOOK_MANAGEMENT.BOOK.TITLE'),
          },
        },
        {
          className: 'col-4',
          key: 'author',
          type: 'input',
          props: {
            readonly: true,
            label: this.translate.instant('PAGES.BOOK_MANAGEMENT.BOOK.AUTHOR'),
          },
        },
        {
          className: 'col-4',
          key: 'isbn',
          type: 'input',
          props: {
            readonly: true,
            label: this.translate.instant('PAGES.BOOK_MANAGEMENT.BOOK.ISBN'),
          },
        },
        {
          className: 'col-4',
          key: 'publisher',
          type: 'input',
          props: {
            readonly: true,
            label: this.translate.instant('PAGES.BOOK_MANAGEMENT.BOOK.PUBLISHER'),
          },
        },
      ],
    },
  ];

  constructor(private activeModal: NgbActiveModal,
              private bookService: BookService,
              private translate: TranslateService,
              private sanitizer: DomSanitizer) {
  }

  onSubmit() {
    console.log(this.form)
    if (this.form.valid) {
      this.bookService.createBook(this.book)
        .pipe(
          take(1)
        ).subscribe((res) => {
      });
    } else {
      console.log(JSON.stringify(this.book));
    }
  }

  handleBookEvent($event: Book) {
    this.book = $event as Book;
  }
}
