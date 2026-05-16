package com.socialmedia.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity

@Table(name = "posts")

@Getter
@Setter

@NoArgsConstructor
@AllArgsConstructor

public class Post {

    /* =========================================
       Primary Key
    ========================================= */

    @Id

    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )

    private Long id;

    /* =========================================
       Title
    ========================================= */

    @Column(nullable = false)

    private String title;

    /* =========================================
       Content
    ========================================= */

    @Column(
            nullable = false,
            columnDefinition = "TEXT"
    )

    private String content;

    /* =========================================
       Image URL
    ========================================= */

    @Column(
            columnDefinition = "TEXT"
    )

    private String imageUrl;

    /* =========================================
       Votes
    ========================================= */

    @Column(nullable = false)

    private Integer votes = 0;

    /* =========================================
       Comments Count
    ========================================= */

    @Column(nullable = false)

    private Integer comments = 0;

    /* =========================================
       Author
    ========================================= */

    @Column(nullable = false)

    private String author;

    /* =========================================
       Community
    ========================================= */

    @ManyToOne(
            fetch = FetchType.LAZY
    )

    @JoinColumn(
            name = "community_id"
    )

    @JsonIgnoreProperties({
            "hibernateLazyInitializer",
            "handler"
    })

    private Community community;

    /* =========================================
       Comments Relation
    ========================================= */

    @OneToMany(

            mappedBy = "post",

            cascade = CascadeType.ALL,

            orphanRemoval = true

    )

    @JsonManagedReference

    private List<Comment> commentsList;

    /* =========================================
       Created Time
    ========================================= */

    private LocalDateTime createdAt;

    /* =========================================
       Before Insert
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

        /* IMPORTANT AUTHOR FIX */

        if (

                author == null ||

                        author.trim().isEmpty()

        ) {

            author = "Anonymous";

        }

    }

}