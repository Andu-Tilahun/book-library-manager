package com.booklibrary.api.gateway;


import com.booklibrary.api.gateway.filters.CustomCsrfFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.reactive.ReactiveUserDetailsServiceAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;


@SpringBootApplication(exclude = ReactiveUserDetailsServiceAutoConfiguration.class)
public class BookLibraryApiGatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(BookLibraryApiGatewayApplication.class, args);
	}

	@Bean
	public CustomCsrfFilter authCookieFilter() {
		return new CustomCsrfFilter();
	}

	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}
}
