import Cookies from "js-cookie";
import { toast } from "react-toastify";

// Set tokens in cookies with 5-minute expiration
export const setTokens = (accessToken, refreshToken) => {
  const expiresIn = new Date(new Date().getTime() + 1 * 60 * 1000); 

  // Store tokens in cookies
  Cookies.set("accessToken", accessToken, { expires: expiresIn, secure: true, sameSite: "Strict" });
  Cookies.set("refreshToken", refreshToken, { expires: expiresIn, secure: true, sameSite: "Strict" });
};

// Get access token from cookies
export const getAccessToken = () => {
  return Cookies.get("accessToken");
};

// Get refresh token from cookies
export const getRefreshToken = () => {
  return Cookies.get("refreshToken");
};

// Clear tokens from cookies
export const clearTokens = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  toast.success("Logged out Successfully!");
  window.location.href = "/login";
};


