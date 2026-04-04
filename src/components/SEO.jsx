import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, path = '' }) => {
    const siteUrl = 'https://primetechbd.xyz';
    const siteName = 'Prime Technology of Bangladesh';
    const fullTitle = title ? `${title} | ${siteName}` : `${siteName} | Best ERP Software Company in Bangladesh`;
    const fullUrl = `${siteUrl}${path}`;
    const defaultDescription = 'Prime Technology of Bangladesh is the leading ERP, POS, Hospital Management & Custom Software Company in Bangladesh. Trusted by 200+ enterprises.';
    const defaultKeywords = 'ERP Software Bangladesh, Software Company Bangladesh, ERPNext, Odoo, POS System, Hospital Management, Prime Technology of Bangladesh';

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description || defaultDescription} />
            <meta name="keywords" content={keywords || defaultKeywords} />
            <link rel="canonical" href={fullUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:url" content={fullUrl} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={description || defaultDescription} />
        </Helmet>
    );
};

export default SEO;
