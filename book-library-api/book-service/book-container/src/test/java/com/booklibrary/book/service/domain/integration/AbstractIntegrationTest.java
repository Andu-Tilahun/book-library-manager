package com.booklibrary.book.service.domain.integration;

import com.booklibrary.book.service.domain.BookIntegrationTestConfiguration;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.skyscreamer.jsonassert.Customization;
import org.skyscreamer.jsonassert.JSONCompareMode;
import org.skyscreamer.jsonassert.comparator.CustomComparator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpHeaders;
import org.springframework.jdbc.datasource.init.ScriptUtils;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.reactive.server.WebTestClient;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.function.Consumer;

import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = RANDOM_PORT)
@AutoConfigureWebTestClient
public class AbstractIntegrationTest {

    @Autowired
    protected WebTestClient webTestClient;
    @Autowired
    protected ObjectMapper objectMapper;

    @Autowired
    DataSource dataSource;


    protected final String BASE_PATH = "spec-by-examples/";

    protected Consumer<HttpHeaders> headers = httpHeaders -> {
        httpHeaders.set("Content-Type", "application/json;charset=UTF-8");
    };

    @BeforeEach
    void setup() {
        try (Connection conn = dataSource.getConnection()) {
            ScriptUtils.executeSqlScript(conn, new ClassPathResource("/db/INSERT_SEED_DATA.sql"));
        } catch (SQLException ex) {
            ex.printStackTrace();
        }

    }

    @AfterEach
    void cleanDatabase() {
        try (Connection conn = dataSource.getConnection()) {
            ScriptUtils.executeSqlScript(conn, new ClassPathResource("/db/CLEAN_TEST_TABLES.sql"));
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }

    protected CustomComparator customProfileComparator() {
        return new CustomComparator(JSONCompareMode.STRICT,
                new Customization("id", (o1, o2) -> true));
    }
}
