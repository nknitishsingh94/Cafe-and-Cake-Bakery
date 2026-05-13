import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Categories from './components/Categories';
import FeaturedMenu from './components/FeaturedMenu';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <FeaturedMenu />
        <Categories />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
