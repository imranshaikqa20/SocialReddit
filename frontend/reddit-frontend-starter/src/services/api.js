import axios from "axios";

/* Create Axios Instance */

const api = axios.create({

  baseURL: "http://localhost:8080/api",

  headers: {
    "Content-Type": "application/json"
  }

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

    /* Token Expired or Unauthorized */

    if (error.response?.status === 401) {

      localStorage.removeItem("token");

      alert("Session Expired. Please Login Again.");

    }

    return Promise.reject(error);

  }

);

export default api;