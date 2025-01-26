package com.booklibrary.book.service.data.mapper;

import com.booklibrary.book.service.data.dto.BookDto;
import com.booklibrary.book.service.data.entity.BookEntity;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class BookMapper {

    public BookEntity mapBookDtoToBookEntity(BookDto bookDto) {
        if (bookDto == null) {
            return null;
        }
        return BookEntity.builder()
                .id(UUID.randomUUID())
                .title(bookDto.getTitle())
                .author(bookDto.getAuthor())
                .isbn(bookDto.getIsbn())
                .publisher(bookDto.getPublisher())
                .build();
    }

    public BookDto mapBookEntityToBookDto(BookEntity bookEntity) {
        if (bookEntity == null) {
            return null;
        }
        return BookDto.builder()
                .id(bookEntity.getId())
                .title(bookEntity.getTitle())
                .author(bookEntity.getAuthor())
                .isbn(bookEntity.getIsbn())
                .publisher(bookEntity.getPublisher())
                .build();
    }
}
