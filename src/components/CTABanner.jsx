import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTABanner = () => {
    return (
        <section style={{ padding: '0 8%' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.12) 0%, rgba(129, 140, 248, 0.08) 100%)',
                    border: '1px solid rgba(34, 211, 238, 0.2)',
                    borderRadius: '32px',
                    padding: '4rem 3rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '2rem',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                {/* Decorative glow */}
                <div style={{ position: 'absolute', top: '-50%', right: '-10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(34, 211, 238, 0.15) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

                <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <Sparkles size={20} color="var(--accent)" />
                        <span style={{ color: 'var(--accent)', fontWeight: '700', fontSize: '0.85rem', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Limited Offer</span>
                    </div>
                    <h3 style={{ fontSize: '2rem', marginBottom: '0.8rem', color: 'var(--text-primary)', lineHeight: '1.3' }}>
                        Ready to Transform Your Business?
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.7' }}>
                        Get a free consultation and project scoping worth ৳25,000. Our senior architects will analyze your requirements and deliver a detailed blueprint.
                    </p>
                </div>

                <Link to="/request" style={{ position: 'relative', zIndex: 1 }}>
                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(34, 211, 238, 0.3)' }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            padding: '1.2rem 2.5rem',
                            background: 'var(--accent)',
                            color: 'var(--bg-dark)',
                            border: 'none',
                            borderRadius: '12px',
                            fontWeight: '700',
                            fontSize: '1.1rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.8rem',
                            fontFamily: 'inherit',
                            boxShadow: '0 0 25px rgba(34, 211, 238, 0.2)'
                        }}
                    >
                        Start Free Consultation <ArrowRight size={20} />
                    </motion.button>
                </Link>
            </motion.div>
        </section>
    );
};

export default CTABanner;
