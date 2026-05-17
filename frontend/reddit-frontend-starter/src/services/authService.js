import api from "./api";

/* =========================================
   Login User
========================================= */

export const loginUser = async (data) => {

  try {

    const response = await api.post(

      "/api/auth/login",

      data

    );

    return response.data;

  } catch (error) {

    console.log(
      "Login Error :",
      error
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

      data

    );

    return response.data;

  } catch (error) {

    console.log(
      "Signup Error :",
      error
    );

    throw error;

  }

};