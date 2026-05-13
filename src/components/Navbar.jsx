import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Cake, Coffee, Search, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { cartCount, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/menu?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
      setIsOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="logo">
          <span className="logo-text">Nikhil's</span>
          <span className="logo-sub">Bakery & Cafe</span>
        </Link>

        {/* Global Navigation - Visible on Desktop, Hidden on Mobile */}
        <div className="desktop-links">
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.name}>
                {link.href.includes('#') ? (
                  <a href={link.href}>{link.name}</a>
                ) : (
                  <Link to={link.href}>{link.name}</Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Global Actions - ALWAYS VISIBLE */}
        <div className="nav-actions">
          {!isSearchOpen ? (
            <button className="icon-btn search-trigger" onClick={() => setIsSearchOpen(true)}>
              <Search size={22} />
            </button>
          ) : (
            <motion.form 
              className="nav-search-form"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              onSubmit={handleSearch}
            >
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button type="button" onClick={() => setIsSearchOpen(false)}><X size={18} /></button>
            </motion.form>
          )}

          <button className="icon-btn cart-trigger" onClick={() => setIsCartOpen(true)}>
            <ShoppingBag size={22} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>

          <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="mobile-nav"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <div className="mobile-nav-header">
              <span className="logo-text">Menu</span>
              <button onClick={() => setIsOpen(false)}><X size={28} /></button>
            </div>
            <ul className="mobile-links">
               {navLinks.map((link) => (
                <li key={link.name} onClick={() => setIsOpen(false)}>
                  {link.href.includes('#') ? (
                    <a href={link.href}>{link.name}</a>
                  ) : (
                    <Link to={link.href}>{link.name}</Link>
                  )}
                </li>
              ))}
            </ul>
            <div className="mobile-cta">
              <Link to="/menu" className="btn btn-primary" onClick={() => setIsOpen(false)}>Order Now</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
