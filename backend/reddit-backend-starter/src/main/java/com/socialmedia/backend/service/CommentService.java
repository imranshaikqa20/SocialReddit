package com.socialmedia.backend.service;

import com.socialmedia.backend.dto.request.CreateCommentRequest;

import com.socialmedia.backend.entity.Comment;

import java.util.List;

public interface CommentService {

    /* Create Comment */

    Comment createComment(
            CreateCommentRequest request
    );

    /* Get Comments By Post */

    List<Comment> getCommentsByPost(
            Long postId
    );

}