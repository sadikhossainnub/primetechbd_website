import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    LayoutDashboard, Users, Briefcase, Settings, LogOut,
    TrendingUp, MessageSquare, Clock, ArrowUpRight, Search,
    Filter, MoreVertical, ExternalLink
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        const auth = localStorage.getItem('isAdminAuthenticated');
        if (!auth) navigate('/admin/login');
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('isAdminAuthenticated');
        navigate('/admin/login');
    };

    const stats = [
        { label: 'Total Leads', value: '124', icon: MessageSquare, change: '+12%', color: '#3b82f6' },
        { label: 'Active Projects', value: '18', icon: Briefcase, change: '+2', color: '#10b981' },
        { label: 'Est. Revenue', value: '4.2M', icon: TrendingUp, change: '+18%', color: '#f59e0b' },
        { label: 'Pending Quotes', value: '09', icon: Clock, change: '-3%', color: '#8b5cf6' },
    ];

    const mockLeads = [
        { id: 1, name: 'Tanvir Ahmed', company: 'Dhaka Textiles Ltd', service: 'ERP Solution', budget: '10L - 15L', date: '2 hours ago', status: 'New' },
        { id: 2, name: 'Sarah Islam', company: 'EduVenture', service: 'School Management', budget: '2L - 5L', date: '5 hours ago', status: 'Contacted' },
        { id: 3, name: 'Rafiqul Karim', company: 'Modern Hospital', service: 'Hospital Management', budget: '20L+', date: 'Yesterday', status: 'Pending' },
        { id: 4, name: 'Mahrin Sultana', company: 'SkyLine Real Estate', service: 'Property Management', budget: '5L - 8L', date: '2 days ago', status: 'Qualified' },
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
                        fontWeight: '600',
                        marginTop: 'auto'
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
                        <p style={{ color: 'var(--text-secondary)' }}>Welcome back to the Command Center.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        <div style={{ position: 'relative' }}>
                            <Search size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                            <input
                                type="text"
                                placeholder="Search leads..."
                                style={{ padding: '0.8rem 1rem 0.8rem 3rem', background: 'var(--bg-surface)', border: '1px solid var(--glass-border)', borderRadius: '10px', color: 'white', width: '250px' }}
                            />
                        </div>
                        <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--bg-dark)', fontWeight: '800' }}>AD</div>
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
                                        <span style={{ color: stat.change.startsWith('+') ? '#10b981' : '#ef4444', fontSize: '0.9rem', fontWeight: '700' }}>
                                            {stat.change} <ArrowUpRight size={14} style={{ display: 'inline' }} />
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
                                <button style={{ padding: '0.6rem 1.2rem', background: 'var(--glass)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                    <Filter size={16} /> Filter
                                </button>
                            </div>

                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                            <th style={{ padding: '1rem' }}>CONTACT</th>
                                            <th style={{ padding: '1rem' }}>BUSINESS/SERVICE</th>
                                            <th style={{ padding: '1rem' }}>EST. BUDGET</th>
                                            <th style={{ padding: '1rem' }}>STATUS</th>
                                            <th style={{ padding: '1rem' }}>ACTION</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {mockLeads.map((lead) => (
                                            <tr key={lead.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', fontSize: '0.95rem' }}>
                                                <td style={{ padding: '1.5rem 1rem' }}>
                                                    <div style={{ fontWeight: '600' }}>{lead.name}</div>
                                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{lead.company}</div>
                                                </td>
                                                <td style={{ padding: '1.5rem 1rem' }}>
                                                    <div style={{ color: 'var(--accent)' }}>{lead.service}</div>
                                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{lead.date}</div>
                                                </td>
                                                <td style={{ padding: '1.5rem 1rem', fontWeight: '700' }}>{lead.budget} TK</td>
                                                <td style={{ padding: '1.5rem 1rem' }}>
                                                    <span style={{
                                                        padding: '4px 12px',
                                                        borderRadius: '50px',
                                                        fontSize: '0.8rem',
                                                        background: lead.status === 'New' ? '#3b82f620' : '#10b98120',
                                                        color: lead.status === 'New' ? '#3b82f6' : '#10b981',
                                                        border: `1px solid ${lead.status === 'New' ? '#3b82f630' : '#10b98130'}`
                                                    }}>
                                                        {lead.status}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '1.5rem 1rem' }}>
                                                    <button style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                                                        <ExternalLink size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab !== 'overview' && (
                    <div style={{ textAlign: 'center', padding: '100px' }}>
                        <h3 style={{ color: 'var(--text-secondary)' }}>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management Coming Soon</h3>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
