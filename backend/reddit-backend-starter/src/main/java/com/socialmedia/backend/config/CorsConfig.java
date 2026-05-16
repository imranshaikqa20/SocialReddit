package com.socialmedia.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {

        /* CORS Configuration */

        CorsConfiguration config =
                new CorsConfiguration();

        /* Allow Frontend URL */

        config.setAllowedOrigins(
                Arrays.asList(
                        "http://localhost:5173"
                )
        );

        /* Allow Headers */

        config.setAllowedHeaders(
                Arrays.asList("*")
        );

        /* Allow HTTP Methods */

        config.setAllowedMethods(
                Arrays.asList(
                        "GET",
                        "POST",
                        "PUT",
                        "DELETE",
                        "OPTIONS"
                )
        );

        /* Allow Credentials */

        config.setAllowCredentials(true);

        /* Register Configuration */

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
                "/**",
                config
        );

        return new CorsFilter(source);

    }

}