import React, { useEffect, useRef } from "react";
import Head from 'next/head';
import Link from 'next/link';

const ThankYouPage = () => {
  const calledRef = useRef(false);

  useEffect(() => {
    // Call the API only once (prevents StrictMode double-invoke and re-mounts)
    // if (calledRef.current) return;
    // calledRef.current = true;

    // if (typeof window === 'undefined') return;
    // if (sessionStorage.getItem('latestTxEmailSent') === '1') return;

    (async () => {
      try {
        await fetch('/api/get-transactions', { method: 'POST' });
        sessionStorage.setItem('latestTxEmailSent', '1');
      } catch (err) {
        console.error('Error calling latest transaction API:', err);
      }
    })();
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ConfirmationPage",
    "name": "Thank You - Car Check Store | Order Confirmation",
    "description": "Thank you for your purchase! Your vehicle history report from Car Check Store is being prepared.",
    "url": "https://carcheck.store/thank-you",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Car Check Store",
      "url": "https://carcheck.store"
    }
  };

  return (
    <>
      <Head>
        <title>Thank You | Order Confirmation</title>
        <meta 
          name="description" 
          content="Thank you for your purchase! Your vehicle history report from Car Check Store is being prepared and will be delivered to your email within minutes." 
        />
        <meta 
          name="keywords" 
          content="car check store, order confirmation, vehicle history report, VIN check, thank you" 
        />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Thank You - Car Check Store | Order Confirmation" />
        <meta property="og:description" content="Thank you for your purchase! Your vehicle history report from Car Check Store is being prepared." />
        <meta property="og:image" content="https://carcheck.store/card.png" />
        <meta property="og:url" content="https://carcheck.store/thank-you" />
        <meta property="og:type" content="website" />
        
        {/* Additional SEO Tags */}
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://carcheck.store/thank-you" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </Head>
      
      <div className="thank-you-page" style={{ backgroundColor: 'var(--page-bg, inherit)', minHeight: '100vh' }}>
        {/* Header Section */}
        <div className="thank-you-header" style={{ 
          backgroundColor: 'var(--header-bg, transparent)', 
          color: 'var(--header-fg, inherit)', 
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
                    backgroundColor: 'var(--header-accent-bg, transparent)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto',
                    border: '3px solid var(--header-accent-border, currentColor)'
                  }}>
                    <i className="fas fa-check" style={{ fontSize: '40px', color: 'var(--header-icon, currentColor)' }}></i>
                  </div>
                </div>
                <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '20px' }}>
                  Thank You for Your Purchase!
                </h1>
                <p style={{ fontSize: '1.3rem', marginBottom: '0', opacity: '0.9', color: 'var(--text-secondary, inherit)' }}>
                  Your vehicle history report is being prepared and will be delivered to your email shortly.
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
                <div className="row">
                  {/* Order Details */}
                  <div className="col-lg-6 mb-5">
                    <div className="card" style={{ 
                      border: '1px solid var(--surface-border, rgba(0,0,0,0.12))', 
                      borderRadius: '15px',
                      backgroundColor: 'var(--surface-bg, transparent)',
                      boxShadow: 'var(--elevation-shadow, 0 10px 40px rgba(0,0,0,0.1))',
                      padding: '40px'
                    }}>
                      <h3 style={{ color: 'var(--accent, currentColor)', marginBottom: '30px', fontWeight: 'bold' }}>
                        <i className="fas fa-file-alt" style={{ marginRight: '10px' }}></i>
                        What Happens Next?
                      </h3>
                      <div className="timeline">
                        <div className="timeline-item" style={{ marginBottom: '25px', display: 'flex', alignItems: 'start' }}>
                          <div style={{
                            width: '30px',
                            height: '30px',
                            backgroundColor: 'var(--accent-weak, transparent)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '15px',
                            minWidth: '30px',
                            border: '2px solid var(--accent, currentColor)'
                          }}>
                            <span style={{ color: 'var(--on-accent, currentColor)', fontSize: '14px', fontWeight: 'bold' }}>1</span>
                          </div>
                          <div>
                            <h5 style={{ marginBottom: '5px', color: 'var(--text-primary, currentColor)' }}>Processing Your Order</h5>
                            <p style={{ marginBottom: '0', color: 'var(--text-secondary, currentColor)', fontSize: '14px' }}>
                              We&apos;re generating your comprehensive vehicle history report
                            </p>
                          </div>
                        </div>
                        
                        <div className="timeline-item" style={{ marginBottom: '25px', display: 'flex', alignItems: 'start' }}>
                          <div style={{
                            width: '30px',
                            height: '30px',
                            backgroundColor: 'var(--accent-weak, transparent)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '15px',
                            minWidth: '30px',
                            border: '2px solid var(--accent, currentColor)'
                          }}>
                            <span style={{ color: 'var(--on-accent, currentColor)', fontSize: '14px', fontWeight: 'bold' }}>2</span>
                          </div>
                          <div>
                            <h5 style={{ marginBottom: '5px', color: 'var(--text-primary, currentColor)' }}>Email Delivery</h5>
                            <p style={{ marginBottom: '0', color: 'var(--text-secondary, currentColor)', fontSize: '14px' }}>
                              Report will be sent to your email within 12 hours.
                            </p>
                          </div>
                        </div>
                        
                        <div className="timeline-item" style={{ display: 'flex', alignItems: 'start' }}>
                          <div style={{
                            width: '30px',
                            height: '30px',
                            backgroundColor: 'var(--accent-weak, transparent)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '15px',
                            minWidth: '30px',
                            border: '2px solid var(--accent, currentColor)'
                          }}>
                            <span style={{ color: 'var(--on-accent, currentColor)', fontSize: '14px', fontWeight: 'bold' }}>3</span>
                          </div>
                          <div>
                            <h5 style={{ marginBottom: '5px', color: 'var(--text-primary, currentColor)' }}>Review Your Report</h5>
                            <p style={{ marginBottom: '0', color: 'var(--text-secondary, currentColor)', fontSize: '14px' }}>
                              Detailed analysis of vehicle history, accidents, and more
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Support Information */}
                  <div className="col-lg-6 mb-5">
                    <div className="card" style={{ 
                      border: '1px solid var(--surface-border, rgba(0,0,0,0.12))', 
                      borderRadius: '15px',
                      backgroundColor: 'var(--surface-bg, transparent)',
                      boxShadow: 'var(--elevation-shadow, 0 10px 40px rgba(0,0,0,0.1))',
                      padding: '40px'
                    }}>
                      <h3 style={{ color: 'var(--accent, currentColor)', marginBottom: '30px', fontWeight: 'bold' }}>
                        <i className="fas fa-headset" style={{ marginRight: '10px' }}></i>
                        Need Help?
                      </h3>
                      
                      <div className="support-item" style={{ marginBottom: '25px' }}>
                        <h5 style={{ color: 'var(--text-primary, currentColor)', marginBottom: '10px' }}>
                          <i className="fas fa-envelope" style={{ marginRight: '10px', color: 'var(--accent, currentColor)' }}></i>
                          Email Support
                        </h5>
                        <p style={{ marginBottom: '0', color: 'var(--text-secondary, currentColor)' }}>
                          <a href="mailto:car.check.store@gmail.com" style={{ color: 'var(--link-color, inherit)', textDecoration: 'underline' }}>
                            car.check.store@gmail.com or info@historivin.store
                          </a>
                        </p>
                      </div>
                      
                      <div className="support-item" style={{ marginBottom: '25px' }}>
                        <h5 style={{ color: 'var(--text-primary, currentColor)', marginBottom: '10px' }}>
                          <i className="fas fa-clock" style={{ marginRight: '10px', color: 'var(--accent, currentColor)' }}></i>
                          Response Time
                        </h5>
                        <p style={{ marginBottom: '0', color: 'var(--text-secondary, currentColor)' }}>
                          We typically respond within 1 to 2 business days.
                        </p>
                      </div>
                      
                      <div className="support-item">
                        <h5 style={{ color: 'var(--text-primary, currentColor)', marginBottom: '10px' }}>
                          <i className="fas fa-shield-alt" style={{ marginRight: '10px', color: 'var(--accent, currentColor)' }}></i>
                          Guarantee
                        </h5>
                        <p style={{ marginBottom: '0', color: 'var(--text-secondary, currentColor)' }}>
                          100% satisfaction guarantee or your money back
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="row justify-content-center mt-5">
                  <div className="col-lg-8 text-center">
                    <div style={{ 
                      backgroundColor: 'var(--surface-strong-bg, transparent)',
                      padding: '40px',
                      borderRadius: '15px',
                      boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                    }}>
                      <h4 style={{ color: 'var(--text-primary, currentColor)', marginBottom: '20px' }}>
                        Want to check another vehicle?
                      </h4>
                      <p style={{ color: 'var(--text-secondary, currentColor)', marginBottom: '30px' }}>
                        Get instant access to comprehensive vehicle history reports for any car.
                      </p>
                      <Link href="/" className="btn" style={{
                        backgroundColor: 'var(--accent, transparent)',
                        color: 'var(--on-accent, currentColor)',
                        padding: '15px 40px',
                        borderRadius: '50px',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        border: '1px solid currentColor',
                        fontSize: '16px',
                        transition: 'all 0.3s ease'
                      }}>
                        <i className="fas fa-search" style={{ marginRight: '10px' }}></i>
                        Check Another Vehicle
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ 
          backgroundColor: 'var(--footer-bg, transparent)', 
          color: 'var(--footer-fg, inherit)', 
          padding: '30px 0',
          textAlign: 'center'
        }}>
          <div className="container">
            <p style={{ marginBottom: '0', opacity: '0.8' }}>
              © 2020 All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThankYouPage;
