package com.socialmedia.backend.repository;

import com.socialmedia.backend.entity.Comment;

import com.socialmedia.backend.entity.Post;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository
        extends JpaRepository<Comment, Long> {

    /* =========================================
       FIND COMMENTS BY POST
    ========================================= */

    List<Comment> findByPost(
            Post post
    );

    /* =========================================
       FIND COMMENTS BY POST ID
    ========================================= */

    List<Comment>
    findByPostIdOrderByIdDesc(
            Long postId
    );

}