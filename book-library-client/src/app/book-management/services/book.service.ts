import {Injectable} from '@angular/core';
import {HttpService} from "@core/services/http.service";
import {Observable} from "rxjs";
import {BookResponse, SearchBookResponse} from "../models/book.model";
import {Endpoints} from "@core/models/endpoint.model";
import {HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpService: HttpService) {
  }

  fetchAllBook(): Observable<SearchBookResponse> {
    return this.httpService.get<SearchBookResponse>(
      Endpoints.BOOK_ENDPOINT
    );
  }

  searchBooks(title?: string, author?: string, isbn?: string): Observable<BookResponse[]> {
    let params = new HttpParams();
    if (title) params = params.set('title', title);
    if (author) params = params.set('author', author);
    if (isbn) params = params.set('isbn', isbn);

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.httpService.get<BookResponse[]>(`${Endpoints.OPEN_LIBRARY_ENDPOINT}search`, headers, params);
  }
}
