import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    LayoutDashboard, Users, Briefcase, Settings, LogOut,
    TrendingUp, MessageSquare, Clock, ArrowUpRight, Search,
    Filter, MoreVertical, ExternalLink, PenTool, Check, X, Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, query, orderBy, limit, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quoteRequests, setQuoteRequests] = useState([]);
    const [blogSubmissions, setBlogSubmissions] = useState([]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                navigate('/admin/login');
            } else {
                setUser(currentUser);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [navigate]);

    // Real-time listener for Quote Requests & Blog Submissions
    useEffect(() => {
        if (!user) return;

        const qQuotes = query(collection(db, "quoteRequests"), orderBy("createdAt", "desc"), limit(20));
        const unsubscribeQuotes = onSnapshot(qQuotes, (snap) => {
            setQuoteRequests(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        const qBlogs = query(collection(db, "blogSubmissions"), orderBy("createdAt", "desc"));
        const unsubscribeBlogs = onSnapshot(qBlogs, (snap) => {
            setBlogSubmissions(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        return () => {
            unsubscribeQuotes();
            unsubscribeBlogs();
        };
    }, [user]);

    const handleBlogStatus = async (blogId, newStatus) => {
        try {
            await updateDoc(doc(db, 'blogSubmissions', blogId), { status: newStatus });
        } catch (err) {
            console.error("Error updating blog status:", err);
        }
    };

    const deleteBlog = async (blogId) => {
        if (window.confirm('Are you sure you want to delete this submission?')) {
            await deleteDoc(doc(db, 'blogSubmissions', blogId));
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/admin/login');
        } catch (err) {
            console.error("Logout error:", err);
        }
    };

    if (loading) return <div style={{ background: '#05060a', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>Authenticating...</div>;

    const stats = [
        { label: 'Total Inquiries', value: quoteRequests.length.toString(), icon: MessageSquare, change: 'Live', color: '#3b82f6' },
        { label: 'Blog Pending', value: blogSubmissions.filter(b => b.status === 'pending').length.toString(), icon: PenTool, change: 'Queue', color: '#f59e0b' },
        { label: 'Active Projects', value: '5', icon: Briefcase, change: '+2', color: '#10b981' },
        { label: 'Admin Session', value: 'Active', icon: Clock, change: 'Encrypted', color: '#8b5cf6' },
    ];

    return (
        <div className="admin-dashboard-container" style={{ display: 'flex', minHeight: '100vh', background: '#05060a' }}>

            {/* Sidebar */}
            <aside style={{
                width: '280px',
                background: 'rgba(5, 6, 10, 0.95)',
                borderRight: '1px solid var(--glass-border)',
                display: 'flex',
                flexDirection: 'column',
                padding: '2rem 1.5rem',
                position: 'fixed',
                height: '100vh',
                zIndex: 10
            }}>
                <div className="logo" style={{ marginBottom: '3rem', paddingLeft: '0.5rem' }}>
                    <span style={{ fontWeight: '800', fontSize: '1.4rem' }}>PRIME <span style={{ color: 'var(--accent)' }}>ADMIN</span></span>
                </div>

                <nav style={{ flex: 1 }}>
                    <ul style={{ display: 'grid', gap: '0.5rem' }}>
                        {[
                            { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
                            { id: 'leads', icon: Users, label: 'Quote Requests' },
                            { id: 'blogs', icon: PenTool, label: 'Blog Management' },
                            { id: 'projects', icon: Briefcase, label: 'Projects' },
                            { id: 'settings', icon: Settings, label: 'Settings' },
                        ].map((item) => (
                            <li key={item.id}>
                                <button
                                    onClick={() => setActiveTab(item.id)}
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        padding: '1rem',
                                        borderRadius: '12px',
                                        background: activeTab === item.id ? 'rgba(34, 211, 238, 0.1)' : 'transparent',
                                        color: activeTab === item.id ? 'var(--accent)' : 'var(--text-secondary)',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontWeight: '600',
                                        transition: 'all 0.3s'
                                    }}
                                >
                                    <item.icon size={20} />
                                    {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', marginBottom: '1rem' }}>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Admin Active:</p>
                    <p style={{ fontSize: '0.85rem', color: 'white', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.email}</p>
                </div>

                <button
                    onClick={handleLogout}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '1rem',
                        color: '#ef4444',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: '600'
                    }}
                >
                    <LogOut size={20} />
                    Logout
                </button>
            </aside>

            {/* Main Content */}
            <main style={{ marginLeft: '280px', flex: 1, padding: '2.5rem 3rem' }}>

                {/* Content Header */}
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>
                            {activeTab === 'overview' ? 'Dashboard Overview' : 
                             activeTab === 'leads' ? 'Quote Requests' : 
                             activeTab === 'blogs' ? 'Blog Management' : 
                             activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                        </h1>
                        <p style={{ color: 'var(--text-secondary)' }}>Managing Prime Technology of Bangladesh Assets</p>
                    </div>
                </header>

                {activeTab === 'overview' && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                            {stats.map((stat, i) => (
                                <div key={i} style={{ background: 'var(--bg-surface)', padding: '2rem', borderRadius: '24px', border: '1px solid var(--glass-border)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                        <div style={{ color: stat.color, background: `${stat.color}15`, padding: '12px', borderRadius: '15px' }}>
                                            <stat.icon size={26} />
                                        </div>
                                        <span style={{ color: '#10b981', fontSize: '0.8rem', fontWeight: '700' }}>{stat.change}</span>
                                    </div>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{stat.label}</p>
                                    <h3 style={{ fontSize: '2rem', fontWeight: '800' }}>{stat.value}</h3>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {activeTab === 'blogs' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div style={{ background: 'var(--bg-surface)', borderRadius: '24px', border: '1px solid var(--glass-border)', padding: '2.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                <h3>Pending & Approved Submissions</h3>
                            </div>
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                            <th style={{ padding: '1rem' }}>POST INFO</th>
                                            <th style={{ padding: '1rem' }}>CATEGORY/TAGS</th>
                                            <th style={{ padding: '1rem' }}>STATUS</th>
                                            <th style={{ padding: '1rem' }}>SUBMITTED ON</th>
                                            <th style={{ padding: '1rem' }}>ACTIONS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {blogSubmissions.map((blog) => (
                                            <tr key={blog.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                                <td style={{ padding: '1.5rem 1rem' }}>
                                                    <div style={{ fontWeight: '600', color: 'white' }}>{blog.title}</div>
                                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>by {blog.author}</div>
                                                </td>
                                                <td style={{ padding: '1.5rem 1rem' }}>
                                                    <div style={{ color: 'var(--accent)', fontSize: '0.9rem' }}>{blog.category}</div>
                                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{blog.tags?.join(', ')}</div>
                                                </td>
                                                <td style={{ padding: '1.5rem 1rem' }}>
                                                    <span style={{ 
                                                        padding: '4px 12px', 
                                                        borderRadius: '20px', 
                                                        fontSize: '0.75rem',
                                                        fontWeight: '700',
                                                        background: blog.status === 'approved' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                                                        color: blog.status === 'approved' ? '#10b981' : '#f59e0b'
                                                    }}>
                                                        {blog.status.toUpperCase()}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '1.5rem 1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                                    {blog.createdAt?.toDate ? blog.createdAt.toDate().toLocaleDateString() : 'Syncing...'}
                                                </td>
                                                <td style={{ padding: '1.5rem 1rem' }}>
                                                    <div style={{ display: 'flex', gap: '10px' }}>
                                                        {blog.status !== 'approved' && (
                                                            <button 
                                                                onClick={() => handleBlogStatus(blog.id, 'approved')} 
                                                                style={{ background: 'rgba(16, 185, 129, 0.1)', border: 'none', color: '#10b981', padding: '8px', borderRadius: '8px', cursor: 'pointer', transition: '0.3s' }}
                                                                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)'}
                                                                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)'}
                                                            >
                                                                <Check size={18} />
                                                            </button>
                                                        )}
                                                        <button 
                                                            onClick={() => deleteBlog(blog.id)} 
                                                            style={{ background: 'rgba(239, 68, 68, 0.1)', border: 'none', color: '#ef4444', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}
                                                        >
                                                            <X size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'leads' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div style={{ background: 'var(--bg-surface)', borderRadius: '24px', border: '1px solid var(--glass-border)', padding: '2.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                <h3 style={{ fontSize: '1.4rem' }}>Inbound Quote Requests</h3>
                            </div>
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                            <th style={{ padding: '1rem' }}>CONTACT</th>
                                            <th style={{ padding: '1rem' }}>BUSINESS/SERVICE</th>
                                            <th style={{ padding: '1rem' }}>PROJECT DETAILS</th>
                                            <th style={{ padding: '1rem' }}>DATE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {quoteRequests.map((req) => (
                                            <tr key={req.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                                <td style={{ padding: '1.5rem 1rem' }}>
                                                    <div style={{ fontWeight: '600' }}>{req.name}</div>
                                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{req.email}</div>
                                                </td>
                                                <td style={{ padding: '1.5rem 1rem' }}>
                                                    <div style={{ color: 'var(--accent)' }}>{req.serviceType || 'General Inquiry'}</div>
                                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{req.companyName || 'Private Client'}</div>
                                                </td>
                                                <td style={{ padding: '1.5rem 1rem' }}>
                                                    <div style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                                        {req.projectDetails || req.message}
                                                    </div>
                                                </td>
                                                <td style={{ padding: '1.5rem 1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                                    {req.createdAt?.toDate ? req.createdAt.toDate().toLocaleDateString() : 'New'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
