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

    return (
        <header className={isScrolled ? 'scrolled' : ''}>
            <nav>
                <Link to="/" className="logo">
                    <img src="/assets/logo.jpg" alt="Prime Tech Logo" style={{ height: '45px', borderRadius: '8px' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.1' }}>
                        <span style={{ fontSize: '1.2rem', color: 'white' }}>PRIME</span>
                        <span style={{ fontSize: '0.9rem', color: 'var(--accent)' }}>TECHNOLOGY</span>
                    </div>
                </Link>
                <ul className="nav-links">
                    <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#solutions">Solutions</a></li>
                    <li><Link to="/request" className={location.pathname === '/request' ? 'active' : ''}>Request Software</Link></li>
                </ul>
                <Link to="/request" className="btn-contact">Get Started</Link>
            </nav>
        </header>
    );
};

export default Header;
