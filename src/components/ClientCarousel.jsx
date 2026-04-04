import React from 'react';
import { motion } from 'framer-motion';

const clients = [
    { name: 'Client 1', logo: '/assets/logo.jpg' }, // Using existing logo as placeholder
    { name: 'Client 2', logo: '/assets/logo.jpg' },
    { name: 'Client 3', logo: '/assets/logo.jpg' },
    { name: 'Client 4', logo: '/assets/logo.jpg' },
    { name: 'Client 5', logo: '/assets/logo.jpg' },
    { name: 'Client 6', logo: '/assets/logo.jpg' },
];

const ClientCarousel = () => {
    return (
        <section className="client-carousel-section" style={{ padding: '60px 0', overflow: 'hidden', background: 'rgba(0,0,0,0.2)' }}>
            <div className="section-header" style={{ marginBottom: '2rem' }}>
                <span className="badge">Trusted By</span>
            </div>
            <div style={{ display: 'flex', width: '200%' }}>
                <motion.div 
                    className="carousel-track"
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    style={{ display: 'flex', gap: '4rem', alignItems: 'center' }}
                >
                    {[...clients, ...clients].map((client, index) => (
                        <div key={index} style={{ filter: 'grayscale(1) brightness(0.8)', opacity: 0.5, transition: '0.3s' }}>
                            <img src={client.logo} alt={client.name} style={{ height: '40px', width: 'auto' }} />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ClientCarousel;
