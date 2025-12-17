import React, { useState, useEffect } from 'react';
import { FaTimes, FaImages } from 'react-icons/fa';

import { database } from '../firebase';
import { ref, onValue } from 'firebase/database';
import './Gallery.css';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch gallery images from Firebase
  useEffect(() => {
    const galleryRef = ref(database, 'gallery');

    const unsubscribe = onValue(galleryRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const imagesArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        // Sort by upload date (newest first)
        imagesArray.sort((a, b) => b.uploadedAt - a.uploadedAt);
        setGalleryImages(imagesArray);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);



  if (loading) {
    return (
      <div className="gallery-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="gallery-page">
      {/* Hero Section */}
      <section className="gallery-hero">

        <div className="container">
          <div className="gallery-hero-content animate-fadeInUp">
            <h1>Project Gallery</h1>
            <p className="hero-subtitle">Our Manufacturing Excellence & Completed Projects</p>
            <div className="hero-badge">
              <FaImages /> Visual Tour
            </div>
          </div>
        </div>
        <div className="hero-wave">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white" />
          </svg>
        </div>
      </section>

      {galleryImages.length === 0 ? (
        <section className="gallery-section">
          <div className="container">
            <div className="empty-gallery">
              <FaImages className="empty-icon" />
              <h2>No Images Yet</h2>
              <p>Gallery is empty. Upload images from admin dashboard.</p>
            </div>
          </div>
        </section>
      ) : (
        <section className="gallery-section">
          <div className="gallery-grid">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className="gallery-card"
                onClick={() => setSelectedImage(image)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="gallery-card-image">
                  <img src={image.imageUrl} alt={image.title} />
                </div>
                <div className="gallery-card-details">
                  <h3>{image.title}</h3>
                  <p>{image.category}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Lightbox */}
      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <button className="close-btn" onClick={() => setSelectedImage(null)}>
            <FaTimes />
          </button>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <img src={selectedImage.imageUrl} alt={selectedImage.title} />
            <div className="lightbox-info">
              <h3>{selectedImage.title}</h3>
              <p>{selectedImage.category}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
