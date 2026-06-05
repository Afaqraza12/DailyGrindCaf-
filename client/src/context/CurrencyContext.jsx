import React, { createContext, useState, useEffect, useContext } from 'react';

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('USD');
  const [exchangeRate, setExchangeRate] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeCurrency = async () => {
      try {
        const geoRes = await fetch('https://ipapi.co/json/');
        const geoData = await geoRes.json();
        const localCurrency = geoData.currency || 'USD';
        
        const rateRes = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const rateData = await rateRes.json();
        const rate = rateData.rates[localCurrency] || 1;

        setCurrency(localCurrency);
        setExchangeRate(rate);
      } catch (error) {
        console.error('Failed to initialize local currency, defaulting to USD:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeCurrency();
  }, []);

  const formatPrice = (baseUsdPrice) => {
    const converted = baseUsdPrice * exchangeRate;
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currency,
    }).format(converted);
  };

  return (
    <CurrencyContext.Provider value={{ currency, exchangeRate, formatPrice, loading }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
