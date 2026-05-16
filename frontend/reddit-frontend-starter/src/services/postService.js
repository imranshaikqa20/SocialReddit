import api from "./api";

export const getPosts = async () => {

  return await api.get("/posts");

};

export const createPost = async (data) => {

  return await api.post("/posts", data);

};