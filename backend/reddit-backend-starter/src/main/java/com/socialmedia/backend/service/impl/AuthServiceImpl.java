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

    /* Signup Logic */

    @Override
    public User signup(
            SignupRequest request
    ) {

        /* Check Email Exists */

        if (userRepository.existsByEmail(
                request.getEmail()
        )) {

            throw new RuntimeException(
                    "Email Already Exists "
            );

        }

        /* Check Username Exists */

        if (userRepository.existsByUsername(
                request.getUsername()
        )) {

            throw new RuntimeException(
                    "Username Already Exists "
            );

        }

        /* Create User */

        User user = new User();

        user.setUsername(
                request.getUsername()
        );

        user.setEmail(
                request.getEmail()
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

    /* Login Logic */

    @Override
    public String login(
            LoginRequest request
    ) {

        User user = userRepository
                .findByEmail(
                        request.getEmail()
                )
                .orElseThrow(() ->
                        new RuntimeException(
                                "User Not Found "
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
                    "Invalid Password "
            );

        }

        /* Generate JWT Token */

        return jwtService.generateToken(
                user.getEmail()
        );

    }

}