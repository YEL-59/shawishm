

import axios from "axios";
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from "./cookieHelper";


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
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; 

      const refreshToken = getRefreshToken();
      if (refreshToken) {
        try {
          const { data } = await axios.post(
            "https://shawishm-django.onrender.com/api/token/refresh/",
            { refresh: refreshToken }
          );
        

        
          setTokens(data.access, refreshToken);
          originalRequest.headers["Authorization"] = `Bearer ${data.access}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
         
          clearTokens();
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      } else {
        clearTokens();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

