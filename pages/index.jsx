import React, { useState } from 'react';
import { Amplify,Auth } from 'aws-amplify'; // Assuming you're using AWS Amplify for authentication
import awsconfig from '../src/aws-exports';

Amplify.configure(awsconfig);

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const handleLogin = async (event) => {
      event.preventDefault(); 
      try {
        await Auth.signIn(username, password);
        // If successful, redirect or perform any other action
        console.log('Logged in successfully!');      
      } catch (error) {
        setError(error.message);
      }
    };
  
    return (
      <div>
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={(e) => handleLogin(e)}>

          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
}
