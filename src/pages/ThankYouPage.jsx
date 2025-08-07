import React, { useEffect } from "react";
import Link from "next/link";
import SEOHead from "../components/SEOHead";

const ThankYouPage = () => {
  console.log("21342314")
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    console.log("page loaded");
;
  }, []);

  return (
    <>
      {/* SEO Head */}
      <SEOHead 
        title="Thank You - Car Check Store | Order Confirmation"
        description="Thank you for your purchase! Your vehicle history report from Car Check Store is being prepared and will be delivered to your email within minutes."
        keywords="car check store, order confirmation, vehicle history report, VIN check, thank you"
        url="https://carcheck.store/11235813.html"
        type="website"
      />
      
      <div className="thank-you-page" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Header Section */}
      <div className="thank-you-header" style={{ 
        backgroundColor: '#E8092E', 
        color: 'white', 
        padding: '60px 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="thank-you-icon" style={{ marginBottom: '30px' }}>
                <div style={{
                  width: '100px',
                  height: '100px',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  border: '3px solid rgba(255,255,255,0.3)'
                }}>
                  <i className="fas fa-check" style={{ fontSize: '40px', color: 'white' }}></i>
                </div>
              </div>
              <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '20px' }}>
                Thank You for Your Purchase!
              </h1>
              <p style={{ fontSize: '1.2rem', opacity: '0.9', marginBottom: '0' }}>
                Your VIN inspection report order has been successfully processed
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="thank-you-content" style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              
              {/* Order Confirmation Card */}
              <div className="card" style={{ 
                border: 'none', 
                borderRadius: '15px', 
                boxShadow: '0 10px 40px rgba(232, 9, 46, 0.1)',
                marginBottom: '40px'
              }}>
                <div className="card-body" style={{ padding: '40px' }}>
                  <div className="row">
                    <div className="col-md-8">
                      <h3 style={{ color: '#E8092E', marginBottom: '20px' }}>
                        <i className="fas fa-file-alt" style={{ marginRight: '10px' }}></i>
                        Your Report is Being Prepared
                      </h3>
                      <p style={{ fontSize: '1.1rem', color: '#666', lineHeight: '1.6' }}>
                        We&apos;re generating your comprehensive vehicle history report right now. 
                        You&apos;ll receive your detailed VIN inspection report within the next few minutes.
                      </p>
                      <div className="order-details" style={{ marginTop: '30px' }}>
                        <h5 style={{ color: '#333', marginBottom: '15px' }}>What happens next?</h5>
                        <ul style={{ listStyle: 'none', padding: '0' }}>
                          <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                            <span style={{ 
                              width: '25px', 
                              height: '25px', 
                              backgroundColor: '#E8092E', 
                              borderRadius: '50%', 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center', 
                              marginRight: '15px',
                              color: 'white',
                              fontSize: '12px'
                            }}>1</span>
                            Report generation starts immediately
                          </li>
                          <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                            <span style={{ 
                              width: '25px', 
                              height: '25px', 
                              backgroundColor: '#E8092E', 
                              borderRadius: '50%', 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center', 
                              marginRight: '15px',
                              color: 'white',
                              fontSize: '12px'
                            }}>2</span>
                            Email confirmation sent to your inbox
                          </li>
                          <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                            <span style={{ 
                              width: '25px', 
                              height: '25px', 
                              backgroundColor: '#E8092E', 
                              borderRadius: '50%', 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center', 
                              marginRight: '15px',
                              color: 'white',
                              fontSize: '12px'
                            }}>3</span>
                            Download link provided within 5 minutes
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-md-4 text-center">
                      <div style={{ 
                        backgroundColor: '#f8f9fa', 
                        borderRadius: '10px', 
                        padding: '30px 20px',
                        border: '2px dashed #E8092E'
                      }}>
                        <i className="fas fa-clock" style={{ fontSize: '3rem', color: '#E8092E', marginBottom: '15px' }}></i>
                        <h5 style={{ color: '#E8092E', marginBottom: '10px' }}>Estimated Time</h5>
                        <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333', margin: '0' }}>
                          With in 24 hours
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Important Information */}
              <div className="row">
                <div className="col-md-6">
                  <div className="info-card" style={{ 
                    backgroundColor: 'white', 
                    padding: '30px', 
                    borderRadius: '10px', 
                    boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
                    marginBottom: '30px',
                    border: '1px solid #f0f0f0'
                  }}>
                    <h5 style={{ color: '#E8092E', marginBottom: '15px' }}>
                      <i className="fas fa-envelope" style={{ marginRight: '10px' }}></i>
                      Check Your Email
                    </h5>
                    <p style={{ color: '#666', marginBottom: '15px' }}>
                      Your report download link and order confirmation have been sent to your email address.
                    </p>
                    <p style={{ color: '#999', fontSize: '0.9rem', margin: '0' }}>
                      Don&apos;t forget to check your spam folder if you don&apos;t see it in your inbox.
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="info-card" style={{ 
                    backgroundColor: 'white', 
                    padding: '30px', 
                    borderRadius: '10px', 
                    boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
                    marginBottom: '30px',
                    border: '1px solid #f0f0f0'
                  }}>
                    <h5 style={{ color: '#E8092E', marginBottom: '15px' }}>
                      <i className="fas fa-headset" style={{ marginRight: '10px' }}></i>
                      Need Help?
                    </h5>
                    <p style={{ color: '#666', marginBottom: '15px' }}>
                      Our support team is available 24/7 to assist you with any questions.
                    </p>
                    <p style={{ color: '#999', fontSize: '0.9rem', margin: '0' }}>
                      Email: car.check.store@gmail.com<br/>
                      Phone: 1-888-VIN-REPORTS
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="text-center" style={{ marginTop: '40px' }}>
                <Link 
                  href="/" 
                  className="btn"
                  style={{ 
                    backgroundColor: '#E8092E', 
                    color: 'white', 
                    padding: '15px 40px', 
                    borderRadius: '50px', 
                    textDecoration: 'none',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    border: 'none',
                    marginRight: '20px',
                    display: 'inline-block',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#c8072a'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#E8092E'}
                >
                  <i className="fas fa-home" style={{ marginRight: '8px' }}></i>
                  Back to Home
                </Link>
                <Link 
                  href="/" 
                  className="btn"
                  style={{ 
                    backgroundColor: 'transparent', 
                    color: '#E8092E', 
                    padding: '15px 40px', 
                    borderRadius: '50px', 
                    textDecoration: 'none',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    border: '2px solid #E8092E',
                    display: 'inline-block',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#E8092E';
                    e.target.style.color = 'white';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#E8092E';
                  }}
                >
                  <i className="fas fa-phone" style={{ marginRight: '8px' }}></i>
                  Contact Support
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <div style={{ 
        backgroundColor: '#2c2c2c', 
        color: 'white', 
        padding: '30px 0', 
        textAlign: 'center' 
      }}>
        <div className="container">
          <p style={{ margin: '0', opacity: '0.8' }}>
            This transaction is secure and protected. Your personal information is safe with us.
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default ThankYouPage;
