import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaLinkedin,
  FaFacebook, FaInstagram, FaTwitter, FaDownload,
  FaArrowRight, FaClock
} from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' }
  ];

  const services = [
    'Boiling House Equipment',
    'Material Handling Systems',
    'Process Equipment',
    'Mill House Equipment',
    'Turnkey Solutions'
  ];

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Company Info */}
            <div className="footer-column">
              <h3 className="footer-logo">CSR INDUSTRIES</h3>
              <p className="footer-tagline">Sugar Industry Equipment Excellence</p>
              <p className="footer-description">
                Leading manufacturer and erector of sugar industry equipment with
                ISO 9001:2015 and JAS-ANZ certifications.
              </p>
              <div className="footer-social">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <FaLinkedin />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <FaFacebook />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <FaInstagram />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <FaTwitter />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-column">
              <h4 className="footer-title">Quick Links</h4>
              <ul className="footer-links">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link to={link.path}>
                      <FaArrowRight /> {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="footer-column">
              <h4 className="footer-title">Our Services</h4>
              <ul className="footer-links">
                {services.map((service, index) => (
                  <li key={index}>
                    <span><FaArrowRight /> {service}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-column">
              <h4 className="footer-title">Contact Us</h4>
              <ul className="footer-contact">
                <li>
                  <FaMapMarkerAlt />
                  <span>Plot No. 382, Ekta Colony<br />Sangli, Maharashtra</span>
                </li>
                <li>
                  <FaPhone />
                  <a href="tel:+919689052887">+91 9689052887</a>
                </li>
                <li>
                  <FaEnvelope />
                  <a href="mailto:info@csrindustries.com">info@csrindustries.com</a>
                </li>
                <li>
                  <FaClock />
                  <span>Mon - Sat: 9:00 AM - 6:00 PM</span>
                </li>
              </ul>
              <a href="/catalogue.pdf" download className="footer-download-btn">
                <FaDownload /> Download Catalogue
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p>&copy; {currentYear} CSR Industries. All rights reserved.</p>
            <div className="footer-certifications">
              <span className="cert-badge">ISO 9001:2015</span>
              <span className="cert-badge">JAS-ANZ</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
