
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Upload, Camera, X } from 'lucide-react';
import '../Styles/AddRecruiter.css';

const AddRecruiter = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({
    recruiterId: '',
    name: '',
    email: '',
    phone: '',
    password: '',
    imageData: ''
  });
  const [previewImage, setPreviewImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    console.log('Current user role:', userRole); // Debug log
    
    if (userRole !== 'ADMIN') {
      console.log('Access denied, redirecting to login'); // Debug log
      navigate('/recruiter-login');
    } else {
      console.log('Admin access granted'); // Debug log
      setIsAdmin(true);
    }
  }, [navigate]);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (2MB = 2 * 1024 * 1024 bytes)
      if (file.size > 2 * 1024 * 1024) {
        setError('Image size should be less than 2MB');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData({
          ...formData,
          imageData: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setPreviewImage('');
    setFormData({
      ...formData,
      imageData: ''
    });
    // Reset the file input
    const fileInput = document.getElementById('image-upload');
    if (fileInput) {
      fileInput.value = '';
    }
  };
  
  const validateForm = () => {
    if (!formData.recruiterId.trim()) {
      setError('Recruiter ID is required');
      return false;
    }
    
    if (formData.recruiterId.trim().length < 3) {
      setError('Recruiter ID must be at least 3 characters long');
      return false;
    }
    
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    
    if (formData.name.trim().length < 2) {
      setError('Name must be at least 2 characters long');
      return false;
    }
    
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setError('Valid email is required');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    if (!formData.phone.trim()) {
      setError('Phone number is required');
      return false;
    }
    
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      setError('Phone number must be 10 digits');
      return false;
    }
    
    if (formData.password && formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      console.log('Sending recruiter data:', formData); // Debug log
      
      const API_BASE = process.env.REACT_APP_API_BASE_URL;

      const response = await fetch(`${API_BASE}/api/recruiters/add`, {

        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Failed to add recruiter');
      }
      
      const responseData = await response.json();
      console.log('Response received:', responseData); // Debug log
      
      setSuccess(true);
      setFormData({
        recruiterId: '',
        name: '',
        email: '',
        phone: '',
        password: '',
        imageData: ''
      });
      setPreviewImage('');
      
      setTimeout(() => {
        navigate('/recruiter-dashboard');
      }, 3000);
      
    } catch (err) {
      console.error('Full error:', err);
      setError(err.message || 'Failed to add recruiter. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  if (!isAdmin) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Checking permissions...</p>
      </div>
    );
  }
  
  return (
    <div className="add-recruiter-container">
      <div className="add-recruiter-card">
        <div className="card-header">
          <h2>Add New Recruiter</h2>
          <p>Create a new recruiter account with access to the dashboard</p>
        </div>
        
        {success && (
          <div className="success-message">
            <span>Recruiter added successfully! Login credentials have been sent via email.</span>
          </div>
        )}
        
        {error && (
          <div className="error-message">
            <span>{error}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="recruiter-form">
          <div className="image-upload-section">
            <div className="image-upload-container">
              <div className="image-preview-wrapper">
                {previewImage ? (
                  <div className="image-preview-container">
                    <img src={previewImage} alt="Recruiter Preview" className="preview-img" />
                    <button 
                      type="button" 
                      className="remove-image-btn"
                      onClick={removeImage}
                      title="Remove image"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="upload-placeholder" onClick={() => document.getElementById('image-upload').click()}>
                    <div className="upload-icon">
                      <Camera size={32} />
                    </div>
                    <div className="upload-text">
                      <p>Upload Profile Photo</p>
                      <span>Click to select image</span>
                    </div>
                  </div>
                )}
              </div>
              
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
              
              <div className="upload-actions">
                <button 
                  type="button" 
                  className="upload-button"
                  onClick={() => document.getElementById('image-upload').click()}
                >
                  <Upload size={16} />
                  {previewImage ? 'Change Image' : 'Choose Image'}
                </button>
                {previewImage && (
                  <button 
                    type="button" 
                    className="remove-button"
                    onClick={removeImage}
                  >
                    <X size={16} />
                    Remove
                  </button>
                )}
              </div>
              
              <div className="upload-info">
                <small className="helper-text">Recommended: 400x400px, Max 2MB</small>
                <small className="helper-text">Supported formats: JPG, PNG, GIF</small>
              </div>
            </div>
          </div>
          
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="recruiterId">Recruiter ID *</label>
              <input
                type="text"
                id="recruiterId"
                name="recruiterId"
                value={formData.recruiterId}
                onChange={handleChange}
                required
                placeholder="MM-1234"
                className="form-input"
                maxLength="7"
              />
              <small className="helper-text">Enter unique ID in the format (MM-1234)</small>
              {/* <small className="helper-text">This will be used for login and identification</small> */}
            </div>
            
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter recruiter's full name"
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter recruiter's email address"
                className="form-input"
              />
              <small className="helper-text">Login credentials will be sent to this email</small>
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Enter 10-digit phone number"
                className="form-input"
                maxLength="10"
              />
            </div>
            
            <div className="form-group full-width">
              <label htmlFor="password">Initial Password (Optional)</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Leave blank to auto-generate"
                className="form-input"
                minLength="6"
              />
              <small className="helper-text">If left blank, a secure password will be generated automatically</small>
            </div>
          </div>
          
          <div className="form-actions">
            <button 
              type="submit" 
              className="submit-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="button-spinner"></div>
                  Adding Recruiter...
                </>
              ) : (
                <>
                  <User size={16} />
                  Add Recruiter
                </>
              )}
            </button>
            <button 
              type="button" 
              className="cancel-button"
              onClick={() => navigate('/recruiter-dashboard')}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecruiter;
