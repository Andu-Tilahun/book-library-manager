package com.booklibrary.book.service.data.dto;

import com.booklibrary.book.service.data.exception.BookValidationException;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookDto {
    private UUID id;
    private String title;
    private String author;
    private String isbn;
    private String publisher;

    public void validate() {
        if (this.title == null) {
            throw new BookValidationException("Book title is required");
        }
        if (this.author == null) {
            throw new BookValidationException("Book author is required");
        }
        if (this.isbn == null) {
            throw new BookValidationException("Book ISBN is required");
        }
        if (this.publisher == null) {
            throw new BookValidationException("Book publisher is required");
        }
    }

}
