import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSEO from '../hooks/useSEO';
import './Profile.css';

const Profile = () => {
  useSEO({
    title: 'My Account | Daily Grind Café',
    description: 'Manage your logistics coordinates, track active orders, and view your loyalty ledger.'
  });

  const navigate = useNavigate();

  // State Expansion
  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const [accountData, setAccountData] = useState({
    firstName: 'JANE',
    lastName: 'DOE',
    email: 'node@network.com',
    phone: '555-019-8233'
  });

  const [shippingData, setShippingData] = useState({
    street: '128 ENGINEERING WAY',
    suite: 'APT 404',
    city: 'SAN FRANCISCO',
    state: 'CA',
    zip: '94105'
  });

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('fake_jwt_token');
    if (!token) {
      navigate('/auth');
    }
    window.scrollTo(0, 0);
  }, [navigate]);

  const handleDisconnect = () => {
    localStorage.removeItem('fake_jwt_token');
    navigate('/');
  };

  const handleCopyReferral = () => {
    navigator.clipboard.writeText('dailygrind.cafe/invite/BUILDER01');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAccountChange = (e) => {
    setAccountData({...accountData, [e.target.name]: e.target.value});
  };

  const handleShippingChange = (e) => {
    setShippingData({...shippingData, [e.target.name]: e.target.value});
  };

  const [loyaltyBeans, setLoyaltyBeans] = useState(7);

  useEffect(() => {
    const storedBeans = parseInt(localStorage.getItem('loyaltyBeans'));
    if (!isNaN(storedBeans)) {
      setLoyaltyBeans(storedBeans);
    } else {
      localStorage.setItem('loyaltyBeans', 7);
    }
  }, []);

  const totalBeans = 10;

  const mockTransactions = [
    { id: 'TXN_A902', item: '1x Iced White Mocha', status: 'COMPLETED' },
    { id: 'TXN_A855', item: '2x Chocolate Croissant', status: 'COMPLETED' },
    { id: 'TXN_A711', item: '1x Kinetic Chill', status: 'COMPLETED' },
    { id: 'TXN_A620', item: '1x Ethiopia Yirgacheffe Pour Over', status: 'COMPLETED' }
  ];

  return (
    <div className="profile-page">
      <div className="engineering-grid-overlay"></div>
      
      <div className="profile-container">
        {/* LEFT PANEL */}
        <div className="profile-sidebar">
          <div className="stats-card">
            <h2 className="stats-title">MY ACCOUNT</h2>
            <div className="stats-content">
              <div className="stat-row">
                <span className="stat-label">USERNAME //</span>
                <span className="stat-value">Builder_01</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">TIER //</span>
                <span className="stat-value tech-green">Elite Member Node</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">ACCOUNT STATUS //</span>
                <span className="stat-value">ACTIVE</span>
              </div>
            </div>
            <button className="disconnect-btn" onClick={handleDisconnect}>
              LOGOUT
            </button>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="profile-main">
          
          {/* LOYALTY ENGINE */}
          <div className="dashboard-section">
            <h3 className="section-header">THE GRIND REWARDS</h3>
            <div className="glass-panel">
              <div className="loyalty-header">
                <span className="loyalty-count">{loyaltyBeans} / {totalBeans} BEANS UNLOCKED</span>
                <span className="loyalty-target">TARGET: FREE BREW</span>
              </div>
              
              <div className="beans-grid">
                {Array.from({ length: totalBeans }).map((_, index) => (
                  <div 
                    key={index} 
                    className={`bean-slot ${index < loyaltyBeans ? 'filled' : 'empty'}`}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* ACCOUNT SETTINGS */}
          <div className="dashboard-section">
            <h3 className="section-header">ACCOUNT SETTINGS</h3>
            <div className="glass-panel">
              <div className="panel-header">
                <span className="panel-title">PRIMARY IDENTIFIER</span>
                <button 
                  className="action-btn"
                  onClick={() => setIsEditingAccount(!isEditingAccount)}
                >
                  {isEditingAccount ? 'SAVE CHANGES' : 'EDIT'}
                </button>
              </div>
              
              <div className="grid-form">
                <div className="input-group">
                  <label>FIRST NAME</label>
                  {isEditingAccount ? (
                    <input name="firstName" value={accountData.firstName} onChange={handleAccountChange} />
                  ) : (
                    <span className="readout">{accountData.firstName}</span>
                  )}
                </div>
                <div className="input-group">
                  <label>LAST NAME</label>
                  {isEditingAccount ? (
                    <input name="lastName" value={accountData.lastName} onChange={handleAccountChange} />
                  ) : (
                    <span className="readout">{accountData.lastName}</span>
                  )}
                </div>
                <div className="input-group">
                  <label>EMAIL ADDRESS</label>
                  {isEditingAccount ? (
                    <input name="email" value={accountData.email} onChange={handleAccountChange} />
                  ) : (
                    <span className="readout">{accountData.email}</span>
                  )}
                </div>
                <div className="input-group">
                  <label>PHONE NUMBER</label>
                  {isEditingAccount ? (
                    <input name="phone" value={accountData.phone} onChange={handleAccountChange} />
                  ) : (
                    <span className="readout">{accountData.phone}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* LOGISTICS NODE */}
          <div className="dashboard-section">
            <h3 className="section-header">DELIVERY ADDRESS</h3>
            <div className="glass-panel">
              <div className="grid-form logistics-form">
                <div className="input-group full-width">
                  <label>STREET ADDRESS</label>
                  <input name="street" value={shippingData.street} onChange={handleShippingChange} />
                </div>
                <div className="input-group">
                  <label>APT / SUITE</label>
                  <input name="suite" value={shippingData.suite} onChange={handleShippingChange} />
                </div>
                <div className="input-group">
                  <label>CITY</label>
                  <input name="city" value={shippingData.city} onChange={handleShippingChange} />
                </div>
                <div className="input-group">
                  <label>STATE</label>
                  <input name="state" value={shippingData.state} onChange={handleShippingChange} />
                </div>
                <div className="input-group">
                  <label>POSTAL CODE</label>
                  <input name="zip" value={shippingData.zip} onChange={handleShippingChange} />
                </div>
              </div>
              <button className="save-btn mt-4">UPDATE ADDRESS</button>
            </div>
          </div>

          {/* MARKETING HUB */}
          <div className="dashboard-section">
            <h3 className="section-header">REFERRALS & PROMOTIONS</h3>
            <div className="glass-panel promo-panel">
              <div className="promo-block">
                <label>INVITE FRIENDS</label>
                <div className="promo-action-row">
                  <div className="readout-box">dailygrind.cafe/invite/BUILDER01</div>
                  <button className="action-btn" onClick={handleCopyReferral}>
                    {copied ? 'COPIED!' : 'COPY'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* TRANSACTION LEDGER */}
          <div className="dashboard-section">
            <h3 className="section-header">RECENT ORDERS</h3>
            <div className="glass-panel">
              <div className="ledger-list">
                {mockTransactions.map((txn, idx) => (
                  <div key={idx} className="ledger-row">
                    <span className="ledger-id">{txn.id} //</span>
                    <span className="ledger-item">{txn.item} //</span>
                    <span className="ledger-status">{txn.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
