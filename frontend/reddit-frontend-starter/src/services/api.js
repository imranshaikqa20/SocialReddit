import axios from "axios";

/* =========================================
   API BASE URL
========================================= */

export const API_BASE_URL =
  "https://socialreddit-backend.onrender.com";

/* =========================================
   Create Axios Instance
========================================= */

const api = axios.create({

  baseURL: API_BASE_URL,

  headers: {
    "Content-Type": "application/json"
  },

  timeout: 30000

});

/* =========================================
   Request Interceptor
========================================= */

api.interceptors.request.use(

  (config) => {

    /* Get JWT Token */

    const token =
      localStorage.getItem("token");

    /* Attach Authorization Header */

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
   Response Interceptor
========================================= */

api.interceptors.response.use(

  (response) => {

    return response;

  },

  async (error) => {

    console.log(
      "API ERROR :",
      error.response || error
    );

    /* =====================================
       Unauthorized
    ===================================== */

    if (
      error.response?.status === 401
    ) {

      localStorage.removeItem("token");

      alert(
        "Session Expired. Please Login Again ❌"
      );

      window.location.href = "/login";

    }

    /* =====================================
       Bad Request
    ===================================== */

    else if (
      error.response?.status === 400
    ) {

      const errorMessage =

        error.response?.data?.message ||

        error.response?.data?.error ||

        "Bad Request ❌";

      alert(errorMessage);

    }

    /* =====================================
       Not Found
    ===================================== */

    else if (
      error.response?.status === 404
    ) {

      alert(
        "API Endpoint Not Found ❌"
      );

    }

    /* =====================================
       Internal Server Error
    ===================================== */

    else if (
      error.response?.status === 500
    ) {

      const errorMessage =

        error.response?.data?.message ||

        error.response?.data?.error ||

        "Internal Server Error ❌";

      alert(errorMessage);

    }

    /* =====================================
       Network Error / Backend Sleeping
    ===================================== */

    else if (

      error.code === "ERR_NETWORK" ||

      error.message === "Network Error"

    ) {

      alert(

        "Backend server is starting. Please wait 30 seconds and try again 🚀"

      );

    }

    return Promise.reject(error);

  }

);

export default api;