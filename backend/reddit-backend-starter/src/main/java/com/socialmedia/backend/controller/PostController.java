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

@CrossOrigin(
        origins = "*",
        allowedHeaders = "*"
)

public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private FileUploadService fileUploadService;

    /* =========================================
       CREATE POST
    ========================================= */

    @PostMapping
    public ResponseEntity<?> createPost(

            @RequestBody
            CreatePostRequest request

    ) {

        try {

            /* VALIDATION */

            if (

                    request.getTitle() == null ||

                            request.getTitle().trim().isEmpty()

            ) {

                return ResponseEntity
                        .badRequest()
                        .body(
                                "Post title is required"
                        );

            }

            if (

                    request.getContent() == null ||

                            request.getContent().trim().isEmpty()

            ) {

                return ResponseEntity
                        .badRequest()
                        .body(
                                "Post content is required"
                        );

            }

            if (

                    request.getCommunityId() == null

            ) {

                return ResponseEntity
                        .badRequest()
                        .body(
                                "Community is required"
                        );

            }

            /* CREATE */

            PostResponse createdPost =

                    postService.createPost(request);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(createdPost);

        } catch (Exception e) {

            e.printStackTrace();

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
       IMAGE UPLOAD
    ========================================= */

    @PostMapping("/upload")
    public ResponseEntity<?> uploadImage(

            @RequestParam("file")
            MultipartFile file

    ) {

        try {

            /* EMPTY FILE */

            if (file.isEmpty()) {

                return ResponseEntity
                        .badRequest()
                        .body(
                                "Please select image"
                        );

            }

            /* UPLOAD */

            String imageUrl =

                    fileUploadService.uploadFile(file);

            /* RESPONSE */

            Map<String, String> response =
                    new HashMap<>();

            response.put(
                    "imageUrl",
                    imageUrl
            );

            return ResponseEntity.ok(response);

        } catch (Exception e) {

            e.printStackTrace();

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
       GET ALL POSTS
    ========================================= */

    @GetMapping
    public ResponseEntity<?> getAllPosts() {

        try {

            List<PostResponse> posts =

                    postService.getAllPosts();

            return ResponseEntity.ok(posts);

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(
                            HttpStatus.INTERNAL_SERVER_ERROR
                    )
                    .body(

                            "Failed to fetch posts : "
                                    + e.getMessage()

                    );

        }

    }

    /* =========================================
       GET POSTS BY COMMUNITY
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

            e.printStackTrace();

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
       SEARCH POSTS
    ========================================= */

    @GetMapping("/search")
    public ResponseEntity<?> searchPosts(

            @RequestParam
            String keyword

    ) {

        try {

            List<PostResponse> posts =

                    postService.searchPosts(keyword);

            return ResponseEntity.ok(posts);

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(
                            HttpStatus.INTERNAL_SERVER_ERROR
                    )
                    .body(

                            "Search failed : "
                                    + e.getMessage()

                    );

        }

    }

    /* =========================================
       GET SINGLE POST
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

            e.printStackTrace();

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
       UPDATE POST
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

            e.printStackTrace();

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
       UPVOTE POST
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

            e.printStackTrace();

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
       DOWNVOTE POST
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

            e.printStackTrace();

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
       DELETE POST
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

            e.printStackTrace();

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