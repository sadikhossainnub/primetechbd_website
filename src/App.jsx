import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MouseGlow from './components/MouseGlow';
import RequestPage from './pages/RequestPage';
import ProjectDetails from './pages/ProjectDetails';
import AdminLogin from './pages/Admin/Login';
import AdminDashboard from './pages/Admin/Dashboard';
import ServicesPage from './pages/ServicesPage';
import SolutionsPage from './pages/SolutionsPage';
import AboutPage from './pages/AboutPage';
import VisionMissionPage from './pages/VisionMissionPage';
import OurTeamPage from './pages/OurTeamPage';
import BlogPage from './pages/BlogPage';
import BlogPostDetails from './pages/BlogPostDetails';
import WhyChooseUs from './components/WhyChooseUs';
import CTABanner from './components/CTABanner';
import ClientCarousel from './components/ClientCarousel';
import FAQ from './components/FAQ';
import FloatingContact from './components/FloatingContact';
import SEO from './components/SEO';

const HomePage = () => (
    <>
        <SEO 
            title="Best ERP Software Company in Bangladesh | #1 ERPNext & Odoo Experts"
            description="Leading ERP, POS, Hospital & School Management Software Company in Bangladesh. Expert solutions for enterprise resource planning (ERPNext, Odoo, SAP) across Dhaka and Mirpur."
            keywords="ERP Software in Bangladesh, Best ERP software company Dhaka, ERPNext expertise Bangladesh, SAP systems Dhaka, Odoo development Bangladesh, Prime Technology of Bangladesh, software company Bangladesh, ERP solutions for manufacturing, Hospital & School Management Software Bangladesh"
            path="/"
        />
        <Hero />
        <ClientCarousel />
        <Stats />
        <Services />
        <WhyChooseUs />
        <CTABanner />
        <Portfolio />
        <Testimonials />
        <FAQ />
        <CTABanner />
        <Contact />
    </>
);

function App() {
    return (
        <Router>
            <div className="App">
                <MouseGlow />
                <Header />
                <FloatingContact />
                <main>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/services" element={<ServicesPage />} />
                        <Route path="/solutions" element={<SolutionsPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/vision-mission" element={<VisionMissionPage />} />
                        <Route path="/team" element={<OurTeamPage />} />
                        <Route path="/blog" element={<BlogPage />} />
                        <Route path="/blog/:id" element={<BlogPostDetails />} />
                        <Route path="/request" element={<RequestPage />} />
                        <Route path="/project/:id" element={<ProjectDetails />} />
                        <Route path="/admin/login" element={<AdminLogin />} />
                        <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
