import React, { useState } from 'react';
import { Star, Quote, Plus, X, Camera, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Reviews.css';

const initialReviews = [
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
  const [reviews, setReviews] = useState(initialReviews);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', text: '', rating: 5, role: 'Customer' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text) return alert("Please fill all fields!");
    
    const reviewToAdd = {
      ...newReview,
      id: Date.now(),
      image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop" // Default avatar
    };
    
    setReviews([reviewToAdd, ...reviews]);
    setIsModalOpen(false);
    setNewReview({ name: '', text: '', rating: 5, role: 'Customer' });
  };

  return (
    <section className="reviews-section" id="reviews">
      <div className="container">
        <div className="section-header-flex">
          <div className="header-text">
            <span className="sub-title">Testimonials</span>
            <h2>What Our Guests Say</h2>
          </div>
          <button className="btn btn-primary add-review-btn" onClick={() => setIsModalOpen(true)}>
            <Plus size={20} /> Write a Review
          </button>
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
                {[...Array(5)].map((_, index) => (
                  <Star 
                    key={index} 
                    size={16} 
                    fill={index < review.rating ? "#d4a373" : "none"} 
                    color="#d4a373" 
                  />
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

      {/* Review Submission Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div 
              className="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div 
              className="review-modal"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
            >
              <div className="modal-header">
                <h3>Share Your Experience</h3>
                <button className="close-modal" onClick={() => setIsModalOpen(false)}><X size={24} /></button>
              </div>

              <form onSubmit={handleSubmit} className="review-form">
                <div className="form-group">
                  <label>Your Name</label>
                  <input 
                    type="text" 
                    placeholder="E.g. Rahul Singh" 
                    value={newReview.name}
                    onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Rating</label>
                  <div className="star-input">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star}
                        size={28}
                        onClick={() => setNewReview({...newReview, rating: star})}
                        fill={star <= newReview.rating ? "#d4a373" : "none"}
                        color="#d4a373"
                        className="star-clickable"
                      />
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>Your Review</label>
                  <textarea 
                    placeholder="Tell us what you loved about our bakery..." 
                    rows="4"
                    value={newReview.text}
                    onChange={(e) => setNewReview({...newReview, text: e.target.value})}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary submit-btn">
                  Submit Review <Send size={18} />
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Reviews;
