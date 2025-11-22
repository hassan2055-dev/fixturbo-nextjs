import React, { useState } from "react";
import Image from "next/image";

const HeroTwo = () => {
  const [vinNumber, setVinNumber] = useState("");
  const [activeTab, setActiveTab] = useState("vin");

  const handleCheck = (e) => {
    e.preventDefault();
    // Scroll to pricing section
    const pricingSection = document.querySelector('.pricing-area-2');
    if (pricingSection) {
      pricingSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="modern-hero-wrapper" id="hero">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="hero-content-modern">
              <h1 className="hero-title-modern">
                VIN Check Can Save You Thousands — Get a Full Vehicle History Report
              </h1>
              <p className="hero-subtitle-modern">
                About 40 percent of used cars on roads carry documented accident damage, 
                and nearly 20 percent still sit under an open safety recall. One quick, 
                free VIN check can flag those issues before your money leaves your pocket.
              </p>
              
              <div className="vin-checker-box">
                <div className="tab-selector">
                  <button 
                    className={`tab-btn ${activeTab === 'vin' ? 'active' : ''}`}
                    onClick={() => setActiveTab('vin')}
                  >
                    by VIN
                  </button>
                  <button 
                    className={`tab-btn ${activeTab === 'plate' ? 'active' : ''}`}
                    onClick={() => setActiveTab('plate')}
                  >
                    by License Plate
                  </button>
                </div>
                
                <form onSubmit={handleCheck} className="vin-input-form">
                  <div className="input-wrapper">
                    <input 
                      type="text"
                      placeholder={activeTab === 'vin' ? "Enter VIN Number" : "Enter License Plate"}
                      value={vinNumber}
                      onChange={(e) => setVinNumber(e.target.value)}
                      className="vin-input"
                      required
                    />
                    <button type="submit" className="check-btn">
                      Check Now
                    </button>
                  </div>
                  <div className="input-help">
                    <a href="#" className="help-link">Where to find the VIN?</a>
                    <span className="separator">•</span>
                    <a href="#" className="help-link">No VIN? <span>Get CarCheck VIN reports</span></a>
                  </div>
                </form>
                
                <div className="trust-badges">
                  <div className="badge-item">
                    <img src="https://epicvin.com/img2/security/png/niada-logo.png" alt="NIADA" />
                  </div>
                  <div className="badge-item">
                    <img src="https://epicvin.com/img2/security/svg/blockchain-icon.svg" alt="Blockchain" />
                  </div>
                  <div className="badge-item">
                    <img src="https://epicvin.com/img2/security/png/nmvtis-logo@2x.png" alt="NMVTIS" />
                  </div>
                </div>
              </div>

              <div className="hero-stats">
                <div className="stat-item">
                  <div className="stat-icon">
                    <i className="fas fa-users"></i>
                  </div>
                  <div className="stat-content">
                    <p className="stat-label">Trusted globally by</p>
                    <h4 className="stat-value">1,000,000+ users</h4>
                    <p className="stat-sublabel">across 150+ nations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-lg-6">
            <div className="hero-image-modern">
              <img 
                src="/hero.webp" 
                alt="Vehicle History Report"
                className="main-hero-img"
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .modern-hero-wrapper {
          background: linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%);
          padding: 120px 0 80px;
          position: relative;
          overflow: hidden;
        }

        .modern-hero-wrapper::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 50%;
          height: 100%;
          background: linear-gradient(135deg, rgba(0, 102, 204, 0.05) 0%, rgba(0, 82, 163, 0.05) 100%);
          z-index: 0;
        }

        .container {
          position: relative;
          z-index: 1;
        }

        .hero-content-modern {
          padding-right: 20px;
        }

        .hero-title-modern {
          font-size: 48px;
          font-weight: 800;
          line-height: 1.2;
          color: #1e293b;
          margin-bottom: 20px;
        }

        .hero-subtitle-modern {
          font-size: 18px;
          color: #64748b;
          line-height: 1.7;
          margin-bottom: 40px;
        }

        .vin-checker-box {
          background: white;
          border-radius: 16px;
          padding: 30px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          margin-bottom: 40px;
        }

        .tab-selector {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
          border-bottom: 2px solid #e2e8f0;
          padding-bottom: 0;
        }

        .tab-btn {
          background: none;
          border: none;
          padding: 12px 24px;
          font-size: 16px;
          font-weight: 600;
          color: #64748b;
          cursor: pointer;
          position: relative;
          transition: all 0.3s ease;
        }

        .tab-btn.active {
          color: #0066CC;
        }

        .tab-btn.active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 2px;
          background: #0066CC;
        }

        .input-wrapper {
          display: flex;
          gap: 10px;
          margin-bottom: 15px;
        }

        .vin-input {
          flex: 1;
          padding: 16px 20px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 16px;
          transition: all 0.3s ease;
        }

        .vin-input:focus {
          outline: none;
          border-color: #0066CC;
          box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
        }

        .check-btn {
          background: linear-gradient(135deg, #0066CC 0%, #0052A3 100%);
          color: white;
          border: none;
          padding: 16px 40px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .check-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0, 102, 204, 0.3);
        }

        .input-help {
          display: flex;
          gap: 10px;
          align-items: center;
          font-size: 14px;
        }

        .help-link {
          color: #64748b;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .help-link:hover {
          color: #0066CC;
        }

        .help-link span {
          color: #0066CC;
          font-weight: 600;
        }

        .separator {
          color: #cbd5e1;
        }

        .trust-badges {
          display: flex;
          gap: 20px;
          align-items: center;
          padding-top: 20px;
          border-top: 1px solid #e2e8f0;
          margin-top: 20px;
          flex-wrap: wrap;
        }

        .badge-item img {
          height: 40px;
          width: auto;
          object-fit: contain;
          opacity: 0.7;
          transition: opacity 0.3s ease;
        }

        .badge-item:hover img {
          opacity: 1;
        }

        .hero-stats {
          display: flex;
          gap: 30px;
        }

        .stat-item {
          display: flex;
          gap: 15px;
          align-items: center;
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        }

        .stat-icon {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #0066CC 0%, #0052A3 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 24px;
        }

        .stat-content {
          flex: 1;
        }

        .stat-label {
          font-size: 12px;
          color: #64748b;
          margin: 0;
        }

        .stat-value {
          font-size: 20px;
          font-weight: 700;
          color: #1e293b;
          margin: 5px 0;
        }

        .stat-sublabel {
          font-size: 12px;
          color: #64748b;
          margin: 0;
        }

        .hero-image-modern {
          text-align: center;
          position: relative;
        }

        .main-hero-img {
          max-width: 100%;
          height: auto;
          filter: drop-shadow(0 20px 60px rgba(0, 0, 0, 0.15));
        }

        @media (max-width: 991px) {
          .hero-title-modern {
            font-size: 36px;
          }

          .hero-subtitle-modern {
            font-size: 16px;
          }

          .vin-checker-box {
            padding: 20px;
          }

          .input-wrapper {
            flex-direction: column;
          }

          .check-btn {
            width: 100%;
          }

          .hero-image-modern {
            margin-top: 40px;
          }
        }

        @media (max-width: 768px) {
          .modern-hero-wrapper {
            padding: 80px 0 60px;
          }

          .hero-title-modern {
            font-size: 28px;
          }

          .stat-item {
            padding: 15px;
          }

          .stat-icon {
            width: 40px;
            height: 40px;
            font-size: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default HeroTwo;
