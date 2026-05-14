import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="hero-badge">✨ Artisanal Excellence since 2021</span>
            <h1>Savor the Art of <br /> <span className="text-highlight">Fine Baking</span></h1>
            <p>
              Discover a world where every pastry tells a story and every cup of coffee is a masterpiece. 
              Handcrafted daily with passion, precision, and the finest organic ingredients.
            </p>
            <div className="hero-btns">
              <Link to="/menu" className="btn btn-primary">
                Explore Menu <ArrowRight size={18} />
              </Link>
            </div>
            
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-num">15+</span>
                <span className="stat-label">Years of Experience</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-num">50+</span>
                <span className="stat-label">Daily Specialties</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="hero-image-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="image-blob"></div>
            <img 
              src="https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop" 
              alt="Fresh Bread" 
              className="main-hero-img" 
            />

            {/* LARGE PREMIUM LOGO EMBLEM */}
            <motion.div 
              className="hero-logo-badge"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              <img src={logo} alt="Nikhil's Premium Logo" />
            </motion.div>

            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
