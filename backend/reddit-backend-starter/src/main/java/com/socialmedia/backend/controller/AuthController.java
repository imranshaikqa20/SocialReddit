package com.socialmedia.backend.controller;

import com.socialmedia.backend.dto.request.LoginRequest;
import com.socialmedia.backend.dto.request.SignupRequest;

import com.socialmedia.backend.entity.User;

import com.socialmedia.backend.repository.UserRepository;

import com.socialmedia.backend.service.AuthService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")

@CrossOrigin(origins = {
        "http://localhost:5173",
        "https://socialreddit-frontend.onrender.com"
})

public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserRepository userRepository;

    /* =========================
       Signup API
       ========================= */

    @PostMapping("/signup")
    public ResponseEntity<?> signup(
            @RequestBody SignupRequest request
    ) {

        try {

            /* Create User */

            User user =
                    authService.signup(request);

            /* Response */

            Map<String, Object> response =
                    new HashMap<>();

            response.put(
                    "message",
                    "Signup Success 🚀"
            );

            response.put(
                    "username",
                    user.getUsername()
            );

            response.put(
                    "email",
                    user.getEmail()
            );

            return ResponseEntity.ok(response);

        } catch (Exception e) {

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(

                            Map.of(
                                    "error",
                                    e.getMessage()
                            )

                    );

        }

    }

    /* =========================
       Login API
       ========================= */

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request
    ) {

        try {

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

            Map<String, Object> response =
                    new HashMap<>();

            response.put(
                    "message",
                    "Login Success 🚀"
            );

            response.put(
                    "token",
                    token
            );

            response.put(
                    "username",
                    user.getUsername()
            );

            response.put(
                    "email",
                    user.getEmail()
            );

            return ResponseEntity.ok(response);

        } catch (Exception e) {

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(

                            Map.of(
                                    "error",
                                    e.getMessage()
                            )

                    );

        }

    }

}