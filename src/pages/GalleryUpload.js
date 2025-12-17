import React, { useState } from 'react';
import { storage, database } from '../firebase';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ref as dbRef, push, set } from 'firebase/database';
import { FaUpload, FaImage, FaCheckCircle, FaTimes } from 'react-icons/fa';
import './GalleryUpload.css';

const GalleryUpload = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setError('');
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!imageFile || !title || !category) {
      setError('Please fill all fields');
      return;
    }

    setUploading(true);
    setError('');

    try {
      // Upload image to Firebase Storage
      const timestamp = Date.now();
      const fileName = `gallery/${timestamp}_${imageFile.name}`;
      const imageRef = storageRef(storage, fileName);
      
      await uploadBytes(imageRef, imageFile);
      const imageUrl = await getDownloadURL(imageRef);

      // Save to Firebase Database
      const galleryRef = dbRef(database, 'gallery');
      const newGalleryRef = push(galleryRef);
      
      await set(newGalleryRef, {
        title: title,
        category: category,
        imageUrl: imageUrl,
        uploadedAt: timestamp,
        fileName: fileName
      });

      // Reset form
      setImageFile(null);
      setImagePreview(null);
      setTitle('');
      setCategory('');
      setUploading(false);
      setUploadSuccess(true);

      setTimeout(() => {
        setUploadSuccess(false);
      }, 3000);

    } catch (err) {
      console.error('Upload error:', err);
      setError('Failed to upload image. Please try again.');
      setUploading(false);
    }
  };

  return (
    <div className="gallery-upload-page">
      <div className="upload-container">
        <div className="upload-header">
          <FaImage className="header-icon" />
          <h1>Upload Gallery Image</h1>
          <p>Add new images to the gallery</p>
        </div>

        {uploadSuccess && (
          <div className="success-message">
            <FaCheckCircle />
            <p>Image uploaded successfully!</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <FaTimes />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleUpload} className="upload-form">
          <div className="form-group">
            <label>Image Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter image title"
              required
              disabled={uploading}
            />
          </div>

          <div className="form-group">
            <label>Category *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              disabled={uploading}
            >
              <option value="">Select category</option>
              <option value="Boiling House Equipment">Boiling House Equipment</option>
              <option value="Material Handling">Material Handling</option>
              <option value="Process Equipment">Process Equipment</option>
              <option value="Mill House">Mill House</option>
              <option value="Projects">Projects</option>
              <option value="Fabrication">Fabrication</option>
            </select>
          </div>

          <div className="form-group">
            <label>Upload Image *</label>
            <div className="file-upload-area">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                id="image-upload"
                disabled={uploading}
              />
              <label htmlFor="image-upload" className="file-upload-label">
                <FaUpload />
                <span>{imageFile ? imageFile.name : 'Choose an image'}</span>
              </label>
            </div>
          </div>

          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
            </div>
          )}

          <button type="submit" className="upload-btn" disabled={uploading}>
            {uploading ? (
              <>
                <span className="spinner"></span> Uploading...
              </>
            ) : (
              <>
                <FaUpload /> Upload Image
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GalleryUpload;
