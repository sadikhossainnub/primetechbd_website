import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Target, Rocket, Compass, Zap } from 'lucide-react';

const VisionMissionPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [activeTab, setActiveTab] = useState('vision');

    const tabs = [
        { id: 'vision', label: 'Our Vision', icon: Eye },
        { id: 'mission', label: 'Our Mission', icon: Target },
        { id: 'values', label: 'Core Values', icon: Zap }
    ];

    const tabVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
    };

    return (
        <div style={{ paddingTop: '100px', minHeight: '80vh', paddingBottom: '60px' }}>
            <div className="section-header">
                <span className="badge">Our Purpose</span>
                <h2>Vision & Mission</h2>
                <p>Driving digital transformation through focused objectives and a clear outlook.</p>
            </div>
            
            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 2rem' }}>
                
                {/* Tabs Navigation */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
                    {tabs.map(tab => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.8rem',
                                    padding: '1rem 2rem',
                                    backgroundColor: isActive ? 'var(--accent)' : 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid',
                                    borderColor: isActive ? 'var(--accent)' : 'rgba(255, 255, 255, 0.1)',
                                    borderRadius: '50px',
                                    color: isActive ? '#fff' : 'var(--text-secondary)',
                                    fontSize: '1.1rem',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <Icon size={20} />
                                {tab.label}
                            </button>
                        )
                    })}
                </div>

                {/* Tab Content */}
                <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '24px', padding: '4rem', minHeight: '400px', position: 'relative', overflow: 'hidden' }}>
                    <AnimatePresence mode="wait">
                        {activeTab === 'vision' && (
                            <motion.div key="vision" variants={tabVariants} initial="hidden" animate="visible" exit="exit" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                <div style={{ position: 'absolute', top: '-10px', right: '-10px', opacity: 0.03, transform: 'rotate(15deg)' }}>
                                    <Eye size={300} />
                                </div>
                                <Eye size={64} style={{ color: 'var(--accent)', marginBottom: '2rem' }} />
                                <h3 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Our Vision</h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.9', fontSize: '1.2rem', maxWidth: '800px' }}>
                                    At Prime Technology Solutions Ltd, our ultimate vision is to be the globally recognized vanguard in enterprise software engineering, bridging the crucial gap between limitless human potential and cutting-edge technological capability. We envision a future where complex administrative, industrial, and social challenges are effortlessly resolved through intuitive, automated, and hyper-scalable digital ecosystems. By consistently anticipating tomorrow’s technological landscapes, our goal is to empower organizations of every size, enabling them to build a smarter, more efficient, and hyper-connected business world that thrives on intelligent automation and seamless digital integration.
                                </p>
                            </motion.div>
                        )}

                        {activeTab === 'mission' && (
                            <motion.div key="mission" variants={tabVariants} initial="hidden" animate="visible" exit="exit" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                <div style={{ position: 'absolute', top: '-10px', right: '-10px', opacity: 0.03, transform: 'rotate(-15deg)' }}>
                                    <Target size={300} />
                                </div>
                                <Target size={64} style={{ color: 'var(--accent)', marginBottom: '2rem' }} />
                                <h3 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Our Mission</h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.9', fontSize: '1.2rem', maxWidth: '800px' }}>
                                    Our mission at Prime Technology is to meticulously architect, deploy, and maintain premium software infrastructures that decisively solve critical industry operations. We are dedicated to delivering bespoke solutions—from comprehensive ERP platforms to intricate healthcare systems—that serve as the backbone for operational excellence. We commit to a relentless pursuit of continuous innovation, adhering to the highest international security standards, and providing unparalleled, round-the-clock client support. By transforming complex data variables into actionable technological assets, we consistently foster digital self-reliance and sustainable growth for modern businesses globally.
                                </p>
                            </motion.div>
                        )}

                        {activeTab === 'values' && (
                            <motion.div key="values" variants={tabVariants} initial="hidden" animate="visible" exit="exit" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                <div style={{ position: 'absolute', top: '-10px', right: '-10px', opacity: 0.03, transform: 'rotate(10deg)' }}>
                                    <Zap size={300} />
                                </div>
                                <h3 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Core Values</h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.9', fontSize: '1.2rem', maxWidth: '800px', marginBottom: '3rem' }}>
                                    We operate deeply on the unshakeable principles of transparency, accountability, and engineering brilliance. These foundational properties act as our internal compass for every line of code we push and every interface we map out. Innovation dictates our strategy, driving us to challenge technological limits, while an uncompromising dedication to integrity ensures absolute trust and reliability in all our client partnerships.
                                </p>
                                <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ padding: '1.5rem', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                                            <Rocket size={32} color="var(--accent)" />
                                        </div>
                                        <span style={{ fontSize: '1.2rem', color: 'white', fontWeight: '500' }}>Innovation First</span>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ padding: '1.5rem', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                                            <Compass size={32} color="var(--accent)" />
                                        </div>
                                        <span style={{ fontSize: '1.2rem', color: 'white', fontWeight: '500' }}>Integrity & Trust</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </div>
    );
};

export default VisionMissionPage;
