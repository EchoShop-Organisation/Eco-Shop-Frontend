import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../AuthContext";
import { getUserProfile } from "../api";

const Profile = () => {
  const { token, logout } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile(token);
        setUser(response.data);
      } catch (error) {
        alert("Failed to fetch profile");
      }
    };
    fetchProfile();
  }, [token]);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>Profile</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone_number}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Profile;
