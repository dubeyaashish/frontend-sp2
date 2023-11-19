import React, { useState, useRef } from 'react';

function LoginPage() {
  const [ID, setID] = useState('');
  const [password, setPassword] = useState('');

  const handleIDChange = (event) => {
    setID(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    // Add your login logic here
    console.log('ID:', ID);
    console.log('Password:', password);
  };


  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <label>
            <input type="text" value={ID} onChange={handleIDChange} placeholder="ID" style={{ width: '293px', height: '36px', marginBottom: '5px', borderRadius: '8px', backgroundColor: '#F6F6F6', outline: 'none' }} />
          </label>
          <br />
          <label>
            <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password" style={{ width: '293px', height: '36px', borderRadius: '8px', backgroundColor: '#F6F6F6', outline: 'none' }} />
          </label>
          <br />
          <button type="submit" style={{ width: '320px', height: '40px', backgroundColor: '#4340DA', color: 'white', marginTop: '20px', borderRadius: '8px' }}>Login</button>
        </form>
        <div
          style={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: 'gray',
            backgroundImage: `url("/sunmilogo.png")`, 
            backgroundSize: 'cover',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
        </div>
      </div>
    </div>
  );
}

export default LoginPage;


