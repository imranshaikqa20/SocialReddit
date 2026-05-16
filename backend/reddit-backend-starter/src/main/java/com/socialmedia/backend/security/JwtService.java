package com.socialmedia.backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

import io.jsonwebtoken.SignatureAlgorithm;

import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;

import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;

import java.security.Key;

import java.util.Date;

@Service
public class JwtService {

    /* =========================================
       JWT Secret Key From Environment Variable
       ========================================= */

    @Value("${JWT_SECRET}")
    private String secretKey;

    /* =========================================
       Token Expiration Time
       24 Hours
       ========================================= */

    private static final long EXPIRATION_TIME =
            1000 * 60 * 60 * 24;

    /* =========================================
       Generate Signing Key
       ========================================= */

    private Key getSigningKey() {

        return Keys.hmacShaKeyFor(
                secretKey.getBytes(
                        StandardCharsets.UTF_8
                )
        );

    }

    /* =========================================
       Generate JWT Token
       ========================================= */

    public String generateToken(
            String email
    ) {

        return Jwts.builder()

                .setSubject(email)

                .setIssuedAt(
                        new Date()
                )

                .setExpiration(
                        new Date(
                                System.currentTimeMillis()
                                        + EXPIRATION_TIME
                        )
                )

                .signWith(
                        getSigningKey(),
                        SignatureAlgorithm.HS256
                )

                .compact();

    }

    /* =========================================
       Extract Email From Token
       ========================================= */

    public String extractEmail(
            String token
    ) {

        return extractAllClaims(token)
                .getSubject();

    }

    /* =========================================
       Validate Token
       ========================================= */

    public boolean isTokenValid(
            String token,
            String email
    ) {

        String extractedEmail =
                extractEmail(token);

        return extractedEmail.equals(email)
                && !isTokenExpired(token);

    }

    /* =========================================
       Check Token Expired
       ========================================= */

    private boolean isTokenExpired(
            String token
    ) {

        return extractAllClaims(token)
                .getExpiration()
                .before(new Date());

    }

    /* =========================================
       Extract Claims
       ========================================= */

    private Claims extractAllClaims(
            String token
    ) {

        return Jwts.parserBuilder()

                .setSigningKey(
                        getSigningKey()
                )

                .build()

                .parseClaimsJws(token)

                .getBody();

    }

}