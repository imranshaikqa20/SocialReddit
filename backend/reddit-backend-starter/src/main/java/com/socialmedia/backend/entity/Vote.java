package com.socialmedia.backend.entity;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity

@Table(

        name = "votes",

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

    /* =========================================
       PRIMARY KEY
    ========================================= */

    @Id

    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )

    private Long id;

    /* =========================================
       USERNAME
    ========================================= */

    @Column(nullable = false)

    private String username;

    /* =========================================
       VOTE TYPE
    ========================================= */

    @Enumerated(EnumType.STRING)

    @Column(nullable = false)

    private VoteType type;

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

    private Post post;

}