import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero-section">
      {/* Full Background Video */}
      <div className="hero-video-wrapper">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="hero-video-bg"
        >
          <source src="/coffee-splash.mp4" type="video/mp4" />
        </video>
        <div className="hero-video-overlay"></div>
      </div>

      {/* Center Content Stack */}
      <div className="hero-content-stack">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="hero-headline-container"
        >
          <h1 className="hero-headline">KINETIC<br/>CHILL</h1>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="hero-bottom-content"
        >
          <p className="hero-subheadline">Crystalline ice suspending artisanal perfection.</p>
          <div className="hero-cta-wrapper">
            <Link to="/menu" className="btn-primary">Order Now</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
