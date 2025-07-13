import React, { useState } from 'react';
import axios from 'axios';

// --- SVG Icon Components for better UI feedback ---
const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '10px' }}>
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
);

const Spinner = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="white">
        <path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25" />
        <path d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z">
            <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite" />
        </path>
    </svg>
);

// --- Main Component ---
const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setLoading(true);

        try {
            // Since we send an email now, we only need the success message.
            const { data } = await axios.post('/api/auth/forgot-password', { email });
            setMessage(data.message);
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.pageWrapper}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <MailIcon />
                    <h2>Forgot Password?</h2>
                </div>
                <p style={styles.subtitle}>
                    No problem! Enter your email address below, and we'll send you a link to reset it.
                </p>

                <form onSubmit={handleSubmit}>
                    <div style={styles.inputGroup}>
                        <label htmlFor="email" style={styles.label}>Email Address</label>
                        <input
                            type="email"
                            id="email"
                            style={styles.input}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                            disabled={loading}
                        />
                    </div>
                    <button type="submit" style={loading ? { ...styles.button, ...styles.buttonDisabled } : styles.button} disabled={loading}>
                        {loading ? <Spinner /> : 'Send Reset Link'}
                    </button>
                </form>

                {message && <div style={styles.successMessage}>{message}</div>}
                {error && <div style={styles.errorMessage}>{error}</div>}
            </div>
        </div>
    );
};

// --- CSS-in-JS Styles ---
const styles = {
    pageWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f2f5',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    card: {
        backgroundColor: '#ffffff',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
        width: '100%',
        maxWidth: '450px',
        textAlign: 'center'
    },
    header: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#333',
        marginBottom: '10px'
    },
    subtitle: {
        color: '#666',
        fontSize: '16px',
        marginBottom: '30px'
    },
    inputGroup: {
        marginBottom: '20px',
        textAlign: 'left'
    },
    label: {
        display: 'block',
        marginBottom: '8px',
        fontWeight: '600',
        color: '#444'
    },
    input: {
        width: '100%',
        padding: '12px 15px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxSizing: 'border-box',
        transition: 'border-color 0.3s, box-shadow 0.3s',
    },
    button: {
        width: '100%',
        padding: '12px',
        border: 'none',
        borderRadius: '8px',
        backgroundColor: '#ff385c', // A modern, vibrant color
        color: 'white',
        fontSize: '18px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonDisabled: {
        backgroundColor: '#ff7a93',
        cursor: 'not-allowed',
    },
    successMessage: {
        marginTop: '20px',
        padding: '12px',
        backgroundColor: '#e6f7f0',
        color: '#006442',
        border: '1px solid #b3e6d1',
        borderRadius: '8px',
        fontSize: '14px',
    },
    errorMessage: {
        marginTop: '20px',
        padding: '12px',
        backgroundColor: '#fdecea',
        color: '#8b0000',
        border: '1px solid #f8c0b3',
        borderRadius: '8px',
        fontSize: '14px',
    }
};

export default ForgotPassword;