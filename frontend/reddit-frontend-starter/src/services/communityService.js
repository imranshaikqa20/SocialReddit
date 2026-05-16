import api from "./api";

/* Get All Communities */

export const getAllCommunities =
  async () => {

    try {

      const response =
        await api.get(
          "/communities"
        );

      return response.data;

    } catch (error) {

      console.log(error);

      throw error;

    }

  };

/* Get Community By Id */

export const getCommunityById =
  async (communityId) => {

    try {

      const response =
        await api.get(

          `/communities/${communityId}`

        );

      return response.data;

    } catch (error) {

      console.log(error);

      throw error;

    }

  };

/* Create Community */

export const createCommunity =
  async (communityData) => {

    try {

      const response =
        await api.post(

          "/communities",

          communityData

        );

      return response.data;

    } catch (error) {

      console.log(error);

      throw error;

    }

  };

/* Get Posts By Community */

export const getPostsByCommunity =
  async (communityId) => {

    try {

      const response =
        await api.get(

          `/posts/community/${communityId}`

        );

      return response.data;

    } catch (error) {

      console.log(error);

      throw error;

    }

  };

/* Join Community */

export const joinCommunity =
  async (

    communityId,

    username

  ) => {

    try {

      const response =
        await api.post(

          `/communities/${communityId}/join?username=${username}`

        );

      return response.data;

    } catch (error) {

      console.log(error);

      throw error;

    }

  };

/* Leave Community */

export const leaveCommunity =
  async (

    communityId,

    username

  ) => {

    try {

      const response =
        await api.delete(

          `/communities/${communityId}/leave?username=${username}`

        );

      return response.data;

    } catch (error) {

      console.log(error);

      throw error;

    }

  };

/* Get Member Count */

export const getMemberCount =
  async (communityId) => {

    try {

      const response =
        await api.get(

          `/communities/${communityId}/members`

        );

      return response.data.members;

    } catch (error) {

      console.log(error);

      throw error;

    }

  };

/* Check Joined Status */

export const isJoined =
  async (

    communityId,

    username

  ) => {

    try {

      const response =
        await api.get(

          `/communities/${communityId}/joined?username=${username}`

        );

      return response.data.joined;

    } catch (error) {

      console.log(error);

      throw error;

    }

  };