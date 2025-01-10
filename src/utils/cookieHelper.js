import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




export const setTokens = (accessToken, refreshToken) => {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 1);

  // Store tokens in cookies
  document.cookie = `accessToken=${accessToken}; path=/; expires=${date.toUTCString()}; secure; SameSite=Strict`;
  document.cookie = `refreshToken=${refreshToken}; path=/; expires=${date.toUTCString()}; secure; SameSite=Strict`;
};


export const getAccessToken = () => {
  const name = "accessToken=";
  const cookies = document.cookie.split(";");

  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(name)) {
      return cookie.substring(name.length);
    }
  }
  return null;
};

export const getRefreshToken = () => {
  const name = "refreshToken=";
  const cookies = document.cookie.split(";");

  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(name)) {
      return cookie.substring(name.length);
    }
  }
  return null;
};





export const clearTokens = () => {
  document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; SameSite=Strict";
  document.cookie = "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; SameSite=Strict";
  toast.success("Logged out Successfully!");
  window.location.href = "/login";
};

