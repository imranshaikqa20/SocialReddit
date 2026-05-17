package com.socialmedia.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.http.HttpMethod;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    /* =========================================
       Password Encoder
    ========================================= */

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();

    }

    /* =========================================
       Security Configuration
    ========================================= */

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http

                /* Disable CSRF */

                .csrf(csrf -> csrf.disable())

                /* Enable CORS */

                .cors(cors -> cors.configurationSource(
                        corsConfigurationSource()
                ))

                /* Stateless Session */

                .sessionManagement(session ->

                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )

                )

                /* Authorization Rules */

                .authorizeHttpRequests(auth -> auth

                        /* Allow OPTIONS Requests */

                        .requestMatchers(
                                HttpMethod.OPTIONS,
                                "/**"
                        ).permitAll()

                        /* Public Auth APIs */

                        .requestMatchers(
                                "/api/auth/**"
                        ).permitAll()

                        /* Public Posts APIs */

                        .requestMatchers(
                                "/api/posts/**"
                        ).permitAll()

                        /* Public Comments APIs */

                        .requestMatchers(
                                "/api/comments/**"
                        ).permitAll()

                        /* Public Communities APIs */

                        .requestMatchers(
                                "/api/communities/**"
                        ).permitAll()

                        /* Uploads */

                        .requestMatchers(
                                "/uploads/**"
                        ).permitAll()

                        /* Swagger */

                        .requestMatchers(
                                "/swagger-ui/**",
                                "/v3/api-docs/**"
                        ).permitAll()

                        /* All Other Requests */

                        .anyRequest().permitAll()

                )

                /* Disable Default Login Form */

                .formLogin(form -> form.disable())

                /* Disable HTTP Basic */

                .httpBasic(httpBasic -> httpBasic.disable());

        return http.build();

    }

    /* =========================================
       CORS Configuration
    ========================================= */

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration =
                new CorsConfiguration();

        /* Allow Frontend URLs */

        configuration.setAllowedOrigins(

                List.of(

                        "http://localhost:5173",

                        "https://socialreddit.onrender.com"

                )

        );

        /* Allow HTTP Methods */

        configuration.setAllowedMethods(

                List.of(

                        "GET",
                        "POST",
                        "PUT",
                        "DELETE",
                        "OPTIONS"

                )

        );

        /* Allow Headers */

        configuration.setAllowedHeaders(

                List.of("*")

        );

        /* Allow Credentials */

        configuration.setAllowCredentials(true);

        /* Register CORS */

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
                "/**",
                configuration
        );

        return source;

    }

}