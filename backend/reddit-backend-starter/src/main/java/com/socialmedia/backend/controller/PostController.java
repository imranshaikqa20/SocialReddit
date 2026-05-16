package com.socialmedia.backend.controller;

import com.socialmedia.backend.dto.request.CreatePostRequest;
import com.socialmedia.backend.dto.response.PostResponse;
import com.socialmedia.backend.service.FileUploadService;
import com.socialmedia.backend.service.PostService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "http://localhost:5173")

public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private FileUploadService fileUploadService;

    /* =========================================
       Create New Post
    ========================================= */

    @PostMapping
    public ResponseEntity<PostResponse> createPost(

            @RequestBody
            CreatePostRequest request

    ) {

        PostResponse createdPost =

                postService.createPost(request);

        return ResponseEntity.ok(createdPost);

    }

    /* =========================================
       Upload Image
    ========================================= */

    @PostMapping("/upload")
    public ResponseEntity<?> uploadImage(

            @RequestParam("file")
            MultipartFile file

    ) {

        try {

            /* Upload */

            String imageUrl =

                    fileUploadService.uploadFile(file);

            /* Response */

            Map<String, String> response =
                    new HashMap<>();

            response.put(
                    "imageUrl",
                    imageUrl
            );

            return ResponseEntity.ok(response);

        } catch (Exception e) {

            return ResponseEntity
                    .internalServerError()
                    .body(

                            "Image upload failed "

                    );

        }

    }

    /* =========================================
       Get All Posts
    ========================================= */

    @GetMapping
    public ResponseEntity<List<PostResponse>>
    getAllPosts() {

        List<PostResponse> posts =

                postService.getAllPosts();

        return ResponseEntity.ok(posts);

    }

    /* =========================================
       Get Posts By Community
    ========================================= */

    @GetMapping("/community/{communityId}")
    public ResponseEntity<List<PostResponse>>
    getPostsByCommunity(

            @PathVariable
            Long communityId

    ) {

        List<PostResponse> posts =

                postService.getPostsByCommunity(
                        communityId
                );

        return ResponseEntity.ok(posts);

    }

    /* =========================================
       Search Posts
    ========================================= */

    @GetMapping("/search")
    public ResponseEntity<List<PostResponse>>
    searchPosts(

            @RequestParam
            String keyword

    ) {

        List<PostResponse> posts =

                postService.searchPosts(keyword);

        return ResponseEntity.ok(posts);

    }

    /* =========================================
       Get Single Post
    ========================================= */

    @GetMapping("/{id}")
    public ResponseEntity<PostResponse>
    getPostById(

            @PathVariable
            Long id

    ) {

        PostResponse post =

                postService.getPostById(id);

        return ResponseEntity.ok(post);

    }

    /* =========================================
       Edit Post
    ========================================= */

    @PutMapping("/{id}")
    public ResponseEntity<PostResponse>
    updatePost(

            @PathVariable
            Long id,

            @RequestBody
            CreatePostRequest request

    ) {

        PostResponse updatedPost =

                postService.updatePost(
                        id,
                        request
                );

        return ResponseEntity.ok(updatedPost);

    }

    /* =========================================
       Upvote Post
    ========================================= */

    @PutMapping("/{id}/upvote")
    public ResponseEntity<PostResponse>
    upvotePost(

            @PathVariable
            Long id

    ) {

        PostResponse updatedPost =

                postService.upvotePost(id);

        return ResponseEntity.ok(updatedPost);

    }

    /* =========================================
       Downvote Post
    ========================================= */

    @PutMapping("/{id}/downvote")
    public ResponseEntity<PostResponse>
    downvotePost(

            @PathVariable
            Long id

    ) {

        PostResponse updatedPost =

                postService.downvotePost(id);

        return ResponseEntity.ok(updatedPost);

    }

    /* =========================================
       Delete Post
    ========================================= */

    @DeleteMapping("/{id}")
    public ResponseEntity<String>
    deletePost(

            @PathVariable
            Long id

    ) {

        postService.deletePost(id);

        return ResponseEntity.ok(

                "Post Deleted Successfully "

        );

    }

}