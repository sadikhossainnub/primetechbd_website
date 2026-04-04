import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import SEO from '../components/SEO';
import { Calendar, User, ArrowRight } from 'lucide-react';

const BlogPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
            <SEO 
                title="Technology & ERP Blog - Insights from Prime Technology"
                description="Stay updated with the latest trends in ERP software, POS systems, and digital transformation in Bangladesh. Insights from our experts at Prime Technology."
                keywords="ERP blog Bangladesh, software industry news Dhaka, ERPNext tips, Odoo updates, Prime Technology blog"
                path="/blog"
            />
            
            <section className="blog-section">
                <div className="section-header">
                    <span className="badge">Our Insights</span>
                    <h2>Latest from <span>the Blog</span></h2>
                    <p>Expert perspectives on software engineering, ERP implementation, and the future of tech in Bangladesh.</p>
                </div>

                <div className="portfolio-grid">
                    {blogPosts.map((post) => (
                        <article key={post.id} className="project-card">
                            <div className="project-img-container">
                                <img src={post.image} alt={post.title} className="project-img" />
                                <div className="project-overlay">
                                    <Link to={`/blog/${post.id}`}>
                                        <span>Read Full Article</span>
                                    </Link>
                                </div>
                            </div>
                            <div className="project-content">
                                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                        <Calendar size={14} /> {post.date}
                                    </span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                        <User size={14} /> {post.author}
                                    </span>
                                </div>
                                <span className="project-tag">{post.category}</span>
                                <h3 style={{ fontSize: '1.4rem' }}>{post.title}</h3>
                                <p style={{ fontSize: '0.95rem' }}>{post.excerpt}</p>
                                <Link to={`/blog/${post.id}`} style={{ color: 'var(--accent)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    Read More <ArrowRight size={16} />
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
