import api from "./api";

/* =========================================
   Get All Communities
========================================= */

export const getAllCommunities =
  async () => {

    try {

      const response =
        await api.get(
          "/api/communities"
        );

      return response.data;

    } catch (error) {

      console.log(
        "Get Communities Error :",
        error.response?.data || error
      );

      return [];

    }

  };

/* =========================================
   Get Community By Id
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
        "Get Community Error :",
        error.response?.data || error
      );

      return null;

    }

  };

/* =========================================
   Create Community
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
        "Create Community Error :",
        error.response?.data || error
      );

      throw error;

    }

  };

/* =========================================
   Get Posts By Community
========================================= */

export const getPostsByCommunity =
  async (communityId) => {

    try {

      const response =
        await api.get(

          `/api/posts/community/${communityId}`

        );

      return Array.isArray(response.data)

        ? response.data

        : [];

    } catch (error) {

      console.log(
        "Get Posts Error :",
        error.response?.data || error
      );

      return [];

    }

  };

/* =========================================
   Join Community
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
        "Join Community Error :",
        error.response?.data || error
      );

      throw error;

    }

  };

/* =========================================
   Leave Community
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
        "Leave Community Error :",
        error.response?.data || error
      );

      throw error;

    }

  };

/* =========================================
   Get Member Count
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
        "Member Count Error :",
        error.response?.data || error
      );

      return 0;

    }

  };

/* =========================================
   Check Joined Status
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
        "Joined Status Error :",
        error.response?.data || error
      );

      return false;

    }

  };