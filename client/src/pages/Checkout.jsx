import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import useSEO from '../hooks/useSEO';
import './Checkout.css';

const Checkout = () => {
  useSEO({
    title: 'Checkout | Secure Logistics | Daily Grind Café',
    description: 'Finalize your order through our secure checkout node.'
  });

  const { cartItems, subtotal, discountAmount, isRewardApplied, applyReward, removeReward, tax, grandTotal, clearCart, createOrder } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [loyaltyBeans, setLoyaltyBeans] = useState(0);
  const navigate = useNavigate();

  const [deliveryData, setDeliveryData] = useState({
    name: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zip: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const beans = parseInt(localStorage.getItem('loyaltyBeans')) || 0;
    setLoyaltyBeans(beans);
    
    // Auto-fill mock profile for delivery
    const storedProfile = JSON.parse(localStorage.getItem('user_profile'));
    if (storedProfile) {
      setDeliveryData(storedProfile);
    } else {
      const mockProfile = {
        name: 'Builder_01',
        phone: '+1 (555) 019-8233',
        street: '128 ENGINEERING WAY, APT 404',
        city: 'SAN FRANCISCO',
        state: 'CA',
        zip: '94105'
      };
      localStorage.setItem('user_profile', JSON.stringify(mockProfile));
      setDeliveryData(mockProfile);
    }
  }, []);

  const handleDeliveryChange = (e) => {
    setDeliveryData({ ...deliveryData, [e.target.name]: e.target.value });
  };

  const isFormValid = () => {
    const hasEmpty = Object.values(deliveryData).some(val => val.trim() === '');
    if (hasEmpty) return false;
    
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    const zipRegex = /^[0-9]{5}(-[0-9]{4})?$/;
    
    return phoneRegex.test(deliveryData.phone) && zipRegex.test(deliveryData.zip);
  };

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      // Rewards Integration
      const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
      let currentBeans = parseInt(localStorage.getItem('loyaltyBeans')) || 0;
      
      if (isRewardApplied) {
        currentBeans -= 10;
      }
      
      localStorage.setItem('loyaltyBeans', currentBeans + totalItems);

      const refId = Math.random().toString(16).substr(2, 8).toUpperCase();
      const orderData = {
        reference_id: refId,
        courier: { name: 'ALEX', phone: '+1 (555) 019-2831' },
        status: 'OUT FOR DELIVERY',
        items: cartItems
      };

      createOrder(orderData);
      clearCart();
      setIsProcessing(false);
      navigate('/track-order');
    }, 1500);
  };

  return (
    <div className="checkout-page">
      <div className="engineering-grid-overlay"></div>
      
      <div className="checkout-container">
        
        {/* LEFT COLUMN: PAYMENT GATEWAY & DELIVERY */}
        <div className="checkout-left">
          <h2 className="checkout-header">SECURE CHECKOUT</h2>
          
          <div className="delivery-pane glass-panel">
            <h3 className="pane-header">DELIVERY & RECIPIENT INFORMATION</h3>
            <div className="grid-form">
              <div className="input-group">
                <label>FULL NAME</label>
                <input type="text" name="name" value={deliveryData.name} onChange={handleDeliveryChange} className="dark-input" />
              </div>
              <div className="input-group">
                <label>PHONE NUMBER</label>
                <input type="text" name="phone" value={deliveryData.phone} onChange={handleDeliveryChange} className="dark-input" />
              </div>
              <div className="input-group full-width">
                <label>STREET ADDRESS</label>
                <input type="text" name="street" value={deliveryData.street} onChange={handleDeliveryChange} className="dark-input" />
              </div>
              <div className="input-group">
                <label>CITY</label>
                <input type="text" name="city" value={deliveryData.city} onChange={handleDeliveryChange} className="dark-input" />
              </div>
              <div className="input-row full-width">
                <div className="input-group">
                  <label>STATE</label>
                  <input type="text" name="state" value={deliveryData.state} onChange={handleDeliveryChange} className="dark-input" />
                </div>
                <div className="input-group">
                  <label>ZIP CODE</label>
                  <input type="text" name="zip" value={deliveryData.zip} onChange={handleDeliveryChange} className="dark-input" />
                </div>
              </div>
            </div>
          </div>

          <div className="payment-selector">
            <button 
              className={`toggle-btn ${paymentMethod === 'credit-card' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('credit-card')}
            >
              [ CREDIT CARD ]
            </button>
            <button 
              className={`toggle-btn ${paymentMethod === 'cod' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('cod')}
            >
              [ CASH ON DELIVERY ]
            </button>
          </div>

          <div className="gateway-panel glass-panel">
            {paymentMethod === 'credit-card' ? (
              <div className="stripe-simulation">
                <div className="input-group full-width">
                  <label>CARD NUMBER</label>
                  <input type="text" placeholder="•••• •••• •••• ••••" className="dark-input" />
                </div>
                <div className="input-row">
                  <div className="input-group">
                    <label>EXPIRY</label>
                    <input type="text" placeholder="MM/YY" className="dark-input" />
                  </div>
                  <div className="input-group">
                    <label>CVC</label>
                    <input type="text" placeholder="•••" className="dark-input" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="cod-simulation">
                <span className="cod-alert">COD_FULFILLMENT // SETTLEMENT UPON ARRIVAL</span>
              </div>
            )}
          </div>
          
          <button 
            className="secure-btn" 
            onClick={handleCheckout} 
            disabled={isProcessing || cartItems.length === 0 || !isFormValid()}
          >
            {isProcessing ? 'TOKENIZING VIA STRIPE...' : 'COMPLETE ORDER'}
          </button>
        </div>

        {/* RIGHT COLUMN: ORDER SUMMARY */}
        <div className="checkout-right">
          <div className="summary-pane glass-panel">
            <h3 className="summary-header">ORDER SUMMARY</h3>
            
            <div className="cart-list">
              {cartItems.length === 0 ? (
                <p className="empty-cart">CART IS EMPTY</p>
              ) : (
                cartItems.map(item => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.title} className="cart-item-img" />
                    <div className="cart-item-details">
                      <span className="item-title">{item.quantity}x {item.title}</span>
                      <span className="item-price">${item.price.toFixed(2)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <div className="voucher-block">
              <div className="voucher-input-row">
                <input 
                  type="text" 
                  placeholder="ENTER VOUCHER CODE" 
                  value={promoCode} 
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="dark-input small-input"
                />
                <button className="apply-btn">APPLY</button>
              </div>

              {loyaltyBeans >= 10 && (
                <div className="reward-redemption" style={{ marginTop: '1rem' }}>
                  {!isRewardApplied ? (
                    <button className="reward-btn" onClick={applyReward}>
                      [ REDEEM 10 BEANS ($15 OFF) ]
                    </button>
                  ) : (
                    <button className="reward-btn remove" onClick={removeReward}>
                      [ REMOVE REWARD ]
                    </button>
                  )}
                </div>
              )}
            </div>
            
            <div className="totals-block">
              <div className="total-row">
                <span className="total-label">SUBTOTAL</span>
                <span className="total-val">${subtotal.toFixed(2)}</span>
              </div>
              {isRewardApplied && (
                <div className="total-row reward-row">
                  <span className="total-label tech-green">REWARD APPLIED</span>
                  <span className="total-val tech-green">-$15.00</span>
                </div>
              )}
              <div className="total-row">
                <span className="total-label">TAX (5%)</span>
                <span className="total-val">${tax.toFixed(2)}</span>
              </div>
              <div className="total-row grand-total">
                <span className="total-label">GRAND TOTAL</span>
                <span className="total-val tech-green">${grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Checkout;
