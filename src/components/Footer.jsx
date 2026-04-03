import React from 'react';
import { Facebook, Linkedin, Twitter, Instagram, Mail, Phone, MapPin, ArrowUpRight, Heart, Globe, ChevronRight } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

const Footer = () => {
    const location = useLocation();
    if (location.pathname.startsWith('/admin')) return null;

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer style={{ padding: '0', borderTop: 'none', background: 'transparent' }}>

            {/* Newsletter / Top Strip */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.08) 0%, rgba(129, 140, 248, 0.04) 100%)',
                borderTop: '1px solid rgba(34, 211, 238, 0.15)',
                borderBottom: '1px solid var(--glass-border)',
                padding: '3rem 8%'
            }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
                    <div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                            Stay Updated with Prime Technology of Bangladesh
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                            Get the latest updates on our solutions, industry insights, and exclusive offers.
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.8rem' }}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            style={{
                                padding: '0.9rem 1.5rem',
                                background: 'rgba(0, 0, 0, 0.4)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '12px',
                                color: 'white',
                                fontFamily: 'inherit',
                                fontSize: '0.95rem',
                                minWidth: '280px',
                                outline: 'none',
                                transition: 'border-color 0.3s'
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                            onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'}
                        />
                        <button style={{
                            padding: '0.9rem 1.8rem',
                            background: 'var(--accent)',
                            color: 'var(--bg-dark)',
                            border: 'none',
                            borderRadius: '12px',
                            fontWeight: '700',
                            fontSize: '0.95rem',
                            cursor: 'pointer',
                            fontFamily: 'inherit',
                            transition: 'all 0.3s',
                            whiteSpace: 'nowrap'
                        }}>
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div style={{ padding: '5rem 8% 3rem', background: 'var(--bg-dark)' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1.2fr', gap: '2rem' }}>

                    {/* Brand Column */}
                    <div style={{ maxWidth: '340px' }}>
                        <div className="logo" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <img src="/assets/logo.jpg" alt="Prime Technology of Bangladesh" style={{ height: '45px', borderRadius: '10px' }} />
                            <span style={{ fontWeight: '800', fontSize: '1.3rem', color: 'white' }}>PRIME <span style={{ color: 'var(--accent)' }}>TECH</span></span>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '2rem', fontSize: '0.95rem' }}>
                            Leading enterprise software solution provider in Bangladesh, dedicated to engineering excellence and digital innovation since 2007.
                        </p>

                        {/* Social Icons */}
                        <div style={{ display: 'flex', gap: '0.8rem' }}>
                            {[
                                { icon: Facebook, href: 'https://www.facebook.com/primetechnologyofbangladesh', label: 'Facebook' },
                                { icon: Linkedin, href: 'https://www.linkedin.com/company/primetechbd', label: 'LinkedIn' },
                                { icon: Twitter, href: '#', label: 'Twitter' },
                                { icon: Instagram, href: '#', label: 'Instagram' }
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    style={{
                                        width: '42px',
                                        height: '42px',
                                        borderRadius: '12px',
                                        background: 'rgba(255, 255, 255, 0.04)',
                                        border: '1px solid rgba(255, 255, 255, 0.08)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'var(--text-secondary)',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.background = 'rgba(34, 211, 238, 0.15)';
                                        e.currentTarget.style.borderColor = 'var(--accent)';
                                        e.currentTarget.style.color = 'var(--accent)';
                                        e.currentTarget.style.transform = 'translateY(-3px)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                                        e.currentTarget.style.color = 'var(--text-secondary)';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    <social.icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', color: 'var(--text-primary)', position: 'relative', paddingBottom: '0.8rem' }}>
                            Quick Links
                            <span style={{ position: 'absolute', bottom: 0, left: 0, width: '40px', height: '2px', background: 'var(--accent)', borderRadius: '2px' }} />
                        </h4>
                        <ul style={{ display: 'grid', gap: '0.7rem' }}>
                            {[
                                { to: '/services', label: 'Services' },
                                { to: '/solutions', label: 'Solutions' },
                                { to: '/about', label: 'About Us' },
                                { to: '/vision-mission', label: 'Vision & Mission' },
                                { to: '/team', label: 'Our Team' },
                                { to: '/request', label: 'Request Quote' }
                            ].map((link, i) => (
                                <li key={i}>
                                    <Link
                                        to={link.to}
                                        style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.3s' }}
                                        onMouseOver={(e) => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.paddingLeft = '8px'; }}
                                        onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.paddingLeft = '0'; }}
                                    >
                                        <ChevronRight size={14} /> {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', color: 'var(--text-primary)', position: 'relative', paddingBottom: '0.8rem' }}>
                            Our Solutions
                            <span style={{ position: 'absolute', bottom: 0, left: 0, width: '40px', height: '2px', background: 'var(--accent)', borderRadius: '2px' }} />
                        </h4>
                        <ul style={{ display: 'grid', gap: '0.7rem' }}>
                            {['ERP Solutions', 'POS Systems', 'Hospital Management', 'School Management', 'E-Commerce Development', 'Mobile Applications'].map((item, i) => (
                                <li key={i}>
                                    <Link
                                        to="/request"
                                        style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.3s' }}
                                        onMouseOver={(e) => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.paddingLeft = '8px'; }}
                                        onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.paddingLeft = '0'; }}
                                    >
                                        <ChevronRight size={14} /> {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', color: 'var(--text-primary)', position: 'relative', paddingBottom: '0.8rem' }}>
                            Get in Touch
                            <span style={{ position: 'absolute', bottom: 0, left: 0, width: '40px', height: '2px', background: 'var(--accent)', borderRadius: '2px' }} />
                        </h4>
                        <div style={{ display: 'grid', gap: '1.2rem' }}>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                <div style={{ width: '38px', height: '38px', flexShrink: 0, borderRadius: '10px', background: 'rgba(34, 211, 238, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <MapPin size={16} color="var(--accent)" />
                                </div>
                                <div>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                                        House# 7, Lane# 23, Block C,<br />Avenue 5, Mirpur 11, Dhaka-1216
                                    </p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <div style={{ width: '38px', height: '38px', flexShrink: 0, borderRadius: '10px', background: 'rgba(34, 211, 238, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Mail size={16} color="var(--accent)" />
                                </div>
                                <a href="mailto:info@primetechbd.xyz" style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', transition: 'color 0.3s' }}
                                    onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent)'}
                                    onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                                >
                                    info@primetechbd.xyz
                                </a>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <div style={{ width: '38px', height: '38px', flexShrink: 0, borderRadius: '10px', background: 'rgba(34, 211, 238, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Phone size={16} color="var(--accent)" />
                                </div>
                                <a href="tel:+8809696221112" style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', transition: 'color 0.3s' }}
                                    onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent)'}
                                    onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                                >
                                    +880 9696 221112
                                </a>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                <div style={{ width: '38px', height: '38px', flexShrink: 0, borderRadius: '10px', background: 'rgba(34, 211, 238, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Globe size={16} color="var(--accent)" />
                                </div>
                                <a href="https://primetechbd.xyz" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', transition: 'color 0.3s' }}
                                    onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent)'}
                                    onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                                >
                                    primetechbd.xyz
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div style={{
                padding: '1.5rem 8%',
                background: 'rgba(0, 0, 0, 0.3)',
                borderTop: '1px solid var(--glass-border)'
            }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        &copy; 2026 Prime Technology of Bangladesh. All Rights Reserved.
                    </p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        Crafted with <Heart size={14} color="#ef4444" fill="#ef4444" /> in Dhaka, Bangladesh
                    </p>
                    <button
                        onClick={scrollToTop}
                        aria-label="Back to top"
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '10px',
                            background: 'rgba(34, 211, 238, 0.1)',
                            border: '1px solid rgba(34, 211, 238, 0.2)',
                            color: 'var(--accent)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.3s',
                            transform: 'rotate(-90deg)'
                        }}
                        onMouseOver={(e) => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = 'var(--bg-dark)'; }}
                        onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(34, 211, 238, 0.1)'; e.currentTarget.style.color = 'var(--accent)'; }}
                    >
                        <ArrowUpRight size={18} />
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
