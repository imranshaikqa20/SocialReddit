package com.socialmedia.backend.service;

import com.socialmedia.backend.dto.request.CreateCommentRequest;

import com.socialmedia.backend.entity.Comment;

import java.util.List;

public interface CommentService {

    /* =========================================
       CREATE COMMENT
    ========================================= */

    Comment createComment(
            CreateCommentRequest request
    );

    /* =========================================
       GET COMMENTS BY POST
    ========================================= */

    List<Comment> getCommentsByPost(
            Long postId
    );

}