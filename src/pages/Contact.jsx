import React, { useState, useCallback, memo } from 'react';
import { useAuth } from '../contexts/AuthContext';

// Using React.memo provides a rendering boundary. This component won't re-render 
// when the parent's form state changes, optimizing performance!
const FormHeader = memo(({ title, description }) => {
    console.log("FormHeader rendered!"); // To prove rendering boundaries
    return (
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2rem', color: '#2d3748', marginBottom: '0.5rem' }}>{title}</h2>
            <p style={{ color: '#718096' }}>{description}</p>
        </div>
    );
});

const Contact = () => {
    const { user } = useAuth();

    // Controlled components state
    const [formData, setFormData] = useState({
        name: user?.username || '',
        email: '',
        message: ''
    });

    // Validation error surface state
    const [errors, setErrors] = useState({});
    const [submitStatus, setSubmitStatus] = useState(null);

    // Validation Pipeline
    const validate = useCallback((data) => {
        let newErrors = {};
        if (!data.name.trim()) newErrors.name = 'Name is required.';

        if (!data.email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            newErrors.email = 'Email address is invalid.';
        }

        if (!data.message.trim()) {
            newErrors.message = 'Message cannot be empty.';
        } else if (data.message.length < 10) {
            newErrors.message = 'Message must be at least 10 characters long.';
        }

        return newErrors;
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Controlled update
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear specific error surface dynamically as they type
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
        setSubmitStatus(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Run validation pipeline
        const validationErrors = validate(formData);

        if (Object.keys(validationErrors).length > 0) {
            // Show error surfaces
            setErrors(validationErrors);
            setSubmitStatus('error');
        } else {
            // Simulate API submission
            setErrors({});
            setSubmitStatus('success');
            // Simulated reset after 2 seconds
            setTimeout(() => {
                setFormData({ name: user?.username || '', email: '', message: '' });
                setSubmitStatus(null);
            }, 2000);
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '12px',
        borderRadius: '4px',
        border: '1px solid #cbd5e0',
        fontFamily: 'inherit',
        fontSize: '1rem',
        boxSizing: 'border-box'
    };

    const errorStyle = {
        color: '#e53e3e',
        fontSize: '0.875rem',
        marginTop: '0.25rem',
        display: 'block'
    };

    return (
        <div style={{ maxWidth: '600px', margin: '4rem auto', padding: '2rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            {/* 
        This is separated outside the form state logic. Thanks to React.memo, 
        typing in the form won't force this static header to recalculate!
      */}
            <FormHeader
                title="Contact Customer Support"
                description="We'll get back to you within 24 hours. (This is a protected route!)"
            />

            {submitStatus === 'success' && (
                <div style={{ backgroundColor: '#c6f6d5', color: '#2f855a', padding: '1rem', borderRadius: '4px', marginBottom: '1.5rem', fontWeight: 'bold', textAlign: 'center' }}>
                    Message sent successfully!
                </div>
            )}

            {submitStatus === 'error' && (
                <div style={{ backgroundColor: '#fed7d7', color: '#c53030', padding: '1rem', borderRadius: '4px', marginBottom: '1.5rem', fontWeight: 'bold', textAlign: 'center' }}>
                    Please fix the validation errors below.
                </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#4a5568' }}>Name:</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        style={{ ...inputStyle, borderColor: errors.name ? '#e53e3e' : '#cbd5e0' }}
                    />
                    {errors.name && <span style={errorStyle}>{errors.name}</span>}
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#4a5568' }}>Email Address:</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        style={{ ...inputStyle, borderColor: errors.email ? '#e53e3e' : '#cbd5e0' }}
                    />
                    {errors.email && <span style={errorStyle}>{errors.email}</span>}
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#4a5568' }}>Message:</label>
                    <textarea
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        style={{ ...inputStyle, borderColor: errors.message ? '#e53e3e' : '#cbd5e0', resize: 'vertical' }}
                    ></textarea>
                    {errors.message && <span style={errorStyle}>{errors.message}</span>}
                </div>

                <button
                    type="submit"
                    disabled={submitStatus === 'success'}
                    style={{ width: '100%', backgroundColor: '#3182ce', color: 'white', padding: '14px', border: 'none', borderRadius: '4px', fontSize: '1.1rem', fontWeight: 'bold', cursor: submitStatus === 'success' ? 'not-allowed' : 'pointer', opacity: submitStatus === 'success' ? 0.7 : 1, transition: 'background-color 0.2s' }}
                >
                    {submitStatus === 'success' ? 'Sending...' : 'Send Message'}
                </button>
            </form>
        </div>
    );
};

export default Contact;
