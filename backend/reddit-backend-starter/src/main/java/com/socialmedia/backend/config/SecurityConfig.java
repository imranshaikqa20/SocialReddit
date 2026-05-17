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

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity

public class SecurityConfig {

    /* =========================================
       PASSWORD ENCODER
    ========================================= */

    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();

    }

    /* =========================================
       SECURITY FILTER CHAIN
    ========================================= */

    @Bean
    public SecurityFilterChain securityFilterChain(

            HttpSecurity http

    ) throws Exception {

        http

                /* =====================================
                   DISABLE CSRF
                ===================================== */

                .csrf(csrf -> csrf.disable())

                /* =====================================
                   ENABLE CORS
                ===================================== */

                .cors(Customizer.withDefaults())

                /* =====================================
                   STATELESS SESSION
                ===================================== */

                .sessionManagement(session ->

                        session.sessionCreationPolicy(

                                SessionCreationPolicy.STATELESS

                        )

                )

                /* =====================================
                   DISABLE DEFAULT LOGIN
                ===================================== */

                .formLogin(form -> form.disable())

                .httpBasic(httpBasic -> httpBasic.disable())

                .logout(logout -> logout.disable())

                /* =====================================
                   AUTHORIZATION RULES
                ===================================== */

                .authorizeHttpRequests(auth -> auth

                        /* OPTIONS */

                        .requestMatchers(

                                HttpMethod.OPTIONS,

                                "/**"

                        ).permitAll()

                        /* AUTH */

                        .requestMatchers(

                                "/api/auth/**"

                        ).permitAll()

                        /* POSTS */

                        .requestMatchers(

                                "/api/posts/**"

                        ).permitAll()

                        /* COMMUNITIES */

                        .requestMatchers(

                                "/api/communities/**"

                        ).permitAll()

                        /* COMMENTS */

                        .requestMatchers(

                                "/api/comments/**"

                        ).permitAll()

                        /* UPLOADS */

                        .requestMatchers(

                                "/uploads/**"

                        ).permitAll()

                        /* SWAGGER */

                        .requestMatchers(

                                "/swagger-ui/**",

                                "/v3/api-docs/**"

                        ).permitAll()

                        /* EVERYTHING ELSE */

                        .anyRequest().authenticated()

                );

        return http.build();

    }

    /* =========================================
       CORS CONFIGURATION
    ========================================= */

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration =
                new CorsConfiguration();

        /* =====================================
           ALLOWED ORIGINS
        ===================================== */

        configuration.setAllowedOriginPatterns(

                Arrays.asList(

                        "http://localhost:5173",

                        "http://localhost:3000",

                        "https://*.onrender.com"

                )

        );

        /* =====================================
           ALLOWED METHODS
        ===================================== */

        configuration.setAllowedMethods(

                Arrays.asList(

                        "GET",

                        "POST",

                        "PUT",

                        "DELETE",

                        "OPTIONS"

                )

        );

        /* =====================================
           ALLOWED HEADERS
        ===================================== */

        configuration.setAllowedHeaders(

                List.of("*")

        );

        /* =====================================
           EXPOSED HEADERS
        ===================================== */

        configuration.setExposedHeaders(

                Arrays.asList(

                        "Authorization",

                        "Content-Type"

                )

        );

        /* =====================================
           CREDENTIALS
        ===================================== */

        configuration.setAllowCredentials(true);

        /* =====================================
           CACHE
        ===================================== */

        configuration.setMaxAge(3600L);

        /* =====================================
           REGISTER
        ===================================== */

        UrlBasedCorsConfigurationSource source =

                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(

                "/**",

                configuration

        );

        return source;

    }

}