import api from "./api";

/* =========================================
   GET ALL POSTS
========================================= */

export const getPosts = async () => {

  try {

    const response =
      await api.get(
        "/api/posts"
      );

    /* SAFE ARRAY */

    const posts =

      Array.isArray(response.data)

        ? response.data

        : [];

    /* FORMAT POSTS */

    const formattedPosts =

      posts.map((post) => ({

        ...post,

        /* SAFE COMMUNITY */

        communityName:

          post.community?.name ||

          "General",

        communityId:

          post.community?.id ||

          null,

        /* SAFE AUTHOR */

        author:

          post.author ||

          "Anonymous",

        /* SAFE VALUES */

        votes:

          post.votes || 0,

        comments:

          post.comments || 0,

        imageUrl:

          post.imageUrl || ""

      }));

    return formattedPosts;

  } catch (error) {

    console.log(
      "GET POSTS ERROR :",
      error.response?.data || error.message
    );

    return [];

  }

};

/* =========================================
   GET SINGLE POST
========================================= */

export const getPostById = async (id) => {

  try {

    const response =
      await api.get(
        `/api/posts/${id}`
      );

    return response.data;

  } catch (error) {

    console.log(
      "GET POST ERROR :",
      error.response?.data || error.message
    );

    return null;

  }

};

/* =========================================
   CREATE POST
========================================= */

export const createPost =
  async (data) => {

    try {

      /* SAFE PAYLOAD */

      const payload = {

        title:
          data.title?.trim(),

        content:
          data.content?.trim(),

        imageUrl:
          data.imageUrl || "",

        author:
          data.author || "Anonymous",

        communityId:
          Number(data.communityId)

      };

      console.log(
        "CREATE POST PAYLOAD =>",
        payload
      );

      const response =
        await api.post(

          "/api/posts",

          payload

        );

      return response.data;

    } catch (error) {

      console.log(
        "CREATE POST ERROR :",
        error.response?.data || error.message
      );

      throw error;

    }

  };

/* =========================================
   UPDATE POST
========================================= */

export const updatePost =
  async (id, data) => {

    try {

      const response =
        await api.put(

          `/api/posts/${id}`,

          data

        );

      return response.data;

    } catch (error) {

      console.log(
        "UPDATE POST ERROR :",
        error.response?.data || error.message
      );

      throw error;

    }

  };

/* =========================================
   DELETE POST
========================================= */

export const deletePost =
  async (id) => {

    try {

      const response =
        await api.delete(
          `/api/posts/${id}`
        );

      return response.data;

    } catch (error) {

      console.log(
        "DELETE POST ERROR :",
        error.response?.data || error.message
      );

      throw error;

    }

  };

/* =========================================
   UPVOTE POST
========================================= */

export const upvotePost =
  async (id) => {

    try {

      const response =
        await api.put(
          `/api/posts/${id}/upvote`
        );

      return response.data;

    } catch (error) {

      console.log(
        "UPVOTE ERROR :",
        error.response?.data || error.message
      );

      throw error;

    }

  };

/* =========================================
   DOWNVOTE POST
========================================= */

export const downvotePost =
  async (id) => {

    try {

      const response =
        await api.put(
          `/api/posts/${id}/downvote`
        );

      return response.data;

    } catch (error) {

      console.log(
        "DOWNVOTE ERROR :",
        error.response?.data || error.message
      );

      throw error;

    }

  };