import React from 'react';
import { MessageCircle, Phone, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingContact = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {/* WhatsApp */}
            <motion.a
                href="https://wa.me/8809696221112"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                    width: '55px',
                    height: '55px',
                    borderRadius: '50%',
                    background: '#25D366',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    boxShadow: '0 10px 25px rgba(37, 211, 102, 0.3)',
                    cursor: 'pointer'
                }}
            >
                <MessageCircle size={24} fill="currentColor" />
            </motion.a>

            {/* Call */}
            <motion.a
                href="tel:+8809696221112"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                    width: '55px',
                    height: '55px',
                    borderRadius: '50%',
                    background: 'var(--accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--bg-dark)',
                    boxShadow: '0 10px 25px var(--accent-glow)',
                    cursor: 'pointer'
                }}
            >
                <Phone size={24} fill="currentColor" />
            </motion.a>
        </div>
    );
};

export default FloatingContact;
