import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Headphones, Zap, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const reasons = [
    {
        icon: ShieldCheck,
        title: 'Enterprise-Grade Security',
        desc: 'Every solution ships with role-based access, encrypted data handling, and compliance-ready architecture.'
    },
    {
        icon: Zap,
        title: 'Lightning-Fast Delivery',
        desc: 'Agile sprints ensure your MVP is live in weeks, not months. We iterate fast and deploy faster.'
    },
    {
        icon: Headphones,
        title: '24/7 Dedicated Support',
        desc: 'Our engineers stand behind every deployment with round-the-clock monitoring and rapid incident response.'
    },
    {
        icon: Users,
        title: 'Domain Expert Team',
        desc: 'Specialized squads for Healthcare, ERP, Retail, and E-Commerce — we speak your industry language.'
    }
];

const WhyChooseUs = () => {
    return (
        <section style={{ background: 'transparent' }}>
            <div className="section-header">
                <span className="badge">Why Prime Tech</span>
                <h2>Why Businesses Choose Us</h2>
                <p>We don't just write code. We engineer competitive advantages.</p>
            </div>

            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                {reasons.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.12 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -8, borderColor: 'var(--accent)' }}
                        style={{
                            background: 'var(--bg-surface)',
                            padding: '2.5rem',
                            borderRadius: '24px',
                            border: '1px solid var(--glass-border)',
                            backdropFilter: 'blur(10px)',
                            transition: 'all 0.4s ease',
                            cursor: 'default'
                        }}
                    >
                        <div style={{
                            width: '60px',
                            height: '60px',
                            background: 'rgba(34, 211, 238, 0.08)',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '1.5rem',
                            border: '1px solid rgba(34, 211, 238, 0.15)'
                        }}>
                            <item.icon size={28} color="var(--accent)" />
                        </div>
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '0.8rem', color: 'var(--text-primary)' }}>{item.title}</h3>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '0.95rem' }}>{item.desc}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default WhyChooseUs;
