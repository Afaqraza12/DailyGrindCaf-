import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrency } from '../context/CurrencyContext';
import './CoffeeCard.css';

const CoffeeCard = ({ item }) => {
  const navigate = useNavigate();
  const { formatPrice, loading } = useCurrency();
  const [isFlipped, setIsFlipped] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    
    const cartItem = {
      id: item.id + '-' + Date.now(),
      productId: item.id,
      name: item.name,
      slug: item.slug,
      image: item.primary_image,
      size: 'standard',
      milk: 'default',
      quantity: 1,
      unitPrice: parseFloat(item.price),
      totalPrice: parseFloat(item.price)
    };
    
    const existingCart = JSON.parse(localStorage.getItem('brewhaus_cart') || '[]');
    existingCart.push(cartItem);
    localStorage.setItem('brewhaus_cart', JSON.stringify(existingCart));

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div 
      className="coffee-card-wrapper"
      onClick={() => navigate(`/menu/${item.slug}`)}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div className={`coffee-card-inner ${isFlipped ? 'is-flipped' : ''}`}>
        
        {/* FRONT OF CARD */}
        <div className="coffee-card-front">
          <div className="card-image-container">
            <img 
              src={item.primary_image || 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80'} 
              alt={item.name} 
              className="card-image"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80";
              }}
            />
            <div className="card-gradient-overlay"></div>
          </div>
          <div className="card-front-content">
            <h3 className="card-title">{item.name}</h3>
            <p className="card-price">
              {loading ? '...' : formatPrice(parseFloat(item.price))}
            </p>
          </div>
        </div>

        {/* BACK OF CARD */}
        <div className="coffee-card-back">
          <div className="card-back-content">
            <h3 className="card-title-back">{item.name}</h3>
            <p className="card-description">{item.description}</p>
            
            <button 
              className={`add-to-cart-btn ${added ? 'added' : ''}`}
              onClick={handleAddToCart}
            >
              {added ? '✓ Added' : 'Add to Cart'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CoffeeCard;
