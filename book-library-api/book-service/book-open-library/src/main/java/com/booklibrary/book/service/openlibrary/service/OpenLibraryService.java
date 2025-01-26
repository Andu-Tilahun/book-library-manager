package com.booklibrary.book.service.openlibrary.service;

import com.booklibrary.book.service.openlibrary.dto.BookResponse;

import java.util.List;

public interface OpenLibraryService {
    public List<BookResponse> searchBooks(String query);
}
