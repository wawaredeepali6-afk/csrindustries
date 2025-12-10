import React, { useState, useEffect, useRef } from 'react';
import { FaTimes, FaSearchPlus, FaImages } from 'react-icons/fa';
import './Gallery.css';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('all');
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

  const galleryImages = [
    { id: 1, title: 'Crystallizer Installation', category: 'projects', url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop' },
    { id: 2, title: 'Evaporator Body', category: 'products', url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop' },
    { id: 3, title: 'Bagasse Handling System', category: 'projects', url: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=400&fit=crop' },
    { id: 4, title: 'Storage Tank Fabrication', category: 'fabrication', url: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=600&h=400&fit=crop' },
    { id: 5, title: 'Mill Rollers', category: 'products', url: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=600&h=400&fit=crop' },
    { id: 6, title: 'Conveyor System', category: 'projects', url: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&h=400&fit=crop' },
    { id: 7, title: 'Pressure Vessel', category: 'fabrication', url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop' },
    { id: 8, title: 'Juice Heater Assembly', category: 'products', url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&h=400&fit=crop' },
    { id: 9, title: 'Complete Plant Setup', category: 'projects', url: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=400&fit=crop' },
    { id: 10, title: 'Heavy Fabrication Work', category: 'fabrication', url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop' },
    { id: 11, title: 'Ash Handling System', category: 'projects', url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop' },
    { id: 12, title: 'Custom Equipment', category: 'products', url: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&h=400&fit=crop' }
  ];

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'projects', name: 'Projects' },
    { id: 'products', name: 'Products' },
    { id: 'fabrication', name: 'Fabrication' }
  ];

  const filteredImages = filter === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === filter);

  return (
    <div className="gallery-page">
      {/* Hero Section */}
      <section className="gallery-hero">
        <div className="gallery-hero-background"></div>
        <div className="container">
          <div className="gallery-hero-content animate-fadeInUp">
            <FaImages className="hero-icon" />
            <h1>Project Gallery</h1>
            <p className="hero-subtitle">Our Work in Action - Excellence Delivered</p>
          </div>
        </div>
        <div className="hero-wave">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section gallery-main">
        <div className="container">
          {/* Category Filter */}
          <div className="gallery-filter scroll-reveal">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`gallery-filter-btn ${filter === cat.id ? 'active' : ''}`}
                onClick={() => setFilter(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="gallery-grid">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className="gallery-item scroll-reveal"
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => setSelectedImage(image)}
              >
                <img src={image.url} alt={image.title} />
                <div className="gallery-overlay">
                  <FaSearchPlus className="zoom-icon" />
                  <h3>{image.title}</h3>
                  <p className="category-badge">{image.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <button className="close-btn" onClick={() => setSelectedImage(null)}>
            <FaTimes />
          </button>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <img src={selectedImage.url} alt={selectedImage.title} />
            <div className="lightbox-info">
              <h3>{selectedImage.title}</h3>
              <p>{selectedImage.category}</p>
            </div>
          </div>
        </div>
      )}

      {/* Notable Projects */}
      <section className="section projects-section">
        <div className="container">
          <h2 className="section-title scroll-reveal">Notable Projects</h2>
          <p className="section-subtitle scroll-reveal">
            Delivering excellence across India
          </p>
          <div className="projects-list">
            <div className="project-item scroll-reveal">
              <div className="project-number">01</div>
              <h3>Sugar Plant Modernization - Maharashtra</h3>
              <p>Complete modernization of boiling house equipment including crystallizers, evaporators, and juice heaters for a 5000 TCD sugar plant.</p>
            </div>
            <div className="project-item scroll-reveal">
              <div className="project-number">02</div>
              <h3>Material Handling System - Karnataka</h3>
              <p>Installation of comprehensive bagasse and ash handling systems with automated controls for improved efficiency.</p>
            </div>
            <div className="project-item scroll-reveal">
              <div className="project-number">03</div>
              <h3>Turnkey Project - Gujarat</h3>
              <p>End-to-end solution for a new sugar plant including design, manufacturing, supply, and commissioning of all major equipment.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
