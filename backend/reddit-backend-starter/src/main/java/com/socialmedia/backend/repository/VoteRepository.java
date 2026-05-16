package com.socialmedia.backend.repository;

import com.socialmedia.backend.entity.Post;

import com.socialmedia.backend.entity.Vote;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository

public interface VoteRepository
        extends JpaRepository<Vote, Long> {

    /* Find Vote By User + Post */

    Optional<Vote>
    findByUsernameAndPost(

            String username,

            Post post

    );

}