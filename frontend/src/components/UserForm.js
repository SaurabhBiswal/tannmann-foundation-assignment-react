import React, { useState } from 'react';
import axios from 'axios';
import './UserForm.css';

const UserForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setMessage({ text: 'Please enter your name', type: 'error' });
      return false;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      setMessage({ text: 'Please enter a valid 10-digit phone number', type: 'error' });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage({ text: 'Please enter a valid email address', type: 'error' });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const response = await axios.post(`${API_URL}/users`, formData);
      setMessage({ text: 'Details submitted successfully!', type: 'success' });
      setFormData({ name: '', phone: '', email: '' });
      onSuccess();
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || 'Failed to submit details',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter 10-digit phone number"
            required
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
            placeholder="Enter your email"
            required
          />
        </div>

        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <button
          type="submit"
          className="submit-btn"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit Details'}
        </button>
      </form>
    </div>
  );
};

export default UserForm;