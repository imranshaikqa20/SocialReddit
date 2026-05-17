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
    "Content-Type": "application/json",
  },

  timeout: 30000,
});

/* =========================================
   REQUEST INTERCEPTOR
========================================= */

api.interceptors.request.use(
  (config) => {
    /* Get JWT Token */

    const token = localStorage.getItem("token");

    /* Attach Authorization Header */

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
      error.response?.data || error.message
    );

    /* =====================================
       Unauthorized
    ===================================== */

    if (error.response?.status === 401) {
      localStorage.removeItem("token");

      alert(
        "Session Expired. Please Login Again ❌"
      );

      window.location.href = "/login";
    }

    /* =====================================
       Forbidden
    ===================================== */

    else if (error.response?.status === 403) {
      alert(
        "Access Denied ❌"
      );
    }

    /* =====================================
       Bad Request
    ===================================== */

    else if (error.response?.status === 400) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.response?.data ||
        "Bad Request ❌";

      alert(errorMessage);
    }

    /* =====================================
       Not Found
    ===================================== */

    else if (error.response?.status === 404) {
      alert(
        "API Endpoint Not Found ❌"
      );
    }

    /* =====================================
       Internal Server Error
    ===================================== */

    else if (error.response?.status === 500) {
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

    /* =====================================
       Timeout Error
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