import React, { useState, useEffect } from 'react';
import { Auth,Amplify } from 'aws-amplify'; // Assuming you're using AWS Amplify for authentication
import { signIn } from 'aws-amplify/auth';
import awsconfig from '../src/aws-exports';


Amplify.configure(awsconfig);

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const [user, setUser] = useState(null);

    useEffect(() => {
      checkUserSession();
    }, []);
  
    const checkUserSession = async () => {
      try {
        const currentUser = await Auth.currentAuthenticatedUser();
        setUser(currentUser);
        console.log('user session found with user ' + currentUser);
      } catch (error) {
        console.log('No user session found');
      }
    };

    const handleLogin = async (event) => {
      event.preventDefault(); 
      try {
        var username = "shekhar.bhabad@kpoint.com";
        var password = "Global@123";
        var userobject = await signIn({username,password});
//        const { isSignedIn, nextStep } = await signIn({ username, password });
        console.log("the details of the user are " , userobject);
        setUser(userobject.username);
        // If successful, redirect or perform any other action
        console.log('Logged in successfully!');      
      } catch (error) {
        setError(error.message);
      }
    };
  
    return (
      <div>
      <h1>Welcome to the Public Page</h1>
      {user ? (
        <>
          <p>User is logged in as: {user.username}</p>
         
        </>
      ) : (
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
      )}
    </div>
      );
}
