import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
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

const HomePage = () => (
    <>
        <Hero />
        <Stats />
        <Services />
        <Portfolio />
        <Testimonials />
        <Contact />
    </>
);

function App() {
    return (
        <Router>
            <div className="App">
                <MouseGlow />
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/services" element={<ServicesPage />} />
                        <Route path="/solutions" element={<SolutionsPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/vision-mission" element={<VisionMissionPage />} />
                        <Route path="/team" element={<OurTeamPage />} />
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
