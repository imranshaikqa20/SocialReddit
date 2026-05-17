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

    /* =========================================
       Signup Logic
    ========================================= */

    @Override
    public User signup(
            SignupRequest request
    ) {

        /* Validate Username */

        if (

                request.getUsername() == null ||

                        request.getUsername().trim().isEmpty()

        ) {

            throw new RuntimeException(
                    "Username is required"
            );

        }

        /* Validate Email */

        if (

                request.getEmail() == null ||

                        request.getEmail().trim().isEmpty()

        ) {

            throw new RuntimeException(
                    "Email is required"
            );

        }

        /* Validate Password */

        if (

                request.getPassword() == null ||

                        request.getPassword().trim().isEmpty()

        ) {

            throw new RuntimeException(
                    "Password is required"
            );

        }

        /* =========================================
           Normalize Email
        ========================================= */

        String email =

                request.getEmail()
                        .trim()
                        .toLowerCase();

        /* =========================================
           Check Existing Email
        ========================================= */

        if (

                userRepository.existsByEmail(email)

        ) {

            throw new RuntimeException(
                    "Email already exists"
            );

        }

        /* =========================================
           Check Existing Username
        ========================================= */

        if (

                userRepository.existsByUsername(

                        request.getUsername().trim()

                )

        ) {

            throw new RuntimeException(
                    "Username already exists"
            );

        }

        /* =========================================
           Create User
        ========================================= */

        User user = new User();

        user.setUsername(

                request.getUsername().trim()

        );

        user.setEmail(email);

        /* =========================================
           Encrypt Password
        ========================================= */

        String encryptedPassword =

                passwordEncoder.encode(

                        request.getPassword().trim()

                );

        user.setPassword(encryptedPassword);

        /* =========================================
           Save User
        ========================================= */

        return userRepository.save(user);

    }

    /* =========================================
       Login Logic
    ========================================= */

    @Override
    public String login(
            LoginRequest request
    ) {

        /* Validate Email */

        if (

                request.getEmail() == null ||

                        request.getEmail().trim().isEmpty()

        ) {

            throw new RuntimeException(
                    "Email is required"
            );

        }

        /* Validate Password */

        if (

                request.getPassword() == null ||

                        request.getPassword().trim().isEmpty()

        ) {

            throw new RuntimeException(
                    "Password is required"
            );

        }

        /* =========================================
           Normalize Email
        ========================================= */

        String email =

                request.getEmail()
                        .trim()
                        .toLowerCase();

        /* =========================================
           Find User
        ========================================= */

        User user = userRepository

                .findByEmail(email)

                .orElseThrow(() ->

                        new RuntimeException(
                                "User not found"
                        )

                );

        /* =========================================
           Password Match
        ========================================= */

        boolean passwordMatched =

                passwordEncoder.matches(

                        request.getPassword().trim(),

                        user.getPassword()

                );

        if (!passwordMatched) {

            throw new RuntimeException(
                    "Invalid Email or Password"
            );

        }

        /* =========================================
           Generate JWT
        ========================================= */

        return jwtService.generateToken(
                user.getEmail()
        );

    }

}