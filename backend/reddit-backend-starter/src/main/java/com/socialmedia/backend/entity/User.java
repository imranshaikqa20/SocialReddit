package com.socialmedia.backend.entity;

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

    /* User ID */

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    /* Username */

    @Column(nullable = false)

    private String username;

    /* Email */

    @Column(nullable = false, unique = true)

    private String email;

    /* Password */

    @Column(nullable = false)

    private String password;

}