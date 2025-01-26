package com.booklibrary.book.service.openlibrary.service;

import com.booklibrary.book.service.openlibrary.dto.BookResponse;
import com.booklibrary.book.service.openlibrary.dto.OpenLibraryResponse;
import com.booklibrary.book.service.openlibrary.mapper.OpenLibraryResponseMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class OpenLibraryServiceImpl implements OpenLibraryService {

    private final RestTemplate restTemplate = new RestTemplate();
    private static final String OPEN_LIBRARY_API = "https://openlibrary.org/search.json?%s";

    private final OpenLibraryResponseMapper openLibraryResponseMapper;

    public OpenLibraryServiceImpl(OpenLibraryResponseMapper openLibraryResponseMapper) {
        this.openLibraryResponseMapper = openLibraryResponseMapper;
    }

    public List<BookResponse> searchBooks(String query) {
        String url = String.format(OPEN_LIBRARY_API, query);
        OpenLibraryResponse openLibraryResponse = restTemplate.getForObject(url, OpenLibraryResponse.class);
        return openLibraryResponseMapper.mapToBooks(openLibraryResponse);
    }
}
