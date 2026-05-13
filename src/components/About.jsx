import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
  return (
    <section className="about-section" id="story">
      <div className="container">
        <div className="about-wrapper">
          <motion.div 
            className="about-image-side"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="image-stack">
              <img 
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070&auto=format&fit=crop" 
                alt="Baking Process" 
                className="img-main" 
              />
              <div className="img-overlay-card">
                <span className="years">4+</span>
                <span className="label">Years of <br /> Excellence</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="about-text-side"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="sub-title">Our Story</span>
            <h2>Baked with Passion, <br />Served with <span className="text-highlight">Love</span></h2>
            <p className="lead">
              Founded in 2021, Nikhil's Bakery began as a small family dream in a cozy corner of the city. 
              Today, we are a beloved neighborhood institution known for our artisanal techniques and unwavering quality.
            </p>
            <p>
              Our secret isn't just the organic flour or the premium Arabica beans—it's the heart we put into every creation. 
              From our famous sourdough that takes 24 hours to perfect, to our hand-poured lattes, we believe in the art of taking time.
            </p>
            
            <div className="about-features">
              <div className="a-feat">
                <div className="feat-dot"></div>
                <span>Traditional Recipes</span>
              </div>
              <div className="a-feat">
                <div className="feat-dot"></div>
                <span>Ethically Sourced</span>
              </div>
              <div className="a-feat">
                <div className="feat-dot"></div>
                <span>Community Driven</span>
              </div>
            </div>

            <button className="btn btn-primary">Learn More About Us</button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
