import api from "./api";

/* =========================================
   Login User
========================================= */

export const loginUser = async (data) => {

  try {

    const response = await api.post(

      "/api/auth/login",

      {
        email: data.email
          .trim()
          .toLowerCase(),

        password: data.password
      }

    );

    return response.data;

  } catch (error) {

    console.log(
      "LOGIN ERROR :",
      error.response?.data || error
    );

    throw error;

  }

};

/* =========================================
   Signup User
========================================= */

export const signupUser = async (data) => {

  try {

    const response = await api.post(

      "/api/auth/signup",

      {
        username: data.username.trim(),

        email: data.email
          .trim()
          .toLowerCase(),

        password: data.password
      }

    );

    return response.data;

  } catch (error) {

    console.log(
      "SIGNUP ERROR :",
      error.response?.data || error
    );

    throw error;

  }

};