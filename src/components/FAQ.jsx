import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    {
        question: "What industries do you specialize in?",
        answer: "We specialize in a wide range of industries including Manufacturing, Retail, Healthcare, Education, and E-commerce. Our PERP and PPOS solutions are highly customizable to fit your specific business needs."
    },
    {
        question: "Do you provide after-sales support?",
        answer: "Yes, we provide 24/7 dedicated support and maintenance services. Our team ensures your systems are always up-to-date and running smoothly."
    },
    {
        question: "Can your software integrate with existing systems?",
        answer: "Absolutely. Our solutions are designed with integration in mind. We can sync with your existing GDS, payment gateways, or third-party APIs seamlessly."
    },
    {
        question: "How secure is my data in your Cloud solutions?",
        answer: "Data security is our top priority. We use enterprise-grade encryption, regular backups, and multi-factor authentication to ensure your business data is protected."
    }
];

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <section id="faq" style={{ background: 'rgba(22, 24, 33, 0.2)' }}>
            <div className="section-header">
                <span className="badge">Knowledge Base</span>
                <h2>Frequently Asked Questions</h2>
                <p>Find answers to common queries about our services and solutions.</p>
            </div>
            
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                {faqs.map((faq, index) => (
                    <div 
                        key={index} 
                        style={{ 
                            marginBottom: '1rem', 
                            background: 'var(--bg-surface)', 
                            borderRadius: '16px', 
                            border: '1px solid var(--glass-border)',
                            overflow: 'hidden'
                        }}
                    >
                        <button 
                            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                            style={{
                                width: '100%',
                                padding: '1.5rem 2rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                background: 'transparent',
                                border: 'none',
                                color: 'white',
                                cursor: 'pointer',
                                textAlign: 'left',
                                fontSize: '1.1rem',
                                fontWeight: '600'
                            }}
                        >
                            {faq.question}
                            {activeIndex === index ? <Minus size={20} color="var(--accent)" /> : <Plus size={20} />}
                        </button>
                        <AnimatePresence>
                            {activeIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div style={{ padding: '0 2rem 1.5rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                                        {faq.answer}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FAQ;
