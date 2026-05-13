import React from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import './Reviews.css';

const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Food Blogger",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
    text: "The best croissants I've had outside of Paris! The atmosphere is so cozy and the staff is incredibly welcoming.",
    rating: 5
  },
  {
    id: 2,
    name: "David Chen",
    role: "Regular Customer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    text: "Their sourdough bread is a staple in our house. And don't even get me started on the seasonal cakes - simply divine!",
    rating: 5
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Coffee Enthusiast",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop",
    text: "Nikhil's Cafe has the perfect roast. Every cup is consistent and the latte art is always a beautiful touch to my morning.",
    rating: 5
  }
];

const Reviews = () => {
  return (
    <section className="reviews-section" id="reviews">
      <div className="container">
        <div className="section-header">
          <span className="sub-title">Testimonials</span>
          <h2>What Our Guests Say</h2>
        </div>
        
        <div className="reviews-grid">
          {reviews.map((review, i) => (
            <motion.div 
              key={review.id}
              className="review-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="quote-icon">
                <Quote size={40} fill="currentColor" opacity={0.1} />
              </div>
              <div className="stars">
                {[...Array(review.rating)].map((_, index) => (
                  <Star key={index} size={16} fill="#d4a373" color="#d4a373" />
                ))}
              </div>
              <p className="review-text">"{review.text}"</p>
              <div className="review-user">
                <img src={review.image} alt={review.name} />
                <div className="user-info">
                  <h4>{review.name}</h4>
                  <span>{review.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
