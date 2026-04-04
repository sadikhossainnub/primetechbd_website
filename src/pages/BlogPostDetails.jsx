import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts as staticPosts } from '../data/blogPosts';
import SEO from '../components/SEO';
import { Calendar, User, ArrowLeft, Clock, Share2, Loader2 } from 'lucide-react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const BlogPostDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        
        const fetchPost = async () => {
            // Check static posts first
            const staticPost = staticPosts.find((b) => b.id === id);
            if (staticPost) {
                setPost(staticPost);
                setLoading(false);
                return;
            }

            // If not found, check Firestore
            try {
                const docRef = doc(db, "blogSubmissions", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setPost({
                        id: docSnap.id,
                        ...data,
                        date: data.createdAt?.toDate ? data.createdAt.toDate().toLocaleDateString() : 'Recently',
                        tags: data.tags || []
                    });
                }
            } catch (err) {
                console.error("Error fetching dynamic post:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (loading) {
        return (
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-dark)' }}>
                <Loader2 className="animate-spin" size={40} color="var(--accent)" />
            </div>
        );
    }

    if (!post) {
        return (
            <div style={{ padding: '200px 5%', textAlign: 'center', background: 'var(--bg-dark)', minHeight: '100vh' }}>
                <h2 style={{ color: 'white', marginBottom: '2rem' }}>Blog Post Not Found</h2>
                <Link to="/blog" className="btn-secondary">Back to Blog</Link>
            </div>
        );
    }

    return (
        <div style={{ paddingTop: '120px', minHeight: '100vh', background: 'var(--bg-dark)' }}>
            <SEO 
                title={`${post.title} | Blog`}
                description={post.excerpt}
                keywords={post.tags?.join(', ')}
                path={`/blog/${post.id}`}
            />

            <article style={{ maxWidth: '900px', margin: '0 auto', padding: '0 5% 100px' }}>
                <Link to="/blog" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)', marginBottom: '2rem', fontWeight: '500' }}>
                    <ArrowLeft size={18} /> Back to Insights
                </Link>

                <header style={{ marginBottom: '4rem' }}>
                    <span className="badge" style={{ marginBottom: '1.5rem' }}>{post.category}</span>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', lineHeight: '1.1' }}>{post.title}</h1>
                    
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '2rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <User size={18} color="var(--accent)" /> By {post.author}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Calendar size={18} color="var(--accent)" /> {post.date}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Clock size={16} color="var(--accent)" /> 5 min read
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} onClick={() => navigator.clipboard.writeText(window.location.href)}>
                            <Share2 size={16} color="var(--accent)" /> Share
                        </span>
                    </div>
                </header>

                <div style={{ borderRadius: '24px', overflow: 'hidden', marginBottom: '4rem', border: '1px solid var(--glass-border)' }}>
                    <img src={post.image} alt={post.title} style={{ width: '100%', height: 'auto', maxHeight: '500px', objectFit: 'cover', display: 'block' }} />
                </div>

                <div 
                    className="blog-content"
                    style={{ fontSize: '1.15rem', lineHeight: '1.9', color: 'rgba(255,255,255,0.8)' }}
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                <footer style={{ marginTop: '5rem', padding: '3rem', background: 'var(--bg-surface)', borderRadius: '24px', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
                    <h3 style={{ marginBottom: '1rem' }}>Interested in implementing ERP for your business?</h3>
                    <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>Get a free consultation with our experts at Prime Technology of Bangladesh.</p>
                    <Link to="/request" className="btn-primary" style={{ padding: '1rem 2.5rem' }}>Schedule a Demo</Link>
                </footer>
            </article>

            <style>{`
                .blog-content h2, .blog-content h3 { color: white; margin: 3rem 0 1.5rem; }
                .blog-content p { margin-bottom: 1.5rem; }
                .blog-content ul { margin-bottom: 2rem; padding-left: 1.5rem; }
                .blog-content li { margin-bottom: 1rem; }
                .blog-content img { max-width: 100%; border-radius: 16px; margin: 2rem 0; }
            `}</style>
        </div>
    );
};

export default BlogPostDetails;
