import "./App.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import API, { setAuthToken } from './api'; // Adjust the import path as needed
import axios from "axios";
function LoginPage({ onLoginSuccess }) {
  const [ID, setID] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = getAuth(); // Initialize Firebase auth

  const handleIDChange = (event) => {
    setID(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const credential = await signInWithEmailAndPassword(auth, ID, password);
      const token = await credential.user.getIdToken();
      setAuthToken(token);
      localStorage.setItem('token', token);

      const profileResponse = await axios.get('http://localhost:3001/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
        
      });
      const isAdmin = profileResponse.data.is_admin;
      console.log("isAdmin:", isAdmin);  // Check the value being set

      
      onLoginSuccess(isAdmin); // Update App's login state

    } catch (error) {
      alert("Username and Password are not found");
    }
  };


  return (
    <div className="login-container">
      <div>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            value={ID}
            onChange={handleIDChange}
            placeholder="Email"
            className="form-control"
          />
          <br />
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            className="form-control"
          />
          <button type="submit" className="btn btn-primary my-5">
            Login
          </button>
        </form>
        <div className="logo-container"></div>
      </div>
    </div>
  );
}

export default LoginPage;