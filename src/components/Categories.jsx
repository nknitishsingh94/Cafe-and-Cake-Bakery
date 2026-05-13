import React from 'react';
import { motion } from 'framer-motion';
import './Categories.css';

const categories = [
  {
    title: "Artisanal Bread",
    image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=2070&auto=format&fit=crop",
    items: "12+ Varieties"
  },
  {
    title: "Signature Cakes",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=2089&auto=format&fit=crop",
    items: "25+ Varieties"
  },
  {
    title: "Premium Coffee",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop",
    items: "15+ Roasts"
  }
];

const Categories = () => {
  return (
    <section className="categories-section">
      <div className="container">
        <div className="section-header">
          <span className="sub-title">Explore</span>
          <h2>Our Specialities</h2>
        </div>
        <div className="categories-grid">
          {categories.map((cat, index) => (
            <motion.div 
              key={cat.title}
              className="category-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="card-image">
                <img src={cat.image} alt={cat.title} />
                <div className="card-overlay">
                  <span className="item-count">{cat.items}</span>
                  <h3>{cat.title}</h3>
                  <button className="shop-link">View Collection →</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
