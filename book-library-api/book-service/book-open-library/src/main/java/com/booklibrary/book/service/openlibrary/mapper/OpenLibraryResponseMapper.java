package com.booklibrary.book.service.openlibrary.mapper;

import com.booklibrary.book.service.openlibrary.dto.BookResponse;
import com.booklibrary.book.service.openlibrary.dto.OpenLibraryResponse;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class OpenLibraryResponseMapper {

    public List<BookResponse> mapToBooks(OpenLibraryResponse response) {
        List<BookResponse> books = new ArrayList<>();

        if (response != null && response.getDocs() != null) {
            for (OpenLibraryResponse.Doc doc : response.getDocs()) {
                BookResponse book = new BookResponse();
                book.setTitle(doc.getTitle());

                if (doc.getAuthor_name() != null && !doc.getAuthor_name().isEmpty()) {
                    book.setAuthor(doc.getAuthor_name().get(0));
                }

                if (doc.getIsbn() != null && !doc.getIsbn().isEmpty()) {
                    book.setIsbn(doc.getIsbn().get(0));
                }

                if (doc.getPublisher() != null && !doc.getPublisher().isEmpty()) {
                    book.setPublisher(doc.getPublisher().get(0));
                }

                books.add(book);
            }
        }

        return books;
    }
}
