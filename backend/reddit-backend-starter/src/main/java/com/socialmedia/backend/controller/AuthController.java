package com.socialmedia.backend.controller;

import com.socialmedia.backend.dto.request.LoginRequest;
import com.socialmedia.backend.dto.request.SignupRequest;

import com.socialmedia.backend.entity.User;

import com.socialmedia.backend.repository.UserRepository;

import com.socialmedia.backend.service.AuthService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController

@RequestMapping("/api/auth")

@CrossOrigin(origins = "http://localhost:5173")

public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserRepository userRepository;

    /* Signup API */

    @PostMapping("/signup")
    public ResponseEntity<?> signup(
            @RequestBody SignupRequest request
    ) {

        User user =
                authService.signup(request);

        return ResponseEntity.ok(

                Map.of(

                        "message",
                        "Signup Success 🚀",

                        "user",
                        user

                )

        );

    }

    /* Login API */

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request
    ) {

        /* Generate JWT Token */

        String token =
                authService.login(request);

        /* Get User */

        User user = userRepository
                .findByEmail(
                        request.getEmail()
                )
                .orElseThrow(() ->
                        new RuntimeException(
                                "User Not Found"
                        )
                );

        /* Response */

        return ResponseEntity.ok(

                Map.of(

                        "message",
                        "Login Success 🚀",

                        "token",
                        token,

                        "username",
                        user.getUsername(),

                        "email",
                        user.getEmail()

                )

        );

    }

}