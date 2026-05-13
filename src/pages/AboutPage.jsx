import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Award, Heart, Leaf, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <div className="about-hero">
        <div className="container">
          <Link to="/" className="back-link">
            <ArrowLeft size={20} /> Back to Home
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            The Heart of <span className="text-highlight">Our Craft</span>
          </motion.h1>
          <p>Founded in 2021, we've dedicated every sunrise to the art of perfect baking.</p>
        </div>
      </div>

      {/* Story Section */}
      <section className="about-story-detail">
        <div className="container">
          <div className="story-grid">
            <motion.div 
              className="story-image"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1556217477-d3252514d809?q=80&w=2071&auto=format&fit=crop" 
                alt="Our Bakery" 
              />
            </motion.div>
            <motion.div 
              className="story-content"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2>Our Humble <span className="text-highlight">Beginnings</span></h2>
              <p>
                What started as a small passion project in Nikhil's home kitchen has blossomed into the city's most beloved artisanal sanctuary. 
                We believe that great bread isn't just made; it's nurtured.
              </p>
              <p>
                Every loaf of sourdough we bake undergoes a 48-hour fermentation process, ensuring a depth of flavor and texture that mass-produced bread simply cannot match. 
                Our commitment to quality means we source only the finest organic grains and ethically grown coffee beans.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values">
        <div className="container">
          <div className="section-header text-center">
            <h2>Values That <span className="text-highlight">Define Us</span></h2>
          </div>
          <div className="values-grid">
            <div className="value-card">
              <Award className="value-icon" size={40} />
              <h3>Unmatched Quality</h3>
              <p>We never compromise. If a batch isn't perfect, it doesn't leave our kitchen.</p>
            </div>
            <div className="value-card">
              <Leaf className="value-icon" size={40} />
              <h3>100% Organic</h3>
              <p>Using locally sourced, chemical-free ingredients to support our planet.</p>
            </div>
            <div className="value-card">
              <Heart className="value-icon" size={40} />
              <h3>Baked with Love</h3>
              <p>Our team treats every pastry as a masterpiece meant to bring a smile.</p>
            </div>
            <div className="value-card">
              <Users className="value-icon" size={40} />
              <h3>Community First</h3>
              <p>We are proud to be a neighborhood hub where friendships are brewed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-team">
        <div className="container">
          <div className="team-wrapper">
            <div className="team-text">
              <h2>Meet Our <span className="text-highlight">Artisans</span></h2>
              <p>
                Our team consists of passionate bakers, expert baristas, and hospitality enthusiasts who all share one common goal: 
                to make your day a little bit sweeter.
              </p>
            </div>
            <div className="team-images">
              <img src="https://images.unsplash.com/photo-1579306194872-64d3b7bac4c2?q=80&w=2071&auto=format&fit=crop" alt="Bakers" className="team-img-1" />
              <img src="https://images.unsplash.com/photo-1595126731403-430c61550198?q=80&w=2070&auto=format&fit=crop" alt="Barista" className="team-img-2" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
