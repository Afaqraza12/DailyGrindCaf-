import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Coffee, Home, Navigation } from 'lucide-react';
import useSEO from '../hooks/useSEO';
import './TrackOrder.css';

const TrackOrder = () => {
  useSEO({
    title: 'Live Courier Tracking | Daily Grind Café',
    description: 'Monitor your high-performance caffeine dispatch via live coordinate streams.'
  });

  const { activeOrder, clearActiveOrder } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!activeOrder) {
      navigate('/');
    }
  }, [activeOrder, navigate]);

  if (!activeOrder) return null;

  const handleDismiss = () => {
    clearActiveOrder();
    navigate('/');
  };

  return (
    <div className="track-order-page flex-center">
      <div className="engineering-grid-overlay"></div>
      <div className="tracking-hub-container">
        <h2 className="tracking-header">ORDER TRACKING HUB</h2>
        <p className="tracking-ref">ORDER NUMBER: #{activeOrder.reference_id}</p>

        <div className="tracking-progress">
          <div className="step completed">ORDER SECURED</div>
          <div className="step-connector completed"></div>
          <div className="step completed">PREPARING BREW</div>
          <div className="step-connector active"></div>
          <div className="step active blink-text">OUT FOR DELIVERY</div>
        </div>

        <div className="map-vector-frame">
          <div className="map-grid-bg"></div>
          <div className="map-node cafe-node"><Coffee size={24} /></div>
          <div className="map-route">
            <div className="moving-scooter"><Navigation size={18} fill="currentColor" className="scooter-icon" /></div>
          </div>
          <div className="map-node delivery-node"><Home size={24} /></div>
        </div>

        <div className="courier-card glass-panel">
          <div className="courier-row">
            <span className="courier-label">COURIER ASSIGNED //</span>
            <span className="courier-val">{activeOrder.courier.name}</span>
          </div>
          <div className="courier-row">
            <span className="courier-label">COURIER PHONE //</span>
            <span className="courier-val">{activeOrder.courier.phone}</span>
          </div>
          <div className="courier-row">
            <span className="courier-label">ESTIMATED ARRIVAL //</span>
            <span className="courier-val tech-green">14 MINUTES</span>
          </div>
        </div>

        <button className="back-btn mt-6" onClick={handleDismiss}>DISMISS SHIPMENT</button>
      </div>
    </div>
  );
};

export default TrackOrder;
