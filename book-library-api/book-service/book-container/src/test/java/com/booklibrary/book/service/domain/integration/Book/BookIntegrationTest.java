package com.booklibrary.book.service.domain.integration.Book;

import com.booklibrary.application.api.Response;
import com.booklibrary.book.service.domain.BookIntegrationTestConfiguration;
import com.booklibrary.book.service.domain.integration.AbstractIntegrationTest;
import org.junit.jupiter.api.Test;
import org.skyscreamer.jsonassert.Customization;
import org.skyscreamer.jsonassert.JSONAssert;
import org.skyscreamer.jsonassert.JSONCompareMode;
import org.skyscreamer.jsonassert.comparator.CustomComparator;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.reactive.server.WebTestClient;
import org.springframework.web.reactive.function.BodyInserters;

import static com.booklibrary.book.service.domain.util.SpecByExampleReader.getSpecByExampleString;


public class BookIntegrationTest extends AbstractIntegrationTest {
    private final String REQUEST = "/book/request/";
    private final String RESPONSE = "/book/response/";


    @Test
    public void create_book_success() throws Exception {
        String url = "/book/";
        String requestJson = getSpecByExampleString(BASE_PATH + REQUEST + "create-book-request.json");
        String expectedResponse = getSpecByExampleString(BASE_PATH + RESPONSE + "create-book-response.json");


        WebTestClient.BodySpec bodySpec = this.webTestClient.post()
                .uri(url)
                .accept(MediaType.ALL)
                .body(BodyInserters.fromValue(requestJson))
                .headers(headers)
                .exchange()
                .expectStatus().isOk()
                .expectBody(Response.class);

        String result = objectMapper.writeValueAsString(bodySpec.returnResult().getResponseBody());
        JSONAssert.assertEquals(expectedResponse, result, customProfileComparator());
    }

    @Override
    protected CustomComparator customProfileComparator() {
        return new CustomComparator(JSONCompareMode.STRICT,
                new Customization("data.id", (o1, o2) -> true),
                new Customization("data.createdDate", (o1, o2) -> true),
                new Customization("correlationId", (o1, o2) -> true));
    }
}
