package com.booklibrary.book.service.data.dto;

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
}
