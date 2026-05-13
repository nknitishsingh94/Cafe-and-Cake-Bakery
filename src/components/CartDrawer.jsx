import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Trash2, Wallet, User, MapPin as MapIcon, Navigation, Store, CheckCircle, CreditCard, Camera } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './CartDrawer.css';

const CartDrawer = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, isCartOpen, setIsCartOpen } = useCart();
  const [checkoutStep, setCheckoutStep] = useState(1); // 1: Info, 2: Payment
  const [customerName, setCustomerName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderType, setOrderType] = useState('delivery');
  const [tableNumber, setTableNumber] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [isLocating, setIsLocating] = useState(false);

  const advanceAmount = (cartTotal / 2).toFixed(0);

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

  const handleNextStep = () => {
    if (!customerName.trim()) return alert("Please enter your name.");
    if (orderType === 'delivery' && !deliveryAddress.trim()) return alert("Please enter address.");
    if (orderType === 'dine-in' && !tableNumber.trim()) return alert("Please enter table number.");
    setCheckoutStep(2);
  };

  const handleFinalOrder = () => {
    if (!transactionId.trim()) return alert("Please enter the Transaction ID / Proof.");

    const businessNumber = "918795919866"; 
    let message = `*📦 CONFIRMED ORDER & ADVANCE PAID*%0A%0A`;
    message += `*Customer:* ${customerName}%0A`;
    message += `*Order Type:* ${orderType.toUpperCase()}%0A`;
    if (orderType === 'delivery') message += `📍 *Address:* ${deliveryAddress}%0A`;
    else message += `🪑 *Table:* ${tableNumber}%0A`;
    
    message += `%0A*💳 PAYMENT PROOF*%0A`;
    message += `*Transaction ID:* ${transactionId}%0A`;
    message += `*Advance Paid (50%):* ₹${advanceAmount}%0A`;
    message += `*Balance Due:* ₹${advanceAmount}%0A`;
    
    message += `%0A*Items:*%0A`;
    cart.forEach((item, i) => message += `${i + 1}. ${item.name} x ${item.quantity}%0A`);
    
    message += `%0A*Total Bill: ₹${cartTotal}*%0A`;
    message += `%0A_This is my proof of advance payment. Please confirm!_ ✅`;

    window.open(`https://wa.me/${businessNumber}?text=${message}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div className="cart-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} />
          
          <motion.div className="cart-drawer" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}>
            <div className="cart-header">
              <div className="cart-title">
                <ShoppingBag size={24} />
                <h2>{checkoutStep === 1 ? 'Your Bag' : 'Secure Payment'}</h2>
              </div>
              <button className="close-cart" onClick={() => setIsCartOpen(false)}><X size={24} /></button>
            </div>

            <div className="cart-content">
              {cart.length > 0 ? (
                <>
                  {checkoutStep === 1 ? (
                    <>
                      <div className="order-type-toggle">
                        <button className={orderType === 'delivery' ? 'active' : ''} onClick={() => setOrderType('delivery')}><Navigation size={18} /> Delivery</button>
                        <button className={orderType === 'dine-in' ? 'active' : ''} onClick={() => setOrderType('dine-in')}><Store size={18} /> Shop</button>
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
                        <h3>Order Items</h3>
                        {cart.map((item) => (
                          <div key={item.id} className="cart-item">
                            <div className="item-img"><img src={item.image} alt={item.name} /></div>
                            <div className="item-info">
                              <div className="item-header"><h4>{item.name}</h4><button className="remove-item" onClick={() => removeFromCart(item.id)}><Trash2 size={16} /></button></div>
                              <div className="item-footer"><span className="item-price">{item.price}</span>
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
                    <div className="payment-step">
                      <div className="payment-card">
                        <div className="qr-placeholder">
                          <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=8795919866@paytm%26pn=Nikhil%20Bakery%26am=${advanceAmount}" alt="Payment QR" />
                        </div>
                        <div className="upi-info">
                          <p>UPI ID: <strong>8795919866@paytm</strong></p>
                          <p className="pay-amount">Pay Advance: <strong>₹{advanceAmount}</strong></p>
                        </div>
                      </div>

                      <div className="proof-form">
                        <h3>Submit Payment Proof</h3>
                        <p>Enter the 12-digit UTR / Transaction ID after paying.</p>
                        <div className="input-group">
                          <CheckCircle size={18} />
                          <input 
                            type="text" 
                            placeholder="Transaction ID (UTR Number)" 
                            value={transactionId}
                            onChange={(e) => setTransactionId(e.target.value)}
                          />
                        </div>
                        <button className="btn btn-secondary upload-btn">
                          <Camera size={18} /> Add Screenshot Proof
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="empty-cart">
                  <ShoppingBag size={64} opacity={0.1} />
                  <h3>Your bag is empty</h3>
                  <button className="btn btn-primary" onClick={() => setIsCartOpen(false)}>Start Shopping</button>
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="cart-footer">
                <div className="payment-summary">
                  <div className="summary-row"><span>Total Amount</span><span>₹{cartTotal}</span></div>
                  <div className="summary-row advance"><span>Advance to Pay</span><span>₹{advanceAmount}</span></div>
                </div>
                {checkoutStep === 1 ? (
                  <button className="btn btn-primary checkout-btn" onClick={handleNextStep}>Proceed to Payment</button>
                ) : (
                  <div className="step-actions">
                    <button className="btn btn-secondary back-btn" onClick={() => setCheckoutStep(1)}>Back</button>
                    <button className="btn btn-primary checkout-btn" onClick={handleFinalOrder}>Send Order & Proof</button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
