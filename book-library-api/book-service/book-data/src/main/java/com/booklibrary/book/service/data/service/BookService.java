package com.booklibrary.book.service.data.service;

import com.booklibrary.book.service.data.dto.BookDto;

public interface BookService {
    BookDto createBook(BookDto bookDto);
}
