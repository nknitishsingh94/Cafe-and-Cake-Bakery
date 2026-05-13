import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Trash2, Wallet, User, MapPin as MapIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './CartDrawer.css';

const CartDrawer = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, isCartOpen, setIsCartOpen } = useCart();
  const [customerName, setCustomerName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');

  const handleCheckout = () => {
    if (cart.length === 0) return;
    if (!customerName.trim() || !deliveryAddress.trim()) {
      alert("Please enter your name and address to continue.");
      return;
    }

    const businessNumber = "918795919866"; 
    const advanceAmount = (cartTotal / 2).toFixed(0);
    
    let message = `*📦 New Order from Nikhil's Bakery*%0A%0A`;
    message += `*Customer Details:*%0A`;
    message += `👤 Name: ${customerName}%0A`;
    message += `📍 Address: ${deliveryAddress}%0A`;
    message += `-----------------------------------%0A`;
    
    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*%0A`;
      message += `   Qty: ${item.quantity} | Price: ${item.price}%0A`;
    });

    message += `-----------------------------------%0A`;
    message += `*Total Order Value: ₹${cartTotal}*%0A`;
    message += `*Advance to Pay (50%): ₹${advanceAmount}*%0A`;
    message += `*Remaining Balance: ₹${advanceAmount}*%0A`;
    message += `-----------------------------------%0A`;
    message += `%0AI, *${customerName}*, am ready to pay the *₹${advanceAmount} advance* to confirm my order. Please share your payment details! 🍰`;

    const whatsappUrl = `https://wa.me/${businessNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div 
            className="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
          />
          
          <motion.div 
            className="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="cart-header">
              <div className="cart-title">
                <ShoppingBag size={24} />
                <h2>Your Bag</h2>
                <span className="item-count-badge">{cart.length}</span>
              </div>
              <button className="close-cart" onClick={() => setIsCartOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="cart-content">
              {cart.length > 0 ? (
                <>
                  {/* Customer Info Form */}
                  <div className="customer-info-form">
                    <h3>Delivery Details</h3>
                    <div className="input-group">
                      <User size={18} />
                      <input 
                        type="text" 
                        placeholder="Your Full Name" 
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="input-group">
                      <MapIcon size={18} />
                      <textarea 
                        placeholder="Delivery Address or Landmark" 
                        rows="2"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="cart-items">
                    <h3>Order Items</h3>
                    {cart.map((item) => (
                      <div key={item.id} className="cart-item">
                        <div className="item-img">
                          <img src={item.image} alt={item.name} />
                        </div>
                        <div className="item-info">
                          <div className="item-header">
                            <h4>{item.name}</h4>
                            <button className="remove-item" onClick={() => removeFromCart(item.id)}>
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <p className="item-cat">{item.category}</p>
                          <div className="item-footer">
                            <span className="item-price">{item.price}</span>
                            <div className="qty-controls">
                              <button onClick={() => updateQuantity(item.id, -1)}><Minus size={14} /></button>
                              <span>{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, 1)}><Plus size={14} /></button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="empty-cart">
                  <ShoppingBag size={64} opacity={0.1} />
                  <h3>Your bag is empty</h3>
                  <p>Looks like you haven't added anything yet.</p>
                  <button className="btn btn-primary" onClick={() => setIsCartOpen(false)}>Start Shopping</button>
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="cart-footer">
                <div className="payment-summary">
                  <div className="summary-row">
                    <span>Total Amount</span>
                    <span>₹{cartTotal}</span>
                  </div>
                  <div className="summary-row advance">
                    <span>Advance (50%)</span>
                    <span>₹{(cartTotal / 2).toFixed(0)}</span>
                  </div>
                </div>
                <div className="policy-note">
                  <Wallet size={16} />
                  <p>Pay 50% advance to confirm order. Balance on delivery.</p>
                </div>
                <button 
                  className={`btn btn-primary checkout-btn ${(!customerName.trim() || !deliveryAddress.trim()) ? 'disabled' : ''}`}
                  onClick={handleCheckout}
                >
                  Send Order with Details
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
