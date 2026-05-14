import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import logo from '../assets/logo.png';
import './Legal.css';

const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-page">
      <div className="legal-hero">
        <Link to="/" className="back-btn">
          <ArrowLeft size={20} /> Back to Home
        </Link>
        <div className="container">
          <div className="logo-wrapper">
            <img src={logo} alt="Nikhil's Logo" className="legal-logo" />
          </div>
          <h1>Terms of Service</h1>
          <p>Last Updated: May 2026</p>
        </div>
      </div>

      <div className="container">
        <div className="legal-content">
          <section className="legal-section">
            <h2>1. Terms</h2>
            <p>By accessing the website at Nikhil's Bakery & Cafe, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
          </section>

          <section className="legal-section">
            <h2>2. Use License</h2>
            <p>Permission is granted to temporarily download one copy of the materials (information or software) on Nikhil's Bakery & Cafe's website for personal, non-commercial transitory viewing only.</p>
          </section>

          <section className="legal-section">
            <h2>3. Disclaimer</h2>
            <p>The materials on Nikhil's Bakery & Cafe's website are provided on an 'as is' basis. Nikhil's Bakery & Cafe makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
          </section>

          <section className="legal-section">
            <h2>4. Limitations</h2>
            <p>In no event shall Nikhil's Bakery & Cafe or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Nikhil's Bakery & Cafe's website.</p>
          </section>

          <section className="legal-section">
            <h2>5. Governing Law</h2>
            <p>These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in Lucknow, Uttar Pradesh.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
