import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const HeaderTwo = () => {
  const [active, setActive] = useState(false);
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    var offCanvasNav = document.getElementById("offcanvas-navigation");
    
    if (offCanvasNav) {
      var offCanvasNavSubMenu = offCanvasNav.querySelectorAll(".sub-menu");

      for (let i = 0; i < offCanvasNavSubMenu.length; i++) {
        offCanvasNavSubMenu[i].insertAdjacentHTML(
          "beforebegin",
          "<span class='mean-expand-class'></span>"
        );
      }

      var menuExpand = offCanvasNav.querySelectorAll(".mean-expand-class");
      var numMenuExpand = menuExpand.length;

      function sideMenuExpand() {
        if (this.parentElement.classList.contains("active") === true) {
          this.parentElement.classList.remove("active");
        } else {
          for (let i = 0; i < numMenuExpand; i++) {
            menuExpand[i].parentElement.classList.remove("active");
          }
          this.parentElement.classList.add("active");
        }
      }

      for (let i = 0; i < numMenuExpand; i++) {
        menuExpand[i].addEventListener("click", sideMenuExpand);
      }
    }
    
    const handleScroll = () => {
      if (window.pageYOffset < 150) {
        setScroll(false);
      } else if (window.pageYOffset > 150) {
        setScroll(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const mobileMenu = () => {
    setActive(!active);
  };
  return (
    <>
      <header className="modern-nav-header">
        <div className={`modern-header-wrapper ${scroll && "scrolled"}`}>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-auto">
                <div className="modern-logo">
                  <Link href="/">
                    <img src="./logo.png" alt="Car Check Store" />
                  </Link>
                </div>
              </div>
              
              <div className="col">
                <nav className="modern-nav d-none d-lg-flex">
                  <ul className="nav-list">
                    <li>
                      <a href="#home" className="nav-link">Home</a>
                    </li>
                    <li>
                      <a href="#about" className="nav-link">About Us</a>
                    </li>
                    <li>
                      <a href="#services" className="nav-link">Services</a>
                    </li>
                    <li>
                      <a href="#pricing" className="nav-link">Pricing</a>
                    </li>
                    <li>
                      <a href="#contact" className="nav-link">Contact</a>
                    </li>
                  </ul>
                </nav>
              </div>
              
              <div className="col-auto">
                <div className="modern-header-actions">
                  <a href="#" className="login-btn d-none d-md-inline-flex">
                    <i className="fas fa-user"></i>
                    Login
                  </a>
                  <button
                    type="button"
                    className="mobile-menu-toggle d-lg-none"
                    onClick={mobileMenu}
                  >
                    <i className="fas fa-bars" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`modern-mobile-menu ${active && "active"}`}>
          <div className="mobile-menu-overlay" onClick={mobileMenu}></div>
          <div className="mobile-menu-content">
            <div className="mobile-menu-header">
              <Link href="/">
                <img src="/logo.png" alt="Car Check Store" />
              </Link>
              <button className="close-menu" onClick={mobileMenu}>
                <i className="fas fa-times" />
              </button>
            </div>
            <nav className="mobile-nav">
              <ul id="offcanvas-navigation">
                <li>
                  <a href="#home" onClick={mobileMenu}>Home</a>
                </li>
                <li>
                  <a href="#about" onClick={mobileMenu}>About Us</a>
                </li>
                <li>
                  <a href="#services" onClick={mobileMenu}>Services</a>
                </li>
                <li>
                  <a href="#pricing" onClick={mobileMenu}>Pricing</a>
                </li>
                <li>
                  <a href="#contact" onClick={mobileMenu}>Contact</a>
                </li>
              </ul>
              <div className="mobile-menu-footer">
                <a href="#" className="login-btn-mobile">
                  <i className="fas fa-user"></i>
                  Login
                </a>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <style jsx>{`
        .modern-nav-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: white;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }

        .modern-header-wrapper {
          padding: 15px 0;
          transition: all 0.3s ease;
        }

        .modern-header-wrapper.scrolled {
          padding: 10px 0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .modern-logo img {
          height: 45px;
          width: auto;
        }

        .modern-nav {
          justify-content: center;
        }

        .nav-list {
          display: flex;
          gap: 40px;
          list-style: none;
          margin: 0;
          padding: 0;
          align-items: center;
        }

        .nav-link {
          color: #334155;
          text-decoration: none;
          font-weight: 500;
          font-size: 15px;
          transition: all 0.3s ease;
          position: relative;
          padding: 8px 0;
        }

        .nav-link:hover {
          color: #0066CC;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: #0066CC;
          transition: width 0.3s ease;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .modern-header-actions {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .login-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 24px;
          background: linear-gradient(135deg, #0066CC 0%, #0052A3 100%);
          color: white;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .login-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 102, 204, 0.3);
          color: white;
        }

        .mobile-menu-toggle {
          background: none;
          border: none;
          font-size: 24px;
          color: #334155;
          cursor: pointer;
          padding: 8px;
        }

        .modern-mobile-menu {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 9999;
          visibility: hidden;
          opacity: 0;
          transition: all 0.3s ease;
        }

        .modern-mobile-menu.active {
          visibility: visible;
          opacity: 1;
        }

        .mobile-menu-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
        }

        .mobile-menu-content {
          position: absolute;
          top: 0;
          right: 0;
          width: 300px;
          height: 100%;
          background: white;
          transform: translateX(100%);
          transition: transform 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .modern-mobile-menu.active .mobile-menu-content {
          transform: translateX(0);
        }

        .mobile-menu-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #e2e8f0;
        }

        .mobile-menu-header img {
          height: 35px;
        }

        .close-menu {
          background: none;
          border: none;
          font-size: 24px;
          color: #334155;
          cursor: pointer;
          padding: 8px;
        }

        .mobile-nav {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
        }

        .mobile-nav ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .mobile-nav li {
          margin-bottom: 5px;
        }

        .mobile-nav a {
          display: block;
          padding: 15px;
          color: #334155;
          text-decoration: none;
          font-weight: 500;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .mobile-nav a:hover {
          background: #f1f5f9;
          color: #0066CC;
        }

        .mobile-menu-footer {
          padding: 20px 0 0;
          border-top: 1px solid #e2e8f0;
          margin-top: 20px;
        }

        .login-btn-mobile {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 15px;
          background: linear-gradient(135deg, #0066CC 0%, #0052A3 100%);
          color: white;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        @media (max-width: 991px) {
          .modern-logo img {
            height: 35px;
          }
        }
      `}</style>
    </>
  );
};

export default HeaderTwo;
