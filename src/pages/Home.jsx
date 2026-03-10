import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
            <h1>Welcome to React Router SPA</h1>
            <p style={{ fontSize: '1.2rem', color: '#4a5568', marginTop: '1rem' }}>
                A Single Page Application demonstrating dynamic routing, protected routes, and form engineering.
            </p>
            <div style={{ marginTop: '2rem' }}>
                <Link to="/products" style={{
                    backgroundColor: '#3182ce',
                    color: 'white',
                    padding: '10px 20px',
                    textDecoration: 'none',
                    borderRadius: '6px',
                    fontWeight: 'bold',
                    marginRight: '1rem'
                }}>
                    Explore Products
                </Link>
                <Link to="/contact" style={{
                    backgroundColor: '#e2e8f0',
                    color: '#2d3748',
                    padding: '10px 20px',
                    textDecoration: 'none',
                    borderRadius: '6px',
                    fontWeight: 'bold'
                }}>
                    Contact Support (Requires Login)
                </Link>
            </div>
        </div>
    );
};

export default Home;
