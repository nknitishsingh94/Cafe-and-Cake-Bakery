import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Trash2, Wallet, User, MapPin as MapIcon, Navigation, Store, CreditCard, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './CartDrawer.css';

const CartDrawer = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, isCartOpen, setIsCartOpen } = useCart();
  const [customerName, setCustomerName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderType, setOrderType] = useState('delivery');
  const [tableNumber, setTableNumber] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const navigate = useNavigate();

  const advanceAmount = (cartTotal / 2).toFixed(0);
  const upiId = "8795919866@ibl";

  const fetchLocation = () => {
    if (!navigator.geolocation) return;
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
        const data = await res.json();
        setDeliveryAddress(data.display_name || `${latitude}, ${longitude}`);
      } catch { setDeliveryAddress(`${latitude}, ${longitude}`); }
      setIsLocating(false);
    }, () => setIsLocating(false));
  };

  const handleUPILink = () => {
    const upiUrl = `upi://pay?pa=${upiId}&pn=Nikhil%20Bakery&am=${advanceAmount}&cu=INR&tn=Order%20Advance`;
    window.location.href = upiUrl;
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    if (!customerName.trim()) return alert("Please enter your name.");
    if (orderType === 'delivery' && !deliveryAddress.trim()) return alert("Please enter address.");
    if (orderType === 'dine-in' && !tableNumber.trim()) return alert("Please enter table number.");

    const businessNumber = "918795919866"; 
    let message = `*📦 New Order from Nikhil's Bakery*%0A%0A`;
    message += `👤 *Name:* ${customerName}%0A`;
    if (orderType === 'delivery') message += `📍 *Address:* ${deliveryAddress}%0A`;
    else message += `🪑 *Table:* ${tableNumber}%0A`;
    
    message += `%0A*Order Items:*%0A`;
    cart.forEach((item, i) => message += `${i + 1}. ${item.name} x ${item.quantity}%0A`);
    
    message += `%0A*Total Bill: ₹${cartTotal}*%0A`;
    message += `*Advance Paid (50%): ₹${advanceAmount}*%0A`;
    message += `-----------------------------------%0A`;
    message += `%0A_Order placed via Website._ ✅`;

    window.open(`https://wa.me/${businessNumber}?text=${message}`, '_blank');
    setIsCartOpen(false);
    navigate('/order-success');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div className="cart-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} />
          
          <motion.div className="cart-drawer" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}>
            <div className="cart-header">
              <div className="cart-title"><ShoppingBag size={24} /><h2>Checkout</h2></div>
              <button className="close-cart" onClick={() => setIsCartOpen(false)}><X size={24} /></button>
            </div>

            <div className="cart-content">
              {cart.length > 0 ? (
                <>
                  <div className="order-type-toggle">
                    <button className={orderType === 'delivery' ? 'active' : ''} onClick={() => setOrderType('delivery')}><Navigation size={18} /> Delivery</button>
                    <button className={orderType === 'dine-in' ? 'active' : ''} onClick={() => setOrderType('dine-in')}><Store size={18} /> Dine-in</button>
                  </div>

                  <div className="customer-info-form">
                    <div className="input-group"><User size={18} /><input type="text" placeholder="Your Name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} /></div>
                    {orderType === 'delivery' ? (
                      <div className="input-group address-group">
                        <MapIcon size={18} /><textarea placeholder="Delivery Address" rows="2" value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} />
                        <button className={`location-btn ${isLocating ? 'locating' : ''}`} onClick={fetchLocation}><Navigation size={16} /></button>
                      </div>
                    ) : (
                      <div className="input-group"><Store size={18} /><input type="text" placeholder="Table Number" value={tableNumber} onChange={(e) => setTableNumber(e.target.value)} /></div>
                    )}
                  </div>

                  <div className="cart-items">
                    {cart.map((item) => (
                      <div key={item.id} className="cart-item">
                        <div className="item-img"><img src={item.image} alt={item.name} /></div>
                        <div className="item-info">
                          <div className="item-header"><h4>{item.name}</h4><button className="remove-item" onClick={() => removeFromCart(item.id)}><Trash2 size={16} /></button></div>
                          <div className="item-footer"><span>{item.price}</span>
                            <div className="qty-controls">
                              <button onClick={() => updateQuantity(item.id, -1)}><Minus size={14} /></button><span>{item.quantity}</span><button onClick={() => updateQuantity(item.id, 1)}><Plus size={14} /></button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="upi-payment-box">
                    <div className="upi-header"><CreditCard size={18} /> <span>One-Click Pay</span></div>
                    <p>Pay 50% advance instantly via PhonePe, GPay, or Paytm.</p>
                    <button className="btn upi-pay-btn" onClick={handleUPILink}>Pay ₹{advanceAmount} Now</button>
                    <span className="upi-id-text">ID: {upiId}</span>
                  </div>
                </>
              ) : (
                <div className="empty-cart">
                  <ShoppingBag size={64} opacity={0.1} />
                  <h3>Bag is empty</h3>
                  <button className="btn btn-primary" onClick={() => setIsCartOpen(false)}>Shop Now</button>
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="cart-footer">
                <div className="payment-summary">
                  <div className="summary-row"><span>Subtotal</span><span>₹{cartTotal}</span></div>
                  <div className="summary-row advance"><span>Advance to Pay</span><span>₹{advanceAmount}</span></div>
                </div>
                <button className="btn btn-primary checkout-btn" onClick={handleCheckout}>
                  Confirm & Send Order <Send size={18} />
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
