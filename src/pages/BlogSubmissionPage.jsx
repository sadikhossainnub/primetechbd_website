import React, { useState, useEffect } from 'react';
import { db, storage } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { motion } from 'framer-motion';
import { Send, Image as ImageIcon, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import SEO from '../components/SEO';

const BlogSubmissionPage = () => {
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        author: '',
        category: 'Tech Insights',
        tags: ''
    });
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // 'success', 'error'
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
            setPreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            let imageUrl = 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=1000'; // Default
            
            if (image) {
                const storageRef = ref(storage, `blog_thumbnails/${Date.now()}_${image.name}`);
                await uploadBytes(storageRef, image);
                imageUrl = await getDownloadURL(storageRef);
            }

            await addDoc(collection(db, 'blogSubmissions'), {
                ...formData,
                image: imageUrl,
                tags: formData.tags.split(',').map(tag => tag.trim()),
                status: 'pending',
                createdAt: serverTimestamp(),
            });

            setStatus('success');
            setFormData({ title: '', excerpt: '', content: '', author: '', category: 'Tech Insights', tags: '' });
            setImage(null);
            setPreview(null);
        } catch (error) {
            console.error("Error submitting blog:", error);
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ paddingTop: '120px', minHeight: '100vh', background: 'var(--bg-dark)' }}>
            <SEO 
                title="Write for Us - Submit a Blog Post"
                description="Share your tech insights with our community. Submit your guest post to Prime Technology of Bangladesh."
                keywords="guest post Bangladesh, submit blog, tech writing Dhaka, ERP software insights"
                path="/submit-blog"
            />

            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 5% 100px' }}>
                <div className="section-header" style={{ textAlign: 'left', marginBottom: '3rem' }}>
                    <span className="badge">Community Contribution</span>
                    <h2 style={{ fontSize: '2.5rem' }}>Submit a <span>Blog Post</span></h2>
                    <p>Share your knowledge about ERP, technology, and business innovation in Bangladesh.</p>
                </div>

                {status === 'success' && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', color: '#10b981', padding: '1.5rem', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}
                    >
                        <CheckCircle /> Post submitted successfully! It will be live after admin review.
                    </motion.div>
                )}

                {status === 'error' && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#ef4444', padding: '1.5rem', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}
                    >
                        <AlertCircle /> Something went wrong. Please try again later.
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} style={{ background: 'var(--bg-surface)', padding: '3rem', borderRadius: '32px', border: '1px solid var(--glass-border)', display: 'grid', gap: '2rem' }}>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <div className="form-group">
                            <label>Blog Title *</label>
                            <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required placeholder="e.g. The Future of ERPNext in Dhaka" />
                        </div>
                        <div className="form-group">
                            <label>Author Name *</label>
                            <input type="text" value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})} required placeholder="Your full name" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Short Excerpt *</label>
                        <input type="text" value={formData.excerpt} onChange={(e) => setFormData({...formData, excerpt: e.target.value})} required placeholder="Brief summary of your post" />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <div className="form-group">
                            <label>Category</label>
                            <select 
                                value={formData.category} 
                                onChange={(e) => setFormData({...formData, category: e.target.value})}
                                style={{ width: '100%', padding: '1.25rem', background: 'rgba(0, 0, 0, 0.3)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'white' }}
                            >
                                <option>Tech Insights</option>
                                <option>ERP Solutions</option>
                                <option>Business Growth</option>
                                <option>Digital Marketing</option>
                                <option>Tutorials</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Tags (Comma separated)</label>
                            <input type="text" value={formData.tags} onChange={(e) => setFormData({...formData, tags: e.target.value})} placeholder="ERP, Business, Tech" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Cover Image</label>
                        <div style={{ border: '2px dashed var(--glass-border)', borderRadius: '16px', padding: '2rem', textAlign: 'center', cursor: 'pointer', position: 'relative' }}>
                            {preview ? (
                                <img src={preview} alt="Preview" style={{ maxWidth: '100%', height: '200px', objectFit: 'cover', borderRadius: '12px' }} />
                            ) : (
                                <div style={{ color: 'var(--text-secondary)' }}>
                                    <ImageIcon size={40} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                                    <p>Click or drag image to upload</p>
                                </div>
                            )}
                            <input type="file" onChange={handleImageChange} accept="image/*" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Full Content (HTML allowed) *</label>
                        <textarea 
                            rows="10" 
                            value={formData.content} 
                            onChange={(e) => setFormData({...formData, content: e.target.value})} 
                            required 
                            placeholder="Write your article here..."
                        ></textarea>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="btn-primary" 
                        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem' }}
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <Send size={20} />}
                        {loading ? 'Submitting...' : 'Submit Post for Review'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BlogSubmissionPage;
