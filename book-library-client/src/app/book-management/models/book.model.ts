import {ApiResponse} from "@model/response.model";

export interface Book {
  id?: string;
  title: string;
  author: string;
  isbn: string;
  publisher: string;
  createdDate: string;
  createdBy: string;
  modifiedDate: string;
  modifiedBy: string;
}

export interface BookResponse {
  id?: string;
  title: string;
  author: string;
  isbn: string;
  publisher: string;
}

export type SearchBookResponse = ApiResponse<Array<Book>>;
