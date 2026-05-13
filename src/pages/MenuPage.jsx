import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowLeft, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fullMenu } from '../data/menuData';
import './MenuPage.css';

const MenuPage = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Cakes', 'Pastry', 'Breads', 'Bakery', 'Cafe'];

  const filteredItems = filter === 'All' 
    ? fullMenu 
    : fullMenu.filter(item => item.category === filter);

  return (
    <div className="menu-page">
      <div className="menu-page-header">
        <div className="container">
          <Link to="/" className="back-link">
            <ArrowLeft size={20} /> Back to Home
          </Link>
          <h1>Our Full <span className="text-highlight">Collection</span></h1>
          <p>Discover our range of 50+ handcrafted delights, baked fresh every single morning.</p>
        </div>
      </div>

      <div className="filter-bar">
        <div className="container">
          <div className="filters">
            {categories.map(cat => (
              <button 
                key={cat}
                className={`filter-btn ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="full-menu-grid">
          {filteredItems.map((item, i) => (
            <motion.div 
              key={item.id} 
              className="full-menu-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02 }}
            >
              <div className="item-img-box">
                <img src={item.image} alt={item.name} />
                <span className="item-cat-badge">{item.category}</span>
              </div>
              <div className="item-details">
                <div className="item-main-info">
                  <h3>{item.name}</h3>
                  <span className="item-price">{item.price}</span>
                </div>
                <button className="btn btn-primary order-btn">
                  Order Now <ShoppingCart size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
