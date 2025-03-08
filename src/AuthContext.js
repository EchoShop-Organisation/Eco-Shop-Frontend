import React, { createContext, useState, useEffect } from "react";
import { loginUser } from "./api";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // User Authentication State
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("accessToken"));

  // Cart State (Load from localStorage)
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

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

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Login Function
  const login = async (credentials) => {
    const response = await loginUser(credentials);
    localStorage.setItem("accessToken", response.data.access);
    setToken(response.data.access);
    setUser(jwtDecode(response.data.access));
  };

  // Logout Function
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("cart"); // Clear saved cart
    setToken(null);
    setUser(null);
    setCart([]); // Clear cart on logout
  };

  // Add to Cart Function
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Remove from Cart Function
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== productId));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, token, cart, addToCart, removeFromCart }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
