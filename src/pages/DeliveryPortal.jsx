import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MapPin, Phone, User, CheckCircle, Navigation, ShieldCheck } from 'lucide-react';
import './DeliveryPortal.css';

const DeliveryPortal = () => {
  const [data, setData] = useState(null);
  const [enteredPin, setEnteredPin] = useState('');
  const [status, setStatus] = useState('pending'); // pending, success, error
  const location = useLocation();

  useEffect(() => {
    try {
      const queryParams = new URLSearchParams(location.search);
      const encodedData = queryParams.get('d');
      if (encodedData) {
        const decodedString = atob(encodedData);
        setData(JSON.parse(decodedString));
      }
    } catch (e) {
      console.error("Invalid delivery link");
    }
  }, [location]);

  if (!data) return <div className="delivery-loading"><h2>Loading Delivery Details...</h2></div>;

  const handleVerify = () => {
    if (enteredPin === String(data.deliveryOtp)) {
      setStatus('success');
      // Send message to owner that delivery is completed
      const businessNumber = "918795919866";
      const message = `*✅ DELIVERY SUCCESSFUL*%0A%0AOrder ID: #${data.orderId}%0ADelivered to: ${data.customerName}%0APhone: ${data.customerPhone}%0A%0A_Verified via Delivery PIN by Executive._`;
      window.open(`https://wa.me/${businessNumber}?text=${message}`, '_blank');
    } else {
      setStatus('error');
      setTimeout(() => setStatus('pending'), 3000);
    }
  };

  const openGoogleMaps = () => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.deliveryAddress)}`, '_blank');
  };

  return (
    <div className="delivery-portal">
      <div className="portal-container">
        <div className="portal-header">
          <ShieldCheck size={40} className="header-icon" />
          <h1>Delivery Executive Portal</h1>
          <p>Order #{data.orderId}</p>
        </div>

        <div className="portal-card">
          <div className="card-section">
            <h3><User size={18} /> Customer Details</h3>
            <p className="highlight">{data.customerName}</p>
            <a href={`tel:${data.customerPhone}`} className="action-btn outline">
              <Phone size={16} /> Call {data.customerPhone}
            </a>
          </div>

          <div className="card-section">
            <h3><MapPin size={18} /> Delivery Address</h3>
            <p>{data.deliveryAddress}</p>
            <button className="action-btn" onClick={openGoogleMaps}>
              <Navigation size={16} /> Open in Google Maps
            </button>
          </div>

          <div className="card-section verification-section">
            <h3>Verify Delivery</h3>
            <p>Ask the customer for their 4-digit Delivery PIN.</p>
            
            {status === 'success' ? (
              <div className="success-banner">
                <CheckCircle size={24} />
                <span>Delivery Verified Successfully!</span>
              </div>
            ) : (
              <div className="pin-input-group">
                <input 
                  type="text" 
                  placeholder="Enter 4-Digit PIN" 
                  maxLength={4}
                  value={enteredPin}
                  onChange={(e) => setEnteredPin(e.target.value.replace(/\D/g, ''))}
                  className={status === 'error' ? 'error-input' : ''}
                />
                <button className="verify-btn" onClick={handleVerify} disabled={enteredPin.length !== 4}>
                  Verify & Mark Delivered
                </button>
                {status === 'error' && <p className="error-text">Incorrect PIN. Try again.</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPortal;
