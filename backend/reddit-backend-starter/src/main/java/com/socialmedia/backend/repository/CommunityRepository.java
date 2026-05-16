package com.socialmedia.backend.repository;

import com.socialmedia.backend.entity.Community;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository

public interface CommunityRepository
        extends JpaRepository<Community, Long> {



    Optional<Community> findByName(

            String name

    );



    Optional<Community>
    findByNameIgnoreCase(

            String name

    );

}