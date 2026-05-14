import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Cake, Coffee, Search, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import logo from '../assets/logo.png';
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
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <Link to="/" className="logo">
            <img src={logo} alt="Nikhil's Logo" className="logo-img" />
            <div className="logo-info">
              <span className="logo-text">Nikhil's</span>
              <span className="logo-sub">Bakery & Cafe</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="desktop-nav">
            {!isSearchOpen ? (
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
            ) : (
              <motion.form 
                className="nav-search-form"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: '350px' }}
                onSubmit={handleSearch}
              >
                <input 
                  type="text" 
                  placeholder="Search..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button type="button" className="close-search" onClick={() => setIsSearchOpen(false)}>
                  <X size={18} />
                </button>
              </motion.form>
            )}

            <div className="nav-actions">
              {!isSearchOpen && (
                <button className="icon-btn" onClick={() => setIsSearchOpen(true)}>
                  <Search size={20} />
                </button>
              )}
              <button className="icon-btn cart-trigger" onClick={() => setIsCartOpen(true)}>
                <ShoppingBag size={20} />
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </button>
              <Link to="/menu" className="btn btn-primary">Order Now</Link>
            </div>
          </div>

          {/* Mobile Header Icons */}
          <div className="mobile-actions">
            <button className="icon-btn" onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <Search size={22} />
            </button>
            <button className="icon-btn cart-trigger" onClick={() => setIsCartOpen(true)}>
              <ShoppingBag size={22} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
            <button className="mobile-toggle" onClick={() => setIsOpen(true)}>
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Sidebar - REMOVED OVERLAY completely for clean look */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="mobile-sidebar"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="sidebar-header">
              <div className="logo">
                <span className="logo-text">Nikhil's</span>
              </div>
              <button className="close-btn" onClick={() => setIsOpen(false)}>
                <X size={30} />
              </button>
            </div>

            <ul className="sidebar-links">
              {navLinks.map((link, i) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {link.href.includes('#') ? (
                    <a href={link.href} onClick={() => setIsOpen(false)}>{link.name}</a>
                  ) : (
                    <Link to={link.href} onClick={() => setIsOpen(false)}>{link.name}</Link>
                  )}
                </motion.li>
              ))}
            </ul>

            <div className="sidebar-footer">
              <Link to="/menu" className="btn btn-primary full-btn" onClick={() => setIsOpen(false)}>
                Order Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
