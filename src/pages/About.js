import React, { useEffect, useRef } from 'react';
import {
  FaCheckCircle, FaAward, FaUsers, FaIndustry, FaRocket,
  FaEye, FaHeart, FaShieldAlt, FaHandshake, FaChartLine,
  FaStar, FaTrophy, FaCertificate
} from 'react-icons/fa';
import './About.css';

const About = () => {
  const observerRef = useRef(null);

  useEffect(() => {
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

  const stats = [
    { icon: <FaIndustry />, value: '20+', label: 'Years Experience', color: '#0066cc' },
    { icon: <FaUsers />, value: '200+', label: 'Happy Clients', color: '#ff6b35' },
    { icon: <FaTrophy />, value: '500+', label: 'Projects Completed', color: '#28a745' },
    { icon: <FaAward />, value: 'ISO', label: 'Certified Quality', color: '#ffc107' }
  ];

  const values = [
    { icon: <FaShieldAlt />, title: 'Quality Excellence', desc: 'Uncompromising standards in every product' },
    { icon: <FaUsers />, title: 'Customer Focus', desc: 'Your success is our priority' },
    { icon: <FaRocket />, title: 'Innovation', desc: 'Cutting-edge solutions for modern challenges' },
    { icon: <FaHandshake />, title: 'Integrity', desc: 'Honest and transparent business practices' },
    { icon: <FaChartLine />, title: 'Continuous Improvement', desc: 'Always striving for better' },
    { icon: <FaHeart />, title: 'Commitment', desc: 'Dedicated to your satisfaction' }
  ];

  const certifications = [
    {
      icon: <FaCertificate />,
      title: 'ISO 9001:2015',
      desc: 'Quality Management System certification ensuring consistent quality in our manufacturing processes.',
      badge: 'Certified'
    },
    {
      icon: <FaCertificate />,
      title: 'JAS-ANZ',
      desc: 'Joint Accreditation System of Australia and New Zealand accreditation for international standards.',
      badge: 'Accredited'
    }
  ];

  const clientSectors = [
    {
      title: 'Government Sector',
      desc: 'Serving various government sugar mills and industrial projects with reliable equipment and solutions.',
      icon: <FaIndustry />
    },
    {
      title: 'Semi-Government Sector',
      desc: 'Partnering with cooperative sugar factories and public sector undertakings.',
      icon: <FaHandshake />
    },
    {
      title: 'Industrial Sector',
      desc: 'Supporting private sugar mills, agro-industries, and allied manufacturing units.',
      icon: <FaChartLine />
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Header */}
      <section className="about-hero">
        <div className="about-hero-background"></div>
        <div className="container">
          <div className="about-hero-content animate-fadeInUp">
            <h1>About CSR Industries</h1>
            <p className="hero-subtitle">Your Trusted Partner in Sugar Industry Equipment</p>
            <div className="hero-badge">
              <FaStar /> 20+ Years of Excellence
            </div>
          </div>
        </div>
        <div className="hero-wave">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Company Profile */}
      <section className="section company-profile">
        <div className="container">
          <div className="profile-grid">
            <div className="profile-image scroll-reveal">
              <div className="image-frame">
                <img
                  src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&h=500&fit=crop"
                  alt="CSR Industries Factory"
                />
                <div className="image-overlay">
                  <FaIndustry />
                  <span>State-of-the-art Facility</span>
                </div>
              </div>
            </div>
            <div className="profile-content scroll-reveal">
              <h2>Company Profile</h2>
              <p className="lead-text">Building Excellence Since 2000</p>
              <p>
                CSR Industries is a leading certified manufacturer and erector of sugar industry equipment,
                established with a vision to provide high-quality industrial solutions. Located at Plot No. 382,
                Ekta Colony, Sangli, we have been serving the sugar and allied industries with dedication and excellence.
              </p>
              <p>
                Our expertise spans across manufacturing and erecting equipment for sugar plants, agro-industries,
                fertilizer companies, cement plants, and power plants. We pride ourselves on delivering turnkey
                solutions that meet international quality standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section stats-section">
        <div className="container">
          <div className="stats-grid-about">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="stat-card-about scroll-reveal"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="stat-icon-about" style={{ color: stat.color }}>
                  {stat.icon}
                </div>
                <div className="stat-value-about">{stat.value}</div>
                <div className="stat-label-about">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Vision Values */}
      <section className="section mvv-section">
        <div className="container">
          <div className="mvv-grid">
            <div className="mvv-card scroll-reveal">
              <div className="mvv-icon">
                <FaRocket />
              </div>
              <h3>Our Mission</h3>
              <p>
                To provide world-class sugar industry equipment and solutions that enhance operational
                efficiency, ensure safety, and deliver exceptional value to our clients through innovation
                and quality craftsmanship.
              </p>
            </div>
            <div className="mvv-card scroll-reveal">
              <div className="mvv-icon">
                <FaEye />
              </div>
              <h3>Our Vision</h3>
              <p>
                To be the most trusted and preferred manufacturer of sugar industry equipment in India,
                recognized for our commitment to quality, innovation, and customer satisfaction.
              </p>
            </div>
          </div>

          <div className="values-section scroll-reveal">
            <h3 className="values-title">Our Core Values</h3>
            <div className="values-grid">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="value-item"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="value-icon">{value.icon}</div>
                  <h4>{value.title}</h4>
                  <p>{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section certifications-section">
        <div className="container">
          <h2 className="section-title scroll-reveal">Certifications & Quality Standards</h2>
          <p className="section-subtitle scroll-reveal">
            Committed to international quality and safety standards
          </p>
          <div className="cert-grid-about">
            {certifications.map((cert, index) => (
              <div key={index} className="cert-card-about scroll-reveal">
                <div className="cert-badge-top">{cert.badge}</div>
                <div className="cert-icon-about">{cert.icon}</div>
                <h3>{cert.title}</h3>
                <p>{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clientele */}
      <section className="section clientele-section">
        <div className="container">
          <h2 className="section-title scroll-reveal">Our Clientele</h2>
          <p className="section-subtitle scroll-reveal">
            Serving diverse sectors with excellence and reliability
          </p>
          <div className="client-sectors-grid">
            {clientSectors.map((sector, index) => (
              <div key={index} className="client-sector-card scroll-reveal">
                <div className="sector-icon">{sector.icon}</div>
                <h3>{sector.title}</h3>
                <p>{sector.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
