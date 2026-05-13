import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Cake, Coffee, Search, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="logo">
          <img src={logo} alt="NS Bakery" className="navbar-logo" />
        </div>

        {/* Desktop Navigation */}
        <div className="desktop-nav">
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
            
            {/* Menu Dropdown Button */}
            <li className="dropdown-container">
              <button 
                className="menu-trigger"
                onClick={() => setMenuOpen(!menuOpen)}
                onMouseEnter={() => setMenuOpen(true)}
              >
                Menu <ChevronDown size={18} className={menuOpen ? 'rotate' : ''} />
              </button>
              
              <AnimatePresence>
                {menuOpen && (
                  <motion.div 
                    className="dropdown-menu"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    onMouseLeave={() => setMenuOpen(false)}
                  >
                    <a href="#" className="dropdown-item">
                      <Cake size={20} />
                      <div className="item-info">
                        <span className="item-title">Cake</span>
                        <span className="item-desc">Freshly baked delights</span>
                      </div>
                    </a>
                    <a href="#" className="dropdown-item">
                      <Coffee size={20} />
                      <div className="item-info">
                        <span className="item-title">Cafe</span>
                        <span className="item-desc">Premium roasted coffee</span>
                      </div>
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          </ul>

          <div className="nav-actions">
            <button className="icon-btn"><Search size={20} /></button>
            <button className="icon-btn"><ShoppingBag size={20} /></button>
            <button className="btn btn-primary">Order Now</button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="mobile-nav"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <ul className="mobile-links">
              {navLinks.map((link) => (
                <li key={link.name} onClick={() => setIsOpen(false)}>
                  <a href={link.href}>{link.name}</a>
                </li>
              ))}
              <li className="mobile-dropdown-section">
                <span className="section-title">Menu</span>
                <div className="mobile-menu-grid">
                  <a href="#" className="mobile-menu-item" onClick={() => setIsOpen(false)}>
                    <Cake size={24} />
                    <span>Cake</span>
                  </a>
                  <a href="#" className="mobile-menu-item" onClick={() => setIsOpen(false)}>
                    <Coffee size={24} />
                    <span>Cafe</span>
                  </a>
                </div>
              </li>
              <li className="mobile-cta">
                <button className="btn btn-primary w-full">Order Now</button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
