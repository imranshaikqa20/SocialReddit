import api from "./api";

/* =========================================
   Get All Communities
========================================= */

export const getAllCommunities =
  async () => {

    try {

      const response =
        await api.get(
          "/communities"
        );

      return response.data;

    } catch (error) {

      console.log(
        "Get Communities Error :",
        error
      );

      throw error;

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

          `/communities/${communityId}`

        );

      return response.data;

    } catch (error) {

      console.log(
        "Get Community Error :",
        error
      );

      throw error;

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

          "/communities",

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
        error
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

          `/posts/community/${communityId}`

        );

      return response.data || [];

    } catch (error) {

      console.log(
        "Get Posts Error :",
        error
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

          `/communities/${communityId}/join`,

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
        error
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

          `/communities/${communityId}/leave`,

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
        error
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

          `/communities/${communityId}/members`

        );

      return (
        response.data.members || 0
      );

    } catch (error) {

      console.log(
        "Member Count Error :",
        error
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

          `/communities/${communityId}/joined`,

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
        error
      );

      return false;

    }

  };