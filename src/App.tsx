import React from 'react';
import './App.css';
import HeroSection from './components/heroSection';
import WhyChooseUs from './components/whyChooseUs';
import Navbar from './components/navbar';
import NewsSection from './components/NewsSection';
import TeamSection from './components/TeamSection';
import CandidatesSection from './components/CandidatesSection';
import CareerSection from './components/CareerSection';
import Footer from './components/Footer';
import { GlobalStyles } from 'techwondoe_components';

function App() {
    return (
        <>
            <GlobalStyles />
            <Navbar />
            <HeroSection />
            <WhyChooseUs />
            <TeamSection />
            <NewsSection />
            <CandidatesSection />
            <CareerSection />
            <Footer />
        </>
    );
}

export default App;
