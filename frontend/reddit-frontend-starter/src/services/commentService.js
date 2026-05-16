import api from "./api";

export const addComment = async (data) => {
  return await api.post("/comments", data);
};