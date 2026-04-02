import React from 'react';
import { motion } from 'framer-motion';

const statsData = [
    { number: '15+', label: 'Years of Experience' },
    { number: '500+', label: 'Projects Delivered' },
    { number: '200+', label: 'Happy Clients' },
    { number: '50+', label: 'Expert Engineers' },
];

const Stats = () => {
    return (
        <div className="stats">
            {statsData.map((stat, index) => (
                <motion.div
                    key={index}
                    className="stat-item"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                >
                    <span className="stat-number">{stat.number}</span>
                    <span className="stat-label">{stat.label}</span>
                </motion.div>
            ))}
        </div>
    );
};

export default Stats;
