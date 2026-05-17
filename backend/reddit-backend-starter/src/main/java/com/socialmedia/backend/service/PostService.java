package com.socialmedia.backend.service;

import com.socialmedia.backend.dto.request.CreatePostRequest;
import com.socialmedia.backend.dto.response.PostResponse;

import java.util.List;

public interface PostService {

    /* =========================================
       Create New Post
    ========================================= */

    PostResponse createPost(
            CreatePostRequest request
    );

    /* =========================================
       Get All Posts
    ========================================= */

    List<PostResponse> getAllPosts();

    /* =========================================
       Search Posts
    ========================================= */

    List<PostResponse> searchPosts(
            String keyword
    );

    /* =========================================
       Get Post By Id
    ========================================= */

    PostResponse getPostById(
            Long id
    );

    /* =========================================
       Get Posts By Community
    ========================================= */

    List<PostResponse> getPostsByCommunity(
            Long communityId
    );

    /* =========================================
       Update Post
    ========================================= */

    PostResponse updatePost(
            Long id,
            CreatePostRequest request
    );

    /* =========================================
       Upvote Post
    ========================================= */

    PostResponse upvotePost(
            Long id
    );

    /* =========================================
       Downvote Post
    ========================================= */

    PostResponse downvotePost(
            Long id
    );

    /* =========================================
       Delete Post
    ========================================= */

    void deletePost(
            Long id
    );

}