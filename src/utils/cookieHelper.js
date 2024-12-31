import { toast } from "react-hot-toast";

export const setToken = (token) => {
  localStorage.setItem("token", token);

  const date = new Date();
  date.setFullYear(date.getFullYear() + 1);
  document.cookie = `token=${token}; path=/; expires=${date.toUTCString()}; secure; SameSite=Strict`;
};

export const getTokenFromCookie = () => {
  const name = "token=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");
  for (let cookie of cookieArray) {
    cookie = cookie.trim();
    if (cookie.startsWith(name)) {
      return cookie.substring(name.length);
    }
  }
  return null;
};

export const setUserInfo = (userInfo) => {
  localStorage.setItem("userInfo", JSON.stringify(userInfo));

  const date = new Date();
  // Set the expiration to a far distant future (e.g., 1 years from now)
  date.setFullYear(date.getFullYear() + 1);
  document.cookie = `userInfo=${encodeURIComponent(
    JSON.stringify(userInfo)
  )}; path=/; expires=${date.toUTCString()}; secure; SameSite=Strict`;
};

export const getUserInfo = () => {
  const name = "userInfo=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  for (let cookie of cookieArray) {
    cookie = cookie.trim();
    if (cookie.startsWith(name)) {
      const cookieValue = cookie.substring(name.length);
      try {
        return JSON.parse(cookieValue);
      } catch (error) {
        console.error("Error parsing userInfo cookie:", error);
        return null;
      }
    }
  }

  return null;
};

export const saveTwoFactorData = (status) => {
  if (status === 1 || status === 0) {
    document.cookie = `two_factor=${status}; path=/; secure; HttpOnly`;
  } else {
    console.error("Invalid status. Use 1 or 0 for two-factor status.");
  }
};


export const getTwoFactorData = () => {
  const cookieArray = document.cookie.split("; ");
  const twoFactorCookie = cookieArray.find(cookie => cookie.startsWith("two_factor="));

  if (twoFactorCookie) {
    const twoFactorValue = twoFactorCookie.split("=")[1];
    return parseInt(twoFactorValue, 10);
  }

  return null;
};


export const clearToken = () => {
  document.cookie =
    "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; SameSite=Strict";
  localStorage.clear();
  sessionStorage.clear();
  toast.success("Logged out Successfully!");
  window.location.href = "/login";
};
