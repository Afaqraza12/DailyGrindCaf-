import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, MapPin } from 'lucide-react';
import './LocationModal.css';

const LocationModal = ({ onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  return (
    <div className="location-modal-backdrop" onClick={onClose}>
      <motion.div 
        className="location-modal-content"
        initial={{ y: '50px', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '50px', opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="location-close-btn" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="location-header">
          <h2><MapPin size={24} /> OUR NODES</h2>
          <p>Find your nearest Daily Grind hub.</p>
        </div>

        <div className="map-container">
          {/* Embedding a sleek Google Maps iframe */}
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.2528001099!2d-74.14482998632616!3d40.69763123330663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Daily Grind HQ"
          ></iframe>
        </div>
        
        <div className="location-info">
          <h3>BROOKLYN FLAGSHIP</h3>
          <p>128 Roebling St, Brooklyn, NY 11211</p>
          <p>Open 06:00 - 20:00 Daily</p>
        </div>
      </motion.div>
    </div>
  );
};

export default LocationModal;
