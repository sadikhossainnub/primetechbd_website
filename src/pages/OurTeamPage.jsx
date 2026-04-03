import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Linkedin, Twitter, Github, Code, Briefcase, Palette } from 'lucide-react';

const teamMembers = [
    {
        id: 1,
        name: 'Sadik Hossain',
        role: 'Chief Executive Officer',
        icon: Briefcase,
        socials: { linkedin: '#', twitter: '#' }
    },
    {
        id: 2,
        name: 'Sarah Rahman',
        role: 'Chief Technology Officer',
        icon: Code,
        socials: { linkedin: '#', github: '#' }
    },
    {
        id: 3,
        name: 'Arif Ahmed',
        role: 'Lead System Architect',
        icon: User,
        socials: { linkedin: '#', github: '#' }
    },
    {
        id: 4,
        name: 'Nadia Islam',
        role: 'Head of Product Design',
        icon: Palette,
        socials: { linkedin: '#', twitter: '#' }
    }
];

const OurTeamPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <div style={{ paddingTop: '100px', minHeight: '80vh', paddingBottom: '60px' }}>
            <div className="section-header">
                <span className="badge">The Masterminds</span>
                <h2>Our Team</h2>
                <p>Meet the visionary engineers, architects, and designers driving the future of enterprise software.</p>
            </div>
            
            <motion.div 
                style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {teamMembers.map((member) => (
                    <motion.div 
                        key={member.id}
                        variants={cardVariants}
                        whileHover={{ y: -10, scale: 1.02 }}
                        style={{ 
                            background: 'rgba(255, 255, 255, 0.03)', 
                            border: '1px solid rgba(255, 255, 255, 0.05)', 
                            borderRadius: '24px', 
                            padding: '3rem 2rem', 
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            position: 'relative', 
                            overflow: 'hidden' 
                        }}
                    >
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100px', background: 'linear-gradient(180deg, rgba(34, 211, 238, 0.1) 0%, transparent 100%)' }} />
                        
                        <div style={{ 
                            width: '120px', 
                            height: '120px', 
                            borderRadius: '50%', 
                            background: 'rgba(255, 255, 255, 0.05)', 
                            border: '2px solid var(--accent)', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            marginBottom: '1.5rem',
                            position: 'relative',
                            zIndex: 1,
                            boxShadow: '0 0 30px rgba(34, 211, 238, 0.1)'
                        }}>
                            <member.icon size={48} color="var(--accent)" />
                        </div>
                        
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)', position: 'relative', zIndex: 1 }}>{member.name}</h3>
                        <p style={{ color: 'var(--accent)', fontWeight: '600', fontSize: '0.9rem', marginBottom: '1.5rem', letterSpacing: '1px', textTransform: 'uppercase', position: 'relative', zIndex: 1 }}>
                            {member.role}
                        </p>
                        
                        <div style={{ display: 'flex', gap: '1rem', position: 'relative', zIndex: 1 }}>
                            {member.socials.linkedin && (
                                <a href={member.socials.linkedin} target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
                                    <Linkedin size={20} />
                                </a>
                            )}
                            {member.socials.twitter && (
                                <a href={member.socials.twitter} target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
                                    <Twitter size={20} />
                                </a>
                            )}
                            {member.socials.github && (
                                <a href={member.socials.github} target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
                                    <Github size={20} />
                                </a>
                            )}
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default OurTeamPage;
