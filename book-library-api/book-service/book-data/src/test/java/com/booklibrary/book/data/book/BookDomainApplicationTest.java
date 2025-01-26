package com.booklibrary.book.data.book;

import com.booklibrary.book.data.BookTestConfiguration;
import com.booklibrary.book.service.data.repository.BookRepository;
import com.booklibrary.book.service.data.service.BookService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.Assert;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@SpringBootTest(classes = BookTestConfiguration.class)
@ExtendWith(MockitoExtension.class)
public class BookDomainApplicationTest {

    @Autowired
    private BookService bookService;

    @Autowired
    private BookRepository bookRepository;

    @Test
    public void testCreateBook() {
        Assert.notNull("","");
    }
}
