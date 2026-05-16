package com.socialmedia.backend.repository;

import com.socialmedia.backend.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository
        extends JpaRepository<User, Long> {

    /* Find User By Email */

    Optional<User> findByEmail(
            String email
    );

    /* Check Email Already Exists */

    boolean existsByEmail(
            String email
    );

    /* Check Username Already Exists */

    boolean existsByUsername(
            String username
    );

}