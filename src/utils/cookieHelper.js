import Cookies from "js-cookie";
import { toast } from "react-toastify";

// Set tokens in localStorage, sessionStorage, and cookies
export const setTokens = (accessToken, refreshToken) => {
  // Set token in localStorage (persists across page reloads)
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);

  // Set token in sessionStorage (persists only for the current session)
  sessionStorage.setItem("accessToken", accessToken);
  sessionStorage.setItem("refreshToken", refreshToken);

  // Set token in cookies (with expiration times)
  const accessTokenExpiresIn = new Date(new Date().getTime() + 2 * 60 * 1000); // 2 minutes for access token
  const refreshTokenExpiresIn = new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000); // 1 day for refresh token

  Cookies.set("accessToken", accessToken, { expires: accessTokenExpiresIn, sameSite: "Lax" });
  Cookies.set("refreshToken", refreshToken, { expires: refreshTokenExpiresIn, sameSite: "Lax" });

  toast.success("Tokens set successfully!");
};

// Get access token from localStorage, sessionStorage, or cookies
export const getAccessToken = () => {
  return (
    localStorage.getItem("accessToken") ||
    sessionStorage.getItem("accessToken") ||
    Cookies.get("accessToken")
  );
};

// Get refresh token from localStorage, sessionStorage, or cookies
export const getRefreshToken = () => {
  return (
    localStorage.getItem("refreshToken") ||
    sessionStorage.getItem("refreshToken") ||
    Cookies.get("refreshToken")
  );
};

// Clear tokens from all storages
export const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("refreshToken");
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  toast.success("Logged out Successfully!");
  window.location.href = "/login";
};
