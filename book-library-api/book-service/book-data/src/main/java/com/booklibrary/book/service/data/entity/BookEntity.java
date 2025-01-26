package com.booklibrary.book.service.data.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "books", schema = "bms_book_local")
@Entity
public class BookEntity {
    @Id
    private Long id;
    private String title;
    private String author;
    @Column(unique = true, nullable = false)
    private String isbn;
    private String publisher;
}
