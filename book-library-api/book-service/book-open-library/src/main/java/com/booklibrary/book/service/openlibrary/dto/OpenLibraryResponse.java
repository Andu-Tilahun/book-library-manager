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
        private List<String> ia;
        private String first_publish_year;;

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

        public List<String> getIa() {
            return ia;
        }

        public void setIa(List<String> ia) {
            this.ia = ia;
        }

        public String getFirst_publish_year() {
            return first_publish_year;
        }

        public void setFirst_publish_year(String first_publish_year) {
            this.first_publish_year = first_publish_year;
        }
    }
}
