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

                if (doc.getIa() != null && !doc.getIa().isEmpty()) {
                    book.setIsbn(doc.getIa().get(0));
                }

                if (doc.getFirst_publish_year() != null && !doc.getFirst_publish_year().isEmpty()) {
                    book.setPublisher(doc.getFirst_publish_year());
                }

                books.add(book);
            }
        }

        return books;
    }
}
