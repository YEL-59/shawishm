import  { createContext, useContext, useEffect, useState } from "react"; 

import axiosInstance from "../utils/axiosInstance";
import { getAccessToken, setTokens, clearTokens } from "../utils/cookieHelper";


const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch user data from API using the access token
  const fetchUserData = async (token) => {
    try {
      const response = await axiosInstance.get("users/user/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 && response.data.success) {
        const { username } = response.data.data;
        setUser({ username });
      } else {
        clearTokens(); // Clear tokens if the API response is not valid
        setUser(null); // Set user state to null
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      clearTokens();
      setUser(null);
    }
  };

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        // Check if the token is still valid by calling the API
        fetchUserData(token);
      } catch (error) {
        console.error("Failed to decode token:", error);
        clearTokens();
      }
    } else {
      setUser(null); // If no token, set user to null
    }
    setLoading(false);
  }, []);

  const signIn = async (username, password) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('/users/signin/', { username, password });
      const { access, refresh } = response.data;

      setTokens(access, refresh); 

      // Fetch user data with the new access token
      fetchUserData(access);
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
