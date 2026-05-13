import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, ArrowLeft, Filter, Search as SearchIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { fullMenu } from '../data/menuData';
import './MenuPage.css';

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const { addToCart } = useCart();
  const location = useLocation();
  
  // Get search query from URL
  const query = new URLSearchParams(location.search).get('search')?.toLowerCase() || '';

  const categories = ['All', 'Cakes', 'Pastry', 'Bakery', 'Breads', 'Cafe'];

  const filteredItems = useMemo(() => {
    return fullMenu.filter(item => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(query) || 
                            item.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, query]);

  return (
    <div className="menu-page">
      {/* Header Section */}
      <div className="menu-page-header">
        <div className="container">
          <Link to="/" className="back-link">
            <ArrowLeft size={20} /> Back to Home
          </Link>
          <h1>{query ? `Results for "${query}"` : 'Our Full Menu'}</h1>
          <p>
            {query 
              ? `Found ${filteredItems.length} items matching your search.` 
              : 'Discover our complete collection of handcrafted delights, from artisanal sourdough to signature celebration cakes.'}
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="container">
          <div className="filters">
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Grid Section */}
      <main className="menu-grid-section">
        <div className="container">
          {filteredItems.length > 0 ? (
            <div className="full-menu-grid">
              {filteredItems.map((item) => (
                <motion.div 
                  key={item.id}
                  className="full-menu-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
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
                    <button 
                      className="btn btn-primary order-btn"
                      onClick={() => addToCart(item)}
                    >
                      Order Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <SearchIcon size={64} />
              <h3>No items found</h3>
              <p>We couldn't find anything matching your search. Try a different keyword or category.</p>
              <button className="btn btn-secondary" onClick={() => setActiveCategory('All')}>
                View All Menu
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MenuPage;
