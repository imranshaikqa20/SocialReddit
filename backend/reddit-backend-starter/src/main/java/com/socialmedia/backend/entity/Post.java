package com.socialmedia.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "posts")

@Getter
@Setter

@NoArgsConstructor
@AllArgsConstructor

public class Post {

    /* =========================================
       PRIMARY KEY
    ========================================= */

    @Id

    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )

    private Long id;

    /* =========================================
       TITLE
    ========================================= */

    @Column(nullable = false)

    private String title;

    /* =========================================
       CONTENT
    ========================================= */

    @Column(
            nullable = false,
            columnDefinition = "TEXT"
    )

    private String content;

    /* =========================================
       IMAGE URL
    ========================================= */

    @Column(
            columnDefinition = "TEXT"
    )

    private String imageUrl;

    /* =========================================
       VOTES
    ========================================= */

    @Column(nullable = false)

    private Integer votes = 0;

    /* =========================================
       COMMENTS COUNT
    ========================================= */

    @Column(nullable = false)

    private Integer comments = 0;

    /* =========================================
       AUTHOR
    ========================================= */

    @Column(nullable = false)

    private String author;

    /* =========================================
       USER RELATION
    ========================================= */

    @ManyToOne(
            fetch = FetchType.EAGER
    )

    @JoinColumn(
            name = "user_id"
    )

    @JsonIgnoreProperties({
            "posts",
            "password",
            "hibernateLazyInitializer",
            "handler"
    })

    private User user;

    /* =========================================
       COMMUNITY RELATION
    ========================================= */

    @ManyToOne(
            fetch = FetchType.EAGER
    )

    @JoinColumn(
            name = "community_id"
    )

    @JsonIgnoreProperties({
            "posts",
            "user",
            "hibernateLazyInitializer",
            "handler"
    })

    private Community community;

    /* =========================================
       COMMENTS RELATION
    ========================================= */

    @OneToMany(

            mappedBy = "post",

            cascade = CascadeType.ALL,

            orphanRemoval = true,

            fetch = FetchType.LAZY

    )

    @JsonManagedReference

    private List<Comment> commentsList =
            new ArrayList<>();

    /* =========================================
       CREATED TIME
    ========================================= */

    @Column(nullable = false)

    private LocalDateTime createdAt;

    /* =========================================
       BEFORE INSERT
    ========================================= */

    @PrePersist

    public void prePersist() {

        /* Created Time */

        if (createdAt == null) {

            createdAt =
                    LocalDateTime.now();

        }

        /* Votes */

        if (votes == null) {

            votes = 0;

        }

        /* Comments */

        if (comments == null) {

            comments = 0;

        }

        /* Default Author */

        if (

                author == null ||

                        author.trim().isEmpty()

        ) {

            author = "Anonymous";

        }

    }

    /* =========================================
       HELPER METHODS
    ========================================= */

    public void addComment(
            Comment comment
    ) {

        commentsList.add(comment);

        comment.setPost(this);

        comments = commentsList.size();

    }

    public void removeComment(
            Comment comment
    ) {

        commentsList.remove(comment);

        comment.setPost(null);

        comments = commentsList.size();

    }

}