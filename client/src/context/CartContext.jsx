import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('user_cart');
    if (savedCart) return JSON.parse(savedCart);
    return [
      {
        id: 'kinetic-chill',
        title: 'KINETIC CHILL',
        price: 5.50,
        quantity: 1,
        image: '/images/kinetic-chill.png'
      },
      {
        id: 'iced-white-mocha',
        title: 'ICED WHITE MOCHA',
        price: 6.25,
        quantity: 1,
        image: '/images/iced-white-mocha.png'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('user_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const [activeOrder, setActiveOrder] = useState(null);

  useEffect(() => {
    const storedOrder = localStorage.getItem('current_active_order');
    if (storedOrder) {
      setActiveOrder(JSON.parse(storedOrder));
    }
  }, []);

  const createOrder = (orderData) => {
    setActiveOrder(orderData);
    localStorage.setItem('current_active_order', JSON.stringify(orderData));
  };

  const clearActiveOrder = () => {
    setActiveOrder(null);
    localStorage.removeItem('current_active_order');
  };

  const addToCart = (item) => {
    setCartItems(prev => [...prev, item]);
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
    setIsRewardApplied(false); // Reset reward if cart is cleared
  };

  const [isRewardApplied, setIsRewardApplied] = useState(false);
  const applyReward = () => setIsRewardApplied(true);
  const removeReward = () => setIsRewardApplied(false);

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const discountAmount = isRewardApplied ? 15.00 : 0;
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const tax = taxableAmount * 0.05;
  const grandTotal = taxableAmount + tax;

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      clearCart,
      subtotal,
      discountAmount,
      isRewardApplied,
      applyReward,
      removeReward,
      tax,
      grandTotal,
      activeOrder,
      createOrder,
      clearActiveOrder
    }}>
      {children}
    </CartContext.Provider>
  );
};
