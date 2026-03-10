import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // If the user was redirected here from a protected route, grab that route so we can send them back!
    const from = location.state?.from?.pathname || '/';

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.trim()) {
            login(username);
            // Replace prevents the user from going back to the login page via browser back button
            navigate(from, { replace: true });
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '4rem auto', padding: '2rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#2d3748' }}>Log In to Continue</h2>
            {from !== '/' && (
                <p style={{ color: '#e53e3e', fontSize: '0.9rem', marginBottom: '1rem', textAlign: 'center' }}>
                    You must be logged in to view that page.
                </p>
            )}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                    <label htmlFor="username" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Username:</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e0' }}
                        placeholder="Enter any username"
                        required
                    />
                </div>
                <button type="submit" style={{ backgroundColor: '#48bb78', color: 'white', padding: '12px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', marginTop: '1rem' }}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
