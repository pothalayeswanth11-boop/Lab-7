import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css'; // Let's define it later!

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="nav-brand">
                <h2>RouterShop SPA</h2>
            </div>

            <ul className="nav-links">
                <li>
                    <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/products" className={({ isActive }) => isActive ? 'active' : ''}>
                        Products
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>
                        Contact Us (Protected)
                    </NavLink>
                </li>
            </ul>

            <div className="nav-auth">
                {user ? (
                    <>
                        <span className="welcome-text">Hi, {user.username}</span>
                        <button className="auth-btn" onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <NavLink to="/login" className="auth-btn">Login</NavLink>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
