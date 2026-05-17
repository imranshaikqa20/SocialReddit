package com.socialmedia.backend.controller;

import com.socialmedia.backend.dto.request.CreatePostRequest;
import com.socialmedia.backend.dto.response.PostResponse;
import com.socialmedia.backend.service.FileUploadService;
import com.socialmedia.backend.service.PostService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "*")
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private FileUploadService fileUploadService;

    /* =========================================
       Create New Post
    ========================================= */

    @PostMapping
    public ResponseEntity<?> createPost(

            @RequestBody
            CreatePostRequest request

    ) {

        try {

            PostResponse createdPost =

                    postService.createPost(request);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(createdPost);

        } catch (Exception e) {

            return ResponseEntity
                    .status(
                            HttpStatus.INTERNAL_SERVER_ERROR
                    )
                    .body(

                            "Failed to create post : "
                                    + e.getMessage()

                    );

        }

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

            /* Validation */

            if (file.isEmpty()) {

                return ResponseEntity
                        .badRequest()
                        .body(
                                "Please select image"
                        );

            }

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
                    .status(
                            HttpStatus.INTERNAL_SERVER_ERROR
                    )
                    .body(

                            "Image upload failed : "
                                    + e.getMessage()

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
    public ResponseEntity<?> getPostsByCommunity(

            @PathVariable
            Long communityId

    ) {

        try {

            List<PostResponse> posts =

                    postService.getPostsByCommunity(
                            communityId
                    );

            return ResponseEntity.ok(posts);

        } catch (Exception e) {

            return ResponseEntity
                    .status(
                            HttpStatus.INTERNAL_SERVER_ERROR
                    )
                    .body(

                            "Failed to fetch community posts : "
                                    + e.getMessage()

                    );

        }

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
    public ResponseEntity<?> getPostById(

            @PathVariable
            Long id

    ) {

        try {

            PostResponse post =

                    postService.getPostById(id);

            return ResponseEntity.ok(post);

        } catch (Exception e) {

            return ResponseEntity
                    .status(
                            HttpStatus.NOT_FOUND
                    )
                    .body(
                            "Post not found"
                    );

        }

    }

    /* =========================================
       Edit Post
    ========================================= */

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePost(

            @PathVariable
            Long id,

            @RequestBody
            CreatePostRequest request

    ) {

        try {

            PostResponse updatedPost =

                    postService.updatePost(
                            id,
                            request
                    );

            return ResponseEntity.ok(updatedPost);

        } catch (Exception e) {

            return ResponseEntity
                    .status(
                            HttpStatus.INTERNAL_SERVER_ERROR
                    )
                    .body(

                            "Failed to update post : "
                                    + e.getMessage()

                    );

        }

    }

    /* =========================================
       Upvote Post
    ========================================= */

    @PutMapping("/{id}/upvote")
    public ResponseEntity<?> upvotePost(

            @PathVariable
            Long id

    ) {

        try {

            PostResponse updatedPost =

                    postService.upvotePost(id);

            return ResponseEntity.ok(updatedPost);

        } catch (Exception e) {

            return ResponseEntity
                    .status(
                            HttpStatus.INTERNAL_SERVER_ERROR
                    )
                    .body(

                            "Failed to upvote post : "
                                    + e.getMessage()

                    );

        }

    }

    /* =========================================
       Downvote Post
    ========================================= */

    @PutMapping("/{id}/downvote")
    public ResponseEntity<?> downvotePost(

            @PathVariable
            Long id

    ) {

        try {

            PostResponse updatedPost =

                    postService.downvotePost(id);

            return ResponseEntity.ok(updatedPost);

        } catch (Exception e) {

            return ResponseEntity
                    .status(
                            HttpStatus.INTERNAL_SERVER_ERROR
                    )
                    .body(

                            "Failed to downvote post : "
                                    + e.getMessage()

                    );

        }

    }

    /* =========================================
       Delete Post
    ========================================= */

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePost(

            @PathVariable
            Long id

    ) {

        try {

            postService.deletePost(id);

            return ResponseEntity.ok(

                    "Post Deleted Successfully"

            );

        } catch (Exception e) {

            return ResponseEntity
                    .status(
                            HttpStatus.INTERNAL_SERVER_ERROR
                    )
                    .body(

                            "Failed to delete post : "
                                    + e.getMessage()

                    );

        }

    }

}