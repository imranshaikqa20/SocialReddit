package com.socialmedia.backend.repository;

import com.socialmedia.backend.entity.Post;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository
        extends JpaRepository<Post, Long> {

    /* =========================================
       Search Posts By Title
    ========================================= */

    List<Post> findByTitleContainingIgnoreCase(
            String keyword
    );

    /* =========================================
       Get Posts By Community
    ========================================= */

    List<Post> findByCommunityId(
            Long communityId
    );

    /* =========================================
       Get Posts By User
    ========================================= */

    List<Post> findByUserId(
            Long userId
    );

}