import React, { useState, useEffect } from 'react';
import useSEO from '../hooks/useSEO';
import './Reservations.css';

const Reservations = () => {
  useSEO({
    title: 'Reservations | Secure Your Node | Daily Grind Café',
    description: 'Reserve your seat at the Daily Grind Café studio. Secure a workspace optimized for peak performance.'
  });

  const [partySize, setPartySize] = useState(2);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confHex, setConfHex] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Generate Calendar
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sun
  
  const calendarDays = [];
  // padding
  for (let i = 0; i < firstDayIndex; i++) {
    calendarDays.push({ empty: true });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    // Basic past-date check (simplistic for current month)
    const isPast = i < today.getDate(); 
    calendarDays.push({ 
      empty: false, 
      day: i, 
      dateString: `${currentYear}-${(currentMonth+1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`,
      isPast 
    });
  }

  const timeSlots = ['09:00 AM', '11:00 AM', '02:00 PM', '04:30 PM'];

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) return;
    setIsConfirmed(true);
    setConfHex(Math.random().toString(16).substr(2, 8).toUpperCase());
  };

  return (
    <div className="reservations-page">
      <div className="engineering-grid-overlay"></div>
      
      <div className="res-container">
        
        {/* LEFT COLUMN */}
        <div className="res-left-col">
          <h1 className="res-header">RESERVE A SEAT WITH US</h1>
          
          <div className="res-section">
            <h3 className="res-label">PARTY SIZE</h3>
            <div className="party-selector">
              {[1, 2, 3, 4, 5, 6].map(num => (
                <button 
                  key={num}
                  className={`pill-btn ${partySize === num ? 'active' : ''}`}
                  onClick={() => setPartySize(num)}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <div className="res-section">
            <h3 className="res-label">SELECT DATE ({today.toLocaleString('default', { month: 'long' }).toUpperCase()})</h3>
            <div className="calendar-grid">
              {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                <div key={day} className="cal-header-cell">{day}</div>
              ))}
              {calendarDays.map((d, idx) => (
                <button
                  key={idx}
                  className={`cal-cell ${d.empty ? 'empty' : ''} ${d.isPast ? 'past' : ''} ${selectedDate === d.dateString ? 'active' : ''}`}
                  disabled={d.empty || d.isPast}
                  onClick={() => d.dateString && setSelectedDate(d.dateString)}
                >
                  {!d.empty && d.day}
                </button>
              ))}
            </div>
          </div>

          <div className="res-section">
            <h3 className="res-label">SELECT TIMESTAMP</h3>
            <div className="time-cluster">
              {timeSlots.map(time => (
                <button 
                  key={time}
                  className={`pill-btn time-btn ${selectedTime === time ? 'active' : ''}`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="res-right-col">
          <div className="recap-pane">
            {!isConfirmed ? (
              <>
                <div className="recap-content">
                  <div className="recap-row">
                    <span className="recap-label">ALLOCATION //</span>
                    <span className="recap-value">{partySize} SEATS</span>
                  </div>
                  <div className="recap-row">
                    <span className="recap-label">TIMESTAMP //</span>
                    <span className="recap-value">
                      {selectedDate || 'SELECT_DATE_&_TIME'} @ {selectedTime || '--:--'}
                    </span>
                  </div>
                  <div className="recap-row">
                    <span className="recap-label">STATUS //</span>
                    <span className="recap-value blink-text">AWAITING YOUR SELECTION</span>
                  </div>
                </div>
                <button 
                  className="secure-btn" 
                  disabled={!selectedDate || !selectedTime}
                  onClick={handleConfirm}
                >
                  SECURE SLOT
                </button>
              </>
            ) : (
              <div className="recap-content success-block">
                <span className="success-text">RESERVATION_SECURED // ID: DG-{confHex}</span>
                <span className="success-subtext">SYSTEM ALLOCATION COMPLETE.</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Reservations;
