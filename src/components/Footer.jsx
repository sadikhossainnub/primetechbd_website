import React from 'react';
import { Facebook, Linkedin, Twitter } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Footer = () => {
    const location = useLocation();
    if (location.pathname.startsWith('/admin')) return null;

    return (
        <footer>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
                <div style={{ maxWidth: '300px' }}>
                    <div className="logo" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <img src="/assets/logo.jpg" alt="Prime Tech" style={{ height: '40px', borderRadius: '6px' }} />
                        <span style={{ fontWeight: '800', fontSize: '1.2rem', color: 'white' }}>PRIME <span style={{ color: 'var(--accent)' }}>TECH</span></span>
                    </div>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Leading software solution provider in Bangladesh, dedicated to excellence and innovation since 2007.
                    </p>
                </div>
                <div>
                    <h4 style={{ marginBottom: '1.5rem' }}>Quick Links</h4>
                    <ul style={{ color: 'var(--text-secondary)', display: 'grid', gap: '0.8rem' }}>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#solutions">Solutions</a></li>
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h4 style={{ marginBottom: '1.5rem' }}>Socials</h4>
                    <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)' }}>
                        <a href="https://www.facebook.com/primetechnologyofbangladesh" target="_blank" rel="noopener noreferrer"><Facebook size={24} /></a>
                        <a href="https://www.linkedin.com/company/primetechbd" target="_blank" rel="noopener noreferrer"><Linkedin size={24} /></a>
                        <a href="#"><Twitter size={24} /></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2026 Prime Tech Solutions Ltd. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
