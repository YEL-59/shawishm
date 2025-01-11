import axios from "axios";
import { getAccessToken } from "./cookieHelper";

export const validateToken = async () => {
  const token = getAccessToken();

  if (!token) {
    return { valid: false, message: "No token found" };
  }

  try {
    const response = await axios.get("https://shawishm-django.onrender.com/api/token/validate/", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status === 200) {
      return { valid: true, message: "Token is valid" };
    }
    return { valid: false, message: "Token is invalid" };
  } catch (error) {
    return { valid: false, message: "Error validating token" };
  }
};
