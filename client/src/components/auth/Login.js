import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import { jwtDecode } from 'jwt-decode';
import './../../styles/Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await authService.login(email, password);
            const token = response.token;
            const decodedToken = jwtDecode(token);
            localStorage.setItem('token', token);
            localStorage.setItem('tokenExpiration', decodedToken.exp * 1000);
            navigate('/game');
        } catch (err) {
            setError('Failed to login. Please check your credentials.');
            console.error('Login error:', err.response ? err.response.data : err.message);
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Welcome Back</h2>
                {error && <p className="error-message">{error}</p>}
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">Log In</button>
                <p className="signup-link">
                    Don't have an account? <a href="/register">Sign up</a>
                </p>
            </form>
        </div>
    );
};

export default Login;