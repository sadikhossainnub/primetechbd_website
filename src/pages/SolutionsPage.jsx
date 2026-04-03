import React, { useEffect } from 'react';
import Portfolio from '../components/Portfolio';

const SolutionsPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ paddingTop: '80px', minHeight: '80vh' }}>
            <Portfolio />
        </div>
    );
};

export default SolutionsPage;
