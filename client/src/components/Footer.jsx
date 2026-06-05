import React, { useState } from 'react';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if(email) {
      alert(`Subscribed with ${email}`);
      setEmail('');
    }
  };

  return (
    <footer className="footer-section">
      <div className="footer-content">
        <h2 className="footer-heading">Join the Inner Circle.</h2>
        <p className="footer-text">
          Get exclusive access to limited-edition micro-lot drops and secret menu releases.
        </p>
        
        <form className="newsletter-form" onSubmit={handleSubscribe}>
          <input 
            type="email" 
            className="newsletter-input" 
            placeholder="Enter your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="newsletter-btn" aria-label="Subscribe">
            →
          </button>
        </form>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Daily Grind Café. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
