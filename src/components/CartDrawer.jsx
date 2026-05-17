import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Trash2, Wallet, User, MapPin as MapIcon, Navigation, Store, CreditCard, Send, CheckSquare, Square, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './CartDrawer.css';

const CartDrawer = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, isCartOpen, setIsCartOpen } = useCart();
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderType, setOrderType] = useState('delivery');
  const [tableNumber, setTableNumber] = useState('');
  const [hasPaid, setHasPaid] = useState(false);
  const [utrNumber, setUtrNumber] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = () => {
    if (!customerPhone.trim() || customerPhone.length < 10) return alert("Please enter a valid phone number first.");
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(code);
    setOtpSent(true);
  };

  const handleVerifyOtp = () => {
    if (enteredOtp === generatedOtp) {
      setIsPhoneVerified(true);
      setOtpSent(false); // hide the test SMS
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

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
    // We don't setHasPaid(true) automatically, user must check it
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    if (!customerName.trim()) return alert("Please enter your name.");
    if (orderType === 'delivery') {
      if (!customerPhone.trim() || customerPhone.length < 10) return alert("Please enter a valid phone number.");
      if (!isPhoneVerified) return alert("Please verify your phone number with OTP first.");
      if (!deliveryAddress.trim()) return alert("Please enter address.");
    } else {
      if (!tableNumber.trim()) return alert("Please enter table number.");
    }
    if (!hasPaid) return alert("Please pay the 50% advance first and check the confirmation box.");
    if (!utrNumber.trim()) return alert("Please enter the UTR / Transaction Reference Number as proof of payment.");

    const deliveryOtp = orderType === 'delivery' ? Math.floor(1000 + Math.random() * 9000) : null;

    const businessNumber = "918795919866"; 
    let message = `*📦 New Order from Nikhil's Bakery*%0A%0A`;
    message += `👤 *Name:* ${customerName}%0A`;
    if (orderType === 'delivery') {
      message += `📞 *Phone:* ${customerPhone}%0A`;
      message += `📍 *Address:* ${deliveryAddress}%0A`;
      message += `🔑 *Delivery OTP:* ${deliveryOtp}%0A`;
      
      // Generate Delivery Link
      const orderId = Math.floor(100000 + Math.random() * 900000);
      const deliveryData = {
        orderId, customerName, customerPhone, deliveryAddress, deliveryOtp
      };
      const encodedData = btoa(JSON.stringify(deliveryData));
      const deliveryLink = `${window.location.origin}/delivery-portal?d=${encodedData}`;
      
      message += `%0A🚚 *Delivery Boy Link:*%0A${deliveryLink}%0A`;
    } else {
      message += `🪑 *Table:* ${tableNumber}%0A`;
    }
    
    message += `%0A*Order Items:*%0A`;
    cart.forEach((item, i) => message += `${i + 1}. ${item.name} x ${item.quantity}%0A`);
    
    message += `%0A*Total Bill: ₹${cartTotal}*%0A`;
    message += `*Advance Paid (50%): ₹${advanceAmount}*%0A`;
    message += `*UTR / Ref No:* ${utrNumber}%0A`;
    message += `-----------------------------------%0A`;
    message += `%0A_Advance payment completed via UPI. Sending screenshot now!_ ✅`;

    window.open(`https://wa.me/${businessNumber}?text=${message}`, '_blank');
    setIsCartOpen(false);
    navigate('/order-success', { state: { deliveryOtp } });
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
                    <div className="input-group">
                      <User size={18} />
                      <input type="text" placeholder="Your Name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
                    </div>
                    
                    {orderType === 'delivery' ? (
                      <>
                        <div className="input-group" style={{ display: 'flex', gap: '10px', background: 'transparent', padding: 0 }}>
                          <div style={{ display: 'flex', flex: 1, alignItems: 'center', background: 'var(--bg)', borderRadius: '12px', padding: '0 15px' }}>
                            <Phone size={18} style={{ color: 'var(--text-muted)' }} />
                            <input 
                              type="tel" 
                              placeholder="Phone Number" 
                              value={customerPhone} 
                              onChange={(e) => { setCustomerPhone(e.target.value); setIsPhoneVerified(false); setOtpSent(false); }} 
                              disabled={isPhoneVerified}
                              style={{ background: 'transparent', border: 'none', padding: '12px', width: '100%', outline: 'none' }}
                            />
                          </div>
                          {!isPhoneVerified && (
                            <button type="button" className="btn btn-secondary" style={{ padding: '0 15px', whiteSpace: 'nowrap' }} onClick={handleSendOtp}>
                              {otpSent ? 'Resend' : 'Get OTP'}
                            </button>
                          )}
                          {isPhoneVerified && <div style={{ display: 'flex', alignItems: 'center', color: 'green', padding: '0 10px', fontWeight: 'bold' }}>✓ Verified</div>}
                        </div>

                        {otpSent && !isPhoneVerified && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div style={{ fontSize: '0.85rem', color: '#1976d2', background: '#e3f2fd', padding: '8px 12px', borderRadius: '8px', borderLeft: '4px solid #1976d2' }}>
                              <strong>[TEST SMS]</strong> Your OTP is: <strong>{generatedOtp}</strong>
                            </div>
                            <div className="input-group" style={{ display: 'flex', gap: '10px', background: 'transparent', padding: 0 }}>
                              <div style={{ display: 'flex', flex: 1, alignItems: 'center', background: 'var(--bg)', borderRadius: '12px', padding: '0 15px' }}>
                                <CheckSquare size={18} style={{ color: 'var(--text-muted)' }} />
                                <input 
                                  type="text" 
                                  placeholder="Enter 4-digit OTP" 
                                  value={enteredOtp} 
                                  onChange={(e) => setEnteredOtp(e.target.value)} 
                                  style={{ background: 'transparent', border: 'none', padding: '12px', width: '100%', outline: 'none', letterSpacing: '2px' }}
                                />
                              </div>
                              <button type="button" className="btn btn-primary" style={{ padding: '0 15px' }} onClick={handleVerifyOtp}>
                                Verify
                              </button>
                            </div>
                          </div>
                        )}
                        <div className="input-group address-group">
                          <MapIcon size={18} /><textarea placeholder="Delivery Address" rows="2" value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} />
                          <button className={`location-btn ${isLocating ? 'locating' : ''}`} onClick={fetchLocation}><Navigation size={16} /></button>
                        </div>
                      </>
                    ) : (
                      <div className="input-group"><Store size={18} /><input type="text" placeholder="Table Number" value={tableNumber} onChange={(e) => setTableNumber(e.target.value)} /></div>
                    )}
                  </div>

                  <div className="upi-payment-box">
                    <div className="upi-header"><CreditCard size={18} /> <span>One-Click Pay</span></div>
                    <p>Click below to pay 50% advance (₹{advanceAmount}) first.</p>
                    <button className="btn upi-pay-btn" onClick={handleUPILink}>Pay ₹{advanceAmount} Advance</button>
                    
                    <div className={`payment-confirm ${hasPaid ? 'confirmed' : ''}`} onClick={() => setHasPaid(!hasPaid)}>
                      {hasPaid ? <CheckSquare size={20} /> : <Square size={20} />}
                      <span>I have completed the payment</span>
                    </div>
                    {hasPaid && (
                      <div className="input-group" style={{ marginTop: '15px' }}>
                        <CreditCard size={18} />
                        <input 
                          type="text" 
                          placeholder="Enter 12-digit UTR / Ref Number" 
                          value={utrNumber} 
                          onChange={(e) => setUtrNumber(e.target.value)} 
                        />
                      </div>
                    )}
                  </div>

                  <div className="cart-items">
                    <h3>Review Items</h3>
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
                  <div className="summary-row"><span>Total Bill</span><span>₹{cartTotal}</span></div>
                  <div className="summary-row advance"><span>Advance Paid</span><span>₹{advanceAmount}</span></div>
                </div>
                <button 
                  className={`btn btn-primary checkout-btn ${!hasPaid ? 'disabled' : ''}`} 
                  onClick={handleCheckout}
                >
                  Place Order <Send size={18} />
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
