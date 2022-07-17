import React from "react";
import hero_ribbon from "../assets/hero_ribbon.png";
import "../App.css";

const HeroSection = () => {
  return (
    <>
      <section className="h-full w-full flex items-center justify-center hero">
        <h1>Take the Leap With us</h1>
        <img
          className="absolute right-0 bottom-0"
          alt="hero_ribbon"
          style={{ height: "90%" }}
          src={hero_ribbon}
        />
      </section>
    </>
  );
};

export default HeroSection;
