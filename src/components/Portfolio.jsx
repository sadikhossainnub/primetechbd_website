import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';

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
                        key={project.id}
                        className="project-card"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <Link to={`/project/${project.id}`}>
                            <div className="project-img-container">
                                <img src={project.img} alt={project.title} className="project-img" />
                                <div className="project-overlay">
                                    <span>View Details</span>
                                </div>
                            </div>
                        </Link>
                        <div className="project-content">
                            <span className="project-tag">{project.category}</span>
                            <h3>{project.title}</h3>
                            <p>{project.desc}</p>
                            <Link to={`/project/${project.id}`} className="btn-secondary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>
                                View Details
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Portfolio;
