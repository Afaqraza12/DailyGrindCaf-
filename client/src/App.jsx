import React from 'react';
// Force Vite HMR rebuild
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Reservations from './pages/Reservations';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import Checkout from './pages/Checkout';
import TrackOrder from './pages/TrackOrder';
import ProductModal from './components/ProductModal';
import ActiveOrderBanner from './components/ActiveOrderBanner';
import { CurrencyProvider } from './context/CurrencyContext';
import { CartProvider } from './context/CartContext';

const App = () => {
  return (
    <CartProvider>
      <CurrencyProvider>
        <Router>
          <Navbar />
          <ActiveOrderBanner />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />}>
              <Route path=":slug" element={<ProductModal />} />
            </Route>
            <Route path="/about" element={<About />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/track-order" element={<TrackOrder />} />
            <Route path="*" element={<Home />} />
          </Routes>
          <Footer />
        </Router>
      </CurrencyProvider>
    </CartProvider>
  );
};

export default App;
