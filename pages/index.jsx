import React, { useState, useEffect } from 'react';
import { Amplify } from 'aws-amplify'; // Assuming you're using AWS Amplify for authentication
import { signIn, Auth, getCurrentUser, confirmSignIn } from 'aws-amplify/auth';
import awsconfig from '../src/aws-exports';


Amplify.configure(awsconfig);

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const [user, setUser] = useState(null);
    const [invaliduser, setInvalidUser] = useState(null);
    useEffect(() => {
      checkUserSession();
    }, [user]);
  
    const checkUserSession = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        window.location = "https://experience.kpoint.video/engage/"
        console.log('user session found with user ' + currentUser);
      } catch (error) {
        console.log('No user session found');
      }
    };

    const handleLogin = async (event) => {
      event.preventDefault(); 
      try {
        var username = "shekhar.bhabad@kpoint.com";
        var password = "123@Local@786";
        var userobject = await signIn({username,password});
        setUser(userobject);
        console.log("the details of the user are " , userobject);
        // var challengeResponse = "123@Local@786"
        // var response = await confirmSignIn({challengeResponse,userobject});
       //console.log("the details of the user are " , response);
      } catch (error) {
          // if (error.code === "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED") {
          //   // Prompt the user to set a new password
          //   const newPassword = prompt("Please set a new password:");
        
          //   // Complete the sign-in process with the new password
          //   response = await confirmSignIn({userObject, newPassword});
            
          //   // Handle the response after confirming sign-in with the new password
          //   console.log("User is signed in with a new password:", response);
          // } else {
          //   // Handle other sign-in errors
          //   console.error("Error during sign-in:", error);
          // }
      }
    };

  
    return (
      <div>
      <h1>Welcome to the Public Page</h1>
      {invaliduser ? (
        <>
          <p>You do not have access to this page  !!!! </p>         
        </>
      ) :(<></>)}
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
