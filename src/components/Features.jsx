import React from 'react';
import { Leaf, Flame, Sparkles, Clock } from 'lucide-react';
import './Features.css';

const features = [
  {
    icon: <Leaf size={32} />,
    title: "100% Organic",
    desc: "We use only the finest natural ingredients from local farms."
  },
  {
    icon: <Flame size={32} />,
    title: "Freshly Baked",
    desc: "Every item is baked daily to ensure maximum freshness and flavor."
  },
  {
    icon: <Sparkles size={32} />,
    title: "Artisan Craft",
    desc: "Traditional methods meets modern innovation in every recipe."
  },
  {
    icon: <Clock size={32} />,
    title: "Quick Pickup",
    desc: "Order online and pick up your fresh bakes in minutes."
  }
];

const Features = () => {
  return (
    <section className="features-section">
      <div className="container">
        <div className="features-grid">
          {features.map((f, i) => (
            <div key={i} className="feature-item">
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
