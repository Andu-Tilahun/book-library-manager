package com.booklibrary.book.service.domain.util;


import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.Objects;
import java.util.stream.Collectors;

public class SpecByExampleReader {
    private static final ClassLoader loader = Thread.currentThread().getContextClassLoader();

    public static String getSpecByExampleString(String jsonFilePath) {
        try (InputStream inputStream = loader.getResourceAsStream(jsonFilePath);
             BufferedReader reader = new BufferedReader(new InputStreamReader(
                     Objects.requireNonNull(inputStream, "The file could not be found"), StandardCharsets.UTF_8))) {
            return reader.lines().collect(Collectors.joining(System.lineSeparator()));
        } catch (IOException e) {
            throw new RuntimeException("Error reading the file: " + jsonFilePath, e);
        }
    }
}
