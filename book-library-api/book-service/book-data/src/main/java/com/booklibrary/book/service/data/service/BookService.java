package com.booklibrary.book.service.data.service;

import com.booklibrary.book.service.data.dto.BookDto;

import java.util.List;

public interface BookService {
    BookDto createBook(BookDto bookDto);

    List<BookDto> fetchAllBooks();
}
