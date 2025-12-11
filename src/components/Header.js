import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaPhone, FaEnvelope, FaLinkedin, FaFacebook, FaInstagram, FaDownload, FaChevronDown } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
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
    setIsProductsOpen(false);
  }, [location]);

  const productCategories = [
    { name: 'Boiling House Equipment', path: '/products#boiling' },
    { name: 'Material Handling', path: '/products#handling' },
    { name: 'Process Equipment', path: '/products#process' },
    { name: 'Mill House Equipment', path: '/products#mill' },
  ];

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-content">
            <div className="contact-info">
              <a href="tel:+919850123456" className="contact-link">
                <FaPhone /> +91 9850123456
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
              <h1>CSR INDUSTRIES</h1>
              <p>Sugar Industry Equipment</p>
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
                <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
              </li>
              <li>
                <Link to="/about" onClick={() => setIsMenuOpen(false)}>About Us</Link>
              </li>
              <li
                className="dropdown"
                onMouseEnter={() => setIsProductsOpen(true)}
                onMouseLeave={() => setIsProductsOpen(false)}
              >
                <Link to="/products" className="dropdown-toggle">
                  Products <FaChevronDown className="dropdown-icon" />
                </Link>
                <ul className={`dropdown-menu ${isProductsOpen ? 'show' : ''}`}>
                  {productCategories.map((category, index) => (
                    <li key={index}>
                      <a href={category.path} onClick={() => setIsMenuOpen(false)}>
                        {category.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <Link to="/gallery" onClick={() => setIsMenuOpen(false)}>Gallery</Link>
              </li>
              <li>
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
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
