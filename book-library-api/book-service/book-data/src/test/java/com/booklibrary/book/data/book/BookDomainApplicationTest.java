package com.booklibrary.book.data.book;

import com.booklibrary.book.data.BookTestConfiguration;
import com.booklibrary.book.service.data.dto.BookDto;
import com.booklibrary.book.service.data.entity.BookEntity;
import com.booklibrary.book.service.data.repository.BookRepository;
import com.booklibrary.book.service.data.service.BookService;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@SpringBootTest(classes = BookTestConfiguration.class)
@ExtendWith(MockitoExtension.class)
public class BookDomainApplicationTest {

    @Autowired
    private BookService bookService;

    @Autowired
    private BookRepository bookRepository;

    private BookEntity book;

    @BeforeAll
    public void init() {


    }

    @Test
    public void testCreateBook() {

        BookDto bookDto =
                BookDto.builder()
                        .id(UUID.randomUUID())
                        .title("Spring: Microservices with Spring Boot: Build and deploy microservices with Spring Boot")
                        .author("Ranga Rao Karanam")
                        .isbn("97817891325874")
                        .publisher("Packt Publishing")
                        .build();

        BookDto result =
                bookService.createBook(bookDto);

        assertNotNull(result.getCreatedDate());

    }
}
