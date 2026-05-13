import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './FeaturedMenu.css';

const menuItems = [
  {
    id: 'f1',
    name: "Classic Sourdough",
    price: "₹180",
    image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=2070&auto=format&fit=crop",
    category: "Breads",
    rating: 4.9
  },
  {
    id: 'f2',
    name: "Velvet Truffle Cake",
    price: "₹450",
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=1974&auto=format&fit=crop",
    category: "Cakes",
    rating: 5.0
  },
  {
    id: 'f3',
    name: "Signature Cappuccino",
    price: "₹140",
    image: "https://images.unsplash.com/photo-1541167760496-162955ed8a9f?q=80&w=1974&auto=format&fit=crop",
    category: "Cafe",
    rating: 4.8
  }
];

const FeaturedMenu = () => {
  const { addToCart } = useCart();

  return (
    <section className="menu-section" id="menu">
      <div className="container">
        <div className="section-header">
          <div className="header-text">
            <span className="sub-title">Top Picks</span>
            <h2>Our Featured Menu</h2>
            <p>Hand-selected favorites for the perfect bakery experience.</p>
          </div>
          <Link to="/menu" className="view-all">
            Explore All 50+ Items <ArrowRight size={20} />
          </Link>
        </div>

        <div className="menu-grid">
          {menuItems.map((item, index) => (
            <motion.div 
              key={item.id}
              className="featured-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="featured-image">
                <img src={item.image} alt={item.name} />
                <div className="overlay">
                  <span className="category-tag">{item.category}</span>
                  <div className="rating-tag">
                    <Star size={12} fill="currentColor" /> {item.rating}
                  </div>
                </div>
              </div>
              <div className="featured-info">
                <h3>{item.name}</h3>
                <div className="featured-bottom">
                  <span className="price-tag">{item.price}</span>
                  <button 
                    className="quick-add-btn"
                    onClick={() => addToCart(item)}
                    title="Add to Bag"
                  >
                    <ShoppingBag size={18} /> Order
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedMenu;
