import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Send } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Contact = () => {
    const [formState, setFormState] = useState('idle');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormState('sending');

        try {
            await addDoc(collection(db, 'contact_messages'), {
                ...formData,
                timestamp: serverTimestamp(),
                status: 'unread'
            });

            setFormState('sent');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setFormState('idle'), 3000);
        } catch (error) {
            console.error('Error saving contact message:', error);
            setFormState('idle');
            alert('Failed to send message. Please try again.');
        }
    };

    return (
        <section id="contact">
            <div className="section-header">
                <span className="badge">Partnership</span>
                <h2>Ready to Build Something Great?</h2>
                <p>Whether you're a startup or an enterprise, we're here to help you navigate the digital landscape.</p>
            </div>

            <div className="contact-container">
                <motion.div
                    className="contact-info"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h3>Let's Connect</h3>
                    <div className="contact-item">
                        <MapPin size={28} />
                        <div>
                            <strong>Headquarters</strong>
                            <p>House# 7, Lane# 23, Block C, Avenue 5, Mirpur 11, Dhaka-1216</p>
                        </div>
                    </div>
                    <div className="contact-item">
                        <Mail size={28} />
                        <div>
                            <strong>Email Us</strong>
                            <p>info@primetechbd.xyz</p>
                        </div>
                    </div>
                    <div className="contact-item">
                        <Phone size={28} />
                        <div>
                            <strong>Call Us</strong>
                            <p>+8809696221112</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="contact-form"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                placeholder="name@company.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Project Details</label>
                            <textarea
                                rows="4"
                                placeholder="Tell us about your requirements..."
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="btn-primary"
                            style={{
                                width: '100%',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '12px',
                                background: formState === 'sent' ? '#10b981' : 'var(--accent)'
                            }}
                            disabled={formState === 'sending'}
                        >
                            {formState === 'idle' && <><Send size={20} /> Send Message</>}
                            {formState === 'sending' && 'Initializing...'}
                            {formState === 'sent' && 'Sent Successfully!'}
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
