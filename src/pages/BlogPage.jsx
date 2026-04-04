import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts as staticPosts } from '../data/blogPosts';
import SEO from '../components/SEO';
import { Calendar, User, ArrowRight, PenSquare, ArrowUpRight } from 'lucide-react';
import { db } from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

const BlogPage = () => {
    const [dynamicPosts, setDynamicPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        
        const q = query(collection(db, "blogSubmissions"), where("status", "==", "approved"));
        const unsubscribe = onSnapshot(q, (snap) => {
            const posts = snap.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                isDynamic: true,
                date: doc.data().createdAt?.toDate ? doc.data().createdAt.toDate().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Recently'
            }));
            setDynamicPosts(posts);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const allPosts = [...staticPosts, ...dynamicPosts].sort((a, b) => {
        const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date();
        const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date();
        return dateB - dateA;
    });

    return (
        <div style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--bg-dark)' }}>
            <SEO 
                title="Technology & ERP Blog - Insights from Prime Technology"
                description="Stay updated with the latest trends in ERP software, POS systems, and digital transformation in Bangladesh."
                keywords="ERP blog Bangladesh, software industry news Dhaka, ERPNext tips, Prime Technology blog"
                path="/blog"
            />
            
            <section className="blog-section">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '2rem' }}>
                    <div style={{ maxWidth: '600px' }}>
                        <span className="badge">Insights & Community</span>
                        <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Latest from <span>the Blog</span></h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Expert perspectives and community insights on software engineering and business growth.</p>
                    </div>
                    <Link to="/submit-blog" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '1rem 2rem' }}>
                        <PenSquare size={20} /> Write for Us <ArrowUpRight size={18} />
                    </Link>
                </div>

                <div className="portfolio-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2.5rem' }}>
                    {allPosts.map((post) => (
                        <article key={post.id} className="project-card" style={{ transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}>
                            <div className="project-img-container" style={{ borderRadius: '24px', overflow: 'hidden' }}>
                                <img src={post.image} alt={post.title} className="project-img" style={{ height: '260px' }} />
                                <div className="project-overlay">
                                    <Link to={`/blog/${post.id}`}>
                                        <span style={{ padding: '12px 24px', background: 'var(--accent)', color: 'var(--bg-dark)', borderRadius: '12px', fontWeight: '800' }}>Read Article</span>
                                    </Link>
                                </div>
                            </div>
                            <div className="project-content" style={{ padding: '2rem 1rem' }}>
                                <div style={{ display: 'flex', gap: '1.2rem', marginBottom: '1.2rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                        <Calendar size={14} color="var(--accent)" /> {post.date}
                                    </span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                        <User size={14} color="var(--accent)" /> {post.author}
                                    </span>
                                </div>
                                <span className="project-tag" style={{ marginBottom: '1rem' }}>{post.category}</span>
                                <h3 style={{ fontSize: '1.6rem', lineHeight: '1.4', marginBottom: '1rem' }}>{post.title}</h3>
                                <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1.5rem' }}>{post.excerpt}</p>
                                <Link to={`/blog/${post.id}`} style={{ color: 'var(--accent)', fontWeight: '700', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '2px solid transparent', width: 'fit-content', transition: '0.3s' }} onMouseOver={(e) => e.target.style.borderBottomColor = 'var(--accent)'} onMouseOut={(e) => e.target.style.borderBottomColor = 'transparent'}>
                                    Read Full Story <ArrowRight size={18} />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default BlogPage;
