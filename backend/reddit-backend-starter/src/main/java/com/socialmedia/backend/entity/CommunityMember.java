package com.socialmedia.backend.entity;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;

import lombok.Getter;

import lombok.NoArgsConstructor;

import lombok.Setter;

import java.time.LocalDateTime;

@Entity

@Table(

        name = "community_members",

        uniqueConstraints = {

                @UniqueConstraint(

                        columnNames = {

                                "username",

                                "community_id"

                        }

                )

        }

)

@Getter
@Setter

@NoArgsConstructor
@AllArgsConstructor

public class CommunityMember {

    /* Primary Key */

    @Id

    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )

    private Long id;

    /* Username */

    @Column(nullable = false)

    private String username;

    /* Community */

    @ManyToOne(
            fetch = FetchType.LAZY
    )

    @JoinColumn(
            name = "community_id",
            nullable = false
    )

    private Community community;

    /* Joined Time */

    private LocalDateTime joinedAt;

    /* Before Insert */

    @PrePersist

    public void prePersist() {

        if (joinedAt == null) {

            joinedAt =
                    LocalDateTime.now();

        }

    }

}