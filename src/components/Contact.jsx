import React from 'react';
import { Send, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import './Contact.css';

const Contact = () => {
  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div className="contact-card">
          <div className="contact-info-panel">
            <div className="panel-content">
              <span className="sub-title">Get in Touch</span>
              <h2>Visit Our Bakery</h2>
              <p>We'd love to hear from you. Drop by for a fresh croissant or send us a message!</p>
              
              <div className="info-items">
                <div className="info-item">
                  <div className="icon-box"><MapPin size={24} /></div>
                  <div>
                    <h4>Location</h4>
                    <p>123 Baker Street, Foodie City, IN</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="icon-box"><Phone size={24} /></div>
                  <div>
                    <h4>Call Us</h4>
                    <p>+91 87959 19866</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="icon-box"><Mail size={24} /></div>
                  <div>
                    <h4>Email</h4>
                    <p><a href="mailto:nknitishsingh94@gmail.com">nknitishsingh94@gmail.com</a></p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="icon-box"><Clock size={24} /></div>
                  <div>
                    <h4>Hours</h4>
                    <p>Mon - Sun: 8:00 AM - 10:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="panel-bg-pattern"></div>
          </div>
          
          <div className="contact-form-panel">
            <form action="https://formspree.io/nknitishsingh94@gmail.com" method="POST">
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" name="name" placeholder="John Doe" required />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" name="email" placeholder="john@example.com" required />
                </div>
              </div>
              <div className="form-group">
                <label>Subject</label>
                <select name="subject">
                  <option>Order Inquiry</option>
                  <option>Catering Request</option>
                  <option>Feedback</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Your Message</label>
                <textarea name="message" rows="5" placeholder="Tell us how we can help..." required></textarea>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  Send Message <Send size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
