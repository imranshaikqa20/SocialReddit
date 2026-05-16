package com.socialmedia.backend.dto.response;

public class PostResponse {

    /* =========================================
       Post ID
    ========================================= */

    private Long id;

    /* =========================================
       Post Title
    ========================================= */

    private String title;

    /* =========================================
       Post Content
    ========================================= */

    private String content;

    /* =========================================
       Author
    ========================================= */

    private String author;

    /* =========================================
       Comments Count
    ========================================= */

    private Integer comments;

    /* =========================================
       Votes Count
    ========================================= */

    private Integer votes;

    /* =========================================
       Image URL
    ========================================= */

    private String imageUrl;

    /* =========================================
       Community
    ========================================= */

    private Long communityId;

    private String communityName;

    /* =========================================
       Constructor
    ========================================= */

    public PostResponse() {
    }

    /* =========================================
       GET ID
    ========================================= */

    public Long getId() {

        return id;

    }

    /* =========================================
       SET ID
    ========================================= */

    public void setId(
            Long id
    ) {

        this.id = id;

    }

    /* =========================================
       GET TITLE
    ========================================= */

    public String getTitle() {

        return title;

    }

    /* =========================================
       SET TITLE
    ========================================= */

    public void setTitle(
            String title
    ) {

        this.title = title;

    }

    /* =========================================
       GET CONTENT
    ========================================= */

    public String getContent() {

        return content;

    }

    /* =========================================
       SET CONTENT
    ========================================= */

    public void setContent(
            String content
    ) {

        this.content = content;

    }

    /* =========================================
       GET AUTHOR
    ========================================= */

    public String getAuthor() {

        return author;

    }

    /* =========================================
       SET AUTHOR
    ========================================= */

    public void setAuthor(
            String author
    ) {

        this.author = author;

    }

    /* =========================================
       GET COMMENTS
    ========================================= */

    public Integer getComments() {

        return comments;

    }

    /* =========================================
       SET COMMENTS
    ========================================= */

    public void setComments(
            Integer comments
    ) {

        this.comments = comments;

    }

    /* =========================================
       GET VOTES
    ========================================= */

    public Integer getVotes() {

        return votes;

    }

    /* =========================================
       SET VOTES
    ========================================= */

    public void setVotes(
            Integer votes
    ) {

        this.votes = votes;

    }

    /* =========================================
       GET IMAGE URL
    ========================================= */

    public String getImageUrl() {

        return imageUrl;

    }

    /* =========================================
       SET IMAGE URL
    ========================================= */

    public void setImageUrl(
            String imageUrl
    ) {

        this.imageUrl = imageUrl;

    }

    /* =========================================
       GET COMMUNITY ID
    ========================================= */

    public Long getCommunityId() {

        return communityId;

    }

    /* =========================================
       SET COMMUNITY ID
    ========================================= */

    public void setCommunityId(
            Long communityId
    ) {

        this.communityId = communityId;

    }

    /* =========================================
       GET COMMUNITY NAME
    ========================================= */

    public String getCommunityName() {

        return communityName;

    }

    /* =========================================
       SET COMMUNITY NAME
    ========================================= */

    public void setCommunityName(
            String communityName
    ) {

        this.communityName = communityName;

    }

}