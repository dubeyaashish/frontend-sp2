import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage({ onLoginSuccess }) {
  const [ID, setID] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('User');
  const navigate = useNavigate();

  const handleIDChange = (event) => {
    setID(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    onLoginSuccess(role); // Pass the role to App.js
    navigate('/'); // Navigate to the home page
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <select value={role} onChange={handleRoleChange} style={{ width: '293px', height: '36px', marginBottom: '5px', borderRadius: '8px', backgroundColor: '#F6F6F6', outline: 'none' }}>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
        <br />
        <input type="text" value={ID} onChange={handleIDChange} placeholder="ID" style={{ width: '293px', height: '36px', marginBottom: '5px', borderRadius: '8px', backgroundColor: '#F6F6F6', outline: 'none' }} />
        <br />
        <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password" style={{ width: '293px', height: '36px', borderRadius: '8px', backgroundColor: '#F6F6F6', outline: 'none' }} />
        <br />
        <button type="submit" style={{ width: '320px', height: '40px', backgroundColor: '#4340DA', color: 'white', marginTop: '20px', borderRadius: '8px' }}>Login</button>
      </form>
      <div
        style={{
          position: 'absolute',
          top: '25%', // Adjusted for positioning
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: 'gray',
          backgroundImage: `url("/sunmilogo.png")`, // Your profile picture URL
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
      </div>
    </div>
  );
}

export default LoginPage;
