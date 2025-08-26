import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, User, AtSign, Sparkles, Zap } from 'lucide-react';
import '../Styles/Contact.css';
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    alert("Message sent successfully! We'll get back to you soon.");
    setFormData({ name: '', email: '', phone: '' });
    setIsSubmitting(false);
  };
  return (
    <div className="contact-universe">
      <div className="floating-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
        <div className="orb orb-4"></div>
      </div>
      <div className="contact-container">
        <div className="hero-section">
          <div className="hero-content">
            <div className="sparkle-icon" style={{marginTop:"30px"}} >
              <Sparkles size={32} />
            </div>
            <h1 className="hero-title">
              Let's Create <span className="gradient-text">Something Amazing</span>
            </h1>
            <p className="hero-subtitle">
              Ready to transform your vision into reality? Drop us a line and let's start building the future together.
            </p>
          </div>
        </div>
        <div className="content-grid">
          <div className="info-cards">
            <div className="info-card card-primary">
              <div className="card-icon"><MapPin size={24} /></div>
              <div className="card-content">
                <h3>Visit Us</h3>
                <p>Novel Office, Marathahalli<br />Bangalore, India</p>
              </div>
            </div>
            <div className="info-card card-secondary">
              <div className="card-icon"><Phone size={24} /></div>
              <div className="card-content">
                <h3>Call Us</h3>
                <p>+91 98765 43210</p>
              </div>
            </div>
            <div className="info-card card-tertiary">
              <div className="card-icon"><Mail size={24} /></div>
              <div className="card-content">
                <h3>Email Us</h3>
                <p>contact@momentummerge.com</p>
              </div>
            </div>
          </div>
          <div className="map-wrapper">
            <div className="map-header">
              <Zap size={20} />
              <span>Find Us Here</span>
            </div>
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.032139140371!2d77.6999874!3d12.9567656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae13cb219a80cd%3A0x7494abfd3b92529e!2sMomentumMerge%20Consultancy%20Services%20Pvt%2C%20Ltd.!5e0!3m2!1sen!2sin!4v1713805898017!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="MomentumMerge Location"
              />
            </div>
          </div>
          <div className="form-wrapper">
            <div className="form-header">
              <h2 className="form-title">Get In Touch</h2>
              <p className="form-description">Tell us about your project and let's make magic happen</p>
            </div>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className={`form-field ${focusedField === 'name' ? 'focused' : ''}`}>
                <div className="field-icon"><User size={18} /></div>
                <div className="field-content">
                  <label className="field-label">What should we call you?</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="field-input"
                    placeholder="Your awesome name"
                  />
                </div>
              </div>
              <div className={`form-field ${focusedField === 'email' ? 'focused' : ''}`}>
                <div className="field-icon"><AtSign size={18} /></div>
                <div className="field-content">
                  <label className="field-label">Where can we reach you?</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="field-input"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              <div className={`form-field ${focusedField === 'phone' ? 'focused' : ''}`}>
                <div className="field-icon"><Phone size={18} /></div>
                <div className="field-content">
                  <label className="field-label">Your contact number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="field-input"
                    placeholder="your contact number"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
              >
                <div className="btn-content">
                  {isSubmitting ? (
                    <>
                      <div className="loading-spinner"></div>
                      <span>Sending Magic...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Send Message</span>
                      <div className="btn-glow"></div>
                    </>
                  )}
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contact;