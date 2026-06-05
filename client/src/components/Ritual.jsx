import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Ritual.css';

const ritualSteps = [
  {
    num: "01",
    title: "The Origin",
    subtitle: "Ethically Sourced Arabica",
    text: "Hand-picked beans traded directly with independent estate farmers who prioritize sustainability and peak soil quality."
  },
  {
    num: "02",
    title: "The Precision",
    subtitle: "Small-Batch Roasting",
    text: "Roasted daily to exact thermodynamic profiles, bringing out rich notes of dark chocolate, citrus, and toasted hazelnut without the bitterness."
  },
  {
    num: "03",
    title: "The Velocity",
    subtitle: "Flash-Chilled Chasing",
    text: "Our signature drinks undergo rapid cryogenic chilling to instantly lock in volatile aromatics and flavor compounds."
  }
];

const Ritual = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="ritual-section">
      <div className="ritual-header">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="overline">THE RITUAL</span>
          <h2 className="section-heading">Concept Showcase</h2>
        </motion.div>
      </div>

      <div className="ritual-grid">
        {ritualSteps.map((step, index) => {
          const isHovered = hoveredIndex === index;
          const isDimmed = hoveredIndex !== null && hoveredIndex !== index;

          return (
            <motion.div
              key={step.num}
              className={`ritual-card ${isHovered ? 'active' : ''} ${isDimmed ? 'dimmed' : ''}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              layout
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="ritual-card-content">
                <div className="ritual-num">
                  {step.num} <span className="slash">//</span> {step.title}
                </div>
                <h3 className="ritual-subtitle">{step.subtitle}</h3>
                <p className="ritual-text">{step.text}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Ritual;
