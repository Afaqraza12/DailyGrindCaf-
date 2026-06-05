import React, { useEffect } from 'react';
import './About.css';
import { motion } from 'framer-motion';
import useSEO from '../hooks/useSEO';

const About = () => {
  useSEO({
    title: 'Our Story | The Art of the Bean | Daily Grind Café',
    description: 'We are engineers of flavor. Discover how our system architects source and extract the highest grade Arabica beans.'
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="ambient-glow glow-1"></div>
        <div className="ambient-glow glow-2"></div>
        <div className="engineering-grid-overlay"></div>
        
        <div className="manifesto-container">
          <h1 className="manifesto-heading">THE ART OF THE BEAN</h1>
          <p className="manifesto-copy">
            We are engineers of flavor. We didn't build a cafe; we built a laboratory for high-performance fuel. 
            Every roast is an experiment, every extraction is calculated, and every cup is designed to push you further.
          </p>
        </div>
      </section>

      {/* Timeline / Process Section */}
      <section className="about-process">
        <div className="process-row">
          <div className="process-image-col">
            <div className="image-wrapper">
              <img src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80" alt="Sourcing" />
            </div>
          </div>
          <div className="process-text-col">
            <div className="process-step">01 // PRECISION SOURCING</div>
            <p className="process-desc">
              We travel globally to source only the highest grade, high-altitude Arabica. 
              We partner directly with independent estate farmers who prioritize sustainability and peak soil quality over mass yield.
            </p>
          </div>
        </div>

        <div className="process-row reverse">
          <div className="process-image-col">
            <div className="image-wrapper">
              <img src="https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80" alt="Roasting" />
            </div>
          </div>
          <div className="process-text-col">
            <div className="process-step">02 // THERMODYNAMIC ROASTING</div>
            <p className="process-desc">
              Our small-batch roasters are calibrated daily. We manipulate temperature curves and airflow to unlock 
              the precise flavor notes hidden within the cellular structure of each origin.
            </p>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="about-founders">
        <h2 className="founders-heading">SYSTEM ARCHITECTS</h2>
        <div className="founders-grid">
          <div className="founder-card">
            <div className="founder-image-wrapper">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80" alt="Alex Node" />
            </div>
            <div className="founder-info">
              <h3 className="founder-name">ALEX NODE</h3>
              <p className="founder-role">Lead Roaster // Logistics</p>
            </div>
          </div>

          <div className="founder-card">
            <div className="founder-image-wrapper">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80" alt="Sarah Vector" />
            </div>
            <div className="founder-info">
              <h3 className="founder-name">SARAH VECTOR</h3>
              <p className="founder-role">Director of Extraction // UX</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
