import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import Categories from './components/Categories';
import FeaturedMenu from './components/FeaturedMenu';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MenuPage from './pages/MenuPage';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <main>
              <Hero />
              <Features />
              <About />
              <FeaturedMenu />
              <Categories />
              <Reviews />
              <Contact />
            </main>
          } />
          <Route path="/menu" element={<MenuPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}


export default App;
