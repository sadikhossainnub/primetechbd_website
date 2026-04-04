import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    LayoutDashboard, Users, Briefcase, Settings, LogOut,
    TrendingUp, MessageSquare, Clock, ArrowUpRight, Search,
    Filter, MoreVertical, ExternalLink
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quoteRequests, setQuoteRequests] = useState([]);

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

    // Real-time listener for Quote Requests
    useEffect(() => {
        if (!user) return;

        const q = query(collection(db, "quoteRequests"), orderBy("createdAt", "desc"), limit(10));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const requests = [];
            querySnapshot.forEach((doc) => {
                requests.push({ id: doc.id, ...doc.data() });
            });
            setQuoteRequests(requests);
        }, (error) => {
            console.error("Error fetching quotes:", error);
        });

        return () => unsubscribe();
    }, [user]);

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
        { label: 'Active Projects', value: '5', icon: Briefcase, change: '+2', color: '#10b981' },
        { label: 'Cloud Status', value: 'Connected', icon: TrendingUp, change: 'Sync', color: '#f59e0b' },
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
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Logged in as:</p>
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
                    Secure Logout
                </button>
            </aside>

            {/* Main Content */}
            <main style={{ marginLeft: '280px', flex: 1, padding: '2.5rem 3rem' }}>

                {/* Header */}
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>
                            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                        </h1>
                        <p style={{ color: 'var(--text-secondary)' }}>Welcome back, Authorized {user?.email?.split('@')[0]}</p>
                    </div>
                </header>

                {activeTab === 'overview' && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        {/* Stats Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                            {stats.map((stat, i) => (
                                <div key={i} style={{ background: 'var(--bg-surface)', padding: '2rem', borderRadius: '24px', border: '1px solid var(--glass-border)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                        <div style={{ color: stat.color, background: `${stat.color}15`, padding: '12px', borderRadius: '15px' }}>
                                            <stat.icon size={26} />
                                        </div>
                                        <span style={{ color: '#10b981', fontSize: '0.8rem', fontWeight: '700' }}>
                                            {stat.change}
                                        </span>
                                    </div>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{stat.label}</p>
                                    <h3 style={{ fontSize: '2rem', fontWeight: '800' }}>{stat.value}</h3>
                                </div>
                            ))}
                        </div>

                        {/* Recent Leads Table */}
                        <div style={{ background: 'var(--bg-surface)', borderRadius: '24px', border: '1px solid var(--glass-border)', padding: '2.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                <h3 style={{ fontSize: '1.4rem' }}>Recent Quote Requests</h3>
                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                    Showing last {quoteRequests.length} inquiries
                                </div>
                            </div>

                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                            <th style={{ padding: '1rem' }}>CONTACT</th>
                                            <th style={{ padding: '1rem' }}>BUSINESS/SERVICE</th>
                                            <th style={{ padding: '1rem' }}>MESSAGE</th>
                                            <th style={{ padding: '1rem' }}>DATE</th>
                                            <th style={{ padding: '1rem' }}>ACTION</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {quoteRequests.map((req) => (
                                            <tr key={req.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', fontSize: '0.95rem' }}>
                                                <td style={{ padding: '1.5rem 1rem' }}>
                                                    <div style={{ fontWeight: '600' }}>{req.name}</div>
                                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{req.email}</div>
                                                </td>
                                                <td style={{ padding: '1.5rem 1rem' }}>
                                                    <div style={{ color: 'var(--accent)' }}>{req.serviceType || 'Custom Software'}</div>
                                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{req.companyName}</div>
                                                </td>
                                                <td style={{ padding: '1.5rem 1rem' }}>
                                                    <div style={{ maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                        {req.projectDetails || req.message}
                                                    </div>
                                                </td>
                                                <td style={{ padding: '1.5rem 1rem' }}>
                                                    {req.createdAt?.toDate ? req.createdAt.toDate().toLocaleDateString() : 'Just now'}
                                                </td>
                                                <td style={{ padding: '1.5rem 1rem' }}>
                                                    <button style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                                                        <ExternalLink size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        {quoteRequests.length === 0 && (
                                            <tr>
                                                <td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                                                    No inquiries found yet. Connect your "Request Quote" form to Firestore to see data here.
                                                </td>
                                            </tr>
                                        )}
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
