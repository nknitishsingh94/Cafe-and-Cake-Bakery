import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import './FeaturedMenu.css';

const menuItems = [
  {
    id: 1,
    name: "Classic Chocolate Cake",
    price: "$24.00",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=2089&auto=format&fit=crop",
    tag: "Best Seller"
  },
  {
    id: 2,
    name: "Butter Croissant",
    price: "$4.50",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=2052&auto=format&fit=crop",
    tag: "Fresh"
  },
  {
    id: 3,
    name: "Iced Caramel Latte",
    price: "$5.75",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=2069&auto=format&fit=crop",
    tag: "Popular"
  },
  {
    id: 4,
    name: "Blueberry Muffin",
    price: "$3.90",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1558401391-7899b4bd5bbf?q=80&w=1972&auto=format&fit=crop",
    tag: "Daily Bake"
  }
];

const FeaturedMenu = () => {
  return (
    <section className="menu-section">
      <div className="container">
        <div className="section-header">
          <span className="sub-title">From Our Kitchen</span>
          <h2>Today's Specials</h2>
        </div>
        
        <div className="menu-grid">
          {menuItems.map((item, i) => (
            <motion.div 
              key={item.id} 
              className="menu-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="card-img-wrapper">
                <img src={item.image} alt={item.name} />
                <span className="item-tag">{item.tag}</span>
                <button className="add-cart-btn"><ShoppingCart size={18} /></button>
              </div>
              <div className="card-body">
                <div className="card-top">
                  <div className="rating">
                    <Star size={14} fill="#d4a373" color="#d4a373" />
                    <span>{item.rating}</span>
                  </div>
                  <span className="price">{item.price}</span>
                </div>
                <h3>{item.name}</h3>
                <p>Pure indulgence made with premium ingredients.</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="menu-footer">
          <button className="btn btn-primary">View Full Menu</button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMenu;
