package com.socialmedia.backend.service;

import com.socialmedia.backend.entity.Community;
import com.socialmedia.backend.entity.CommunityMember;
import com.socialmedia.backend.repository.CommunityMemberRepository;
import com.socialmedia.backend.repository.CommunityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CommunityService {

    @Autowired
    private CommunityRepository
            communityRepository;

    @Autowired
    private CommunityMemberRepository
            communityMemberRepository;

    /* Create Community */

    public Community createCommunity(
            Community community
    ) {

        /* Null Validation */

        if (community == null) {

            throw new RuntimeException(
                    "Community data is missing"
            );

        }

        /* Name Validation */

        if (
                community.getName() == null ||
                        community.getName()
                                .trim()
                                .isEmpty()
        ) {

            throw new RuntimeException(
                    "Community name is required"
            );

        }

        /* Trim Name */

        community.setName(
                community.getName()
                        .trim()
        );

        /* Trim Description */

        if (
                community.getDescription() != null
        ) {

            community.setDescription(
                    community.getDescription()
                            .trim()
            );

        }

        /* Duplicate Check */

        boolean exists =
                communityRepository
                        .findByNameIgnoreCase(
                                community.getName()
                        )
                        .isPresent();

        if (exists) {

            throw new RuntimeException(
                    "Community already exists"
            );

        }

        /* Created Time */

        if (
                community.getCreatedAt() == null
        ) {

            community.setCreatedAt(
                    LocalDateTime.now()
            );

        }

        /* Save */

        return communityRepository
                .save(community);

    }

    /* Get All Communities */

    public List<Community>
    getAllCommunities() {

        return communityRepository
                .findAll();

    }

    /* Get Community By Id */

    public Community getCommunityById(
            Long id
    ) {

        return communityRepository
                .findById(id)

                .orElseThrow(

                        () -> new RuntimeException(
                                "Community Not Found"
                        )

                );

    }

    /* Join Community */

    public String joinCommunity(
            Long communityId,
            String username
    ) {

        Community community =
                getCommunityById(
                        communityId
                );

        boolean alreadyJoined =

                communityMemberRepository
                        .findByUsernameAndCommunity(
                                username,
                                community
                        )
                        .isPresent();

        if (alreadyJoined) {

            return "Already Joined";

        }

        CommunityMember member =
                new CommunityMember();

        member.setUsername(
                username
        );

        member.setCommunity(
                community
        );

        communityMemberRepository
                .save(member);

        return "Community Joined";

    }

    /* Leave Community */

    public String leaveCommunity(
            Long communityId,
            String username
    ) {

        Community community =
                getCommunityById(
                        communityId
                );

        CommunityMember member =

                communityMemberRepository
                        .findByUsernameAndCommunity(
                                username,
                                community
                        )

                        .orElseThrow(

                                () -> new RuntimeException(
                                        "You are not a member"
                                )

                        );

        communityMemberRepository
                .delete(member);

        return "Community Left";

    }

    /* Member Count */

    public long getMemberCount(
            Long communityId
    ) {

        Community community =
                getCommunityById(
                        communityId
                );

        return communityMemberRepository
                .countByCommunity(
                        community
                );

    }

    /* Joined Status */

    public boolean isJoined(
            Long communityId,
            String username
    ) {

        Community community =
                getCommunityById(
                        communityId
                );

        return communityMemberRepository
                .findByUsernameAndCommunity(
                        username,
                        community
                )
                .isPresent();

    }

}