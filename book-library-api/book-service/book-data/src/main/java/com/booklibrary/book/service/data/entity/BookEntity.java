package com.booklibrary.book.service.data.entity;

import com.booklibrary.data.entity.AuditableEntity;
import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "books", schema = "bms_book_local")
@Entity
public class BookEntity extends AuditableEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private String title;
    private String author;
    @Column(unique = true, nullable = false)
    private String isbn;
    private String publisher;

    public Date getCreatedDate() {
        return createdDate;
    }
}
