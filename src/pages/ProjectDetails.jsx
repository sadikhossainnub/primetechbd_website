import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Calendar, User, Tag } from 'lucide-react';
import { projects } from '../data/projects';

const ProjectDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const project = projects.find(p => p.id === id);

    // Scroll to top on load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!project) {
        return (
            <div className="section-header" style={{ height: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h2>Project Not Found</h2>
                <Link to="/" className="btn-primary" style={{ marginTop: '2rem' }}>Back to Home</Link>
            </div>
        );
    }

    return (
        <div className="project-details-page" style={{ paddingTop: '120px' }}>
            <section style={{ paddingBottom: '40px' }}>
                <Link to="/" className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '2rem' }}>
                    <ArrowLeft size={20} /> Back to Home
                </Link>

                <div className="project-header-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '4rem', alignItems: 'start' }}>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="badge">{project.category}</span>
                        <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>{project.title}</h1>
                        <p style={{ fontSize: '1.3rem', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '650px' }}>
                            {project.longDesc}
                        </p>

                        <div className="project-meta-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            <div className="meta-card" style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
                                <User size={24} color="var(--accent)" style={{ marginBottom: '1rem' }} />
                                <span style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Client</span>
                                <h4 style={{ fontSize: '1.2rem' }}>{project.client}</h4>
                            </div>
                            <div className="meta-card" style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
                                <Calendar size={24} color="var(--accent)" style={{ marginBottom: '1rem' }} />
                                <span style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Year</span>
                                <h4 style={{ fontSize: '1.2rem' }}>{project.year}</h4>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        style={{ position: 'sticky', top: '140px' }}
                    >
                        <div className="project-img-display" style={{ borderRadius: '32px', overflow: 'hidden', border: '1px solid var(--glass-border)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
                            <img src={project.img} alt={project.title} style={{ width: '100%', display: 'block' }} />
                        </div>
                    </motion.div>
                </div>
            </section>

            <section style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--glass-border)', marginTop: '4rem' }}>
                <div style={{ maxWidth: '1000px' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>Key Features & Capabilities</h2>
                    <div className="features-highlight-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                        {project.features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                style={{ display: 'flex', gap: '15px', alignItems: 'center', padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px' }}
                            >
                                <CheckCircle2 size={24} color="var(--accent)" />
                                <span style={{ fontSize: '1.1rem', fontWeight: '500' }}>{feature}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section style={{ textAlign: 'center', padding: '100px 8%' }}>
                <div className="cta-box" style={{ background: 'linear-gradient(135deg, var(--bg-surface) 0%, #0f172a 100%)', padding: '5rem', borderRadius: '40px', border: '1px solid var(--accent-glow)' }}>
                    <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Want a similar solution?</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
                        Let's discuss how we can tailor this technology to solve your specific business challenges.
                    </p>
                    <Link to="/request" className="btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1.1rem' }}>
                        Get Started Now
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default ProjectDetails;
