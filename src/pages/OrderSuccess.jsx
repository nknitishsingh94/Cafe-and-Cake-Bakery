import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ShoppingBag, ArrowRight, MapPin, Calendar, Clock, Key } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './OrderSuccess.css';

const OrderSuccess = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const [orderSummary, setOrderSummary] = useState([]);
  const [finalTotal, setFinalTotal] = useState(0);
  const location = useLocation();
  const deliveryOtp = location.state?.deliveryOtp;

  useEffect(() => {
    // Capture cart data before clearing
    if (cart.length > 0) {
      setOrderSummary([...cart]);
      setFinalTotal(cartTotal);
      // We don't clear immediately so the user can see it, 
      // or we clear it after they leave the page.
    }
  }, []);

  const orderNumber = Math.floor(100000 + Math.random() * 900000);
  const date = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="order-success-page">
      <div className="container">
        <motion.div 
          className="success-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="success-icon">
            <CheckCircle size={80} />
          </div>
          <h1>Order Placed Successfully!</h1>
          <p className="subtitle">Thank you for choosing Nikhil's Bakery. Your order has been sent to our WhatsApp for confirmation.</p>

          <div className="order-meta">
            <div className="meta-item">
              <Calendar size={18} />
              <span>{date}</span>
            </div>
            <div className="meta-item">
              <span className="order-id">ID: #{orderNumber}</span>
            </div>
          </div>

          {deliveryOtp && (
            <div className="delivery-otp-box" style={{ background: '#FFF3E0', padding: '15px', borderRadius: '12px', marginBottom: '20px', textAlign: 'center', border: '1px dashed #FF9800' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#E65100', marginBottom: '5px' }}>
                <Key size={20} />
                <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Delivery PIN</h3>
              </div>
              <p style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold', color: '#D84315', letterSpacing: '4px' }}>{deliveryOtp}</p>
              <p style={{ margin: '5px 0 0 0', fontSize: '0.85rem', color: '#5D4037' }}>Please share this PIN with the delivery executive only when you receive your order.</p>
            </div>
          )}

          <div className="order-details-box">
            <h3>Order Summary</h3>
            <div className="receipt-items">
              {orderSummary.length > 0 ? orderSummary.map((item) => (
                <div key={item.id} className="receipt-item">
                  <div className="receipt-info">
                    <span className="receipt-name">{item.name}</span>
                    <span className="receipt-qty">x{item.quantity}</span>
                  </div>
                  <span className="receipt-price">{item.price}</span>
                </div>
              )) : (
                <p>No active order found.</p>
              )}
            </div>
            <div className="receipt-total">
              <div className="total-row">
                <span>Subtotal</span>
                <span>₹{finalTotal}</span>
              </div>
              <div className="total-row grand-total">
                <span>Total Paid (Advance)</span>
                <span>₹{(finalTotal / 2).toFixed(0)}</span>
              </div>
            </div>
          </div>

          <div className="next-steps">
            <h3>What's Next?</h3>
            <div className="step-list">
              <div className="step-item">
                <span className="step-num">1</span>
                <p>Confirm the order details on WhatsApp chat.</p>
              </div>
              <div className="step-item">
                <span className="step-num">2</span>
                <p>Wait for our team to verify your payment screenshot.</p>
              </div>
              <div className="step-item">
                <span className="step-num">3</span>
                <p>Your fresh delights will be ready for delivery/pickup!</p>
              </div>
            </div>
          </div>

          <div className="success-actions">
            <Link to="/" className="btn btn-secondary">Back to Home</Link>
            <Link to="/menu" className="btn btn-primary" onClick={clearCart}>
              Order More <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderSuccess;
