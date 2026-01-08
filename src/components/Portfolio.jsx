import React from 'react';
import { motion } from 'framer-motion';

const projects = [
    {
        title: 'Synapse CRM',
        category: 'Enterprise Solution',
        desc: 'An AI-powered Customer Relationship Management system for retail giants.',
        img: '/assets/project_crm.png',
    },
    {
        title: 'EduPrime LMS',
        category: 'Education Tech',
        desc: 'Next-gen Learning Management System serving 50+ schools in Bangladesh.',
        img: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80',
    },
    {
        title: 'SkyTrack OTA',
        category: 'Travel & Tourism',
        desc: 'Real-time flight and hotel booking engine with global API integration.',
        img: 'https://images.unsplash.com/photo-1436491865332-7a61a109c05d?auto=format&fit=crop&w=800&q=80',
    }
];

const Portfolio = () => {
    return (
        <section id="solutions">
            <div className="section-header">
                <span className="badge">Our Portfolio</span>
                <h2>Impactful Digital Products</h2>
                <p>Selected projects that demonstrate our commitment to innovation and engineering excellence.</p>
            </div>

            <div className="portfolio-grid">
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        className="project-card"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <img src={project.img} alt={project.title} className="project-img" />
                        <div className="project-content">
                            <span className="project-tag">{project.category}</span>
                            <h3>{project.title}</h3>
                            <p>{project.desc}</p>
                            <a href="#" className="btn-secondary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>Case Study</a>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Portfolio;
