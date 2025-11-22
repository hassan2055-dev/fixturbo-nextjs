import React, { useState, useEffect, useCallback } from "react";

const PricingPlanTwo = () => {
  const [userCountry, setUserCountry] = useState('US');
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    vin: ''
  });
  
  const [loading, setLoading] = useState(false);

  // Modal styles
  const modalStyles = {
    overlay: {
      display: 'flex',
      position: 'fixed',
      zIndex: 1000,
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      alignItems: 'center',
      justifyContent: 'center'
    },
    modal: {
      backgroundColor: 'white',
      width: '90%',
      maxWidth: '500px',
      padding: '30px',
      borderRadius: '10px',
      boxShadow: '0 5px 30px rgba(0, 0, 0, 0.15)',
      position: 'relative'
    },
    closeButton: {
      position: 'absolute',
      right: '20px',
      top: '15px',
      fontSize: '24px',
      cursor: 'pointer'
    },
    input: {
      width: '100%',
      padding: '12px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      fontSize: '16px'
    },
    submitButton: {
      width: '100%',
      padding: '15px',
      background: '#0066CC',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer'
    },
    loadingSpinner: {
      border: '4px solid rgba(0, 0, 0, 0.1)',
      borderRadius: '50%',
      borderTop: '4px solid #2757ad',
      width: '30px',
      height: '30px',
      animation: 'spin 1s linear infinite',
      margin: '10px auto'
    }
  };

  // Paddle Configuration
  const CONFIG = {
    clientToken: "live_57a7704d22d689a024bdfcbfa1c",
    prices: {
      silver: "pri_01k2hte2d4p6r7z81j9kwfyj1q",
      gold: "pri_01k2htft2gxs71cnjjnwvcs6en",
      platinum: "pri_01k2hthk8hjm2bmr6hmv6zamwh"
    }
  };

  // Base prices in USD
  const BASE_PRICES = {
    silver: 40.99,
    gold: 60.99,
    platinum: 90.99
  };

  // Exchange rates
  const EXCHANGE_RATES = {
    US: 1, GB: 0.78, CA: 1.35, AU: 1.45, DE: 0.92, FR: 0.92,
    JP: 145, IN: 83.5, MY: 4.45
  };

  // Currency formats
  const CURRENCY_FORMATS = {
    US: { symbol: '$', position: 'before', code: 'USD' },
    GB: { symbol: '£', position: 'before', code: 'GBP' },
    CA: { symbol: 'CA$', position: 'before', code: 'CAD' },
    AU: { symbol: 'A$', position: 'before', code: 'AUD' },
    DE: { symbol: '€', position: 'after', code: 'EUR' },
    FR: { symbol: '€', position: 'after', code: 'EUR' },
    JP: { symbol: '¥', position: 'before', code: 'JPY' },
    IN: { symbol: '₹', position: 'before', code: 'INR' },
    MY: { symbol: 'RM', position: 'before', code: 'MYR' }
  };

  // Detect user's country
  const detectUserCountry = useCallback(async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      if (data && data.country_code) {
        setUserCountry(data.country_code);
        console.log(`Detected country: ${data.country_code}`);
      }
    } catch (error) {
      console.error("Error detecting country:", error);
      setUserCountry('US');
    }
  }, []);

  // Initialize Paddle
  useEffect(() => {
    let isMounted = true;

    const initializePaddle = () => {
      if (window.Paddle && isMounted) {
        try {
          window.Paddle.Environment.set("production");
          window.Paddle.Setup({
            token: CONFIG.clientToken,
            eventCallback: function (event) {
              console.log("Paddle event:", event);
              if (event.name === "checkout.completed") {
                setShowModal(false);
                alert("Payment successful! You will receive your report shortly.");
              }
            }
          });
          console.log("Paddle initialized successfully");
        } catch (error) {
          console.error("Paddle initialization error:", error);
        }
      }
    };

    // Load Paddle script if not already loaded
    if (!window.Paddle) {
      const script = document.createElement('script');
      script.src = 'https://cdn.paddle.com/paddle/v2/paddle.js';
      script.onload = initializePaddle;
      script.onerror = () => {
        console.error("Failed to load Paddle script");
      };
      document.head.appendChild(script);
    } else {
      initializePaddle();
    }

    // Detect user country
    detectUserCountry();

    return () => {
      isMounted = false;
    };
  }, [CONFIG.clientToken, detectUserCountry]);

  // Format price based on country
  const formatPrice = (price, countryCode) => {
    const format = CURRENCY_FORMATS[countryCode] || CURRENCY_FORMATS.US;
    const exchangeRate = EXCHANGE_RATES[countryCode] || 1;
    
    let convertedPrice = price * exchangeRate;
    
    if (countryCode === 'JP') {
      convertedPrice = Math.round(convertedPrice);
    } else {
      convertedPrice = convertedPrice.toFixed(2);
    }
    
    if (format.position === 'before') {
      return `${format.symbol}${convertedPrice}`;
    } else {
      return `${convertedPrice} ${format.symbol}`;
    }
  };

  // Open modal for plan selection
  const openModal = (planType) => {
    setSelectedPlan(planType);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedPlan(null);
    setFormData({ name: '', email: '', vin: '' });
    setLoading(false);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Send email notification
  const sendMail = async (data) => {
    try {
      const response = await fetch('https://restless-haze-c6a3.mohamedalzafar.workers.dev/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.text();
      if (response.ok) {
        console.log("Submitted successfully!\n" + result);
      } else {
        console.log("Error: " + result);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Open Paddle checkout
  const openPaddleCheckout = (planType, customerName, customerEmail, customerVin) => {
    try {
      const priceId = CONFIG.prices[planType.toLowerCase()];

      if (!priceId) {
        console.error("Invalid plan selected:", planType);
        alert("Invalid plan selected. Please try again.");
        setLoading(false);
        return;
      }

      console.log(`Opening checkout for ${planType} plan with price ID: ${priceId}`);

      window.Paddle.Checkout.open({
        items: [{
          priceId: priceId,
          quantity: 1
        }],
        settings: {
          displayMode: "overlay",
          theme: "light",
          locale: "en",
        },
        customData: {
          "plan": planType,
          "name": customerName,
          "email": customerEmail,
          "vin": customerVin
        }
      });

      setLoading(false);

    } catch (error) {
      console.error("Paddle checkout error:", error.message);
      alert("There was an error opening the checkout. Please try again.");
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const submitData = {
      plan: selectedPlan,
      name: formData.name,
      email: formData.email,
      vin: formData.vin
    };

    sendMail(submitData);
    openPaddleCheckout(selectedPlan, formData.name, formData.email, formData.vin);
  };

  return (
    <>
      <div className="pricing-area-2 space">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-5 col-lg-7">
              <div className="title-area text-center">
                <span className="sub-title">Car Check Plans</span>
                <h2 className="sec-title">
                  Choose Your Vehicle History Report Plan{" "}
                  <img
                    className="title-bg-shape shape-center"
                    src="assets/img/bg/title-bg-shape.png"
                    alt="Fixturbo"
                  />
                </h2>
              </div>
            </div>
          </div>
          <div className="row gy-4 justify-content-center">
            <div className="col-lg-4 col-md-6">
              <div className="pricing-card style2">
                <div className="pricing-card-icon-wrap">
                  <div className="pricing-card_icon">
                    <img src="assets/img/icon/picing-icon_2-1.svg" alt="Fixturbo" />
                  </div>
                  <h4 className="pricing-card_title">Silver Plan</h4>
                </div>
                <div className="pricing-card-details">
                  <h3 className="pricing-card_price">{formatPrice(BASE_PRICES.silver, userCountry)}</h3>
                  <h6 className="pricing-card_currency">one-time payment</h6>
                  <div className="checklist style2">
                    <ul>
                      <li>
                        <i className="fas fa-angle-double-right" />
                        1 Vehicle Report
                      </li>
                      <li>
                        <i className="fas fa-angle-double-right" />
                        Ownership History
                      </li>
                      <li>
                        <i className="fas fa-angle-double-right" />
                        Market Value Range
                      </li>
                      <li>
                        <i className="fas fa-angle-double-right" />
                        Title Information
                      </li>
                      <li>
                        <i className="fas fa-angle-double-right" />
                        Safety Recall Checks
                      </li>
                        <li>
                        <i className="fas fa-angle-double-right" />
                        Vehicle Specifications
                      </li>
                      <li>
                        <i className="fas fa-angle-double-right" />
                        Odometer Readings
                      </li>
                        <li>
                        <i className="fas fa-angle-double-right" />
                        Service Records
                      </li>
                    </ul>
                  </div>
                  <button className="btn" onClick={() => openModal('silver')}>
                    Get This Plan
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6" >
              <div className="pricing-card style2 pricing-card-active">
                <div className="pricing-card-icon-wrap">
                  <div className="pricing-card_icon">
                    <img src="assets/img/icon/picing-icon_2-2.svg" alt="Fixturbo" />
                  </div>
                  <h4 className="pricing-card_title">Gold Plan</h4>
                </div>
                <div className="pricing-card-details">
                  <h3 className="pricing-card_price">{formatPrice(BASE_PRICES.gold, userCountry)}</h3>
                  <h6 className="pricing-card_currency">one-time payment</h6>
                  <div className="checklist style2">
                    <ul>
                      <li>
                        <i className="fas fa-angle-double-right" />
                        1 Vehicle Report
                      </li>
                      <li>
                        <i className="fas fa-angle-double-right" />
                        <b style={{ color: '#0066CC' }}>Suitable for 1500cc Vehicle</b>
                      </li>
                      <li>
                        <i className="fas fa-angle-double-right" />
                        Market Value Range
                      </li>
                      <li>
                        <i className="fas fa-angle-double-right" />
                        Title Information
                      </li>
                      <li>
                        <i className="fas fa-angle-double-right" />
                        Safety Recall Checks
                      </li>
                      <li>
                        <i className="fas fa-angle-double-right" />
                        Vehicle Specifications
                      </li>
                      <li>
                        <i className="fas fa-angle-double-right" />
                        Odometer Readings
                      </li>
                    </ul>
                  </div>
                  <button className="btn" onClick={() => openModal('gold')}>
                    Get This Plan
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="pricing-card style2">
                <div className="pricing-card-icon-wrap">
                  <div className="pricing-card_icon">
                    <img src="assets/img/icon/picing-icon_2-3.svg" alt="Fixturbo" />
                  </div>
                  <h4 className="pricing-card_title">Platinum Plan</h4>
                </div>
                <div className="pricing-card-details">
                  <h3 className="pricing-card_price">{formatPrice(BASE_PRICES.platinum, userCountry)}</h3>
                  <h6 className="pricing-card_currency">one-time payment</h6>
                  <div className="checklist style2">
                    <ul>
                      <li>
                        <i className="fas fa-angle-double-right" />
                        1 Vehicle Report
                      </li>
                      <li >
                        <i className="fas fa-angle-double-right" />
                        <b style={{ color: '#0066CC' }}> Suitable for 4x4 and 2000cc</b>
                      </li>
                      <li>
                        <i className="fas fa-angle-double-right" />
                        Market Value Range
                      </li>
                      <li>
                        <i className="fas fa-angle-double-right" />
                        Title Information
                      </li>
                      <li>
                        <i className="fas fa-angle-double-right" />
                        Safety Recall Checks
                      </li>
                      <li>
                        <i className="fas fa-angle-double-right" />
                        Vehicle Specifications
                      </li>
                      <li>
                        <i className="fas fa-angle-double-right" />
                        Odometer Readings
                      </li>
                      <li>
                        <i className="fas fa-angle-double-right" />
                        Service Records
                      </li>
                      <li>
                        <i className="fas fa-angle-double-right" />
                        Warranty Information
                      </li>
                    </ul>
                  </div>
                  <button className="btn" onClick={() => openModal('platinum')}>
                    Get This Plan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {showModal && (
        <div 
          style={modalStyles.overlay}
          onClick={closeModal}
        >
          <div 
            style={modalStyles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <span 
              style={modalStyles.closeButton}
              onClick={closeModal}
            >
              &times;
            </span>
            
            <h3 style={{ marginBottom: '20px', color: '#0066CC' }}>
              Enter Your Details - {selectedPlan?.charAt(0).toUpperCase() + selectedPlan?.slice(1)} Plan
            </h3>
            
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  style={modalStyles.input}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={modalStyles.input}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                  Vehicle VIN Number
                </label>
                <input
                  type="text"
                  name="vin"
                  value={formData.vin}
                  onChange={handleInputChange}
                  required
                  style={modalStyles.input}
                  placeholder="Enter 17-character VIN"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  ...modalStyles.submitButton,
                  display: loading ? 'none' : 'block'
                }}
              >
                Proceed to Payment
              </button>

              {loading && (
                <div style={{ textAlign: 'center', marginTop: '15px' }}>
                  <div style={modalStyles.loadingSpinner}></div>
                  <p>Loading...</p>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default PricingPlanTwo;
