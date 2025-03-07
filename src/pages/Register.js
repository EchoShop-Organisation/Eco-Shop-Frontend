import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api";

const Register = () => {
  const [userData, setUserData] = useState({ username: "", email: "", password: "", phone_number: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(userData);
      navigate("/login");
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold text-center text-blue-600">Register</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <input type="text" name="username" placeholder="Username"
            className="w-full p-2 border border-gray-300 rounded mt-2" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded mt-2" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded mt-2" onChange={handleChange} required />
          <input type="text" name="phone_number" placeholder="Phone Number"
            className="w-full p-2 border border-gray-300 rounded mt-2" onChange={handleChange} required />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 mt-4 rounded">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
