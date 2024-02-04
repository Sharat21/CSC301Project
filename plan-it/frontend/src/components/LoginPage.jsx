// LoginPage.js
import React, { useState } from 'react';
import '.././index.css';
// import {
//     findUser,
//     updateUser,
//     deleteUser,
//     findGroup,
//     updateGroup,
//     deleteGroup
//   } from '../../../backend/src/database';
const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async () => {
        try {
          // Make a GET request to your login endpoint with email and password
          const response = await axios.get(`/api/login?email=${email}&password=${password}`);
    
          // Access the user data from the response
          const user = response.data;
    
          // Log the user data
          console.log('User data:', user);
    
          // Perform additional logic based on the response
          // For example, redirect to a different page on successful login
    
        } catch (error) {
          // Handle errors (e.g., incorrect credentials)
          console.error('Error logging in:', error.message);
        }
    }

    const handleCreateAccount = () => {
        // Perform logic to navigate to create account page or show registration form
        console.log('Creating a new account...');
    };

    return (
        <div className="login-page">
            <h1 className="text-5xl font-bold" >Welcome to PlanIt!</h1>
            <div className="login-container">
                <div className="form-container">
                    <h2 className="form-title">Get Started</h2>
                    <form>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                className="form-input"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                className="form-input"
                                placeholder="Enter your password"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                type="button"
                                onClick={handleLogin}
                                className="form-button mr-2"
                            >
                                Login
                            </button>
                            <button
                                type="button"
                                onClick={handleCreateAccount}
                                className="form-button create-account"
                            >
                                Create New Account
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
