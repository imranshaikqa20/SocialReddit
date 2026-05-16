import axios from "axios";

/* Create Axios Instance */

const api = axios.create({

  baseURL: "https://socialreddit-backend.onrender.com/api",

  headers: {
    "Content-Type": "application/json"
  },

  withCredentials: true

});

/* Request Interceptor */

api.interceptors.request.use(

  (config) => {

    const token = localStorage.getItem("token");

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

/* Response Interceptor */

api.interceptors.response.use(

  (response) => {

    return response;

  },

  (error) => {

    /* Unauthorized */

    if (error.response?.status === 401) {

      localStorage.removeItem("token");

      alert("Session Expired. Please Login Again.");

    }

    /* Backend Server Error */

    if (error.response?.status === 500) {

      alert("Server Error ❌");

    }

    /* Network Error */

    if (error.code === "ERR_NETWORK") {

      alert("Backend Connection Failed ❌");

    }

    return Promise.reject(error);

  }

);

export default api;