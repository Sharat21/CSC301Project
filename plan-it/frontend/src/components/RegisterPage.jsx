import React, { useState } from 'react';
import '.././index.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const baseURL = `http://localhost:14000/api/users/register`;
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    
    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };
    
    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleRegister = async () => {
        try {
            const response = await axios.post(baseURL, { firstName, lastName, email, password });
            const user = response.data;
            console.log('User data:', user);
            alert("Successful Registration");
            navigate('/login');
          
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert(error.response.data.error);
            } else {
                console.error('Error registering:', error);
                alert("Invalid Registration");
            }
        }
    };

    const handleLogin = () => {
        navigate('/login');
        console.log('Navigating to login page...');
    };

    return (
        <div className="register-page">
            <h1 className="text-5xl font-bold">Create an Account</h1>
            <div className="register-container">
                <div className="form-container">
                    <h2 className="form-title">Get Started</h2>
                    <form>
                        <div>
                            <label htmlFor="firstName">First Name:</label>
                            <input
                                id="firstName"
                                type="input"
                                value={firstName}
                                onChange={handleFirstNameChange}
                                className="form-input"
                                placeholder="Enter your First Name"
                            />
                            <label htmlFor="lastName">Last Name:</label>
                            <input
                                id="lastName"
                                type="input"
                                value={lastName}
                                onChange={handleLastNameChange}
                                className="form-input"
                                placeholder="Enter your Last Name"
                            />
                        </div>
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
                                onClick={handleRegister}
                                className="form-button mr-2"
                            >
                                Register
                            </button>
                            <button
                                type="button"
                                onClick={handleLogin}
                                className="form-button create-account"
                            >
                                Already have an account?
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
