package com.socialmedia.backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "comments")

@Getter
@Setter

@NoArgsConstructor
@AllArgsConstructor

public class Comment {

    /* =========================================
       COMMENT ID
    ========================================= */

    @Id

    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )

    private Long id;

    /* =========================================
       COMMENT CONTENT
    ========================================= */

    @Column(
            nullable = false,
            columnDefinition = "TEXT"
    )

    private String content;

    /* =========================================
       COMMENT AUTHOR
    ========================================= */

    @Column(nullable = false)

    private String author;

    /* =========================================
       CREATED TIME
    ========================================= */

    @Column(nullable = false)

    private LocalDateTime createdAt;

    /* =========================================
       POST RELATION
    ========================================= */

    @ManyToOne(
            fetch = FetchType.LAZY,
            optional = false
    )

    @JoinColumn(
            name = "post_id",
            nullable = false
    )

    @JsonBackReference

    @JsonIgnoreProperties({
            "commentsList",
            "hibernateLazyInitializer",
            "handler"
    })

    private Post post;

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

        /* Default Author */

        if (

                author == null ||

                        author.trim().isEmpty()

        ) {

            author = "Anonymous";

        }

    }

}