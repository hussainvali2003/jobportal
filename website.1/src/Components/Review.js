
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/Review.css';

const ReviewComponent = () => {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [showModal, setShowModal] = useState(false); // NEW

    const API_BASE = process.env.REACT_APP_API_BASE_URL;

  const fetchAllReviews = async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/reviews`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching all reviews:', error);
    }
  };

  useEffect(() => {
    fetchAllReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem('registeredEmail');
    if (!email) return alert('Email is required. Please log in.');

    try {
      await axios.post(`${API_BASE}/api/reviews/${email}`, {
        name,
        rating,
        description,
      });
      setName('');
      setRating(0);
      setDescription('');
      setShowModal(false); // CLOSE MODAL
      fetchAllReviews();
    } catch (error) {
      alert(error.response?.data || 'Error saving review');
    }
  };

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : 0;

  return (
    <div className="review-container">
      <div className="review-header">
        <h2>Thousands of Raving Customers</h2>
        <div className="review-header-right">
          <span>⭐ {averageRating} rating of {reviews.length} reviews</span>
          <button className="review-btn" onClick={() => setShowModal(true)}>
            Give a Review
          </button>
        </div>
      </div>

      <div className="review-carousel-wrapper">
        <div className="review-carousel-track">
          {[...reviews, ...reviews].map((review, idx) => (
            <div className="review-card" key={idx}>
              <div className="review-top">
                <img
                  src={`https://ui-avatars.com/api/?name=${review.name}`}
                  alt="avatar"
                  className="avatar"
                />
                <div>
                  <h4>{review.name}</h4>
                  <span className="review-date">{new Date().toLocaleDateString()}</span>
                </div>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  alt="Google"
                  className="google-logo"
                />
              </div>
              <div className="review-stars">
                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
              </div>
              <p className="review-text">{review.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            <form className="review-form" onSubmit={handleSubmit}>
              <h3>Submit Your Review</h3>

              <input
                type="text"
                placeholder="Your Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <div className="star-rating">
                {[...Array(5)].map((_, index) => {
                  const starValue = index + 1;
                  return (
                    <label key={index}>
                      <input
                        type="radio"
                        name="rating"
                        value={starValue}
                        onClick={() => setRating(starValue)}
                        style={{ display: 'none' }}
                      />
                      <span
                        className="star"
                        onMouseEnter={() => setHover(starValue)}
                        onMouseLeave={() => setHover(0)}
                        style={{
                          color: starValue <= (hover || rating) ? '#ffc107' : '#e4e5e9',
                          fontSize: '28px',
                          cursor: 'pointer',
                        }}
                      >
                        ★
                      </span>
                    </label>
                  );
                })}
              </div>

              <textarea
                rows="4"
                placeholder="Your Review"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewComponent;
