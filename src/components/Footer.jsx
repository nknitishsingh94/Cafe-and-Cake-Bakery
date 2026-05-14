import React from 'react';
import { Facebook, Instagram, MessageSquare, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const whatsappNumber = "8795919866";
  const whatsappUrl = `https://wa.me/91${whatsappNumber}`;
  const instagramUrl = "https://instagram.com/nikhils_bakery_cafe"; // Placeholder based on brand
  const facebookUrl = "https://facebook.com/nikhilsbakerycafe"; // Placeholder based on brand

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo">
              <span className="logo-text">Nikhil's</span>
              <span className="logo-sub">Bakery & Cafe</span>
            </div>
            <p className="brand-desc">
              Crafting sweet moments and brewing excellence since 2021. Your favorite neighborhood spot for fresh bakes and premium coffee.
            </p>
            <div className="social-links">
              <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="social-icon fb" title="Facebook">
                <Facebook size={20} />
              </a>
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="social-icon ig" title="Instagram">
                <Instagram size={20} />
              </a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="social-icon wa" title="WhatsApp">
                <MessageSquare size={20} />
              </a>
            </div>
          </div>

          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">Our Story</Link></li>
              <li><Link to="/menu">Menu</Link></li>
              <li><a href="#">Catering</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-links">
            <h3>Our Menu</h3>
            <ul>
              <li><Link to="/menu">Custom Cakes</Link></li>
              <li><Link to="/menu">Pastries</Link></li>
              <li><Link to="/menu">Artisan Bread</Link></li>
              <li><Link to="/menu">Specialty Coffee</Link></li>
              <li><Link to="/menu">Sandwiches</Link></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h3>Contact Us</h3>
            <div className="contact-info">
              <div className="contact-item">
                <MapPin size={18} />
                <span>123 Baker Street, Foodie City, IN</span>
              </div>
              <div className="contact-item">
                <Phone size={18} />
                <span>+91 {whatsappNumber}</span>
              </div>
              <div className="contact-item">
                <Mail size={18} />
                <span>hello@nikhilsbakery.com</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2026 Nikhil's Bakery & Cafe. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
