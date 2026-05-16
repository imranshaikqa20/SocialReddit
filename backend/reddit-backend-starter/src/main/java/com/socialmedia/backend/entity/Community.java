package com.socialmedia.backend.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity

@Table(name = "communities")

public class Community {

    /* Primary Key */

    @Id

    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )

    private Long id;

    /* Community Name */

    @Column(
            nullable = false,
            unique = true,
            length = 100
    )

    private String name;

    /* Community Description */

    @Column(
            length = 1000
    )

    private String description;

    /* Created Time */

    private LocalDateTime createdAt;

    /* Default Constructor */

    public Community() {

        this.createdAt =
                LocalDateTime.now();

    }

    /* Before Persist */

    @PrePersist

    public void prePersist() {

        if (createdAt == null) {

            createdAt =
                    LocalDateTime.now();

        }

    }

    /* Getters & Setters */

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