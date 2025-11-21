
import React from "react";
import Link from "next/link";

const FooterAreaTwo = () => {
  return (
    <>
      <footer className="modern-footer">
        <div className="footer-cta-section">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-7">
                <h2 className="footer-cta-title">Save Thousands of Dollars</h2>
                <p className="footer-cta-subtitle">
                  Learn everything there is to know about your next car
                </p>
              </div>
              <div className="col-lg-5">
                <div className="footer-vin-input">
                  <div className="tab-selector-footer">
                    <button className="tab-btn-footer active">by VIN</button>
                    <button className="tab-btn-footer">by US License Plate</button>
                  </div>
                  <form className="vin-input-form-footer">
                    <input 
                      type="text"
                      placeholder="Enter VIN Number"
                      className="vin-input-footer"
                    />
                    <button type="submit" className="check-btn-footer">
                      Check Now
                    </button>
                  </form>
                </div>
              </div>
            </div>
            
            <div className="footer-badges">
              <img src="https://epicvin.com/img2/security/png/niada-logo.png" alt="NIADA" />
              <img src="https://epicvin.com/img2/security/svg/blockchain-icon.svg" alt="Blockchain" />
              <img src="https://epicvin.com/img2/security/png/nmvtis-logo@2x.png" alt="NMVTIS" />
            </div>
          </div>
        </div>

        <div className="container">
          <div className="footer-main-section">
            <div className="row">
              <div className="col-lg-3 col-md-6">
                <div className="footer-widget-modern">
                  <h4 className="footer-widget-title">Customer Service</h4>
                  <div className="footer-contact-info">
                    <p className="contact-time">7 am - 6 pm EST Monday - Friday</p>
                    <p className="contact-address">
                      2980 NE 207th St, Suite 300-189<br />
                      Aventura, FL 33180 USA
                    </p>
                  </div>
                  <div className="footer-social-links">
                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-facebook-f" />
                    </a>
                    <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-instagram" />
                    </a>
                    <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-twitter" />
                    </a>
                    <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-youtube" />
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="col-lg-2 col-md-6">
                <div className="footer-widget-modern">
                  <h4 className="footer-widget-title">Company</h4>
                  <ul className="footer-links-modern">
                    <li><a href="#about">About Us</a></li>
                    <li><a href="#contact">Contact Us</a></li>
                    <li><a href="#reviews">Reviews</a></li>
                    <li><a href="#blog">Blog</a></li>
                    <li><a href="#affiliate">Affiliate Program</a></li>
                  </ul>
                </div>
              </div>
              
              <div className="col-lg-2 col-md-6">
                <div className="footer-widget-modern">
                  <h4 className="footer-widget-title">Legal</h4>
                  <ul className="footer-links-modern">
                    <li><a href="#faq">FAQ</a></li>
                    <li><a href="#refund">Refund Policy</a></li>
                    <li><a href="#privacy">Privacy Policy</a></li>
                    <li><a href="#terms">Terms & Conditions</a></li>
                    <li><a href="#sitemap">Sitemap</a></li>
                  </ul>
                </div>
              </div>
              
              <div className="col-lg-2 col-md-6">
                <div className="footer-widget-modern">
                  <h4 className="footer-widget-title">Services</h4>
                  <ul className="footer-links-modern">
                    <li><a href="#dmv">DMV VIN Check</a></li>
                    <li><a href="#motorcycle">Motorcycle VIN Check</a></li>
                    <li><a href="#rv">RV VIN Lookup</a></li>
                    <li><a href="#plate">License Plate Lookup</a></li>
                    <li><a href="#sample">Sample Report</a></li>
                  </ul>
                </div>
              </div>
              
              <div className="col-lg-3 col-md-6">
                <div className="footer-widget-modern">
                  <h4 className="footer-widget-title">Subscribe to Our Newsletter</h4>
                  <form className="newsletter-form-modern">
                    <input 
                      type="email" 
                      placeholder="Enter your email"
                      className="newsletter-input-modern"
                    />
                    <button type="submit" className="newsletter-btn-modern">
                      Subscribe
                    </button>
                  </form>
                  <div className="footer-app-download">
                    <p className="app-text">Download our app</p>
                    <a href="#" className="app-link">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-12 text-center">
                <p className="copyright-text-modern">
                  © 2012 - 2025 Car Check Store Vehicle History Reports. All Rights Reserved. 
                  Use of this Website constitutes acceptance of our{' '}
                  <a href="#terms">Terms & Conditions</a>,{' '}
                  <a href="#privacy">Privacy Policy</a>,{' '}
                  <a href="#refund">Refund Policy</a>.{' '}
                  This site is owned and operated by Car Check Store - an approved NMVTIS data provider.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .modern-footer {
          background: #1e293b;
          color: white;
        }

        .footer-cta-section {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          padding: 60px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .footer-cta-title {
          font-size: 36px;
          font-weight: 800;
          color: white;
          margin-bottom: 10px;
        }

        .footer-cta-subtitle {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 0;
        }

        .footer-vin-input {
          background: white;
          border-radius: 12px;
          padding: 20px;
        }

        .tab-selector-footer {
          display: flex;
          gap: 10px;
          margin-bottom: 15px;
          border-bottom: 2px solid #e2e8f0;
        }

        .tab-btn-footer {
          background: none;
          border: none;
          padding: 10px 20px;
          font-size: 14px;
          font-weight: 600;
          color: #64748b;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .tab-btn-footer.active {
          color: #E8092E;
        }

        .tab-btn-footer.active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 2px;
          background: #E8092E;
        }

        .vin-input-form-footer {
          display: flex;
          gap: 10px;
        }

        .vin-input-footer {
          flex: 1;
          padding: 12px 16px;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 14px;
        }

        .check-btn-footer {
          background: linear-gradient(135deg, #E8092E 0%, #dc2626 100%);
          color: white;
          border: none;
          padding: 12px 30px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
        }

        .footer-badges {
          display: flex;
          gap: 30px;
          margin-top: 40px;
          justify-content: center;
          align-items: center;
        }

        .footer-badges img {
          height: 40px;
          opacity: 0.7;
          filter: brightness(0) invert(1);
        }

        .footer-main-section {
          padding: 60px 0;
        }

        .footer-widget-modern {
          margin-bottom: 30px;
        }

        .footer-widget-title {
          font-size: 18px;
          font-weight: 700;
          color: white;
          margin-bottom: 20px;
        }

        .footer-contact-info {
          margin-bottom: 20px;
        }

        .contact-time {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 10px;
        }

        .contact-address {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.6;
        }

        .footer-social-links {
          display: flex;
          gap: 12px;
        }

        .footer-social-links a {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          transition: all 0.3s ease;
        }

        .footer-social-links a:hover {
          background: #E8092E;
          transform: translateY(-2px);
        }

        .footer-links-modern {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links-modern li {
          margin-bottom: 10px;
        }

        .footer-links-modern a {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-size: 14px;
          transition: color 0.3s ease;
        }

        .footer-links-modern a:hover {
          color: #E8092E;
        }

        .newsletter-form-modern {
          margin-bottom: 20px;
        }

        .newsletter-input-modern {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
          color: white;
          margin-bottom: 10px;
        }

        .newsletter-input-modern::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .newsletter-btn-modern {
          width: 100%;
          padding: 12px;
          background: linear-gradient(135deg, #E8092E 0%, #dc2626 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .newsletter-btn-modern:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(232, 9, 46, 0.3);
        }

        .app-text {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 10px;
        }

        .app-link img {
          height: 40px;
          width: auto;
        }

        .footer-bottom {
          background: #0f172a;
          padding: 30px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .copyright-text-modern {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.7;
          margin: 0;
        }

        .copyright-text-modern a {
          color: #E8092E;
          text-decoration: none;
        }

        .copyright-text-modern a:hover {
          text-decoration: underline;
        }

        @media (max-width: 991px) {
          .footer-cta-title {
            font-size: 28px;
            text-align: center;
          }

          .footer-cta-subtitle {
            text-align: center;
            margin-bottom: 30px;
          }

          .footer-badges {
            flex-wrap: wrap;
          }

          .footer-main-section {
            padding: 40px 0;
          }
        }

        @media (max-width: 768px) {
          .footer-cta-section {
            padding: 40px 0;
          }

          .footer-cta-title {
            font-size: 24px;
          }

          .vin-input-form-footer {
            flex-direction: column;
          }

          .check-btn-footer {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
};

export default FooterAreaTwo;
