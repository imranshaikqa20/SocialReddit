package com.socialmedia.backend.repository;

import com.socialmedia.backend.entity.Community;

import com.socialmedia.backend.entity.CommunityMember;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.util.List;

import java.util.Optional;

@Repository

public interface CommunityMemberRepository
        extends JpaRepository<CommunityMember, Long> {



    Optional<CommunityMember>
    findByUsernameAndCommunity(

            String username,

            Community community

    );



    long countByCommunity(

            Community community

    );



    List<CommunityMember>
    findByUsername(

            String username

    );

}