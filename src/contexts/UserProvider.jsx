import React, { createContext, useContext, useEffect, useState } from "react"; // Import createContext
import { getAccessToken, setTokens, clearTokens } from "../utils/cookieHelper";
import axiosInstance from "../utils/axiosInstance";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        setUser({ id: decodedToken.user_id, name: decodedToken.username });
      } catch (error) {
        console.error("Failed to decode token:", error);
        clearTokens();
      }
    }
    setLoading(false);
  }, []);

  const signIn = async (username, password) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('/users/signin/', { username, password });
      const { access, refresh } = response.data;

      setTokens(access, refresh);

      const decodedToken = JSON.parse(atob(access.split('.')[1]));
      setUser({ id: decodedToken.user_id, name: username });
    } catch (error) {
      console.error("Sign-in failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    clearTokens();
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
