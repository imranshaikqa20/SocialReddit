package com.socialmedia.backend.repository;

import com.socialmedia.backend.entity.Post;
import com.socialmedia.backend.entity.Vote;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository

public interface VoteRepository
        extends JpaRepository<Vote, Long> {

    /* =========================================
       FIND VOTE BY USER + POST
    ========================================= */

    Optional<Vote>
    findByUsernameAndPost(

            String username,

            Post post

    );

    /* =========================================
       FIND ALL VOTES OF POST
    ========================================= */

    List<Vote>
    findByPost(
            Post post
    );

    /* =========================================
       DELETE ALL VOTES OF POST
    ========================================= */

    void deleteByPost(
            Post post
    );

}