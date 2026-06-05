import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Star } from 'lucide-react';
import './Reviews.css';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reviews');
        if (response.data.success) {
          setReviews(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  if (loading) return null;

  return (
    <section className="reviews-section">
      <div className="reviews-container">
        <h2 className="reviews-header">COMMUNITY FEEDBACK</h2>
        
        <div className="reviews-marquee-wrapper">
          <div className="reviews-marquee">
            {[...reviews, ...reviews].map((review, idx) => (
              <div 
                key={`${review.id}-${idx}`} 
                className="review-card"
                onMouseMove={handleMouseMove}
              >
                <div className="stars-row">
                  {[...Array(review.rating || 5)].map((_, i) => (
                    <Star key={i} size={16} className="star-icon" fill="currentColor" />
                  ))}
                </div>
                <p className="review-text">"{review.text}"</p>
                <span className="review-handle">{review.handle}</span>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default Reviews;
