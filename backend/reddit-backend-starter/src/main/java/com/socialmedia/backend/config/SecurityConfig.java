package com.socialmedia.backend.config;

import org.springframework.context.annotation.Bean;

import org.springframework.context.annotation.Configuration;

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

    

    @Bean

    public BCryptPasswordEncoder
    passwordEncoder() {

        return new BCryptPasswordEncoder();

    }

    /* Security Configuration */

    @Bean

    public SecurityFilterChain
    securityFilterChain(

            HttpSecurity http

    ) throws Exception {

        http

                /* Disable CSRF */

                .csrf(csrf -> csrf.disable())

                /* Enable CORS */

                .cors(cors -> cors
                        .configurationSource(
                                corsConfigurationSource()
                        )
                )

                /* Stateless Session */

                .sessionManagement(session ->

                        session
                                .sessionCreationPolicy(

                                        SessionCreationPolicy.STATELESS

                                )

                )

                /* Authorization */

                .authorizeHttpRequests(auth -> auth

                        /* Allow Upload Images */

                        .requestMatchers(

                                "/uploads/**"

                        ).permitAll()

                        /* Auth APIs */

                        .requestMatchers(

                                "/api/auth/**"

                        ).permitAll()

                        /* Post APIs */

                        .requestMatchers(

                                "/api/posts/**"

                        ).permitAll()

                        /* Comment APIs */

                        .requestMatchers(

                                "/api/comments/**"

                        ).permitAll()

                        /* Community APIs */

                        .requestMatchers(

                                "/api/communities/**"

                        ).permitAll()

                        /* Swagger */

                        .requestMatchers(

                                "/swagger-ui/**",

                                "/v3/api-docs/**"

                        ).permitAll()

                        /* Everything Else */

                        .anyRequest()

                        .authenticated()

                )

                /* Disable Default Login */

                .formLogin(form -> form.disable());

        return http.build();

    }

    /* CORS Configuration */

    @Bean

    public CorsConfigurationSource
    corsConfigurationSource() {

        CorsConfiguration configuration =
                new CorsConfiguration();

        /* Frontend URL */

        configuration.setAllowedOrigins(

                List.of(

                        "http://localhost:5173"

                )

        );

        /* Methods */

        configuration.setAllowedMethods(

                List.of(

                        "GET",

                        "POST",

                        "PUT",

                        "DELETE",

                        "OPTIONS"

                )

        );

        /* Headers */

        configuration.setAllowedHeaders(

                List.of("*")

        );

        /* Credentials */

        configuration.setAllowCredentials(true);

        /* Register */

        UrlBasedCorsConfigurationSource source =

                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(

                "/**",

                configuration

        );

        return source;

    }

}