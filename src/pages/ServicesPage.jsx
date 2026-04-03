import React, { useEffect } from 'react';
import Services from '../components/Services';

const ServicesPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ paddingTop: '80px', minHeight: '80vh' }}>
            <Services />
        </div>
    );
};

export default ServicesPage;
