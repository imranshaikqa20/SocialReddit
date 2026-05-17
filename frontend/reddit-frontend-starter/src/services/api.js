import axios from "axios";

/* =========================================
   API BASE URL
========================================= */

export const API_BASE_URL =
  "https://socialreddit-backend.onrender.com";

/* =========================================
   AXIOS INSTANCE
========================================= */

const api = axios.create({

  baseURL: API_BASE_URL,

  headers: {
    "Content-Type": "application/json"
  },

  timeout: 30000

});

/* =========================================
   REQUEST INTERCEPTOR
========================================= */

api.interceptors.request.use(

  (config) => {

    /* GET TOKEN */

    const token =
      localStorage.getItem("token");

    /* ATTACH TOKEN */

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }

    return config;

  },

  (error) => {

    return Promise.reject(error);

  }

);

/* =========================================
   RESPONSE INTERCEPTOR
========================================= */

api.interceptors.response.use(

  (response) => {

    return response;

  },

  async (error) => {

    console.log(

      "API ERROR :",

      error.response?.data ||

      error.message ||

      error

    );

    /* =====================================
       UNAUTHORIZED
    ===================================== */

    if (

      error.response?.status === 401

    ) {

      localStorage.removeItem("token");

      localStorage.removeItem("username");

      alert(

        "Session Expired. Please Login Again ❌"

      );

      window.location.href =
        "/login";

    }

    /* =====================================
       FORBIDDEN
    ===================================== */

    else if (

      error.response?.status === 403

    ) {

      alert(
        "Access Denied ❌"
      );

    }

    /* =====================================
       BAD REQUEST
    ===================================== */

    else if (

      error.response?.status === 400

    ) {

      const errorMessage =

        error.response?.data?.message ||

        error.response?.data?.error ||

        error.response?.data ||

        "Bad Request ❌";

      alert(errorMessage);

    }

    /* =====================================
       NOT FOUND
    ===================================== */

    else if (

      error.response?.status === 404

    ) {

      console.log(
        "API Endpoint Not Found"
      );

    }

    /* =====================================
       INTERNAL SERVER ERROR
    ===================================== */

    else if (

      error.response?.status === 500

    ) {

      const errorMessage =

        error.response?.data?.message ||

        error.response?.data?.error ||

        error.response?.data ||

        "Internal Server Error ❌";

      console.error(

        "SERVER ERROR :",

        errorMessage

      );

      alert(errorMessage);

    }

    /* =====================================
       NETWORK ERROR
    ===================================== */

    else if (

      error.code === "ERR_NETWORK" ||

      error.message === "Network Error"

    ) {

      alert(

        "Backend server is starting. Please wait 30 seconds and try again 🚀"

      );

    }

    /* =====================================
       TIMEOUT ERROR
    ===================================== */

    else if (

      error.code === "ECONNABORTED"

    ) {

      alert(

        "Request Timeout ❌ Backend took too long to respond."

      );

    }

    return Promise.reject(error);

  }

);

export default api;