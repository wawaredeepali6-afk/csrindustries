import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaPhone, FaEnvelope, FaDownload } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const handleCatalogueRequest = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-content">
            <div className="contact-info">
              <a href="tel:+919850123456" className="contact-link">
                <FaPhone /> +91 9689052887
              </a>
              <a href="mailto:info@csrindustries.com" className="contact-link">
                <FaEnvelope /> info@csrindustries.com
              </a>
            </div>

          </div>
        </div>
      </div>

      <nav className="navbar">
        <div className="container">
          <div className="nav-content">
            <Link to="/" className="logo">
              <img src="/logo2.png" alt="CSR Industries Logo" className="logo-image" />
              <div className="logo-text">
                <h1>CSR INDUSTRIES</h1>
                <p>Sugar Industry Equipment</p>
              </div>
            </Link>

            {!isMenuOpen && (
              <button
                className="menu-toggle"
                onClick={() => setIsMenuOpen(true)}
                aria-label="Toggle menu"
              >
                <FaBars />
              </button>
            )}

            <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
              <button
                className="menu-close"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
              >
                <FaTimes />
              </button>
              <li>
                <Link
                  to="/"
                  className={location.pathname === '/' ? 'active' : ''}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={location.pathname === '/about' ? 'active' : ''}
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className={location.pathname.startsWith('/products') ? 'active' : ''}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  className={location.pathname === '/gallery' ? 'active' : ''}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={location.pathname === '/contact' ? 'active' : ''}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>
              <li className="nav-cta">
                <Link to="/contact" onClick={handleCatalogueRequest} className="btn-download">
                  <FaDownload /> Request Catalogue
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
