import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaUser, FaBuilding } from 'react-icons/fa';
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your inquiry! We will contact you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="contact-page">
      <section className="page-header">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Get in Touch with CSR Industries</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info-section">
              <h2>Get In Touch</h2>
              <p>Have questions about our products or services? We're here to help. Contact us today!</p>
              
              <div className="contact-details">
                <div className="contact-detail-item">
                  <div className="icon-wrapper">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h3>Address</h3>
                    <p>Plot No. 382, Ekta Colony<br />Sangli, Maharashtra, India</p>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="icon-wrapper">
                    <FaPhone />
                  </div>
                  <div>
                    <h3>Phone</h3>
                    <p>Ranjit Pawar: +91 9850123456<br />Office: +91 233 1234567</p>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="icon-wrapper">
                    <FaEnvelope />
                  </div>
                  <div>
                    <h3>Email</h3>
                    <p>info@csrindustries.com<br />sales@csrindustries.com</p>
                  </div>
                </div>
              </div>

              <div className="business-hours">
                <h3>Business Hours</h3>
                <p>Monday - Saturday: 9:00 AM - 6:00 PM<br />Sunday: Closed</p>
              </div>
            </div>

            <div className="contact-form-section">
              <h2>Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <div className="input-with-icon">
                    <FaUser />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your name"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <div className="input-with-icon">
                    <FaEnvelope />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <div className="input-with-icon">
                    <FaPhone />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+91 1234567890"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="company">Company Name</label>
                  <div className="input-with-icon">
                    <FaBuilding />
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your company"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="product-inquiry">Product Inquiry</option>
                    <option value="quotation">Request Quotation</option>
                    <option value="turnkey-project">Turnkey Project</option>
                    <option value="after-sales">After Sales Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder="Tell us about your requirements..."
                  ></textarea>
                </div>

                <button type="submit" className="btn-primary btn-submit">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="map-section">
        <div className="container">
          <h2 className="section-title">Find Us on Map</h2>
          <div className="map-container">
            <iframe
              title="CSR Industries Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3821.234567890123!2d74.5678901!3d16.8765432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDUyJzM1LjYiTiA3NMKwMzQnMDQuNCJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
