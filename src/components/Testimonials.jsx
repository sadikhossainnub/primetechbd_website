import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
    {
        name: 'Ahmed Zubayer',
        role: 'CEO, RetailFlow BD',
        text: 'Prime Technology transformed our manual tracking into a seamless automated ecosystem. Their attention to detail in UX is remarkable. Within 3 months of deployment, our operational efficiency increased by 45%. Their post-delivery support is outstanding.',
        avatar: 'AZ',
        rating: 5,
        project: 'ERP Solution'
    },
    {
        name: 'Sarah Rahman',
        role: 'Director, EduVantage',
        text: 'Scaling our education platform was a nightmare until we partnered with Prime. Their cloud architecture solutions are truly world-class. They didn\'t just build software—they understood our vision and made it a reality that serves 10,000+ students daily.',
        avatar: 'SR',
        rating: 5,
        project: 'School Management System'
    },
    {
        name: 'Karim Ullah',
        role: 'Founder, TravelSync',
        text: 'From concept to deployment, the team at Prime Tech was professional and highly skilled. They delivered a complex booking engine with real-time availability sync across 50+ hotels. Highly recommended for complex, mission-critical projects.',
        avatar: 'KU',
        rating: 5,
        project: 'E-Commerce Platform'
    },
    {
        name: 'Fatima Begum',
        role: 'CTO, MediCare Hospital',
        text: 'Implementing their Hospital Management System was the best decision we made. Patient wait times dropped by 60%, and our doctors now have real-time access to patient histories. The pharmacy module alone has saved us lakhs in inventory waste.',
        avatar: 'FB',
        rating: 5,
        project: 'Hospital Management'
    },
    {
        name: 'Rafiq Hasan',
        role: 'Owner, FreshMart Chain',
        text: 'Our 12 retail outlets were impossible to manage manually. Prime Tech\'s POS system with centralized inventory changed everything. Real-time stock tracking, automated reordering, and beautiful analytics dashboards — it\'s like having a digital brain for our business.',
        avatar: 'RH',
        rating: 4,
        project: 'POS Solution'
    },
    {
        name: 'Nusrat Jahan',
        role: 'MD, PropertyHub BD',
        text: 'Managing 200+ rental units was chaos before Prime Tech stepped in. Their Property Management system automated rent collection, maintenance tickets, and tenant communication. Our revenue leakage dropped to near zero. Absolute game-changer.',
        avatar: 'NJ',
        rating: 5,
        project: 'Property Management'
    }
];

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(1);

    // Auto-rotate every 5 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setDirection(1);
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const goTo = (dir) => {
        setDirection(dir);
        if (dir === 1) {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        } else {
            setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        }
    };

    const current = testimonials[currentIndex];

    const slideVariants = {
        enter: (d) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (d) => ({ x: d > 0 ? -300 : 300, opacity: 0 })
    };

    return (
        <section id="testimonials" style={{ background: 'rgba(34, 211, 238, 0.02)', overflow: 'hidden' }}>
            <div className="section-header">
                <span className="badge">Client Testimonials</span>
                <h2>Trusted by Industry Leaders</h2>
                <p>Don't just take our word for it — hear from the businesses we've helped grow and transform digitally.</p>
            </div>

            {/* Featured Testimonial Carousel */}
            <div style={{ maxWidth: '900px', margin: '0 auto 4rem', position: 'relative' }}>
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        style={{
                            background: 'linear-gradient(135deg, rgba(22, 24, 33, 0.9) 0%, rgba(30, 41, 59, 0.6) 100%)',
                            padding: '3.5rem',
                            borderRadius: '32px',
                            border: '1px solid rgba(34, 211, 238, 0.15)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        <Quote size={80} style={{ position: 'absolute', top: '1rem', right: '2rem', opacity: 0.05, color: 'var(--accent)' }} />
                        
                        {/* Star Rating */}
                        <div style={{ display: 'flex', gap: '4px', marginBottom: '1.5rem' }}>
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={18} fill={i < current.rating ? '#facc15' : 'transparent'} color={i < current.rating ? '#facc15' : '#475569'} />
                            ))}
                        </div>

                        <p style={{ fontStyle: 'italic', fontSize: '1.2rem', color: 'var(--text-primary)', lineHeight: '1.9', position: 'relative', zIndex: 1, marginBottom: '2rem' }}>
                            "{current.text}"
                        </p>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                            <div className="client-info" style={{ margin: 0 }}>
                                <div className="client-avatar" style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'linear-gradient(135deg, var(--accent), var(--accent-dark))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '1.2rem', color: 'var(--bg-dark)' }}>
                                    {current.avatar}
                                </div>
                                <div className="client-meta">
                                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>{current.name}</h4>
                                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{current.role}</span>
                                </div>
                            </div>
                            <span style={{ background: 'rgba(34, 211, 238, 0.1)', color: 'var(--accent)', padding: '0.5rem 1.2rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '1px' }}>
                                {current.project}
                            </span>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Controls */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem', marginTop: '2rem' }}>
                    <button onClick={() => goTo(-1)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white', transition: 'all 0.3s' }}>
                        <ChevronLeft size={20} />
                    </button>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => { setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i); }}
                                style={{
                                    width: currentIndex === i ? '32px' : '10px',
                                    height: '10px',
                                    borderRadius: '10px',
                                    background: currentIndex === i ? 'var(--accent)' : 'rgba(255,255,255,0.15)',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                            />
                        ))}
                    </div>
                    <button onClick={() => goTo(1)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white', transition: 'all 0.3s' }}>
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            {/* Mini Testimonial Grid */}
            <div className="testimonials-grid" style={{ maxWidth: '1400px', margin: '0 auto' }}>
                {testimonials.map((t, index) => (
                    <motion.div
                        key={index}
                        className="testimonial-card"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.08 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -5 }}
                        onClick={() => { setDirection(1); setCurrentIndex(index); }}
                        style={{ cursor: 'pointer', border: currentIndex === index ? '1px solid var(--accent)' : '1px solid var(--glass-border)' }}
                    >
                        <Quote className="quote-icon" />
                        <div style={{ display: 'flex', gap: '3px', marginBottom: '1rem' }}>
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={14} fill={i < t.rating ? '#facc15' : 'transparent'} color={i < t.rating ? '#facc15' : '#475569'} />
                            ))}
                        </div>
                        <p style={{ fontStyle: 'italic', fontSize: '0.95rem', color: 'var(--text-primary)', position: 'relative', zIndex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            "{t.text}"
                        </p>
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
