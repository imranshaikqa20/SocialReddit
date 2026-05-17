import axios from "axios";

/* =========================================
   Create Axios Instance
========================================= */

const api = axios.create({

  baseURL:
    "https://socialreddit-backend.onrender.com/api",

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

    const token =
      localStorage.getItem("token");

    /* Attach JWT Token */

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
      "API ERROR : ",
      error.response || error
    );

    /* Unauthorized */

    if (
      error.response?.status === 401
    ) {

      localStorage.removeItem("token");

      alert(
        "Session Expired. Please Login Again ❌"
      );

      window.location.href = "/login";

    }

    /* Bad Request */

    else if (
      error.response?.status === 400
    ) {

      alert(

        error.response?.data?.message ||

        error.response?.data?.error ||

        "Bad Request ❌"

      );

    }

    /* Internal Server Error */

    else if (
      error.response?.status === 500
    ) {

      alert(
        "Internal Server Error ❌"
      );

    }

    /* Backend Sleeping or Network Error */

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