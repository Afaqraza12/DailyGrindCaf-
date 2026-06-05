import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useCurrency } from '../context/CurrencyContext';
import { useCart } from '../context/CartContext';
import { X, Minus, Plus } from 'lucide-react';
import './ProductModal.css';

const ProductModal = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { formatPrice, loading: currencyLoading } = useCurrency();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Customization State
  const [size, setSize] = useState('standard');
  const [milk, setMilk] = useState('default');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    // Lock body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/menu/items/${slug}`);
        setProduct(res.data.data);
      } catch (error) {
        console.error("Error fetching product", error);
        navigate('/menu'); // Redirect on error/not found
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
    
    return () => {
      document.body.style.overflow = 'auto'; // Unlock scroll
    };
  }, [slug, navigate]);

  const handleClose = () => {
    navigate('/menu');
  };

  const calculateTotal = () => {
    if (!product) return 0;
    
    let basePrice = parseFloat(product.price);
    
    // Simple upcharges
    if (size === 'large') basePrice += 1.00;
    if (milk === 'oat' || milk === 'almond') basePrice += 0.75;
    
    return basePrice * quantity;
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    const cartItem = {
      id: product.id + '-' + Date.now(), // unique cart ID
      productId: product.id,
      title: product.name,
      slug: product.slug,
      image: product.images?.[0]?.image_url || product.primary_image || 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80',
      size,
      milk,
      quantity,
      price: calculateTotal() / quantity,
      totalPrice: calculateTotal()
    };
    
    // Add to Global Cart Context
    addToCart(cartItem);
    
    // Trigger animation
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      handleClose(); // Close after adding
    }, 1500);
  };

  if (loading) return null; // Simple un-rendered state until data loads

  const total = calculateTotal();
  const displayImage = product.images?.[0]?.image_url || product.primary_image || 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80';

  return (
    <div className="product-modal-backdrop" onClick={handleClose}>
      <motion.div 
        className="product-modal-content"
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <button className="modal-close-btn" onClick={handleClose}>
          <X size={24} />
        </button>
        
        <div className="modal-grid">
          {/* LEFT: Image */}
          <div className="modal-image-col">
            <img 
              src={displayImage} 
              alt={product.name} 
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80";
              }}
            />
          </div>
          
          {/* RIGHT: Details & Controls */}
          <div className="modal-details-col">
            <div className="modal-details-scroll">
              <h2 className="modal-title">{product.name}</h2>
              <p className="modal-desc">{product.description}</p>
              
              {product.category_slug !== 'pastries' && product.category_slug !== 'food' && (
                <>
                  <div className="customization-section">
                    <h3>Size</h3>
                    <div className="selector-group">
                      <button 
                        className={`selector-btn ${size === 'standard' ? 'active' : ''}`}
                        onClick={() => setSize('standard')}
                      >
                        Standard
                      </button>
                      <button 
                        className={`selector-btn ${size === 'large' ? 'active' : ''}`}
                        onClick={() => setSize('large')}
                      >
                        Large (+$1.00)
                      </button>
                    </div>
                  </div>

                  <div className="customization-section">
                    <h3>Milk Option</h3>
                    <div className="selector-group">
                      <button 
                        className={`selector-btn ${milk === 'default' ? 'active' : ''}`}
                        onClick={() => setMilk('default')}
                      >
                        Default
                      </button>
                      <button 
                        className={`selector-btn ${milk === 'oat' ? 'active' : ''}`}
                        onClick={() => setMilk('oat')}
                      >
                        Oat Milk (+$0.75)
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="modal-footer">
              <div className="quantity-selector">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={16} /></button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}><Plus size={16} /></button>
              </div>
              
              <button 
                className={`modal-add-btn ${added ? 'added' : ''}`}
                onClick={handleAddToCart}
              >
                {added ? '✓ ADDED TO CART' : `ADD TO CART — ${currencyLoading ? '...' : formatPrice(total)}`}
              </button>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductModal;
