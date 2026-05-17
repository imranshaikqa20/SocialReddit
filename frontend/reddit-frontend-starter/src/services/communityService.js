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

      console.log(
        "COMMUNITIES API =>",
        response.data
      );

      return Array.isArray(
        response.data
      )

        ? response.data

        : [];

    } catch (error) {

      console.log(
        "GET COMMUNITIES ERROR :",
        error.response?.data || error
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
        error.response?.data || error
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

      const response =
        await api.post(

          "/api/communities",

          {

            name:
              communityData.name,

            description:
              communityData.description

          }

        );

      return response.data;

    } catch (error) {

      console.log(
        "CREATE COMMUNITY ERROR :",
        error.response?.data || error
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

      return Array.isArray(
        response.data
      )

        ? response.data

        : [];

    } catch (error) {

      console.log(
        "GET POSTS ERROR :",
        error.response?.data || error
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
        error.response?.data || error
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
        error.response?.data || error
      );

      throw error;

    }

  };

/* =========================================
   MEMBER COUNT
========================================= */

export const getMemberCount =
  async (communityId) => {

    try {

      const response =
        await api.get(

          `/api/communities/${communityId}/members`

        );

      return (
        response.data.members || 0
      );

    } catch (error) {

      console.log(
        "MEMBER COUNT ERROR :",
        error.response?.data || error
      );

      return 0;

    }

  };

/* =========================================
   JOINED STATUS
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
        response.data.joined || false
      );

    } catch (error) {

      console.log(
        "JOINED STATUS ERROR :",
        error.response?.data || error
      );

      return false;

    }

  };