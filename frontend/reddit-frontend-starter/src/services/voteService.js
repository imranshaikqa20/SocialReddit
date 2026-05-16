import api from "./api";

export const votePost = async (data) => {
  return await api.post("/votes", data);
};