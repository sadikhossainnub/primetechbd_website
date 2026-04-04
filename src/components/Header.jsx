import React, { useState, useEffect } from 'react';
import { Cpu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (location.pathname.startsWith('/admin')) return null;

    return (
        <header className={isScrolled ? 'scrolled' : ''}>
            <nav>
                <Link to="/" className="logo">
                    <img src="/assets/logo.jpg" alt="Prime Technology of Bangladesh Logo" style={{ height: '45px', borderRadius: '8px' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.1' }}>
                        <span style={{ fontSize: '1.2rem', color: 'white' }}>PRIME</span>
                        <span style={{ fontSize: '0.9rem', color: 'var(--accent)' }}>TECHNOLOGY</span>
                    </div>
                </Link>
                <ul className="nav-links">
                    <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
                    <li><Link to="/services" className={location.pathname === '/services' ? 'active' : ''}>Services</Link></li>
                    <li><Link to="/solutions" className={location.pathname === '/solutions' ? 'active' : ''}>Solutions</Link></li>
                    <li><Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About Us</Link></li>
                    <li><Link to="/vision-mission" className={location.pathname === '/vision-mission' ? 'active' : ''}>Vision & Mission</Link></li>
                    <li><Link to="/team" className={location.pathname === '/team' ? 'active' : ''}>Our Team</Link></li>
                    <li><Link to="/blog" className={location.pathname.startsWith('/blog') ? 'active' : ''}>Blog</Link></li>
                    <li><Link to="/request" className={location.pathname === '/request' ? 'active' : ''}>Request Software</Link></li>
                </ul>
                <Link to="/request" className="btn-contact">Get Started</Link>
            </nav>
        </header>
    );
};

export default Header;
