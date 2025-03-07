import React, { createContext, useState, useEffect } from "react";
import { loginUser } from "./api";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("accessToken"));

  // Load user from stored token on app start
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      try {
        const decodedUser = jwtDecode(storedToken);
        setUser(decodedUser);
        setToken(storedToken);
      } catch (error) {
        console.error("Invalid token", error);
        logout();
      }
    }
  }, []);

  const login = async (credentials) => {
    const response = await loginUser(credentials);
    localStorage.setItem("accessToken", response.data.access);
    setToken(response.data.access);
    setUser(jwtDecode(response.data.access));
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
