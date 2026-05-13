import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Cake, Coffee, Search, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

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
              animate={{ opacity: 1, width: '400px' }}
              onSubmit={handleSearch}
            >
              <input 
                type="text" 
                placeholder="Search for cakes, coffee, pastries..." 
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
            <button className="icon-btn"><ShoppingBag size={20} /></button>
            <Link to="/menu" className="btn btn-primary">Order Now</Link>
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
                  {link.href.includes('#') ? (
                    <a href={link.href}>{link.name}</a>
                  ) : (
                    <Link to={link.href}>{link.name}</Link>
                  )}
                </li>
              ))}
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
