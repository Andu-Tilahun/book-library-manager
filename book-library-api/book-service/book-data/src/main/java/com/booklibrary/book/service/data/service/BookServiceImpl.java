package com.booklibrary.book.service.data.service;

import com.booklibrary.book.service.data.dto.BookDto;
import com.booklibrary.book.service.data.entity.BookEntity;
import com.booklibrary.book.service.data.exception.BookDomainException;
import com.booklibrary.book.service.data.mapper.BookMapper;
import com.booklibrary.book.service.data.repository.BookRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
@Slf4j
public class BookServiceImpl implements BookService {

    private final BookMapper bookMapper;

    private final BookRepository bookRepository;

    public BookServiceImpl(BookMapper bookMapper, BookRepository bookRepository) {
        this.bookMapper = bookMapper;
        this.bookRepository = bookRepository;
    }

    @Override
    public BookDto createBook(BookDto bookDto) {

        this.bookRepository.findByIsbn(bookDto.getIsbn()).ifPresent(book -> {
            throw new BookDomainException(
                    String.format("Book is already in exist with this isbn: %s", bookDto.getIsbn()));
        });

        BookEntity bookEntity = bookRepository.save(bookMapper.mapBookDtoToBookEntity(bookDto));
        return bookMapper.mapBookEntityToBookDto(bookEntity);
    }

    @Override
    public List<BookDto> fetchAllBooks() {
        return this.bookRepository.findAll()
                .stream()
                .map(this.bookMapper::mapBookEntityToBookDto)
                .collect(Collectors.toList());
    }
}
