package com.socialmedia.backend.entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")

@Getter
@Setter

@NoArgsConstructor
@AllArgsConstructor

public class User {

    /* =========================================
       USER ID
    ========================================= */

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    /* =========================================
       USERNAME
    ========================================= */

    @Column(nullable = false)

    private String username;

    /* =========================================
       EMAIL
    ========================================= */

    @Column(nullable = false, unique = true)

    private String email;

    /* =========================================
       PASSWORD
    ========================================= */

    @Column(nullable = false)

    private String password;

    /* =========================================
       USER POSTS
    ========================================= */

    @OneToMany(
            mappedBy = "user",
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY
    )

    @JsonIgnoreProperties("user")

    private List<Post> posts = new ArrayList<>();

}