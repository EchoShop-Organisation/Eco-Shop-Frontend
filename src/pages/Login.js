import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials);
      navigate("/profile");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold text-center text-blue-600">Login</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <input type="text" name="username" placeholder="Username"
            className="w-full p-2 border border-gray-300 rounded mt-2" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded mt-2" onChange={handleChange} required />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 mt-4 rounded">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
