import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Award, Zap } from 'lucide-react';
import SEO from '../components/SEO';

const AboutPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const stats = [
        { icon: Users, label: 'Happy Clients', value: '50+' },
        { icon: Award, label: 'Years Experience', value: '15+' },
        { icon: Zap, label: 'Projects Completed', value: '200+' },
        { icon: Target, label: 'Countries Served', value: '10+' }
    ];

    return (
        <div style={{ paddingTop: '100px', minHeight: '80vh', paddingBottom: '60px' }}>
            <SEO
                title="About Us - Leading Software Company in Bangladesh Since 2007"
                description="Learn about Prime Technology of Bangladesh, the leading enterprise software company in Dhaka. 15+ years of experience, 200+ projects delivered, 50+ happy clients. ERP, POS, Hospital & School Management experts."
                keywords="about prime technology bangladesh, software company dhaka, IT company bangladesh, enterprise software company, best software company mirpur dhaka"
                path="/about"
            />
            <div className="section-header">
                <span className="badge">Our Story</span>
                <h2>About Prime Technology of Bangladesh</h2>
                <p>Empowering businesses through innovative software engineering since 2007.</p>
            </div>
            
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '24px', padding: '3rem', marginBottom: '4rem' }}
                >
                    <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Who We Are</h3>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                        Prime Technology of Bangladesh is the leading enterprise software company in Bangladesh. We specialize in architecting high-performance digital solutions, ranging from sophisticated ERP implementations and Point of Sale (POS) systems to custom-tailored healthcare and property management platforms.
                    </p>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.1rem' }}>
                        Our core philosophy revolves around delivering premium, scalable, and secure applications. By leveraging a modern tech stack and deep industry expertise, we ensure that every project we deliver acts as a fundamental catalyst for our clients' long-term business growth.
                    </p>
                </motion.div>

                <div 
                    style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                        gap: '2rem' 
                    }}
                >
                    {stats.map((stat, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            style={{ 
                                background: 'rgba(255, 255, 255, 0.02)', 
                                border: '1px solid rgba(255, 255, 255, 0.05)', 
                                borderRadius: '16px', 
                                padding: '2rem',
                                textAlign: 'center'
                            }}
                            className="service-card"
                        >
                            <stat.icon size={40} style={{ color: 'var(--accent)', marginBottom: '1rem', marginLeft: 'auto', marginRight: 'auto' }} />
                            <h4 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{stat.value}</h4>
                            <p style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
