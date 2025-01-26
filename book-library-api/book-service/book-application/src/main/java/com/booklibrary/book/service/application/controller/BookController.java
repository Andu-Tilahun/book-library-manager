package com.booklibrary.book.service.application.controller;

import com.booklibrary.application.api.Response;
import com.booklibrary.application.util.CorrelationIdGenerator;
import com.booklibrary.book.service.data.dto.BookDto;
import com.booklibrary.book.service.data.service.BookService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Slf4j
@RestController
@RequestMapping(value = "/book", produces = "application/vnd.api.v1+json")
//@Validated
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @PostMapping
    public Response createBook(@RequestBody BookDto bookDto, HttpServletRequest request) throws IOException {
        bookDto.validate();
        BookDto result = bookService.createBook(bookDto);
        return Response.builder()
                .data(result)
                .correlationId(CorrelationIdGenerator.getCorrelationId(request))
                .message("Book Created Successfully")
                .build();
    }
}
