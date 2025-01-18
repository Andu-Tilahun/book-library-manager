package com.booklibrary.user.service.container;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@EnableJpaRepositories(basePackages = {"com.booklibrary.user.service.data"})
@EntityScan(basePackages = {"com.booklibrary.user.service.data"})
@SpringBootApplication(scanBasePackages = "com.booklibrary")
public class UserServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
    }


}


