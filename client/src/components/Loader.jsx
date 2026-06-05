import React from 'react';
import './Loader.css';

const Loader = ({ text = "BREWING NODE..." }) => {
  return (
    <div className="react-global-loader">
      <div className="coffee-cup-container">
        <div className="smoke smoke-1"></div>
        <div className="smoke smoke-2"></div>
        <div className="smoke smoke-3"></div>
        <div className="cup">
          <div className="cup-handle"></div>
        </div>
        <div className="saucer"></div>
      </div>
      <div className="loading-text">{text}</div>
    </div>
  );
};

export default Loader;
