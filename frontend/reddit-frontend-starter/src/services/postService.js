import api from "./api";

/* =========================================
   Get All Posts
========================================= */

export const getPosts = async () => {

  try {

    const response =
      await api.get(
        "/api/posts"
      );

    return response.data;

  } catch (error) {

    console.log(
      "Get Posts Error :",
      error.response?.data || error
    );

    return [];

  }

};

/* =========================================
   Create Post
========================================= */

export const createPost =
  async (data) => {

    try {

      const response =
        await api.post(

          "/api/posts",

          data

        );

      return response.data;

    } catch (error) {

      console.log(
        "Create Post Error :",
        error.response?.data || error
      );

      throw error;

    }

  };