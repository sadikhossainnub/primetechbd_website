import React, { useEffect } from 'react';
import Services from '../components/Services';
import SEO from '../components/SEO';

const ServicesPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ paddingTop: '80px', minHeight: '80vh' }}>
            <SEO
                title="Our Services - ERP, POS, Hospital & School Management Software"
                description="Explore our comprehensive software services including ERP solutions (ERPNext, Odoo, SAP), POS systems, Hospital Management, School Management, E-Commerce development, and Mobile App development in Bangladesh."
                keywords="ERP services Bangladesh, POS system Dhaka, hospital management software, school management system Bangladesh, custom software development, mobile app development Bangladesh, ERPNext implementation"
                path="/services"
            />
            <Services />
        </div>
    );
};

export default ServicesPage;
