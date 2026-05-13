import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './FeaturedMenu.css';

const menuItems = [
  {
    id: 1,
    name: "Artisanal Sourdough",
    price: "₹180",
    image: "https://images.unsplash.com/photo-1585478259715-876acc5be8eb?q=80&w=1974&auto=format&fit=crop",
    category: "Breads",
    rating: 4.9
  },
  {
    id: 2,
    name: "Chocolate Truffle Cake",
    price: "₹450",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=2089&auto=format&fit=crop",
    category: "Cakes",
    rating: 5.0
  },
  {
    id: 3,
    name: "Premium Cappuccino",
    price: "₹140",
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=1974&auto=format&fit=crop",
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
          </div>
          <Link to="/menu" className="view-all">
            View Full Menu <ArrowRight size={20} />
          </Link>
        </div>

        <div className="menu-grid">
          {menuItems.map((item, index) => (
            <motion.div 
              key={item.id}
              className="menu-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="card-image">
                <img src={item.image} alt={item.name} />
                <span className="card-badge">{item.category}</span>
                <div className="rating-badge">
                  <Star size={12} fill="currentColor" /> {item.rating}
                </div>
              </div>
              <div className="card-content">
                <h3>{item.name}</h3>
                <div className="card-footer">
                  <span className="price">{item.price}</span>
                  <button 
                    className="btn btn-primary"
                    onClick={() => addToCart(item)}
                  >
                    Order Now
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
