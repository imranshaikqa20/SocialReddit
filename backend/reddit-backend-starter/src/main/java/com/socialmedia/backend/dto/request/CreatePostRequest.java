package com.socialmedia.backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter

@NoArgsConstructor
@AllArgsConstructor

public class CreatePostRequest {

    /* =========================================
       Post Title
    ========================================= */

    private String title;

    /* =========================================
       Post Content
    ========================================= */

    private String content;

    /* =========================================
       Image URL
    ========================================= */

    private String imageUrl;

    /* =========================================
       Post Author
    ========================================= */

    private String author;

    /* =========================================
       Community ID
    ========================================= */

    private Long communityId;

}