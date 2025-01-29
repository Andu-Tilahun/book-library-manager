import { Component } from '@angular/core';
import {BookResponse} from "@app/book-management/models/book.model";
import {BookService} from "@app/book-management/services/book.service";

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent {
  title: string = '';
  author: string = '';
  isbn: string = '';
  books: BookResponse[] = [];

  constructor(private bookService: BookService) {}

  searchBooks() {
    this.bookService.searchBooks(this.title, this.author, this.isbn).subscribe((data) => {
      this.books = data;
    });
  }
}
