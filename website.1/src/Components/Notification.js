// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';
// // import { FaBell, FaTimes, FaCheckCircle, FaTimesCircle, FaInfoCircle, FaClock } from 'react-icons/fa';
// // import '../Styles/Notification.css';

// // const Notification = () => {
// //   const [notifications, setNotifications] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchNotifications = async () => {
// //       try {
// //         const userEmail = localStorage.getItem('registeredEmail');
// //         if (!userEmail) {
// //           navigate('/login');
// //           return;
// //         }

// //         const response = await axios.get(`http://localhost:8080/api/applications/user/${userEmail}`);
// //         const appsWithNotifications = response.data.filter(app => app.notification);
        
// //         // Sort by appliedDate (newest first)
// //         const sortedNotifications = appsWithNotifications.sort((a, b) => 
// //           new Date(b.appliedDate) - new Date(a.appliedDate)
// //         );
        
// //         setNotifications(sortedNotifications);
// //       } catch (err) {
// //         console.error('Error fetching notifications:', err);
// //         setError('Failed to load notifications. Please try again later.');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchNotifications();
// //   }, [navigate]);

// //   const getStatusIcon = (status) => {
// //     switch (status) {
// //       case 'Resume Shortlisted':
// //         return <FaCheckCircle className="icon shortlisted" />;
// //       case 'Interview':
// //         return <FaInfoCircle className="icon interview" />;
// //       case 'Hired':
// //         return <FaCheckCircle className="icon hired" />;
// //       case 'Rejected':
// //         return <FaTimesCircle className="icon rejected" />;
// //       default:
// //         return <FaClock className="icon pending" />;
// //     }
// //   };

// //   const formatDate = (dateString) => {
// //     const options = { 
// //       year: 'numeric', 
// //       month: 'short', 
// //       day: 'numeric',
// //       hour: '2-digit',
// //       minute: '2-digit'
// //     };
// //     return new Date(dateString).toLocaleDateString('en-US', options);
// //   };

// //   if (loading) {
// //     return (
// //       <div className="notification-container">
// //         <div className="notification-header">
// //           <h2>Loading notifications...</h2>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="notification-container">
// //         <div className="notification-header">
// //           <h2>Notifications</h2>
// //         </div>
// //         <div className="error-message">{error}</div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="notification-container">
// //       <div className="notification-header">
// //         <h2>
// //           <FaBell className="header-icon" /> Notifications
// //         </h2>
// //         <span className="notification-count">{notifications.length}</span>
// //       </div>

// //       {notifications.length === 0 ? (
// //         <div className="no-notifications">
// //           <p>You don't have any notifications yet.</p>
// //           <p>Your application status updates will appear here.</p>
// //         </div>
// //       ) : (
// //         <div className="notifications-list">
// //           {notifications.map((notification) => (
// //             <div key={notification.id} className={`notification-item ${notification.status.toLowerCase()}`}>
// //               <div className="notification-icon">
// //                 {getStatusIcon(notification.status)}
// //               </div>
// //               <div className="notification-content">
// //                 <h4>{notification.notification}</h4>
// //                 <p className="job-info">
// //                   {notification.jobTitle} at {notification.companyName}
// //                 </p>
// //                 <p className="notification-date">
// //                   {formatDate(notification.appliedDate)}
// //                 </p>
// //                 {notification.rejectionReason && notification.status === 'Rejected' && (
// //                   <p className="rejection-reason">
// //                     <strong>Reason:</strong> {notification.rejectionReason}
// //                   </p>
// //                 )}
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Notification;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { FaBell, FaTimes, FaCheckCircle, FaTimesCircle, FaInfoCircle, FaClock, FaCheck } from 'react-icons/fa';
// import '../Styles/Notification.css';

// const Notification = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const userEmail = localStorage.getItem('registeredEmail');
//         if (!userEmail) {
//           navigate('/login');
//           return;
//         }

//         const response = await axios.get(`http://localhost:8080/api/applications/user/${userEmail}`);
//         const appsWithNotifications = response.data.filter(app => app.notification);
        
//         const sortedNotifications = appsWithNotifications.sort((a, b) => 
//           new Date(b.appliedDate) - new Date(a.appliedDate)
//         );
        
//         const unread = sortedNotifications.filter(n => !n.isRead).length;
        
//         setNotifications(sortedNotifications);
//         setUnreadCount(unread);
//         localStorage.setItem('unreadNotifications', unread);
//       } catch (err) {
//         console.error('Error fetching notifications:', err);
//         setError('Failed to load notifications. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNotifications();
//   }, [navigate]);

//   const markAsRead = async (id) => {
//     try {
//       const updatedNotifications = notifications.map(notification => 
//         notification.id === id ? { ...notification, isRead: true } : notification
//       );
      
//       setNotifications(updatedNotifications);
//       setUnreadCount(prev => prev - 1);
//       localStorage.setItem('unreadNotifications', unreadCount - 1);
      
//       await axios.patch(`http://localhost:8080/api/applications/mark-read/${id}`);
//     } catch (err) {
//       console.error('Error marking notification as read:', err);
//     }
//   };

//   const markAllAsRead = async () => {
//     try {
//       const updatedNotifications = notifications.map(notification => 
//         ({ ...notification, isRead: true })
//       );
      
//       setNotifications(updatedNotifications);
//       setUnreadCount(0);
//       localStorage.setItem('unreadNotifications', 0);
      
//       const userEmail = localStorage.getItem('registeredEmail');
//       await axios.patch(`http://localhost:8080/api/applications/mark-all-read/${userEmail}`);
//     } catch (err) {
//       console.error('Error marking all notifications as read:', err);
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'Resume Shortlisted':
//         return <FaCheckCircle className="icon shortlisted" />;
//       case 'Interview':
//         return <FaInfoCircle className="icon interview" />;
//       case 'Hired':
//         return <FaCheckCircle className="icon hired" />;
//       case 'Rejected':
//         return <FaTimesCircle className="icon rejected" />;
//       default:
//         return <FaClock className="icon pending" />;
//     }
//   };

//   const formatDate = (dateString) => {
//     const options = { 
//       year: 'numeric', 
//       month: 'short', 
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     };
//     return new Date(dateString).toLocaleDateString('en-US', options);
//   };

//   if (loading) {
//     return (
//       <div className="notification-container">
//         <div className="notification-header">
//           <h2>Loading notifications...</h2>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="notification-container">
//         <div className="notification-header">
//           <h2>Notifications</h2>
//         </div>
//         <div className="error-message">{error}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="notification-container">
//       <div className="notification-header">
//         <h2>
//           <FaBell className="header-icon" /> Notifications
//           {unreadCount > 0 && (
//             <span className="notification-count">{unreadCount}</span>
//           )}
//         </h2>
//         {notifications.length > 0 && (
//           <button onClick={markAllAsRead} className="mark-all-read">
//             <FaCheck /> Mark all as read
//           </button>
//         )}
//       </div>

//       {notifications.length === 0 ? (
//         <div className="no-notifications">
//           <p>You don't have any notifications yet.</p>
//           <p>Your application status updates will appear here.</p>
//         </div>
//       ) : (
//         <div className="notifications-list">
//           {notifications.map((notification) => (
//             <div 
//               key={notification.id} 
//               className={`notification-item ${notification.status.toLowerCase()} ${notification.isRead ? 'read' : ''}`}
//             >
//               <div className="notification-icon">
//                 {getStatusIcon(notification.status)}
//                 {!notification.isRead && <div className="unread-dot"></div>}
//               </div>
//               <div className="notification-content">
//                 <h4>{notification.notification}</h4>
//                 <p className="job-info">
//                   {notification.jobTitle} at {notification.companyName}
//                 </p>
//                 <p className="notification-date">
//                   {formatDate(notification.appliedDate)}
//                 </p>
//                 {notification.rejectionReason && notification.status === 'Rejected' && (
//                   <p className="rejection-reason">
//                     <strong>Reason:</strong> {notification.rejectionReason}
//                   </p>
//                 )}
//                 <button 
//                   onClick={() => markAsRead(notification.id)} 
//                   className="mark-read-btn"
//                 >
//                   <FaCheck /> Mark as read
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Notification;



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

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const userEmail = localStorage.getItem('registeredEmail');
        if (!userEmail) {
          navigate('/login');
          return;
        }

        const response = await axios.get(`http://localhost:8080/api/applications/user/${userEmail}`);
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
      
      await axios.patch(`http://localhost:8080/api/applications/mark-read/${id}`);
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
      await axios.patch(`http://localhost:8080/api/applications/mark-all-read/${userEmail}`);
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