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
                        <Route path="/request" element={<RequestPage />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
