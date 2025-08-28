


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaBell, FaTimes, FaCheckCircle, FaTimesCircle, FaInfoCircle, FaClock, FaCheck } from 'react-icons/fa';
import '../Styles/Notification.css';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const API_BASE = process.env.REACT_APP_API_BASE_URL;


  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const userEmail = localStorage.getItem('registeredEmail');
        if (!userEmail) {
          navigate('/login');
          return;
        }

        const response = await axios.get(`${API_BASE}/api/applications/user/${userEmail}`);
        const appsWithNotifications = response.data.filter(app => app.notification);
        
        const sortedNotifications = appsWithNotifications.sort((a, b) => 
          new Date(b.appliedDate) - new Date(a.appliedDate)
        );
        
        const unread = sortedNotifications.filter(n => !n.isRead).length;
        
        setNotifications(sortedNotifications);
        setUnreadCount(unread);
        localStorage.setItem('unreadNotifications', unread);
      } catch (err) {
        console.error('Error fetching notifications:', err);
        setError('Failed to load notifications. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [navigate]);

  const markAsRead = async (id) => {
    try {
      const updatedNotifications = notifications.map(notification => 
        notification.id === id ? { ...notification, isRead: true } : notification
      );
      
      setNotifications(updatedNotifications);
      setUnreadCount(prev => prev - 1);
      localStorage.setItem('unreadNotifications', unreadCount - 1);
      
      await axios.patch(`${API_BASE}/api/applications/mark-read/${id}`);
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  const markAllAsRead = async () => {
    try {
      const updatedNotifications = notifications.map(notification => 
        ({ ...notification, isRead: true })
      );
      
      setNotifications(updatedNotifications);
      setUnreadCount(0);
      localStorage.setItem('unreadNotifications', 0);
      
      const userEmail = localStorage.getItem('registeredEmail');
      await axios.patch(`${API_BASE}/api/applications/mark-all-read/${userEmail}`);
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Resume Shortlisted':
        return <FaCheckCircle className="notif-icon notif-shortlisted" />;
      case 'Interview':
        return <FaInfoCircle className="notif-icon notif-interview" />;
      case 'Hired':
        return <FaCheckCircle className="notif-icon notif-hired" />;
      case 'Rejected':
        return <FaTimesCircle className="notif-icon notif-rejected" />;
      default:
        return <FaClock className="notif-icon notif-pending" />;
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (loading) {
    return (
      <div className="notif-container">
        <div className="notif-header">
          <h2>Loading notifications...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="notif-container">
        <div className="notif-header">
          <h2>Notifications</h2>
        </div>
        <div className="notif-error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="notif-container">
      <div className="notif-header">
        <h2>
          <FaBell className="notif-header-icon" /> Notifications
          {unreadCount > 0 && (
            <span className="notif-count">{unreadCount}</span>
          )}
        </h2>
        {notifications.length > 0 && (
          <button onClick={markAllAsRead} className="notif-mark-all-read">
            <FaCheck /> Mark all as read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="notif-empty">
          <p>You don't have any notifications yet.</p>
          <p>Your application status updates will appear here.</p>
        </div>
      ) : (
        <div className="notif-list">
          {notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`notif-item ${notification.status.toLowerCase()} ${notification.isRead ? 'notif-read' : ''}`}
            >
              <div className="notif-icon-container">
                {getStatusIcon(notification.status)}
                {/* {!notification.isRead && <div className="notif-unread-dot"></div>} */}
              </div>
              <div className="notif-content">
                <h4>{notification.notification}</h4>
                <p className="notif-job-info">
                  {notification.jobTitle} at {notification.companyName}
                </p>
                <p className="notif-date">
                  {formatDate(notification.appliedDate)}
                </p>
                {notification.rejectionReason && notification.status === 'Rejected' && (
                  <p className="notif-rejection-reason">
                    <strong>Reason:</strong> {notification.rejectionReason}
                  </p>
                )}
                <button 
                  onClick={() => markAsRead(notification.id)} 
                  className="notif-mark-read-btn"
                >
                  <FaCheck /> Mark as read
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notification;