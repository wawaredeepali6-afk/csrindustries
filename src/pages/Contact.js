import React, { useState } from 'react';
import {
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaUser, FaBuilding,
  FaClock, FaPaperPlane, FaWhatsapp, FaCheckCircle, FaShieldAlt,
  FaTruck, FaHeadset, FaAward
} from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);

      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          subject: '',
          message: ''
        });
        setSubmitSuccess(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <div className="contact-hero-content animate-fadeInUp">
            <span className="hero-badge">
              <FaAward /> ISO 9001:2015 Certified
            </span>
            <h1>Contact CSR Industries</h1>
            <p className="hero-subtitle">Leading manufacturer of sugar industry equipment. Get in touch for inquiries, quotations, or support.</p>
          </div>
        </div>
        <div className="hero-wave">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="contact-methods">
        <div className="container">
          <div className="section-header">
            <h2>How Can We Help You?</h2>
            <p>Choose the most convenient way to reach us</p>
          </div>

          <div className="methods-grid">
            <div className="method-card">
              <div className="method-icon phone">
                <FaPhone />
              </div>
              <h3>Phone Support</h3>
              <p>Speak directly with our team</p>
              <div className="method-info">
                <div className="info-row">
                  <span>Director:</span>
                  <a href="tel:+919850123456">+91 9850123456</a>
                </div>
                <div className="info-row">
                  <span>Office:</span>
                  <a href="tel:+912331234567">+91 233 1234567</a>
                </div>
              </div>
            </div>

            <div className="method-card">
              <div className="method-icon email">
                <FaEnvelope />
              </div>
              <h3>Email Support</h3>
              <p>24-hour response guarantee</p>
              <div className="method-info">
                <div className="info-row">
                  <span>General:</span>
                  <a href="mailto:info@csrindustries.com">info@csrindustries.com</a>
                </div>
                <div className="info-row">
                  <span>Sales:</span>
                  <a href="mailto:sales@csrindustries.com">sales@csrindustries.com</a>
                </div>
              </div>
            </div>

            <div className="method-card">
              <div className="method-icon whatsapp">
                <FaWhatsapp />
              </div>
              <h3>WhatsApp Chat</h3>
              <p>Quick responses for urgent queries</p>
              <div className="method-info">
                <div className="info-row">
                  <span>Number:</span>
                  <a href="https://wa.me/919850123456" target="_blank" rel="noopener noreferrer">+91 9850123456</a>
                </div>
                <div className="info-row">
                  <span>Status:</span>
                  <span className="online">● Online</span>
                </div>
              </div>
            </div>

            <div className="method-card">
              <div className="method-icon location">
                <FaMapMarkerAlt />
              </div>
              <h3>Visit Our Facility</h3>
              <p>Tour our manufacturing unit</p>
              <div className="method-info">
                <div className="info-row">
                  <span>Address:</span>
                  <span>Plot 382, Ekta Colony</span>
                </div>
                <div className="info-row">
                  <span>City:</span>
                  <span>Sangli, Maharashtra</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Information */}
      <section className="business-info">
        <div className="container">
          <div className="info-grid">
            <div className="info-card">
              <FaClock className="info-icon" />
              <h3>Business Hours</h3>
              <div className="hours-table">
                <div className="hours-row">
                  <span>Monday - Friday</span>
                  <strong>9:00 AM - 6:00 PM</strong>
                </div>
                <div className="hours-row">
                  <span>Saturday</span>
                  <strong>9:00 AM - 2:00 PM</strong>
                </div>
                <div className="hours-row closed">
                  <span>Sunday</span>
                  <strong>Closed</strong>
                </div>
              </div>
            </div>

            <div className="info-card">
              <FaShieldAlt className="info-icon" />
              <h3>Quality Standards</h3>
              <ul className="info-list">
                <li><FaCheckCircle /> ISO 9001:2015 Certified</li>
                <li><FaCheckCircle /> 100% Quality Tested</li>
                <li><FaCheckCircle /> Comprehensive Warranty</li>
                <li><FaCheckCircle /> After-Sales Support</li>
              </ul>
            </div>

            <div className="info-card">
              <FaTruck className="info-icon" />
              <h3>Our Services</h3>
              <ul className="info-list">
                <li><FaCheckCircle /> Pan-India Delivery</li>
                <li><FaCheckCircle /> On-Site Installation</li>
                <li><FaCheckCircle /> Technical Training</li>
                <li><FaCheckCircle /> Maintenance Support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="form-section">
        <div className="container">
          <div className="section-header">
            <h2>Send Us a Message</h2>
            <p>Fill out the form below and we'll get back to you within 24 hours</p>
          </div>

          <div className="form-layout">
            <div className="form-wrapper">
              {submitSuccess && (
                <div className="success-alert">
                  <FaCheckCircle />
                  <p>Thank you! Your message has been sent successfully.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <div className="input-wrapper">
                      <FaUser className="input-icon" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Email Address *</label>
                    <div className="input-wrapper">
                      <FaEnvelope className="input-icon" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <div className="input-wrapper">
                      <FaPhone className="input-icon" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Company Name</label>
                    <div className="input-wrapper">
                      <FaBuilding className="input-icon" />
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your Company Ltd."
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Inquiry Type *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  >
                    <option value="">Select inquiry type</option>
                    <option value="product-inquiry">Product Inquiry</option>
                    <option value="quotation">Request Quotation</option>
                    <option value="turnkey-project">Turnkey Project</option>
                    <option value="after-sales">After Sales Support</option>
                    <option value="technical">Technical Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Your Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    placeholder="Tell us about your requirements..."
                    required
                    disabled={isSubmitting}
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span> Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane /> Send Message
                    </>
                  )}
                </button>

                <p className="form-note">
                  <FaShieldAlt /> Your information is secure and confidential
                </p>
              </form>
            </div>

            <div className="form-sidebar">
              <div className="sidebar-card">
                <h3>Why Choose Us?</h3>
                <ul className="benefits">
                  <li><FaCheckCircle /> 25+ Years Experience</li>
                  <li><FaCheckCircle /> ISO Certified Quality</li>
                  <li><FaCheckCircle /> Competitive Pricing</li>
                  <li><FaCheckCircle /> On-Time Delivery</li>
                  <li><FaCheckCircle /> Expert Engineering Team</li>
                  <li><FaCheckCircle /> Comprehensive Support</li>
                  <li><FaCheckCircle /> Pan-India Service</li>
                  <li><FaCheckCircle /> Custom Solutions</li>
                </ul>
              </div>

              <div className="sidebar-card cta-card">
                <FaHeadset className="cta-icon" />
                <h3>Need Immediate Help?</h3>
                <p>Our team is ready to assist you</p>
                <a href="tel:+919850123456" className="cta-button">
                  <FaPhone /> Call: +91 9850123456
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="container">
          <div className="section-header">
            <h2>Visit Our Manufacturing Facility</h2>
            <p>Experience our state-of-the-art manufacturing unit</p>
          </div>

          <div className="map-wrapper">
            <div className="map-container">
              <iframe
                title="CSR Industries Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3821.234567890123!2d74.5678901!3d16.8765432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDUyJzM1LjYiTiA3NMKwMzQnMDQuNCJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
            <div className="map-info">
              <h4><FaMapMarkerAlt /> CSR Industries</h4>
              <p>Plot No. 382, Ekta Colony</p>
              <p>Sangli, Maharashtra, India - 416416</p>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
                Get Directions →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
