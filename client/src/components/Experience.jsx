import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import LocationModal from './LocationModal';
import './Experience.css';

const Experience = () => {
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  return (
    <section className="experience-section">
      <motion.div 
        className="experience-content"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-heading text-center">Find Your Grid.</h2>
        <p className="body-text text-center mx-auto mb-4">
          Whether you need a hyper-focused workspace or a quick premium fuel-up, our spaces are designed for ultimate productivity and comfort.
        </p>
        
        <div className="experience-actions">
          <Link to="/menu" className="btn-primary">Explore the Menu</Link>
          <button onClick={() => setIsLocationModalOpen(true)} className="btn-secondary">Find a Café</button>
        </div>
      </motion.div>

      <AnimatePresence>
        {isLocationModalOpen && <LocationModal onClose={() => setIsLocationModalOpen(false)} />}
      </AnimatePresence>
    </section>
  );
};

export default Experience;
