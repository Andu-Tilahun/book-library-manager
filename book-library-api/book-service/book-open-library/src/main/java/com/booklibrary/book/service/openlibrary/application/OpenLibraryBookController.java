package com.booklibrary.book.service.openlibrary.application;

import com.booklibrary.book.service.openlibrary.dto.BookResponse;
import com.booklibrary.book.service.openlibrary.mapper.QueryMapper;
import com.booklibrary.book.service.openlibrary.service.OpenLibraryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "/openLibrary/", produces = "application/vnd.api.v1+json")
public class OpenLibraryBookController {

    private final OpenLibraryService openLibraryService;

    public OpenLibraryBookController(OpenLibraryService openLibraryService) {
        this.openLibraryService = openLibraryService;
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchBooks(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String author,
            @RequestParam(required = false) String isbn) {

        List<BookResponse> bookResponses = openLibraryService.searchBooks(QueryMapper.buildQuery(title, author, isbn));
        return ResponseEntity.ok(bookResponses);
    }


}
