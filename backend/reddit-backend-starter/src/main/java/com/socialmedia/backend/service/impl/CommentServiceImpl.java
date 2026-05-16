package com.socialmedia.backend.service.impl;

import com.socialmedia.backend.dto.request.CreateCommentRequest;

import com.socialmedia.backend.entity.Comment;

import com.socialmedia.backend.entity.Post;

import com.socialmedia.backend.repository.CommentRepository;

import com.socialmedia.backend.repository.PostRepository;

import com.socialmedia.backend.service.CommentService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImpl
        implements CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    /* Create Comment */

    @Override
    public Comment createComment(
            CreateCommentRequest request
    ) {

        Post post = postRepository
                .findById(request.getPostId())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Post Not Found"
                        )
                );

        Comment comment = new Comment();

        comment.setContent(
                request.getContent()
        );

        comment.setAuthor(
                request.getAuthor()
        );

        comment.setPost(post);

        /* Increase Comment Count */

        post.setComments(
                post.getComments() + 1
        );

        postRepository.save(post);

        return commentRepository.save(comment);

    }

    /* Get Comments By Post */

    @Override
    public List<Comment> getCommentsByPost(
            Long postId
    ) {

        Post post = postRepository
                .findById(postId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Post Not Found"
                        )
                );

        return commentRepository.findByPost(post);

    }

}