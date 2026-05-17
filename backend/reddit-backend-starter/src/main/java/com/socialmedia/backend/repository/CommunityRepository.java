package com.socialmedia.backend.repository;

import com.socialmedia.backend.entity.Community;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CommunityRepository
        extends JpaRepository<Community, Long> {

    /* =========================================
       FIND BY NAME
    ========================================= */

    Optional<Community> findByName(
            String name
    );

    /* =========================================
       FIND BY NAME IGNORE CASE
    ========================================= */

    Optional<Community> findByNameIgnoreCase(
            String name
    );

}