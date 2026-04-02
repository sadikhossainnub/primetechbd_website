import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
    {
        name: 'Ahmed Zubayer',
        role: 'CEO, RetailFlow',
        text: 'Prime Technology transformed our manual tracking into a seamless automated ecosystem. Their attention to detail in UX is remarkable.',
        avatar: 'AZ'
    },
    {
        name: 'Sarah Rahman',
        role: 'Director, EduVantage',
        text: 'Scaling our platform was a challenge until we partnered with Prime. Their cloud architecture solutions are truly world-class.',
        avatar: 'SR'
    },
    {
        name: 'Karim Ullah',
        role: 'Founder, TravelSync',
        text: 'From concept to deployment, the team at Prime Tech was professional and highly skilled. Highly recommended for complex projects.',
        avatar: 'KU'
    }
];

const Testimonials = () => {
    return (
        <section id="about" style={{ background: 'rgba(34, 211, 238, 0.02)' }}>
            <div className="section-header">
                <span className="badge">Testimonials</span>
                <h2>Trusted by Global Leaders</h2>
                <p>Don't just take our word for it—hear from the businesses we've helped grow.</p>
            </div>

            <div className="testimonials-grid">
                {testimonials.map((t, index) => (
                    <motion.div
                        key={index}
                        className="testimonial-card"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <Quote className="quote-icon" />
                        <p style={{ fontStyle: 'italic', fontSize: '1.1rem', color: 'var(--text-primary)', position: 'relative', zIndex: 1 }}>"{t.text}"</p>
                        <div className="client-info">
                            <div className="client-avatar">{t.avatar}</div>
                            <div className="client-meta">
                                <h4>{t.name}</h4>
                                <span>{t.role}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
