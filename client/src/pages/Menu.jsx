import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import CoffeeCard from '../components/CoffeeCard';
import Loader from '../components/Loader';
import useSEO from '../hooks/useSEO';
import './Menu.css';

const Menu = () => {
  useSEO({
    title: 'Menu | Premium Single Origin Coffee | Daily Grind Café',
    description: 'Explore our laboratory of high-performance fuel. From Thermodynamic Roasts to the Kinetic Chill.',
    keywords: ["cold brew", "espresso menu", "single origin coffee", "aeropress"]
  });

  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const [catRes, itemRes] = await Promise.all([
          axios.get('http://localhost:5000/api/menu/categories'),
          axios.get('http://localhost:5000/api/menu/items')
        ]);
        
        setCategories(catRes.data.data);
        setItems(itemRes.data.data);
      } catch (error) {
        console.error("Error fetching menu data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  const filteredItems = activeCategory === 'all' 
    ? items 
    : items.filter(item => item.category_slug === activeCategory);

  if (loading) {
    return <Loader text="BREWING MENU..." />;
  }

  return (
    <div className="menu-page">
      <div className="menu-hero">
        <h1 className="menu-title">Our Menu</h1>
        <p className="menu-subtitle">Engineered for peak performance.</p>
      </div>

      <div className="category-tabs-container">
        <div className="category-tabs">
          <button 
            className={`category-tab ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            All
          </button>
          {categories.map(cat => (
            <button 
              key={cat.id}
              className={`category-tab ${activeCategory === cat.slug ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.slug)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="menu-grid-container">
        <motion.div layout className="menu-grid">
          <AnimatePresence>
            {filteredItems.map(item => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <CoffeeCard item={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      
      {/* Product Detail Modal Overlay mounts here */}
      <Outlet />
    </div>
  );
};

export default Menu;
