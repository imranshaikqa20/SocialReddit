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

@CrossOrigin(origins = "http://localhost:5173")

public class CommentController {

    @Autowired
    private CommentService commentService;

    /* Create Comment */

    @PostMapping
    public ResponseEntity<Comment> createComment(
            @RequestBody CreateCommentRequest request
    ) {

        Comment comment =
                commentService.createComment(request);

        return ResponseEntity.ok(comment);

    }

    /* Get Comments By Post */

    @GetMapping("/post/{postId}")
    public ResponseEntity<List<Comment>>
    getCommentsByPost(
            @PathVariable Long postId
    ) {

        List<Comment> comments =
                commentService.getCommentsByPost(postId);

        return ResponseEntity.ok(comments);

    }

}