import React from "react";
import TrackVisibility from "react-on-screen";
import CountUp from "react-countup";

const AboutTwo = () => {
  const features = [
    {
      icon: "https://epicvin.com/img2/interface-screens/webp/odometer-check-en@2x.webp",
      title: "Past Odometer Readings",
      subtitle: "Has the odometer ever been rolled back?",
      isImage: true
    },
    {
      icon: "fas fa-history",
      title: "Ownership History",
      subtitle: "Complete ownership records and transfers"
    },
    {
      icon: "fas fa-camera",
      title: "Photos on Sale",
      subtitle: "View vehicle photos from listings"
    },
    {
      icon: "fas fa-car-crash",
      title: "Damage Check",
      subtitle: "Accident and damage history"
    },
    {
      icon: "fas fa-cog",
      title: "Technical Data",
      subtitle: "Full technical specifications"
    },
    {
      icon: "fas fa-shield-alt",
      title: "Stolen VIN Check",
      subtitle: "Verify if vehicle is reported stolen"
    }
  ];

  return (
    <div className="modern-about-section">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title-modern">
            Always Check the History of a Car Before Buying It
          </h2>
          <p className="section-subtitle">
            Uncover comprehensive insights with a Vehicle History Report
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card-modern">
              <div className="feature-icon-wrapper">
                {feature.isImage ? (
                  <img src={feature.icon} alt={feature.title} className="feature-image" />
                ) : (
                  <i className={feature.icon}></i>
                )}
              </div>
              <h3 className="feature-title-modern">{feature.title}</h3>
              <p className="feature-subtitle">{feature.subtitle}</p>
            </div>
          ))}
        </div>

        <div className="nmvtis-section">
          <div className="row align-items-center">
            <div className="col-lg-3 text-center mb-4 mb-lg-0">
              <img 
                src="https://epicvin.com/img2/security/png/nmvtis-logo@2x.png?v1" 
                alt="NMVTIS Logo" 
                className="nmvtis-logo"
              />
            </div>
            <div className="col-lg-9">
              <h3 className="nmvtis-title">Official NMVTIS Source</h3>
              <p className="nmvtis-text">
                We are an approved NMVTIS data provider. NMVTIS is a national database 
                designed to protect consumers from fraud and unsafe vehicles, to prevent 
                stolen vehicles from being resold, and to provide users with accurate and 
                complete vehicle information.
              </p>
            </div>
          </div>
        </div>

        <div className="info-stats">
          <div className="row">
            <div className="col-md-3 col-6">
              <div className="stat-box-modern">
                <div className="stat-icon-modern">
                  <i className="fas fa-check-circle"></i>
                </div>
                <h4 className="stat-number-modern">70+</h4>
                <p className="stat-label-modern">Databases Checked</p>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="stat-box-modern">
                <div className="stat-icon-modern">
                  <i className="fas fa-search"></i>
                </div>
                <h4 className="stat-number-modern">45k+</h4>
                <p className="stat-label-modern">Daily VIN Searches</p>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="stat-box-modern">
                <div className="stat-icon-modern">
                  <i className="fas fa-users"></i>
                </div>
                <h4 className="stat-number-modern">1M+</h4>
                <p className="stat-label-modern">Trusted Users</p>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="stat-box-modern">
                <div className="stat-icon-modern">
                  <i className="fas fa-file-alt"></i>
                </div>
                <h4 className="stat-number-modern">100%</h4>
                <p className="stat-label-modern">Extensive History</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .modern-about-section {
          padding: 80px 0;
          background: #ffffff;
        }

        .section-header {
          margin-bottom: 60px;
        }

        .section-title-modern {
          font-size: 42px;
          font-weight: 800;
          color: #1e293b;
          margin-bottom: 15px;
          line-height: 1.3;
        }

        .section-subtitle {
          font-size: 18px;
          color: #64748b;
          max-width: 600px;
          margin: 0 auto;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
          margin-bottom: 80px;
        }

        .feature-card-modern {
          background: white;
          border-radius: 16px;
          padding: 30px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          text-align: center;
        }

        .feature-card-modern:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        }

        .feature-icon-wrapper {
          width: 80px;
          height: 80px;
          margin: 0 auto 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #E8092E 0%, #dc2626 100%);
          border-radius: 16px;
          color: white;
          font-size: 36px;
        }

        .feature-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 16px;
        }

        .feature-title-modern {
          font-size: 20px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 10px;
        }

        .feature-subtitle {
          font-size: 14px;
          color: #64748b;
          margin: 0;
          line-height: 1.6;
        }

        .nmvtis-section {
          background: linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%);
          border-radius: 20px;
          padding: 50px;
          margin-bottom: 60px;
        }

        .nmvtis-logo {
          max-width: 150px;
          height: auto;
        }

        .nmvtis-title {
          font-size: 28px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 15px;
        }

        .nmvtis-text {
          font-size: 16px;
          color: #475569;
          line-height: 1.7;
          margin: 0;
        }

        .info-stats {
          margin-top: 40px;
        }

        .stat-box-modern {
          text-align: center;
          padding: 30px 20px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
          margin-bottom: 20px;
          transition: all 0.3s ease;
        }

        .stat-box-modern:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .stat-icon-modern {
          width: 60px;
          height: 60px;
          margin: 0 auto 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #E8092E 0%, #dc2626 100%);
          border-radius: 12px;
          color: white !important;
          font-size: 28px;
        }
        
        .stat-icon-modern i {
          color: white !important;
        }

        .stat-number-modern {
          font-size: 32px;
          font-weight: 800;
          color: #1e293b;
          margin: 10px 0;
          display: inline-block;
          line-height: 1;
        }

        .stat-label-modern {
          font-size: 14px;
          color: #64748b;
          margin: 0;
        }

        @media (max-width: 991px) {
          .section-title-modern {
            font-size: 32px;
          }

          .nmvtis-section {
            padding: 30px;
          }

          .nmvtis-title {
            font-size: 24px;
            text-align: center;
          }

          .nmvtis-text {
            text-align: center;
          }
        }

        @media (max-width: 768px) {
          .modern-about-section {
            padding: 60px 0;
          }

          .section-title-modern {
            font-size: 28px;
          }

          .features-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .stat-number-modern {
            font-size: 28px;
          }
        }
      `}</style>
    </div>
  );
};

export default AboutTwo;
