import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Smartphone, Globe, Database, Cloud, ShieldCheck, Building2, HeartPulse, Home, Factory } from 'lucide-react';

const services = [
    { icon: Code2, title: 'Custom Software', desc: 'Enterprise-grade solutions engineered for your specific business logic and scaling needs.' },
    { icon: Smartphone, title: 'Mobile Ecosystems', desc: 'Seamless iOS and Android experiences integrated with advanced backend infrastructures.' },
    { icon: Globe, title: 'Web Platforms', desc: 'High-availability web applications built on modern stacks like React, Node, and Next.js.' },
    { icon: Database, title: 'ERP & Analytics', desc: 'Data-driven management systems including our proprietary Prime CRM and Analytics.' },
    { icon: Building2, title: 'Hospital Management', desc: 'Integrated HMS for healthcare providers, covering patient care, billing, and pharmacy.' },
    { icon: HeartPulse, title: 'Health Care Solutions', desc: 'Next-gen telemedicine and digital health platforms for patient monitoring and diagnostics.' },
    { icon: Home, title: 'Property Management', desc: 'Smart real-estate solutions for automated leasing, maintenance, and tenant management.' },
    { icon: Factory, title: 'Manufacturing ERP', desc: 'Optimized production cycles, inventory control, and supply chain management for smart factories.' },
    { icon: Cloud, title: 'Cloud Infrastructure', desc: 'Secure, scalable cloud architecture and automated DevOps for zero-downtime operations.' },
    { icon: ShieldCheck, title: 'Cyber Security', desc: 'Robust security audits and implementation to protect your digital assets and user data.' },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Services = () => {
    return (
        <section id="services">
            <div className="section-header">
                <span className="badge">Our Core Expertise</span>
                <h2>Engineering the Future</h2>
                <p>We combine deep industry knowledge with cutting-edge technology to deliver solutions that give you a competitive edge.</p>
            </div>

            <motion.div
                className="services-grid"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {services.map((service, index) => (
                    <motion.div
                        key={index}
                        className="service-card"
                        variants={itemVariants}
                    >
                        <div className="service-icon">
                            {React.createElement(service.icon, { size: 32 })}
                        </div>
                        <h3>{service.title}</h3>
                        <p>{service.desc}</p>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default Services;
