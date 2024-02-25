import "./App.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function LoginPage({ onLoginSuccess }) {
  const [ID, setID] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
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
      onLoginSuccess(); // Update App's login state
      navigate("/"); // Redirect after successful login
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
            placeholder="Employee ID"
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