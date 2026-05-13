import React from 'react';
import { Share2, Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
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
              <a href="#" className="social-icon"><Share2 size={20} /></a>
              <a href="#" className="social-icon"><Share2 size={20} /></a>
              <a href="#" className="social-icon"><Share2 size={20} /></a>
            </div>
          </div>

          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Our Story</a></li>
              <li><a href="#">Menu</a></li>
              <li><a href="#">Catering</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          <div className="footer-links">
            <h3>Our Menu</h3>
            <ul>
              <li><a href="#">Custom Cakes</a></li>
              <li><a href="#">Pastries</a></li>
              <li><a href="#">Artisan Bread</a></li>
              <li><a href="#">Specialty Coffee</a></li>
              <li><a href="#">Sandwiches</a></li>
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
                <span>+91 98765 43210</span>
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
