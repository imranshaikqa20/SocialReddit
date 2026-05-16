package com.socialmedia.backend.service;

import com.socialmedia.backend.dto.request.LoginRequest;
import com.socialmedia.backend.dto.request.SignupRequest;

import com.socialmedia.backend.entity.User;

public interface AuthService {

    /* Register New User */

    User signup(
            SignupRequest request
    );

    /* Login Existing User */

    String login(
            LoginRequest request
    );

}