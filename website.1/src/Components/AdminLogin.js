// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { FiMail, FiLock, FiEye, FiEyeOff, FiShield } from 'react-icons/fi';
// import axios from 'axios';
// import '../Styles/AdminLogin.css';

// const AdminLogin = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [showPassword, setShowPassword] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//     setError('');
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       const response = await axios.post(
//         'http://localhost:8080/api/auth/admin-login',
//         formData,
//         {
//           withCredentials: true,
//           headers: {
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       if (response.data) {
//         // Store admin data in localStorage
//         localStorage.setItem('userRole', response.data.role);
//         localStorage.setItem('userName', response.data.name);
//         localStorage.setItem('userEmail', response.data.email);
//         localStorage.setItem('userId', response.data.userId);
//         localStorage.setItem('userPhone', response.data.phone);
//         localStorage.setItem('userImage', response.data.imageData);

//         // Navigate to admin dashboard
//         setTimeout(() => {
//           navigate('/admin/dashboard');
//           window.location.reload();
//         }, 100);
//       }
//     } catch (err) {
//       console.error('Admin login error:', err);
//       setError(err.response?.data?.error || 'Admin login failed. Please check your credentials.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="mm-login-container">
//       <div className="mm-login-card">
//         {/* Logo and Brand Name Section */}
//         <div className="mm-brand-section">
//           <img src="/Logoo.png" alt="MomentumMerge Logo" className="mm-main-logo" />
//           <h1 className="mm-company-name">MomentumMerge</h1>
//         </div>

//         <h2 className="mm-login-title">Admin Login</h2>
//         <p className="mm-login-subtitle">Access your admin dashboard</p>

//         <div className="mm-role-indicator">
//           <div className="mm-admin-indicator">
//             <FiShield className="mm-tab-icon" />
//             Administrator Access
//           </div>
//         </div>

//         {error && <div className="mm-error-message">{error}</div>}

//         <form className="mm-login-form" onSubmit={handleSubmit}>
//           <div className="mm-form-group">
//             <label>Email Address</label>
//             <div className="mm-input-wrapper">
//               <FiMail className="mm-input-icon" />
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="admin@momentummerge.com"
//                 required
//               />
//             </div>
//           </div>

//           <div className="mm-form-group">
//             <label>Password</label>
//             <div className="mm-input-wrapper">
//               <FiLock className="mm-input-icon" />
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="••••••••"
//                 required
//               />
//               <button 
//                 type="button" 
//                 className="mm-password-toggle"
//                 onClick={togglePasswordVisibility}
//               >
//                 {showPassword ? <FiEye /> : <FiEyeOff />}
//               </button>
//             </div>
//           </div>

//           <button type="submit" className="mm-login-btn" disabled={loading}>
//             {loading ? 'Logging in...' : 'Login as Admin'}
//           </button>
//         </form>

//         <div className="mm-footer-links">
//           <Link to="/" className="mm-footer-link">← Back to Home</Link>
//           <Link to="/recruiter-login" className="mm-footer-link">Recruiter Login →</Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;