package com.socialmedia.backend.service.impl;

import com.socialmedia.backend.dto.request.LoginRequest;
import com.socialmedia.backend.dto.request.SignupRequest;

import com.socialmedia.backend.entity.User;

import com.socialmedia.backend.repository.UserRepository;

import com.socialmedia.backend.security.JwtService;

import com.socialmedia.backend.service.AuthService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    /* =========================
       Signup Logic
       ========================= */

    @Override
    public User signup(
            SignupRequest request
    ) {

        /* Validate Username */

        if (request.getUsername() == null
                || request.getUsername().trim().isEmpty()) {

            throw new RuntimeException(
                    "Username is required"
            );

        }

        /* Validate Email */

        if (request.getEmail() == null
                || request.getEmail().trim().isEmpty()) {

            throw new RuntimeException(
                    "Email is required"
            );

        }

        /* Validate Password */

        if (request.getPassword() == null
                || request.getPassword().trim().isEmpty()) {

            throw new RuntimeException(
                    "Password is required"
            );

        }

        /* Check Email Exists */

        if (userRepository.existsByEmail(
                request.getEmail()
        )) {

            throw new RuntimeException(
                    "Email already exists"
            );

        }

        /* Check Username Exists */

        if (userRepository.existsByUsername(
                request.getUsername()
        )) {

            throw new RuntimeException(
                    "Username already exists"
            );

        }

        /* Create User */

        User user = new User();

        user.setUsername(
                request.getUsername().trim()
        );

        user.setEmail(
                request.getEmail().trim().toLowerCase()
        );

        /* Encrypt Password */

        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()
                )
        );

        /* Save User */

        return userRepository.save(user);

    }

    /* =========================
       Login Logic
       ========================= */

    @Override
    public String login(
            LoginRequest request
    ) {

        /* Validate Email */

        if (request.getEmail() == null
                || request.getEmail().trim().isEmpty()) {

            throw new RuntimeException(
                    "Email is required"
            );

        }

        /* Validate Password */

        if (request.getPassword() == null
                || request.getPassword().trim().isEmpty()) {

            throw new RuntimeException(
                    "Password is required"
            );

        }

        /* Find User */

        User user = userRepository
                .findByEmail(
                        request.getEmail().trim().toLowerCase()
                )
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found"
                        )
                );

        /* Check Password */

        boolean isPasswordCorrect =
                passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword()
                );

        if (!isPasswordCorrect) {

            throw new RuntimeException(
                    "Invalid password"
            );

        }

        /* Generate JWT Token */

        return jwtService.generateToken(
                user.getEmail()
        );

    }

}