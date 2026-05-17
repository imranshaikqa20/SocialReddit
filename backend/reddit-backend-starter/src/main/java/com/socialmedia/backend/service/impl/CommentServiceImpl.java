package com.socialmedia.backend.service.impl;

import com.socialmedia.backend.dto.request.CreateCommentRequest;

import com.socialmedia.backend.entity.Comment;

import com.socialmedia.backend.entity.Post;

import com.socialmedia.backend.repository.CommentRepository;

import com.socialmedia.backend.repository.PostRepository;

import com.socialmedia.backend.service.CommentService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

import java.util.List;

@Service
public class CommentServiceImpl
        implements CommentService {

    @Autowired
    private CommentRepository
            commentRepository;

    @Autowired
    private PostRepository
            postRepository;

    /* =========================================
       CREATE COMMENT
    ========================================= */

    @Override
    public Comment createComment(
            CreateCommentRequest request
    ) {

        /* FIND POST */

        Post post =

                postRepository
                        .findById(
                                request.getPostId()
                        )

                        .orElseThrow(() ->

                                new RuntimeException(
                                        "Post Not Found"
                                )

                        );

        /* CREATE COMMENT */

        Comment comment =
                new Comment();

        /* CONTENT */

        comment.setContent(
                request.getContent()
        );

        /* AUTHOR */

        if (

                request.getAuthor() == null ||

                        request.getAuthor()
                                .trim()
                                .isEmpty()

        ) {

            comment.setAuthor(
                    "Anonymous"
            );

        } else {

            comment.setAuthor(
                    request.getAuthor()
            );

        }

        /* POST */

        comment.setPost(post);

        /* CREATED TIME */

        comment.setCreatedAt(
                LocalDateTime.now()
        );

        /* UPDATE COMMENT COUNT */

        post.setComments(

                post.getComments() + 1

        );

        postRepository.save(post);

        /* SAVE COMMENT */

        return commentRepository.save(
                comment
        );

    }

    /* =========================================
       GET COMMENTS BY POST
    ========================================= */

    @Override
    public List<Comment>
    getCommentsByPost(
            Long postId
    ) {

        /* VERIFY POST EXISTS */

        postRepository
                .findById(postId)

                .orElseThrow(() ->

                        new RuntimeException(
                                "Post Not Found"
                        )

                );

        /* RETURN COMMENTS */

        return commentRepository
                .findByPostIdOrderByIdDesc(
                        postId
                );

    }

}