package com.booklibrary.book.data;

import com.booklibrary.book.service.data.repository.BookRepository;
import org.mockito.Mockito;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication(scanBasePackages = {"com.booklibrary"})
public class BookTestConfiguration {
    @Bean
    public BookRepository bookRepository() {
        return Mockito.mock(BookRepository.class);
    }
}
