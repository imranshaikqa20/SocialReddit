import api from "./api";

/* =========================================
   UPVOTE POST
========================================= */

export const upvotePost =
  async (postId) => {

    try {

      const response =
        await api.put(
          `/api/posts/${postId}/upvote`
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
  async (postId) => {

    try {

      const response =
        await api.put(
          `/api/posts/${postId}/downvote`
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