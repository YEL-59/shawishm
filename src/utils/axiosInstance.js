import axios from "axios";
import { getAccessToken, clearTokens } from "./cookieHelper";

const axiosInstance = axios.create({
  baseURL: "https://shawishm-django.onrender.com/api/",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
   

    // If the access token is invalid or expired (401)
    if (error.response?.status === 401) {
      clearTokens();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
