package com.socialmedia.backend.controller;

import com.socialmedia.backend.entity.Community;
import com.socialmedia.backend.service.CommunityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/communities")
@CrossOrigin(origins = "*")
public class CommunityController {

    @Autowired
    private CommunityService
            communityService;

    /* Create Community */

    @PostMapping
    public ResponseEntity<?> createCommunity(
            @RequestBody Community community
    ) {

        try {

            /* Null Validation */

            if (community == null) {

                return ResponseEntity
                        .badRequest()
                        .body(
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

                return ResponseEntity
                        .badRequest()
                        .body(
                                "Community name is required"
                        );

            }

            /* Create */

            Community savedCommunity =

                    communityService
                            .createCommunity(
                                    community
                            );

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(savedCommunity);

        } catch (Exception e) {

            return ResponseEntity
                    .status(
                            HttpStatus.INTERNAL_SERVER_ERROR
                    )
                    .body(

                            "Failed to create community : "
                                    + e.getMessage()

                    );

        }

    }

    /* Get All Communities */

    @GetMapping
    public ResponseEntity<List<Community>>
    getAllCommunities() {

        List<Community> communities =

                communityService
                        .getAllCommunities();

        return ResponseEntity.ok(
                communities
        );

    }

    /* Get Community By Id */

    @GetMapping("/{id}")
    public ResponseEntity<?> getCommunityById(
            @PathVariable Long id
    ) {

        try {

            Community community =

                    communityService
                            .getCommunityById(id);

            return ResponseEntity.ok(
                    community
            );

        } catch (Exception e) {

            return ResponseEntity
                    .status(
                            HttpStatus.NOT_FOUND
                    )
                    .body(
                            "Community not found"
                    );

        }

    }

    /* Join Community */

    @PostMapping("/{id}/join")
    public ResponseEntity<?> joinCommunity(
            @PathVariable Long id,
            @RequestParam String username
    ) {

        try {

            String message =

                    communityService
                            .joinCommunity(
                                    id,
                                    username
                            );

            Map<String, Object> response =
                    new HashMap<>();

            response.put(
                    "message",
                    message
            );

            return ResponseEntity.ok(
                    response
            );

        } catch (Exception e) {

            return ResponseEntity
                    .status(
                            HttpStatus.INTERNAL_SERVER_ERROR
                    )
                    .body(
                            "Failed to join community : "
                                    + e.getMessage()
                    );

        }

    }

    /* Leave Community */

    @DeleteMapping("/{id}/leave")
    public ResponseEntity<?> leaveCommunity(
            @PathVariable Long id,
            @RequestParam String username
    ) {

        try {

            String message =

                    communityService
                            .leaveCommunity(
                                    id,
                                    username
                            );

            Map<String, Object> response =
                    new HashMap<>();

            response.put(
                    "message",
                    message
            );

            return ResponseEntity.ok(
                    response
            );

        } catch (Exception e) {

            return ResponseEntity
                    .status(
                            HttpStatus.INTERNAL_SERVER_ERROR
                    )
                    .body(
                            "Failed to leave community : "
                                    + e.getMessage()
                    );

        }

    }

    /* Member Count */

    @GetMapping("/{id}/members")
    public ResponseEntity<?> getMemberCount(
            @PathVariable Long id
    ) {

        try {

            long count =

                    communityService
                            .getMemberCount(id);

            Map<String, Object> response =
                    new HashMap<>();

            response.put(
                    "members",
                    count
            );

            return ResponseEntity.ok(
                    response
            );

        } catch (Exception e) {

            return ResponseEntity
                    .status(
                            HttpStatus.INTERNAL_SERVER_ERROR
                    )
                    .body(
                            "Failed to fetch members : "
                                    + e.getMessage()
                    );

        }

    }

    /* Joined Status */

    @GetMapping("/{id}/joined")
    public ResponseEntity<?> isJoined(
            @PathVariable Long id,
            @RequestParam String username
    ) {

        try {

            boolean joined =

                    communityService
                            .isJoined(
                                    id,
                                    username
                            );

            Map<String, Object> response =
                    new HashMap<>();

            response.put(
                    "joined",
                    joined
            );

            return ResponseEntity.ok(
                    response
            );

        } catch (Exception e) {

            return ResponseEntity
                    .status(
                            HttpStatus.INTERNAL_SERVER_ERROR
                    )
                    .body(
                            "Failed to check joined status : "
                                    + e.getMessage()
                    );

        }

    }

}