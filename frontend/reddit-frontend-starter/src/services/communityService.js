import api from "./api";

/* =========================================
   GET ALL COMMUNITIES
========================================= */

export const getAllCommunities =
  async () => {

    try {

      const response =
        await api.get(
          "/api/communities"
        );

      /* SAFE ARRAY */

      const communities =

        Array.isArray(response.data)

          ? response.data

          : [];

      return communities.map(
        (community) => ({

          ...community,

          id:
            community.id || null,

          name:
            community.name ||
            "Unknown Community",

          description:
            community.description || "",

          posts:
            community.posts || []

        })
      );

    } catch (error) {

      console.log(
        "GET COMMUNITIES ERROR :",
        error.response?.data || error.message
      );

      return [];

    }

  };

/* =========================================
   GET COMMUNITY BY ID
========================================= */

export const getCommunityById =
  async (communityId) => {

    try {

      const response =
        await api.get(

          `/api/communities/${communityId}`

        );

      return response.data;

    } catch (error) {

      console.log(
        "GET COMMUNITY ERROR :",
        error.response?.data || error.message
      );

      return null;

    }

  };

/* =========================================
   CREATE COMMUNITY
========================================= */

export const createCommunity =
  async (communityData) => {

    try {

      /* SAFE PAYLOAD */

      const payload = {

        name:
          communityData.name?.trim(),

        description:
          communityData.description?.trim()

      };

      const response =
        await api.post(

          "/api/communities",

          payload

        );

      return response.data;

    } catch (error) {

      console.log(
        "CREATE COMMUNITY ERROR :",
        error.response?.data || error.message
      );

      throw error;

    }

  };

/* =========================================
   GET POSTS BY COMMUNITY
========================================= */

export const getPostsByCommunity =
  async (communityId) => {

    try {

      const response =
        await api.get(

          `/api/posts/community/${communityId}`

        );

      const posts =

        Array.isArray(response.data)

          ? response.data

          : [];

      /* SAFE FORMAT */

      return posts.map((post) => ({

        ...post,

        communityName:

          post.community?.name ||

          "General",

        communityId:

          post.community?.id ||

          null,

        author:

          post.author ||

          "Anonymous",

        votes:

          post.votes || 0,

        comments:

          post.comments || 0,

        imageUrl:

          post.imageUrl || ""

      }));

    } catch (error) {

      console.log(
        "GET POSTS ERROR :",
        error.response?.data || error.message
      );

      return [];

    }

  };

/* =========================================
   JOIN COMMUNITY
========================================= */

export const joinCommunity =
  async (

    communityId,

    username

  ) => {

    try {

      const response =
        await api.post(

          `/api/communities/${communityId}/join`,

          null,

          {

            params: {
              username
            }

          }

        );

      return response.data;

    } catch (error) {

      console.log(
        "JOIN COMMUNITY ERROR :",
        error.response?.data || error.message
      );

      throw error;

    }

  };

/* =========================================
   LEAVE COMMUNITY
========================================= */

export const leaveCommunity =
  async (

    communityId,

    username

  ) => {

    try {

      const response =
        await api.delete(

          `/api/communities/${communityId}/leave`,

          {

            params: {
              username
            }

          }

        );

      return response.data;

    } catch (error) {

      console.log(
        "LEAVE COMMUNITY ERROR :",
        error.response?.data || error.message
      );

      throw error;

    }

  };

/* =========================================
   GET MEMBER COUNT
========================================= */

export const getMemberCount =
  async (communityId) => {

    try {

      const response =
        await api.get(

          `/api/communities/${communityId}/members`

        );

      return (
        response.data?.members || 0
      );

    } catch (error) {

      console.log(
        "MEMBER COUNT ERROR :",
        error.response?.data || error.message
      );

      return 0;

    }

  };

/* =========================================
   CHECK JOINED STATUS
========================================= */

export const isJoined =
  async (

    communityId,

    username

  ) => {

    try {

      const response =
        await api.get(

          `/api/communities/${communityId}/joined`,

          {

            params: {
              username
            }

          }

        );

      return (
        response.data?.joined || false
      );

    } catch (error) {

      console.log(
        "JOINED STATUS ERROR :",
        error.response?.data || error.message
      );

      return false;

    }

  };