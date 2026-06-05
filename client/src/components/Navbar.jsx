import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingBag, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import logo from '../assets/logo.png';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const handleAuthClick = () => {
    setIsOpen(false);
    const token = localStorage.getItem('fake_jwt_token');
    if (token) {
      navigate('/profile');
    } else {
      navigate('/auth');
    }
  };

  return (
    <nav className="navbar glass">
      <div className="container nav-container">
        <Link to="/" className="nav-logo">
          <img src={logo} alt="Daily Grind Café Logo" />
          <span>Daily Grind Café</span>
        </Link>

        {/* Desktop Nav */}
        <div className="nav-links desktop-only">
          <Link to="/menu" className="nav-link">Menu</Link>
          <Link to="/about" className="nav-link">Our Story</Link>
          <Link to="/reservations" className="nav-link">Reservations</Link>
        </div>

        <div className="nav-actions desktop-only">
          <button className="icon-btn" onClick={handleAuthClick}><User size={24} /></button>
          <button className="icon-btn cart-btn" onClick={() => navigate('/checkout')}>
            <ShoppingBag size={24} />
            {cartItems.length > 0 && <span className="cart-badge">{cartItems.length}</span>}
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="mobile-toggle mobile-only"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mobile-menu glass"
          >
            <div className="mobile-links">
              <Link to="/menu" className="nav-link" onClick={() => setIsOpen(false)}>Menu</Link>
              <Link to="/about" className="nav-link" onClick={() => setIsOpen(false)}>Our Story</Link>
              <Link to="/reservations" className="nav-link" onClick={() => setIsOpen(false)}>Reservations</Link>
              <div className="mobile-actions">
                <button className="icon-btn" onClick={handleAuthClick}><User size={24} /> Account</button>
                <button className="icon-btn cart-btn" onClick={() => { setIsOpen(false); navigate('/checkout'); }}>
                  <ShoppingBag size={24} /> Cart {cartItems.length > 0 && `(${cartItems.length})`}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
