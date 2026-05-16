package com.socialmedia.backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

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
       Comment ID
    ========================================= */

    @Id

    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )

    private Long id;

    /* =========================================
       Comment Content
    ========================================= */

    @Column(
            nullable = false,
            columnDefinition = "TEXT"
    )

    private String content;

    /* =========================================
       Comment Author
    ========================================= */

    private String author;

    /* =========================================
       Created Time
    ========================================= */

    private LocalDateTime createdAt =
            LocalDateTime.now();

    /* =========================================
       Post Relation
    ========================================= */

    @ManyToOne(
            fetch = FetchType.LAZY
    )

    @JoinColumn(
            name = "post_id"
    )

    @JsonBackReference

    private Post post;

}