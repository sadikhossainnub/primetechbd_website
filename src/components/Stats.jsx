import React from 'react';
import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';

const Counter = ({ value }) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    
    useEffect(() => {
        const controls = animate(count, parseInt(value), { duration: 2 });
        return controls.stop;
    }, [value, count]);

    return <motion.span>{rounded}</motion.span>;
};

const statsData = [
    { number: '15', suffix: '+', label: 'Years of Experience' },
    { number: '500', suffix: '+', label: 'Projects Delivered' },
    { number: '200', suffix: '+', label: 'Happy Clients' },
    { number: '50', suffix: '+', label: 'Expert Engineers' },
];

const Stats = () => {
    return (
        <section style={{ padding: '40px 8%', background: 'rgba(22, 24, 33, 0.3)' }}>
            <div className="stats" style={{ border: 'none', background: 'transparent', padding: '0' }}>
                {statsData.map((stat, index) => (
                    <motion.div
                        key={index}
                        className="stat-item"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <span className="stat-number">
                            <Counter value={stat.number} />
                            {stat.suffix}
                        </span>
                        <span className="stat-label">{stat.label}</span>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Stats;
