package com.socialmedia.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.http.HttpMethod;

import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    /* =========================================
       Password Encoder
    ========================================= */

    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();

    }

    /* =========================================
       Security Filter Chain
    ========================================= */

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http

                /* =====================================
                   Disable CSRF
                ===================================== */

                .csrf(csrf -> csrf.disable())

                /* =====================================
                   Enable CORS
                ===================================== */

                .cors(Customizer.withDefaults())

                /* =====================================
                   Stateless Session
                ===================================== */

                .sessionManagement(session ->

                        session.sessionCreationPolicy(

                                SessionCreationPolicy.STATELESS

                        )

                )

                /* =====================================
                   Disable Default Spring Login
                ===================================== */

                .formLogin(form -> form.disable())

                .httpBasic(httpBasic -> httpBasic.disable())

                .logout(logout -> logout.disable())

                /* =====================================
                   Authorization Rules
                ===================================== */

                .authorizeHttpRequests(auth -> auth

                        /* OPTIONS */

                        .requestMatchers(

                                HttpMethod.OPTIONS,

                                "/**"

                        ).permitAll()

                        /* Auth */

                        .requestMatchers(

                                "/api/auth/**"

                        ).permitAll()

                        /* Posts */

                        .requestMatchers(

                                "/api/posts/**"

                        ).permitAll()

                        /* Communities */

                        .requestMatchers(

                                "/api/communities/**"

                        ).permitAll()

                        /* Comments */

                        .requestMatchers(

                                "/api/comments/**"

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

                        /* Everything Else */

                        .anyRequest().permitAll()

                );

        return http.build();

    }

    /* =========================================
       CORS Configuration
    ========================================= */

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration =
                new CorsConfiguration();

        configuration.setAllowedOriginPatterns(

                List.of(

                        "http://localhost:5173",

                        "https://*.onrender.com"

                )

        );

        configuration.setAllowedMethods(

                List.of(

                        "GET",

                        "POST",

                        "PUT",

                        "DELETE",

                        "OPTIONS"

                )

        );

        configuration.setAllowedHeaders(

                List.of("*")

        );

        configuration.setExposedHeaders(

                List.of(

                        "Authorization"

                )

        );

        configuration.setAllowCredentials(true);

        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source =

                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(

                "/**",

                configuration

        );

        return source;

    }

}