package com.booklibrary.book.service.container;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories(basePackages = {"com.booklibrary.book.service.data"})
@EntityScan(basePackages = {"com.booklibrary.book.service.data"})
@SpringBootApplication(scanBasePackages = "com.booklibrary")
public class BookServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(BookServiceApplication.class, args);
    }
}


