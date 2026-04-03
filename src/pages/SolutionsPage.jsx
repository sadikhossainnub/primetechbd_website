import React, { useEffect } from 'react';
import Portfolio from '../components/Portfolio';
import SEO from '../components/SEO';

const SolutionsPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ paddingTop: '80px', minHeight: '80vh' }}>
            <SEO
                title="Our Solutions - Enterprise Software Portfolio"
                description="Browse our portfolio of delivered enterprise software solutions including ERP implementations, POS deployments, hospital management systems, and e-commerce platforms for businesses across Bangladesh."
                keywords="software portfolio Bangladesh, ERP implementation case study, POS deployment Dhaka, enterprise solutions, software projects Bangladesh, digital transformation"
                path="/solutions"
            />
            <Portfolio />
        </div>
    );
};

export default SolutionsPage;
