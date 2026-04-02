import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock, User, ShieldCheck } from 'lucide-react';

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Simple mock authentication
        if (credentials.username === 'admin' && credentials.password === 'prime123') {
            localStorage.setItem('isAdminAuthenticated', 'true');
            navigate('/admin/dashboard');
        } else {
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="admin-login-page" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(circle at center, #111827 0%, #05060a 100%)'
        }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="login-card"
                style={{
                    background: 'var(--bg-surface)',
                    padding: '3.5rem',
                    borderRadius: '32px',
                    border: '1px solid var(--glass-border)',
                    width: '100%',
                    maxWidth: '450px',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 25px 50px rgba(0,0,0,0.5)'
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{
                        width: '70px',
                        height: '70px',
                        background: 'var(--accent)',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem',
                        color: 'var(--bg-dark)',
                        boxShadow: '0 0 30px var(--accent-glow)'
                    }}>
                        <ShieldCheck size={40} />
                    </div>
                    <h2 style={{ fontSize: '2rem' }}>Command Center</h2>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Secure Admin Access</p>
                </div>

                <form onSubmit={handleLogin}>
                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Username</label>
                        <div style={{ position: 'relative' }}>
                            <User size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                            <input
                                type="text"
                                placeholder="Admin ID"
                                value={credentials.username}
                                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '1rem 1rem 1rem 3rem',
                                    background: 'rgba(0,0,0,0.3)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '12px',
                                    color: 'white'
                                }}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: '2rem' }}>
                        <label style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Secret Key</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={credentials.password}
                                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '1rem 1rem 1rem 3rem',
                                    background: 'rgba(0,0,0,0.3)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '12px',
                                    color: 'white'
                                }}
                                required
                            />
                        </div>
                    </div>

                    {error && <p style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '1.5rem', textAlign: 'center' }}>{error}</p>}

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="btn-primary"
                        style={{ width: '100%', border: 'none', cursor: 'pointer', padding: '1.2rem' }}
                    >
                        Authorize & Enter
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
