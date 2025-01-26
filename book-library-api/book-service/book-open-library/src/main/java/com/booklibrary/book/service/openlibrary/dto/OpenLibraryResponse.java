package com.booklibrary.book.service.openlibrary.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OpenLibraryResponse {

    private List<Doc> docs;

    public static class Doc {
        private String title;
        private List<String> author_name;
        private List<String> isbn;
        private List<String> publisher;

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public List<String> getAuthor_name() {
            return author_name;
        }

        public void setAuthor_name(List<String> author_name) {
            this.author_name = author_name;
        }

        public List<String> getIsbn() {
            return isbn;
        }

        public void setIsbn(List<String> isbn) {
            this.isbn = isbn;
        }

        public List<String> getPublisher() {
            return publisher;
        }

        public void setPublisher(List<String> publisher) {
            this.publisher = publisher;
        }
    }
}
