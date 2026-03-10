import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Contact from './pages/Contact';

function App() {
  return (
    <div style={{ backgroundColor: '#f7fafc', minHeight: '100vh', paddingBottom: '4rem' }}>
      <Navbar />

      {/* SPA Routing with definitions */}
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Dynamic / Nested Routing setup */}
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />}>
          {/* Nested Routes! The component rendered here will replace the Outlet in ProductDetails */}
          <Route path="reviews" element={
            <div style={{ padding: '1rem', backgroundColor: '#f0fff4', borderRadius: '4px', borderLeft: '4px solid #38a169' }}>
              <h3>Customer Reviews</h3>
              <p>⭐⭐⭐⭐⭐ "This product is amazing!"</p>
              <p>⭐⭐⭐⭐ "Good, but shipping took a while."</p>
              <p style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>This nested component rendered without the parent component re-rendering.</p>
            </div>
          } />
          <Route path="specs" element={
            <div style={{ padding: '1rem', backgroundColor: '#ebf8ff', borderRadius: '4px', borderLeft: '4px solid #3182ce' }}>
              <h3>Technical Specifications</h3>
              <ul>
                <li>Weight: 1.2kg</li>
                <li>Dimensions: 10x20x5 cm</li>
                <li>Warranty: 1 Year</li>
              </ul>
              <p style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>This nested component rendered without the parent component re-rendering.</p>
            </div>
          } />
        </Route>

        <Route path="/login" element={<Login />} />

        {/* Protected Route! If not logged in, they get sent to /login */}
        <Route path="/contact" element={
          <ProtectedRoute>
            <Contact />
          </ProtectedRoute>
        } />

        {/* Fallback route for unknown paths */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
