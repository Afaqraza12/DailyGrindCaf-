import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ActiveOrderBanner.css';

const ActiveOrderBanner = () => {
  const { activeOrder } = useCart();
  const navigate = useNavigate();

  if (!activeOrder) return null;

  return (
    <div className="active-order-banner">
      <span className="banner-text">⚡ LIVE DELIVERY ACTIVE // REFERENCE: {activeOrder.reference_id}</span>
      <button className="banner-link" onClick={() => navigate('/track-order')}>[ VIEW COURIER TRACKER ]</button>
    </div>
  );
};

export default ActiveOrderBanner;
