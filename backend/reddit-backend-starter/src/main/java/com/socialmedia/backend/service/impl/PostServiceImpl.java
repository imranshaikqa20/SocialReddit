package com.socialmedia.backend.service.impl;

import com.socialmedia.backend.dto.request.CreatePostRequest;
import com.socialmedia.backend.dto.response.PostResponse;
import com.socialmedia.backend.entity.Community;
import com.socialmedia.backend.entity.Post;
import com.socialmedia.backend.entity.Vote;
import com.socialmedia.backend.entity.VoteType;
import com.socialmedia.backend.repository.CommunityRepository;
import com.socialmedia.backend.repository.PostRepository;
import com.socialmedia.backend.repository.VoteRepository;
import com.socialmedia.backend.service.PostService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PostServiceImpl
        implements PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CommunityRepository communityRepository;

    @Autowired
    private VoteRepository voteRepository;

    /* =========================================
       CREATE POST
    ========================================= */

    @Override
    public PostResponse createPost(
            CreatePostRequest request
    ) {

        if (
                request.getTitle() == null ||
                        request.getTitle().trim().isEmpty()
        ) {

            throw new RuntimeException(
                    "Post title is required"
            );

        }

        if (
                request.getContent() == null ||
                        request.getContent().trim().isEmpty()
        ) {

            throw new RuntimeException(
                    "Post content is required"
            );

        }

        Post post = new Post();

        post.setTitle(
                request.getTitle().trim()
        );

        post.setContent(
                request.getContent().trim()
        );

        /* =========================================
           FIX IMAGE URL
        ========================================= */

        String imageUrl =
                request.getImageUrl();

        if (
                imageUrl != null &&
                        !imageUrl.trim().isEmpty()
        ) {

            /* REMOVE EXTRA SLASHES */

            imageUrl =
                    imageUrl.replace(
                            "\\",
                            "/"
                    );

            /* ADD /uploads/ */

            if (
                    !imageUrl.startsWith("/uploads/")
            ) {

                imageUrl =
                        "/uploads/" +

                                imageUrl.replace(
                                        "uploads/",
                                        ""
                                );

            }

            post.setImageUrl(imageUrl);

        }

        post.setAuthor(

                request.getAuthor() != null &&
                        !request.getAuthor().trim().isEmpty()

                        ? request.getAuthor()

                        : "Anonymous"

        );

        /* =========================================
           COMMUNITY
        ========================================= */

        if (
                request.getCommunityId() != null
        ) {

            Community community =

                    communityRepository
                            .findById(
                                    request.getCommunityId()
                            )

                            .orElseThrow(

                                    () -> new RuntimeException(
                                            "Community Not Found"
                                    )

                            );

            post.setCommunity(community);

        }

        post.setVotes(0);

        post.setComments(0);

        post.setCreatedAt(
                LocalDateTime.now()
        );

        Post savedPost =
                postRepository.save(post);

        return mapToResponse(savedPost);

    }

    /* =========================================
       GET ALL POSTS
    ========================================= */

    @Override
    public List<PostResponse> getAllPosts() {

        return postRepository
                .findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());

    }

    /* =========================================
       SEARCH POSTS
    ========================================= */

    @Override
    public List<PostResponse> searchPosts(
            String keyword
    ) {

        return postRepository
                .findAll()
                .stream()

                .filter(post ->

                        post.getTitle()
                                .toLowerCase()

                                .contains(
                                        keyword.toLowerCase()
                                )

                )

                .map(this::mapToResponse)

                .collect(Collectors.toList());

    }

    /* =========================================
       GET POST BY ID
    ========================================= */

    @Override
    public PostResponse getPostById(
            Long id
    ) {

        Post post =

                postRepository
                        .findById(id)

                        .orElseThrow(

                                () -> new RuntimeException(
                                        "Post Not Found"
                                )

                        );

        return mapToResponse(post);

    }

    /* =========================================
       GET POSTS BY COMMUNITY
    ========================================= */

    @Override
    public List<PostResponse> getPostsByCommunity(
            Long communityId
    ) {

        return postRepository

                .findByCommunityId(
                        communityId
                )

                .stream()

                .map(this::mapToResponse)

                .collect(Collectors.toList());

    }

    /* =========================================
       UPDATE POST
    ========================================= */

    @Override
    public PostResponse updatePost(

            Long id,

            CreatePostRequest request

    ) {

        Post post =

                postRepository
                        .findById(id)

                        .orElseThrow(

                                () -> new RuntimeException(
                                        "Post Not Found"
                                )

                        );

        if (
                request.getTitle() != null &&
                        !request.getTitle().trim().isEmpty()
        ) {

            post.setTitle(
                    request.getTitle().trim()
            );

        }

        if (
                request.getContent() != null &&
                        !request.getContent().trim().isEmpty()
        ) {

            post.setContent(
                    request.getContent().trim()
            );

        }

        /* =========================================
           FIX IMAGE URL
        ========================================= */

        String imageUrl =
                request.getImageUrl();

        if (
                imageUrl != null &&
                        !imageUrl.trim().isEmpty()
        ) {

            imageUrl =
                    imageUrl.replace(
                            "\\",
                            "/"
                    );

            if (
                    !imageUrl.startsWith("/uploads/")
            ) {

                imageUrl =
                        "/uploads/" +

                                imageUrl.replace(
                                        "uploads/",
                                        ""
                                );

            }

            post.setImageUrl(imageUrl);

        }

        Post updatedPost =
                postRepository.save(post);

        return mapToResponse(updatedPost);

    }

    /* =========================================
       UPVOTE
    ========================================= */

    @Override
    public PostResponse upvotePost(
            Long id
    ) {

        Post post =

                postRepository
                        .findById(id)

                        .orElseThrow(

                                () -> new RuntimeException(
                                        "Post Not Found"
                                )

                        );

        String username =
                "demoUser";

        Optional<Vote> existingVote =

                voteRepository
                        .findByUsernameAndPost(
                                username,
                                post
                        );

        if (
                existingVote.isPresent() &&
                        existingVote.get().getType()
                                == VoteType.UPVOTE
        ) {

            voteRepository.delete(
                    existingVote.get()
            );

            post.setVotes(
                    post.getVotes() - 1
            );

        }

        else if (
                existingVote.isPresent() &&
                        existingVote.get().getType()
                                == VoteType.DOWNVOTE
        ) {

            Vote vote =
                    existingVote.get();

            vote.setType(
                    VoteType.UPVOTE
            );

            voteRepository.save(vote);

            post.setVotes(
                    post.getVotes() + 2
            );

        }

        else {

            Vote vote = new Vote();

            vote.setUsername(username);

            vote.setType(
                    VoteType.UPVOTE
            );

            vote.setPost(post);

            voteRepository.save(vote);

            post.setVotes(
                    post.getVotes() + 1
            );

        }

        Post updatedPost =
                postRepository.save(post);

        return mapToResponse(updatedPost);

    }

    /* =========================================
       DOWNVOTE
    ========================================= */

    @Override
    public PostResponse downvotePost(
            Long id
    ) {

        Post post =

                postRepository
                        .findById(id)

                        .orElseThrow(

                                () -> new RuntimeException(
                                        "Post Not Found"
                                )

                        );

        String username =
                "demoUser";

        Optional<Vote> existingVote =

                voteRepository
                        .findByUsernameAndPost(
                                username,
                                post
                        );

        if (
                existingVote.isPresent() &&
                        existingVote.get().getType()
                                == VoteType.DOWNVOTE
        ) {

            voteRepository.delete(
                    existingVote.get()
            );

            post.setVotes(
                    post.getVotes() + 1
            );

        }

        else if (
                existingVote.isPresent() &&
                        existingVote.get().getType()
                                == VoteType.UPVOTE
        ) {

            Vote vote =
                    existingVote.get();

            vote.setType(
                    VoteType.DOWNVOTE
            );

            voteRepository.save(vote);

            post.setVotes(
                    post.getVotes() - 2
            );

        }

        else {

            Vote vote = new Vote();

            vote.setUsername(username);

            vote.setType(
                    VoteType.DOWNVOTE
            );

            vote.setPost(post);

            voteRepository.save(vote);

            post.setVotes(
                    post.getVotes() - 1
            );

        }

        Post updatedPost =
                postRepository.save(post);

        return mapToResponse(updatedPost);

    }

    /* =========================================
       DELETE POST
    ========================================= */

    @Override
    public void deletePost(
            Long id
    ) {

        Post post =

                postRepository
                        .findById(id)

                        .orElseThrow(

                                () -> new RuntimeException(
                                        "Post Not Found"
                                )

                        );

        postRepository.delete(post);

    }

    /* =========================================
       ENTITY -> DTO
    ========================================= */

    private PostResponse mapToResponse(
            Post post
    ) {

        PostResponse response =
                new PostResponse();

        response.setId(
                post.getId()
        );

        response.setTitle(
                post.getTitle()
        );

        response.setContent(
                post.getContent()
        );

        response.setImageUrl(
                post.getImageUrl()
        );

        response.setAuthor(
                post.getAuthor()
        );

        response.setVotes(
                post.getVotes()
        );

        response.setComments(
                post.getComments()
        );

        if (
                post.getCommunity() != null
        ) {

            response.setCommunityId(
                    post.getCommunity().getId()
            );

            response.setCommunityName(
                    post.getCommunity().getName()
            );

        }

        return response;

    }

}