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
    <header className="nav-header header-layout2">
      <div className="header-top">
        <div className="container">
          <div className="row justify-content-center justify-content-lg-between align-items-center gy-2">
            <div className="col-auto d-none d-lg-block">
              <div className="header-logo">
                <Link href="/">
                  <img src="assets/img/logo.svg" alt="Fixturbo" />
                </Link>
              </div>
            </div>
            <div className="col-auto">
              <div className="header-grid-info">
                <ul>
                  <li>
                    <div className="icon">
                      <i className="fas fa-clock" />
                    </div>
                    <div className="header-grid-info-details">
                      <p>Sunday - Friday:</p>
                      <h6>9 am - 8 pm</h6>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      {/* <i className="fas fa-map-marker-alt" /> */}
                    </div>
                    <div className="header-grid-info-details">
                      {/* <p>6391 Elgin St. Celina, Delaware</p>
                      <h6>Kentucky </h6> */}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`sticky-wrapper ${scroll && "sticky"}`}>
        {/* Main Menu Area */}
        <div className="menu-area">
          <div className="container">
            <div className="row align-items-center justify-content-between">
              <div className="col-auto header-navbar-logo">
                <div className="header-logo">
                  <Link href="/">
                    <img src="assets/img/logo-white.svg" alt="Fixturbo" />
                  </Link>
                </div>
              </div>
              <div className="col-auto">
                <nav className="main-menu d-none d-lg-inline-block">
                  <ul>
                    <li className="menu-item-has-children">
                        <a href="#home">
                        Home
                        </a>
                    </li>
                    <li>
                      <a href="#about">
                        About Us
                      </a>
                    </li>
                    <li>
                      <a href="#contact">
                        Contact
                      </a>
                    </li>
                  </ul>
                </nav>
                <div className="navbar-right d-inline-flex d-lg-none">
                  <button
                    type="button"
                    className="menu-toggle icon-btn"
                    onClick={mobileMenu}
                  >
                    <i className="fas fa-bars" />
                  </button>
                </div>
              </div>
              <div className="col-auto d-xl-block d-none">
                <div className="social-links">
                  <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram" />
                  </a>
                  <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-twitter" />
                  </a>
                  <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu-wrapper  ${active && "body-visible"}`}>
          <div className="mobile-menu-area">
            <div className="mobile-logo">
              <Link href="/">
                <img src="assets/img/logo.svg" alt="Fixturbo" />
              </Link>
              <button className="menu-toggle" onClick={mobileMenu}>
                <i className="fa fa-times" />
              </button>
            </div>
            <div className="mobile-menu">
              <ul id="offcanvas-navigation">
                <li className="menu-item-has-children submenu-item-has-children">
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <a href="#about">About</a>
                </li>

                <li>
                  <a href="#contact">Contact</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderTwo;
