import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const words = ["Scalable", "Intelligent", "Innovative", "Reliable"];

const Hero = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 2500);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="hero" id="home">
            <motion.div
                className="hero-content"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
            >
                <motion.span
                    className="badge"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    Pioneering the Digital Frontier
                </motion.span>
                <h1>
                    Building <br />
                    <div style={{ height: '1.2em', display: 'inline-flex', alignItems: 'center' }}>
                        <AnimatePresence mode='wait'>
                            <motion.span
                                key={words[index]}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                style={{ color: 'var(--accent)', marginRight: '15px' }}
                            >
                                {words[index]}
                            </motion.span>
                        </AnimatePresence>
                    </div>
                    <br />
                    <span>Software Solutions</span>
                </h1>
                <p>Prime Tech Solutions Ltd. empowers global enterprises with high-performance software engineering and strategic digital transformation.</p>
                <div className="hero-btns">
                    <Link to="/request">
                        <motion.button
                            className="btn-primary"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{ border: 'none', cursor: 'pointer' }}
                        >
                            Request Quote
                        </motion.button>
                    </Link>
                    <a href="#services">
                        <motion.button
                            className="btn-secondary"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{ border: 'none', cursor: 'pointer' }}
                        >
                            Explore services
                        </motion.button>
                    </a>
                </div>
            </motion.div>
            <motion.div
                className="hero-visual"
                initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1.2, delay: 0.3 }}
            >
                <img src="/assets/hero.png" alt="Tech Visual" />
            </motion.div>
        </section>
    );
};

export default Hero;
