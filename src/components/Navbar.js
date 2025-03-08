import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold hover:text-gray-200 transition duration-300">EcoShop</Link>
        <div className="space-x-4">
          {user ? (
            <>
              <span className="text-white hidden md:inline-block">Welcome, {user.username}!</span>
              <Link to="/profile" className="text-white hover:text-gray-200 transition duration-300">Profile</Link>
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded transition duration-300">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-gray-200 transition duration-300">Login</Link>
              <Link to="/register" className="text-white hover:text-gray-200 transition duration-300">Register</Link>
              <Link to="/products" className="text-white hover:text-gray-200 transition duration-300">Products</Link>
              <Link to="/cart" className="text-white hover:text-gray-200 transition duration-300">Cart</Link>
            </>
            
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
