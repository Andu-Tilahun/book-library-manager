import {Component, EventEmitter, Output} from '@angular/core';
import {Book, BookResponse} from "@app/book-management/models/book.model";
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
  book: Book = {} as Book;
  @Output() bookEvent: EventEmitter<Book> = new EventEmitter<Book>()

  constructor(private bookService: BookService) {
  }

  searchBooks() {
    this.bookService.searchBooks(this.title, this.author, this.isbn).subscribe((data) => {
      this.books = data;
    });
  }

  onBookSelect(event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value;
    const selectedBook: BookResponse | undefined = this.books.find(book => book.isbn === selectedId);

    if (selectedBook) {
      this.book = selectedBook as Book;
      console.log(this.book)
      this.bookEvent.emit(this.book);
    } else {
      console.log('Book not found.');
    }
  }

}
