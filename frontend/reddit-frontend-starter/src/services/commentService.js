import api from "./api";

/* =========================================
   ADD COMMENT
========================================= */

export const addComment =
  async (data) => {

    try {

      const response =
        await api.post(

          "/api/comments",

          {

            postId:
              data.postId,

            content:
              data.content,

            author:
              data.author

          }

        );

      return response.data;

    } catch (error) {

      console.log(

        "ADD COMMENT ERROR :",

        error.response?.data ||

        error

      );

      throw error;

    }

  };

/* =========================================
   GET COMMENTS BY POST
========================================= */

export const getCommentsByPost =
  async (postId) => {

    try {

      const response =
        await api.get(

          `/api/comments/post/${postId}`

        );

      return Array.isArray(
        response.data
      )

        ? response.data

        : [];

    } catch (error) {

      console.log(

        "GET COMMENTS ERROR :",

        error.response?.data ||

        error

      );

      return [];

    }

  };