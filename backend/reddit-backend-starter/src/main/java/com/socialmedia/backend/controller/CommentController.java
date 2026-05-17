package com.socialmedia.backend.controller;

import com.socialmedia.backend.dto.request.CreateCommentRequest;

import com.socialmedia.backend.entity.Comment;

import com.socialmedia.backend.service.CommentService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/api/comments")

@CrossOrigin(origins = "*")

public class CommentController {

    @Autowired
    private CommentService commentService;

    /* =========================================
       CREATE COMMENT
    ========================================= */

    @PostMapping

    public ResponseEntity<Comment>
    createComment(

            @RequestBody
            CreateCommentRequest request

    ) {

        Comment comment =

                commentService
                        .createComment(request);

        return ResponseEntity.ok(
                comment
        );

    }

    /* =========================================
       GET COMMENTS BY POST
    ========================================= */

    @GetMapping("/post/{postId}")

    public ResponseEntity<List<Comment>>
    getCommentsByPost(

            @PathVariable Long postId

    ) {

        List<Comment> comments =

                commentService
                        .getCommentsByPost(postId);

        return ResponseEntity.ok(
                comments
        );

    }

}