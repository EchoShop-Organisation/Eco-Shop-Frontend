import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Products from "./pages/Products";



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/products" element={<Products />} />

      </Routes>
    </Router>
  );
}

export default App;
