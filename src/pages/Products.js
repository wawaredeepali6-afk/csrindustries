import React, { useState, useEffect, useRef } from 'react';
import { FaDownload, FaArrowRight, FaCheckCircle, FaCog, FaIndustry, FaTruck, FaTools } from 'react-icons/fa';
import './Products.css';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
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

  const products = [
    {
      category: 'boiling',
      name: 'Crystallizer',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
      description: 'High-efficiency crystallizers for sugar production with optimal heat transfer.',
      specs: ['Capacity: 50-500 TPD', 'Material: SS304/316', 'Automatic control']
    },
    {
      category: 'boiling',
      name: 'Juice Heater',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop',
      description: 'Multi-stage juice heaters for efficient heating and energy conservation.',
      specs: ['Multiple stages', 'Energy efficient', 'Easy maintenance']
    },
    {
      category: 'boiling',
      name: 'Evaporator Body',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop',
      description: 'Robust evaporator bodies designed for continuous operation.',
      specs: ['High capacity', 'Corrosion resistant', 'Long service life']
    },
    {
      category: 'material',
      name: 'Bagasse Handling System',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&h=300&fit=crop',
      description: 'Complete bagasse handling solutions from mill to boiler.',
      specs: ['Automated system', 'Dust control', 'High reliability']
    },
    {
      category: 'material',
      name: 'Ash Handling System',
      image: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=400&h=300&fit=crop',
      description: 'Efficient ash handling and disposal systems for power plants.',
      specs: ['Pneumatic/Mechanical', 'Eco-friendly', 'Low maintenance']
    },
    {
      category: 'material',
      name: 'Belt Conveyor',
      image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=400&h=300&fit=crop',
      description: 'Heavy-duty belt conveyors for material transportation.',
      specs: ['Various capacities', 'Durable construction', 'Custom lengths']
    },
    {
      category: 'process',
      name: 'Storage Tanks',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop',
      description: 'Large capacity storage tanks for juice, syrup, and molasses.',
      specs: ['10,000-100,000 liters', 'SS/MS construction', 'Insulated options']
    },
    {
      category: 'process',
      name: 'Pressure Vessels',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop',
      description: 'IBR approved pressure vessels for various applications.',
      specs: ['IBR certified', 'Custom design', 'Safety tested']
    },
    {
      category: 'mill',
      name: 'Mill Rollers',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
      description: 'High-quality mill rollers for efficient cane crushing.',
      specs: ['Hardened surface', 'Precision machined', 'Long life']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products', icon: <FaCog /> },
    { id: 'boiling', name: 'Boiling House', icon: <FaIndustry /> },
    { id: 'material', name: 'Material Handling', icon: <FaTruck /> },
    { id: 'process', name: 'Process & Storage', icon: <FaCog /> },
    { id: 'mill', name: 'Mill House', icon: <FaTools /> }
  ];

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const turnkeyFeatures = [
    { title: 'Design & Engineering', desc: 'Custom solutions tailored to your requirements', icon: <FaCog /> },
    { title: 'Manufacturing', desc: 'In-house fabrication with quality control', icon: <FaIndustry /> },
    { title: 'Installation', desc: 'Professional erection and commissioning', icon: <FaTools /> },
    { title: 'After Sales', desc: 'Maintenance and spare parts support', icon: <FaCheckCircle /> }
  ];

  return (
    <div className="products-page">
      {/* Hero Section */}
      <section className="products-hero">
        <div className="products-hero-background"></div>
        <div className="container">
          <div className="products-hero-content animate-fadeInUp">
            <h1>Our Products & Services</h1>
            <p className="hero-subtitle">Quality Equipment for Sugar Industry Excellence</p>
          </div>
        </div>
        <div className="hero-wave">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Products Section */}
      <section className="section products-main">
        <div className="container">
          {/* Category Filter */}
          <div className="category-filter scroll-reveal">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <span className="filter-icon">{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="products-grid">
            {filteredProducts.map((product, index) => (
              <div
                key={index}
                className="product-card scroll-reveal"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  <div className="product-overlay">
                    <button className="btn-view">View Details</button>
                  </div>
                </div>
                <div className="product-content">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <ul className="specs-list">
                    {product.specs.map((spec, i) => (
                      <li key={i}>
                        <FaCheckCircle /> {spec}
                      </li>
                    ))}
                  </ul>
                  <button className="btn-download-product">
                    <FaDownload /> Download Brochure
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Turnkey Projects */}
      <section className="section turnkey-section">
        <div className="container">
          <h2 className="section-title scroll-reveal">Turnkey Projects</h2>
          <p className="section-subtitle scroll-reveal">
            Complete end-to-end solutions for your sugar plant
          </p>
          <div className="turnkey-content scroll-reveal">
            <p className="turnkey-intro">
              We offer complete turnkey solutions for sugar plants including design, manufacturing,
              supply, erection, and commissioning of equipment. Our experienced team ensures seamless
              project execution from concept to completion.
            </p>
          </div>
          <div className="turnkey-features">
            {turnkeyFeatures.map((feature, index) => (
              <div
                key={index}
                className="turnkey-feature-card scroll-reveal"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="turnkey-icon">{feature.icon}</div>
                <h4>{feature.title}</h4>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section products-cta">
        <div className="cta-background"></div>
        <div className="container">
          <div className="cta-content scroll-reveal">
            <h2>Need a Custom Solution?</h2>
            <p>Contact us for tailored equipment and turnkey project solutions</p>
            <button className="btn btn-primary btn-large">
              Get Quote <FaArrowRight />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
