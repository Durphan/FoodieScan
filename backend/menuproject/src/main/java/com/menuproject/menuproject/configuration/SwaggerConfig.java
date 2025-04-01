package com.menuproject.menuproject.configuration;

import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration

public class SwaggerConfig {
    @Bean
    public GroupedOpenApi publicApi() {
        return GroupedOpenApi.builder()
                .group("FoodieScan API")
                .pathsToMatch("/**")
                .displayName("FoodieScan API")
                .build();
    }
}
