package com.socialmedia.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "communities")

public class Community {

    /* =========================================
       PRIMARY KEY
    ========================================= */

    @Id

    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )

    private Long id;

    /* =========================================
       COMMUNITY NAME
    ========================================= */

    @Column(
            nullable = false,
            unique = true,
            length = 100
    )

    private String name;

    /* =========================================
       COMMUNITY DESCRIPTION
    ========================================= */

    @Column(length = 1000)

    private String description;

    /* =========================================
       COMMUNITY OWNER
    ========================================= */

    @ManyToOne(
            fetch = FetchType.EAGER
    )

    @JoinColumn(name = "user_id")

    @JsonIgnoreProperties({
            "posts",
            "communities",
            "password",
            "hibernateLazyInitializer",
            "handler"
    })

    private User user;

    /* =========================================
       COMMUNITY POSTS
    ========================================= */

    @OneToMany(

            mappedBy = "community",

            cascade = CascadeType.ALL,

            orphanRemoval = true,

            fetch = FetchType.LAZY

    )

    @JsonIgnore

    private List<Post> posts =
            new ArrayList<>();

    /* =========================================
       CREATED TIME
    ========================================= */

    private LocalDateTime createdAt;

    /* =========================================
       DEFAULT CONSTRUCTOR
    ========================================= */

    public Community() {

        this.createdAt =
                LocalDateTime.now();

    }

    /* =========================================
       BEFORE PERSIST
    ========================================= */

    @PrePersist

    public void prePersist() {

        if (createdAt == null) {

            createdAt =
                    LocalDateTime.now();

        }

    }

    /* =========================================
       GETTERS & SETTERS
    ========================================= */

    public Long getId() {

        return id;

    }

    public void setId(Long id) {

        this.id = id;

    }

    public String getName() {

        return name;

    }

    public void setName(String name) {

        this.name = name;

    }

    public String getDescription() {

        return description;

    }

    public void setDescription(
            String description
    ) {

        this.description =
                description;

    }

    public User getUser() {

        return user;

    }

    public void setUser(User user) {

        this.user = user;

    }

    public List<Post> getPosts() {

        return posts;

    }

    public void setPosts(
            List<Post> posts
    ) {

        this.posts = posts;

    }

    public LocalDateTime getCreatedAt() {

        return createdAt;

    }

    public void setCreatedAt(
            LocalDateTime createdAt
    ) {

        this.createdAt =
                createdAt;

    }

}