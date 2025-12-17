import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  FaCog, FaIndustry, FaTruck, FaTools, FaCheckCircle, FaAward,
  FaUsers, FaProjectDiagram, FaStar, FaArrowRight,
  FaShieldAlt, FaClock, FaHandshake, FaChartLine
} from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const observerRef = useRef(null);

  useEffect(() => {
    // Intersection Observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((el) => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const services = [
    {
      icon: <FaIndustry />,
      title: 'Boiling House Equipment',
      desc: 'Crystallizers, Juice Heaters, Evaporator Bodies',
      color: '#0066cc'
    },
    {
      icon: <FaTruck />,
      title: 'Material Handling',
      desc: 'Bagasse Handling, Ash Handling, Conveyors',
      color: '#ff6b35'
    },
    {
      icon: <FaCog />,
      title: 'Process Equipment',
      desc: 'Storage Tanks, Pressure Vessels, Heat Exchangers',
      color: '#28a745'
    },
    {
      icon: <FaTools />,
      title: 'Mill House Equipment',
      desc: 'Complete mill house solutions and spares',
      color: '#ffc107'
    }
  ];

  const stats = [
    { icon: <FaProjectDiagram />, value: '500+', label: 'Projects Completed' },
    { icon: <FaUsers />, value: '200+', label: 'Happy Clients' },
    { icon: <FaClock />, value: '20+', label: 'Years Experience' },
    { icon: <FaAward />, value: '50+', label: 'Awards Won' }
  ];

  const features = [
    { icon: <FaShieldAlt />, title: 'ISO 9001:2015 Certified', desc: 'Quality assured manufacturing' },
    { icon: <FaCheckCircle />, title: 'JAS-ANZ Accredited', desc: 'International standards compliance' },
    { icon: <FaHandshake />, title: 'Turnkey Solutions', desc: 'End-to-end project delivery' },
    { icon: <FaChartLine />, title: 'Timely Delivery', desc: 'On-time project completion' }
  ];

  const clients = [
    {
      name: 'GM Sugar & Energy pvt ltd',
      logo: '/client_logo_1.jpg'
    },
    {
      name: 'Onkar Sugar',
      logo: '/client_logo_2.jpg'
    },
    {
      name: 'Lokmangal Agro',
      logo: '/client_logo_1.jpg'
    },
    {
      name: 'Vitthal Sugar Pandharpur',
      logo: '/client_logo_2.jpg'
    },
    {
      name: 'Bharti Sugar',
      logo: '/client_logo_1.jpg'
    },
    {
      name: 'Vitthalrao Shinde Sahakari Sakhar Karkhana Ltd',
      logo: '/client_logo_2.jpg'
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content animate-fadeInUp">
            <h1 className="hero-title">
              Leading Manufacturer of <span className="text-highlight">Sugar Industry Equipment</span>
            </h1>
            <p className="hero-subtitle">
              Certified manufacturer and erector with ISO 9001:2015 & JAS-ANZ accreditation
            </p>
            <div className="hero-buttons">
              <Link to="/products" className="btn btn-primary btn-large">
                Explore Products <FaArrowRight />
              </Link>
              <Link to="/contact" className="btn btn-secondary btn-large">
                Get Quote
              </Link>
            </div>
          </div>
        </div>
        <div className="hero-wave">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section stats-section">
        <div className="container">
          <div className="stats-grid scroll-reveal">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section services-section">
        <div className="container">
          <h2 className="section-title scroll-reveal">Our Core Services</h2>
          <p className="section-subtitle scroll-reveal">
            Comprehensive solutions for sugar industry equipment manufacturing and installation
          </p>
          <div className="services-grid">
            {services.map((service, index) => (
              <div
                key={index}
                className="service-card card card-hover-glow scroll-reveal"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="service-icon" style={{ color: service.color }}>
                  {service.icon}
                </div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <Link to="/products" className="service-link">
                  Learn More <FaArrowRight />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="section about-preview">
        <div className="container">
          <div className="about-grid">
            <div className="about-image scroll-reveal">
              <div className="image-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=500&fit=crop"
                  alt="CSR Industries Manufacturing"
                />
                <div className="image-badge">
                  <FaStar />
                  <span>20+ Years</span>
                </div>
              </div>
            </div>
            <div className="about-content scroll-reveal">
              <h2>About CSR Industries</h2>
              <p className="lead-text">
                Your trusted partner in sugar industry equipment manufacturing
              </p>
              <p>
                CSR Industries is a certified manufacturer and erector of sugar industry equipment,
                serving government, semi-government, and industrial sectors across India.
              </p>
              <p>
                With ISO 9001:2015 and JAS-ANZ certifications, we deliver quality equipment for
                sugar plants, agro-industries, fertilizer companies, cement plants, and power plants.
              </p>
              <div className="features-grid">
                {features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <div className="feature-icon">{feature.icon}</div>
                    <div className="feature-content">
                      <h4>{feature.title}</h4>
                      <p>{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="about-cta">
            <Link to="/about" className="btn btn-primary btn-large">
              Learn More About Us <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="section clients-section">
        <div className="container">
          <h2 className="section-title scroll-reveal">Our Valued Clients</h2>
          <p className="section-subtitle scroll-reveal">
            Trusted by leading companies across India
          </p>
          <div className="clients-grid scroll-reveal">
            {clients.map((client, index) => (
              <div key={index} className="client-logo">
                <div className="client-placeholder">
                  <img src={client.logo} alt={client.name} />
                  <span>{client.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="cta-background"></div>
        <div className="container">
          <div className="cta-content scroll-reveal">
            <FaAward className="cta-icon" />
            <h2>Ready to Start Your Project?</h2>
            <p>Contact us today for quality sugar industry equipment and turnkey solutions</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary btn-large">
                Get Started <FaArrowRight />
              </Link>
              <Link to="/products" className="btn btn-secondary btn-large">
                View Products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
