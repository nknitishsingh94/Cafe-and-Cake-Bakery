import React from 'react';
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

// Custom SVG Icons to avoid lucide-react export issues
const FacebookIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const WhatsAppIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-10.6 8.38 8.38 0 0 1 3.8.9L21 3.5Z" />
  </svg>
);

const Footer = () => {
  const whatsappNumber = "8795919866";
  const whatsappUrl = `https://wa.me/91${whatsappNumber}`;
  const instagramUrl = "https://instagram.com/nikhils_bakery_cafe";
  const facebookUrl = "https://facebook.com/nikhilsbakerycafe";

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
                <FacebookIcon size={20} />
              </a>
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="social-icon ig" title="Instagram">
                <InstagramIcon size={20} />
              </a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="social-icon wa" title="WhatsApp">
                <WhatsAppIcon size={20} />
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
