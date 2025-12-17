import React, { useState } from 'react';
import { database } from '../firebase';
import { ref, remove } from 'firebase/database';
import { FaTrash, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import './GalleryUpload.css';

const ClearGallery = () => {
  const [clearing, setClearing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [confirmText, setConfirmText] = useState('');

  const handleClearGallery = async (e) => {
    e.preventDefault();
    
    if (confirmText !== 'DELETE') {
      setError('Please type DELETE to confirm');
      return;
    }

    setClearing(true);
    setError('');

    try {
      const galleryRef = ref(database, 'gallery');
      await remove(galleryRef);
      
      setSuccess(true);
      setConfirmText('');
      setClearing(false);

      setTimeout(() => {
        setSuccess(false);
      }, 3000);

    } catch (err) {
      console.error('Clear error:', err);
      setError('Failed to clear gallery. Please try again.');
      setClearing(false);
    }
  };

  return (
    <div className="gallery-upload-page">
      <div className="upload-container">
        <div className="upload-header">
          <FaTrash className="header-icon" style={{ color: '#dc3545' }} />
          <h1>Clear Gallery</h1>
          <p>Remove all images from gallery</p>
        </div>

        {success && (
          <div className="success-message">
            <FaCheckCircle />
            <p>Gallery cleared successfully!</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <FaExclamationTriangle />
            <p>{error}</p>
          </div>
        )}

        <div className="error-message" style={{ marginBottom: '2rem' }}>
          <FaExclamationTriangle />
          <p><strong>Warning:</strong> This will permanently delete all gallery images from the database. This action cannot be undone!</p>
        </div>

        <form onSubmit={handleClearGallery} className="upload-form">
          <div className="form-group">
            <label>Type "DELETE" to confirm *</label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="Type DELETE"
              required
              disabled={clearing}
            />
          </div>

          <button 
            type="submit" 
            className="upload-btn" 
            disabled={clearing || confirmText !== 'DELETE'}
            style={{ background: 'linear-gradient(135deg, #dc3545, #c82333)' }}
          >
            {clearing ? (
              <>
                <span className="spinner"></span> Clearing...
              </>
            ) : (
              <>
                <FaTrash /> Clear All Gallery Images
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClearGallery;
