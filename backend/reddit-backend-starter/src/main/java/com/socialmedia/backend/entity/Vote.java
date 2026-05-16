package com.socialmedia.backend.entity;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;

import lombok.Getter;

import lombok.NoArgsConstructor;

import lombok.Setter;

@Entity

@Table(

        name = "vote",

        uniqueConstraints = {

                @UniqueConstraint(

                        columnNames = {

                                "username",

                                "post_id"

                        }

                )

        }

)

@Getter
@Setter

@NoArgsConstructor
@AllArgsConstructor

public class Vote {

    /* Primary Key */

    @Id

    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )

    private Long id;

    /* Username */

    @Column(nullable = false)

    private String username;

    /* Vote Type */

    @Enumerated(EnumType.STRING)

    @Column(nullable = false)

    private VoteType type;

    /* Post Relation */

    @ManyToOne(
            fetch = FetchType.LAZY
    )

    @JoinColumn(
            name = "post_id",
            nullable = false
    )

    private Post post;

}