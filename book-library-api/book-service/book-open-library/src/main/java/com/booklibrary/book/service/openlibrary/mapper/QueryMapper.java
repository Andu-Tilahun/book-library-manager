package com.booklibrary.book.service.openlibrary.mapper;

import org.springframework.util.StringUtils;


public class QueryMapper {

    public static String buildQuery(String title, String author, String isbn) {
        if (!StringUtils.hasText(title) && !StringUtils.hasText(author) && !StringUtils.hasText(isbn)) {
            throw new IllegalArgumentException("At least one search parameter (title, author, or ISBN) must be provided.");
        }

        StringBuilder query = new StringBuilder();
        if (StringUtils.hasText(title)) {
            query.append("title=").append(title.replace(" ", "+")).append("&");
        }
        if (StringUtils.hasText(author)) {
            query.append("author=").append(author.replace(" ", "+")).append("&");
        }
        if (StringUtils.hasText(isbn)) {
            query.append("isbn=").append(isbn).append("&");
        }

        // Remove the trailing '&' if it exists
        if (query.length() > 0 && query.charAt(query.length() - 1) == '&') {
            query.deleteCharAt(query.length() - 1);
        }

        return query.toString();
    }
}
