import React from 'react';
import { motion } from 'framer-motion';
import philosophyImg from '../assets/philosophy.png';
import './Philosophy.css';

const Philosophy = () => {
  return (
    <section className="philosophy-section">
      <div className="philosophy-container">
        <motion.div 
          className="philosophy-image-wrapper"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <img src={philosophyImg} alt="The Art of the Bean" className="philosophy-img" />
        </motion.div>
        
        <motion.div 
          className="philosophy-text-wrapper"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          <span className="overline">THE ART OF THE BEAN</span>
          <h2 className="section-heading">Fueling the relentless.</h2>
          <p className="body-text">
            At Daily Grind Café, we believe coffee isn’t just a morning routine—it’s an engine for ambition. We source exceptional single-origin beans and roast them in precision small batches. Every pour, every extraction, and every drop is engineered to unlock maximum clarity and flavor, keeping you sharp for whatever you're building.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Philosophy;
