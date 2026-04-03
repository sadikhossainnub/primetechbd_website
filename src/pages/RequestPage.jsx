import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutGrid, ShoppingCart, GraduationCap, Smartphone, Database, CheckCircle2,
    ChevronRight, ArrowLeft, Package, Users, Calculator, BarChart3, Settings,
    ClipboardList, Info, Check, Zap, ShieldCheck, Globe, Factory, Briefcase,
    UserCheck, Shield, HardDrive, LifeBuoy, Monitor, Link2, Building2, HeartPulse, Home
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import emailjs from '@emailjs/browser';
import SEO from '../components/SEO';

const services = [
    { id: 'erp', name: 'ERP Solution', icon: Database, color: '#3b82f6' },
    { id: 'pos', name: 'POS Solution', icon: LayoutGrid, color: '#10b981' },
    { id: 'school', name: 'School Management', icon: GraduationCap, color: '#f59e0b' },
    { id: 'hospital', name: 'Hospital Management', icon: Building2, color: '#ef4444' },
    { id: 'healthcare', name: 'Health Care', icon: HeartPulse, color: '#f43f5e' },
    { id: 'property', name: 'Property Management', icon: Home, color: '#06b6d4' },
    { id: 'manufacturing', name: 'Manufacturing ERP', icon: Factory, color: '#f97316' },
    { id: 'mobile', name: 'Mobile App', icon: Smartphone, color: '#8b5cf6' },
    { id: 'ecommerce', name: 'Ecommerce Website', icon: ShoppingCart, color: '#ec4899' },
];

const erpModules = [
    {
        id: 'accounting',
        name: 'Accounting',
        price: 25000,
        icon: Calculator,
        details: 'Complete financial management and tax compliance.',
        subModules: [
            'Chart of Accounts', 'Journal Entry', 'Customer / Sales Invoice',
            'Supplier / Purchase Invoice', 'Payments (Customer & Supplier)',
            'Bank Reconciliation', 'Taxes and Charges Templates',
            'Cost Centers & Costing', 'Accounts Receivable / Payable',
            'Fiscal Year & Period Closing'
        ]
    },
    {
        id: 'crm',
        name: 'CRM',
        price: 15000,
        icon: Users,
        details: 'Manage leads and strengthen customer relationships.',
        subModules: [
            'Lead / Lead Source', 'Opportunity Management', 'Customer Database',
            'Communication / Calls / Meetings', 'Campaign / Marketing Emails',
            'Sales Pipeline & Activities', 'Customer Feedback / Surveys'
        ]
    },
    {
        id: 'selling',
        name: 'Selling',
        price: 15000,
        icon: BarChart3,
        details: 'Streamline the sales cycle from quotation to invoice.',
        subModules: [
            'Quotation', 'Sales Order', 'Delivery Note', 'Sales Invoice',
            'Price List & Pricing Rule', 'Customer Discount / Promotion'
        ]
    },
    {
        id: 'buying',
        name: 'Buying (Procurement)',
        price: 15000,
        icon: ClipboardList,
        details: 'Optimize procurement and vendor management.',
        subModules: [
            'Request for Quotation (RFQ)', 'Supplier Quotation', 'Purchase Order',
            'Purchase Receipt', 'Supplier Invoice', 'Supplier Management',
            'Purchase Taxes & Charges'
        ]
    },
    {
        id: 'stock',
        name: 'Stock / Inventory',
        price: 20000,
        icon: Package,
        details: 'Real-time inventory tracking and valuation.',
        subModules: [
            'Item Master', 'Warehouse Management', 'Stock Entry', 'Stock Delivery / Receipt',
            'Stock Reconciliation', 'Serial / Batch Numbers', 'Stock Ledger / Valuation', 'Stock Balance'
        ]
    },
    {
        id: 'manufacturing',
        name: 'Manufacturing',
        price: 35000,
        icon: Factory,
        details: 'Comprehensive production planning and execution.',
        subModules: [
            'Bill of Materials (BOM)', 'Work Order / Job Card', 'Production Plan',
            'Operation / Routing', 'Material Planning (MRP)', 'Capacity Planning', 'Sub-Contracting'
        ]
    },
    {
        id: 'projects',
        name: 'Projects',
        price: 15000,
        icon: Briefcase,
        details: 'Manage complex projects, tasks, and billing.',
        subModules: [
            'Project Management', 'Task Tracking', 'Timesheets', 'Activity Management',
            'Project Templates', 'Project Billing / Costing'
        ]
    },
    {
        id: 'hr',
        name: 'HR & Payroll',
        price: 25000,
        icon: UserCheck,
        details: 'Manage employee lifecycle and payroll automation.',
        subModules: [
            'Employee Management', 'Attendance / Shift', 'Leave Application',
            'Payroll Entry / Salary Slip', 'Recruitment / Job Applicant',
            'Performance Review', 'Expense Claim'
        ]
    },
    {
        id: 'pos_erp',
        name: 'Point of Sale (POS)',
        price: 15000,
        icon: Zap,
        details: 'Integrated retail sales and shift management.',
        subModules: [
            'POS Profile', 'POS Setting', 'POS Invoice / Retail Sales',
            'Session / Orders', 'Payments / Cashier Shift'
        ]
    },
    {
        id: 'quality',
        name: 'Quality',
        price: 10000,
        icon: Shield,
        details: 'Strict quality control and inspection workflows.',
        subModules: [
            'Quality Inspection', 'Quality Specification', 'Quality Feedback', 'Inspection Templates'
        ]
    },
    {
        id: 'assets',
        name: 'Assets',
        price: 10000,
        icon: HardDrive,
        details: 'Track asset lifecycle and depreciation.',
        subModules: [
            'Asset Master', 'Asset Category', 'Depreciation Schedule', 'Asset Transfer / Disposal'
        ]
    },
    {
        id: 'support',
        name: 'Support / Helpdesk',
        price: 10000,
        icon: LifeBuoy,
        details: 'Manage customer service issues and SLAs.',
        subModules: [
            'Issue / Ticket Management', 'Service Level Agreement (SLA)',
            'Service Appointment', 'Solutions / Knowledge Base'
        ]
    },
    {
        id: 'website_module',
        name: 'Website / E-Commerce',
        price: 20000,
        icon: Monitor,
        details: 'Manage web presence and online shopping.',
        subModules: [
            'Website Settings', 'Web Page / Blog', 'Item Group / Item Website',
            'Web Form', 'Shopping Cart / Checkout', 'Portal Settings'
        ]
    },
    {
        id: 'utilities',
        name: 'Utilities / System',
        price: 5000,
        icon: Settings,
        details: 'Core system settings and automation scripts.',
        subModules: [
            'Setup / Settings', 'Users / Roles', 'Workflow / Approval',
            'Email / Notifications', 'Data Import / Export', 'Custom Scripts', 'Batch / Scheduled Jobs'
        ]
    },
    {
        id: 'integrations',
        name: 'Integrations',
        price: 10000,
        icon: Link2,
        details: 'Connect with payment gateways and platforms.',
        subModules: [
            'Payment Gateways', 'Shopify / Unicommerce Connectors',
            'Google / Calendar / Contacts Settings'
        ]
    }
];

const posModules = [
    { id: 'billing', name: 'Fast Billing', price: 15000, icon: Zap, details: 'Quick checkout with barcode and shortcut keys.', subModules: ['Touch Screen Interface', 'Offline Billing Mode', 'Multiple Tax Slabs', 'Thermal Printer Support'] },
    { id: 'pos_stock', name: 'Retail Inventory', price: 10000, icon: Package, details: 'Keep track of every item on your shelf.', subModules: ['Low Stock Alerts', 'Purchase History', 'Stock Adjustment', 'Vendor Returns'] },
    { id: 'loyalty', name: 'Customer Loyalty', price: 8000, icon: Users, details: 'Retain customers with points and offers.', subModules: ['Point Accumulation', 'Membership Tiers', 'SMS Notifications', 'Offer Management'] },
];

const mobileModules = [
    {
        id: 'shop_core',
        name: 'E-Commerce Core',
        price: 45000,
        icon: ShoppingCart,
        details: 'Everything you need to sell products in-app.',
        subModules: [
            'Dynamic Product Catalog', 'Advanced Search & Filters',
            'Multi-variant Support (Size, Color)', 'Stock Availability Tracking',
            'User Wishlist', 'Product Reviews & Ratings'
        ]
    },
    {
        id: 'cart_checkout',
        name: 'Cart & Checkout',
        price: 15000,
        icon: Zap,
        details: 'Frictionless purchasing experience.',
        subModules: [
            'Smart Shopping Cart', 'Coupon & Promo Codes',
            'Shipping Cost Calculator', 'Multi-step Secure Checkout',
            'Guest Checkout Support', 'Order Summary PDF'
        ]
    },
    {
        id: 'payment_mobile',
        name: 'Payment & Wallet',
        price: 15000,
        icon: Calculator,
        details: 'Integrated local and international payments.',
        subModules: [
            'bkash / Nagad / Rocket', 'SSLCommerz Integration',
            'Card Payments (Visa/Master)', 'In-app Wallet System',
            'Subscription Billing', 'Refund Management'
        ]
    },
    {
        id: 'tracking',
        name: 'Logistics & Tracking',
        price: 20000,
        icon: Globe,
        details: 'Real-time delivery updates for users.',
        subModules: [
            'Live Order Tracking', 'Google Maps Integration',
            'Push Notification Alerts', 'Delivery Boy App Sync',
            'Estimated Delivery Time', 'Proof of Delivery (Photo/Sign)'
        ]
    },
    {
        id: 'ai_mobile',
        name: 'AI & Smart Features',
        price: 35000,
        icon: ShieldCheck,
        details: 'Next-gen shopping using artificial intelligence.',
        subModules: [
            'AI-Based Recommendations', 'Voice Search Integration',
            'Visual Search (Upload Photo)', 'AR Product Preview',
            'Smart Inventory Predictions', 'Chatbot Support'
        ]
    },
    {
        id: 'marketing_mobile',
        name: 'Marketing & Loyalty',
        price: 15000,
        icon: Users,
        details: 'Tools to grow and retain your user base.',
        subModules: [
            'Referral Program', 'Point-based Loyalty System',
            'In-app Advertising', 'User Segmentation',
            'Email & SMS Marketing', 'Analytics Dashboard'
        ]
    },
];

const hospitalModules = [
    { id: 'opd', name: 'OPD Management', price: 25000, icon: Users, details: 'Manage outpatient registrations, appointments, and doctors.', subModules: ['Doctor Scheduling', 'Patient Registration', 'Token Generation', 'Queue Management'] },
    { id: 'ipd', name: 'IPD & Bed Management', price: 35000, icon: LayoutGrid, details: 'Inpatient admissions, bed tracking, and nursing notes.', subModules: ['Admission/Transfer/Discharge', 'Bed Grid Visualization', 'Patient Vital Monitoring', 'Doctor Visits Tracker'] },
    { id: 'pharmacy', name: 'Pharmacy & Billing', price: 20000, icon: Package, details: 'Medicine stock control and integrated split billing.', subModules: ['Inventory Management', 'Purchase/Sales Entry', 'GST/Tax Handling', 'Batch/Expiry Tracking'] },
];

const propertyModules = [
    { id: 'tenants', name: 'Tenant Management', price: 20000, icon: Users, details: 'Automated leasing, tenant profiles, and portals.', subModules: ['Lease Agreements', 'Tenant KYB/KYC', 'Communication Hub', 'Security Deposit Tracking'] },
    { id: 'maintenance', name: 'Maintenance & Tickets', price: 15000, icon: Settings, details: 'Track repairs, service requests, and vendor logs.', subModules: ['Support Desk', 'Work Orders', 'Vendor Payments', 'Preventive Maintenance'] },
    { id: 'financials', name: 'Auto Billing & Rent', price: 25000, icon: Calculator, details: 'Automatic rent generation and utility billing.', subModules: ['Rent Invoicing', 'Penalty Calculation', 'Utility Meter Reading', 'Expense Accounting'] },
];

const RequestPage = () => {
    const [selectedService, setSelectedService] = useState(null);
    const [selectedModules, setSelectedModules] = useState([]);
    const [activeModuleInfo, setActiveModuleInfo] = useState(null);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        email: '',
        budget: '2,00,000 - 5,00,000 TK',
        notes: ''
    });
    const [submitted, setSubmitted] = useState(false);

    // Get current module list based on service
    const currentModules = selectedService === 'erp' ? erpModules :
        selectedService === 'pos' ? posModules :
            selectedService === 'mobile' ? mobileModules :
                selectedService === 'hospital' ? hospitalModules :
                    selectedService === 'property' ? propertyModules : [];

    const totalPrice = selectedModules.reduce((acc, moduleId) => {
        const module = currentModules.find(m => m.id === moduleId);
        return acc + (module?.price || 0);
    }, 0);

    const toggleModule = (id) => {
        setSelectedModules(prev =>
            prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
        );
    };

    const handleNext = () => {
        if (step === 1 && (['erp', 'pos', 'mobile', 'hospital', 'property', 'manufacturing'].includes(selectedService))) {
            setStep(1.5);
        } else {
            setStep(2);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Save to Firebase
            const serviceNameObj = services.find(s => s.id === selectedService);
            const serviceName = serviceNameObj ? serviceNameObj.name : selectedService;

            await addDoc(collection(db, 'quote_requests'), {
                ...formData,
                service: selectedService,
                serviceName: serviceName,
                modules: selectedModules.map(id => {
                    const mod = currentModules.find(m => m.id === id);
                    return { id, name: mod?.name, price: mod?.price };
                }),
                totalPrice,
                timestamp: serverTimestamp(),
                status: 'new'
            });

            if (import.meta.env.VITE_EMAILJS_SERVICE_ID && import.meta.env.VITE_EMAILJS_SERVICE_ID !== 'your_emailjs_service_id') {
                await emailjs.send(
                    import.meta.env.VITE_EMAILJS_SERVICE_ID,
                    import.meta.env.VITE_EMAILJS_TEMPLATE_ID_ADMIN,
                    {
                        from_name: formData.name,
                        reply_to: formData.email,
                        message: `New quote request received for ${serviceName}. Budget: ${formData.budget}. Notes: ${formData.notes}`,
                        source: 'Request Scoping Form'
                    },
                    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
                ).catch(err => console.error("Admin Email JS Error:", err));

                await emailjs.send(
                    import.meta.env.VITE_EMAILJS_SERVICE_ID,
                    import.meta.env.VITE_EMAILJS_TEMPLATE_ID_VISITOR,
                    {
                        to_name: formData.name,
                        to_email: formData.email,
                    },
                    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
                ).catch(err => console.error("Visitor Email JS Error:", err));
            }

            setStep(3);
            setTimeout(() => setSubmitted(true), 1500);
        } catch (error) {
            console.error('Error saving quote request:', error);
            alert('Failed to submit request. Please try again.');
        }
    };

    return (
        <div className="request-page" style={{ minHeight: '100vh', padding: '120px 8% 60px' }}>
            <SEO
                title="Request Software Quote - Free Consultation & Project Scoping"
                description="Get a free consultation and detailed project scoping for your ERP, POS, Hospital Management, or Custom Software project. Request a quote from Prime Technology of Bangladesh today."
                keywords="software quote bangladesh, ERP quotation dhaka, free consultation software company, project scoping, custom software pricing bangladesh"
                path="/request"
            />
            <Link to="/" className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '2rem' }}>
                <ArrowLeft size={18} /> Back to Home
            </Link>

            <div className="section-header" style={{ textAlign: 'left', margin: '0 0 4rem 0' }}>
                <span className="badge">Project Scoping</span>
                <h2>{step === 1.5 ? `${selectedService.toUpperCase()} Module Selection` : 'Start Your Digital Journey'}</h2>
                <p>Define the exact scope of your solution for a more precise estimation.</p>
            </div>

            <div className="request-container" style={{ display: 'grid', gridTemplateColumns: (step === 1 || step === 3) ? '1fr' : '1.2fr 0.8fr', gap: '4rem' }}>

                {/* Step 1: Service Selection */}
                {step === 1 && (
                    <motion.div
                        className="services-selection"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h3 style={{ marginBottom: '2rem', fontSize: '1.8rem' }}>Select Core Service</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                            {services.map((service) => (
                                <motion.div
                                    key={service.id}
                                    className={`service-card ${selectedService === service.id ? 'active' : ''}`}
                                    onClick={() => setSelectedService(service.id)}
                                    whileHover={{ y: -5 }}
                                    style={{
                                        cursor: 'pointer',
                                        padding: '2rem',
                                        border: selectedService === service.id ? `2px solid ${service.color}` : '1px solid var(--glass-border)',
                                        background: selectedService === service.id ? `${service.color}10` : 'var(--bg-surface)',
                                        borderRadius: '16px'
                                    }}
                                >
                                    <service.icon size={40} color={selectedService === service.id ? service.color : 'white'} style={{ marginBottom: '1rem' }} />
                                    <h4>{service.name}</h4>
                                </motion.div>
                            ))}
                        </div>
                        {selectedService && (
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                onClick={handleNext}
                                className="btn-primary"
                                style={{ marginTop: '3rem', width: '100%', maxWidth: '300px', border: 'none', cursor: 'pointer' }}
                            >
                                Next Step <ChevronRight size={20} />
                            </motion.button>
                        )}
                    </motion.div>
                )}

                {/* Step 1.5: Module Selection with Micro Details */}
                {step === 1.5 && (
                    <>
                        <motion.div
                            className="module-selection"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <h3 style={{ marginBottom: '1rem', fontSize: '1.8rem' }}>Customize Your System</h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Hover over any card to see deep-level feature insights in the sidebar.</p>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.2rem', maxHeight: '70vh', overflowY: 'auto', paddingRight: '1rem' }}>
                                {currentModules.map((module) => (
                                    <motion.div
                                        key={module.id}
                                        className={`service-card ${selectedModules.includes(module.id) ? 'active' : ''}`}
                                        onClick={() => toggleModule(module.id)}
                                        onMouseEnter={() => setActiveModuleInfo(module)}
                                        onMouseLeave={() => setActiveModuleInfo(null)}
                                        whileHover={{ x: 10, backgroundColor: 'rgba(34, 211, 238, 0.05)' }}
                                        style={{
                                            cursor: 'pointer',
                                            padding: '1.5rem 2.5rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '2rem',
                                            border: selectedModules.includes(module.id) ? '2px solid var(--accent)' : '1px solid var(--glass-border)',
                                            background: 'var(--bg-surface)',
                                            borderRadius: '20px',
                                            position: 'relative',
                                            overflow: 'hidden'
                                        }}
                                    >
                                        <div style={{ color: selectedModules.includes(module.id) ? 'var(--accent)' : 'white' }}>
                                            <module.icon size={32} />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <h4 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{module.name}</h4>
                                                <span style={{ color: 'var(--accent)', fontWeight: '700', fontSize: '0.9rem' }}>Starts from {module.price.toLocaleString()} TK</span>
                                            </div>
                                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{module.details}</p>
                                        </div>
                                        <div style={{ color: 'var(--text-secondary)', opacity: activeModuleInfo?.id === module.id ? 1 : 0.3 }}>
                                            <Info size={20} />
                                        </div>
                                        {selectedModules.includes(module.id) && (
                                            <div style={{ position: 'absolute', right: '0', top: '0', bottom: '0', width: '6px', background: 'var(--accent)' }} />
                                        )}
                                    </motion.div>
                                ))}
                            </div>

                            <div style={{ marginTop: '3rem', display: 'flex', gap: '1.5rem' }}>
                                <button onClick={() => setStep(1)} className="btn-secondary" style={{ width: '150px' }}>Back</button>
                                <button
                                    onClick={() => setStep(2)}
                                    className="btn-primary"
                                    style={{ width: '100%', maxWidth: '300px', border: 'none', cursor: 'pointer' }}
                                    disabled={selectedModules.length === 0}
                                >
                                    Continue to Form <ChevronRight size={20} />
                                </button>
                            </div>
                        </motion.div>

                        {/* Micro Details Sidebar */}
                        <div className="micro-details-sidebar" style={{ position: 'relative' }}>
                            <div style={{ position: 'sticky', top: '140px' }}>
                                <AnimatePresence mode="wait">
                                    {activeModuleInfo ? (
                                        <motion.div
                                            key={activeModuleInfo.id}
                                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            style={{
                                                background: 'linear-gradient(135deg, var(--bg-surface) 0%, #1a1c26 100%)',
                                                padding: '2.5rem',
                                                borderRadius: '30px',
                                                border: '1px solid var(--accent)',
                                                boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem' }}>
                                                <div style={{ padding: '10px', background: 'rgba(34, 211, 238, 0.1)', borderRadius: '12px', color: 'var(--accent)' }}>
                                                    <activeModuleInfo.icon size={24} />
                                                </div>
                                                <h3 style={{ fontSize: '1.4rem' }}>{activeModuleInfo.name}</h3>
                                            </div>

                                            <p style={{ color: 'var(--accent)', fontSize: '0.7rem', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem', display: 'block', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>
                                                Core Features Included
                                            </p>

                                            <ul style={{ display: 'grid', gap: '0.8rem', maxHeight: '400px', overflowY: 'auto', paddingRight: '10px' }}>
                                                {activeModuleInfo.subModules.map((sub, i) => (
                                                    <motion.li
                                                        key={i}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: i * 0.03 }}
                                                        style={{ display: 'flex', gap: '12px', fontSize: '0.9rem', color: 'var(--text-primary)', alignItems: 'center' }}
                                                    >
                                                        <CheckCircle2 size={16} color="var(--accent)" />
                                                        {sub}
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            style={{
                                                background: 'rgba(255,255,255,0.02)',
                                                padding: '4rem 2rem',
                                                borderRadius: '30px',
                                                border: '1px dotted var(--glass-border)',
                                                textAlign: 'center'
                                            }}
                                        >
                                            <div style={{ color: 'var(--accent)', marginBottom: '1.5rem' }}>
                                                <Zap size={48} style={{ opacity: 0.5 }} />
                                            </div>
                                            <h4 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Module Insight</h4>
                                            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.6' }}>
                                                Hover over any module to unlock the micro-level feature list and deep specifications.
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </>
                )}

                {/* Step 2: Form Details */}
                {step === 2 && (
                    <>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="summary-box"
                            style={{ background: 'var(--bg-surface)', padding: '3rem', borderRadius: '24px', border: '1px solid var(--glass-border)', height: 'fit-content', position: 'sticky', top: '140px' }}
                        >
                            <h3 style={{ marginBottom: '1.5rem' }}>Project Blueprint</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2.5rem', padding: '1.5rem', background: 'var(--glass)', borderRadius: '20px' }}>
                                <div style={{ padding: '1rem', background: 'var(--bg-dark)', borderRadius: '15px' }}>
                                    {(() => {
                                        const S = services.find(s => s.id === selectedService);
                                        return S ? <S.icon size={32} color={S.color} /> : null;
                                    })()}
                                </div>
                                <div>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '1px' }}>SOLUTION TYPE</p>
                                    <h4 style={{ fontSize: '1.5rem' }}>{services.find(s => s.id === selectedService)?.name}</h4>
                                </div>
                            </div>

                            {selectedModules.length > 0 && (
                                <div style={{ marginBottom: '2.5rem' }}>
                                    <p style={{ color: 'var(--accent)', fontWeight: '700', marginBottom: '1.2rem', fontSize: '0.8rem', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Selected Modules ({selectedModules.length})</p>
                                    <div style={{ display: 'grid', gap: '0.8rem', maxHeight: '300px', overflowY: 'auto', paddingRight: '10px' }}>
                                        {selectedModules.map(m => {
                                            const mod = currentModules.find(mod => mod.id === m);
                                            return (
                                                <div key={m} style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <span style={{ fontSize: '1rem', fontWeight: '600' }}>{mod?.name}</span>
                                                    <span style={{ fontSize: '0.9rem', color: 'var(--accent)' }}>{mod?.price.toLocaleString()} TK</span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--accent)', borderRadius: '16px', color: 'var(--bg-dark)', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                            <span style={{ fontWeight: '800', fontSize: '1rem' }}>Base Price Estimate</span>
                                            <span style={{ fontWeight: '900', fontSize: '1.3rem' }}>{totalPrice.toLocaleString()} TK</span>
                                        </div>
                                        <p style={{ fontSize: '0.7rem', fontWeight: '700', opacity: 0.8, marginTop: '5px', borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '5px' }}>
                                            * Final price depends on business type & customization depth.
                                        </p>
                                    </div>
                                </div>
                            )}

                            <div style={{ paddingTop: '2.5rem', borderTop: '1px solid var(--glass-border)', textAlign: 'left' }}>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                    <strong>Note:</strong> The prices shown are base estimates for standard modules.
                                </p>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                                    "Your final quote will be tailored based on your specific business workflow, user volume, and custom logic requirements."
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="contact-form"
                        >
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Company/Organization</label>
                                    <input
                                        type="text"
                                        placeholder="Enterprise Name Ltd."
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Work Email</label>
                                    <input
                                        type="email"
                                        placeholder="john@company.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Estimated Budget (TK)</label>
                                    <select
                                        value={formData.budget}
                                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                        style={{ width: '100%', padding: '1.25rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '12px' }}
                                    >
                                        <option>50,000 - 2,00,000 TK</option>
                                        <option>2,00,000 - 5,00,000 TK</option>
                                        <option>5,00,000 - 10,00,000 TK</option>
                                        <option>10,00,000+ TK</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Additional Notes</label>
                                    <textarea
                                        rows="4"
                                        placeholder="Any specific requirements or integrations needed?"
                                        value={formData.notes}
                                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                    ></textarea>
                                </div>
                                <div style={{ display: 'flex', gap: '1.5rem' }}>
                                    <button type="button" onClick={() => setStep(1.5)} className="btn-secondary" style={{ flex: 1 }}>Back</button>
                                    <button type="submit" className="btn-primary" style={{ flex: 2, border: 'none', cursor: 'pointer' }}>Generate Scoping Quote</button>
                                </div>
                            </form>
                        </motion.div>
                    </>
                )}

                {/* Step 3: Success */}
                {step === 3 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '4rem' }}
                    >
                        <div style={{ width: '120px', height: '120px', background: 'var(--accent)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2.5rem', color: 'var(--bg-dark)', boxShadow: '0 0 50px var(--accent-glow)' }}>
                            <CheckCircle2 size={70} />
                        </div>
                        <h2 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', background: 'linear-gradient(to right, #ffffff, #22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Strategic Blueprint Ready!</h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.3rem', maxWidth: '700px', margin: '0 auto', lineHeight: '1.8' }}>
                            Your detailed request for <strong>{services.find(s => s.id === selectedService)?.name}</strong> with <strong>{selectedModules.length} customized modules</strong> has been received by our senior architecture team.
                        </p>
                        <Link to="/" className="btn-primary" style={{ marginTop: '4rem', display: 'inline-block', padding: '1.2rem 3rem' }}>Return to Command Center</Link>
                    </motion.div>
                )}

            </div>
        </div>
    );
};

export default RequestPage;
