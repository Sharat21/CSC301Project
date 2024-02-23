import React, { useState } from 'react';
import '.././index.css';
import axios from 'axios';
const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const baseURL = `http://localhost:14000/api/users/login`;
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post(baseURL, { email, password });

            const user = response.data;
            console.log('User data:', user);

            // Perform additional logic based on the response
            // For example, redirect to a different page on successful login
            alert("Successful Login");

        } catch (error) {
            alert("Invalid Email or Password");
        }
    };

    const handleCreateAccount = () => {
        // Perform logic to navigate to create account page or show registration form
        navigate('/register');
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
