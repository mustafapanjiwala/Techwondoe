import React from "react";
import "./App.css";
import HeroSection from "./components/heroSection";
import WhyChooseUs from "./components/whyChooseUs";
import Navbar from "./components/navbar";

function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <WhyChooseUs />
    </>
  );
}

export default App;
