
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser, FiShield } from 'react-icons/fi';
import axios from 'axios';
import '../Styles/RecruiterLogin.css';

const RecruiterLogin = () => {
    const navigate = useNavigate();
  const [loginType, setLoginType] = useState('recruiter');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = loginType === 'admin' ? '/api/auth/admin-login' : '/api/auth/recruiter-login';
      
      const response = await axios.post(
        `http://localhost:8080${endpoint}`,
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data) {
        // Store user data in localStorage
        localStorage.setItem('userRole', response.data.role);
        localStorage.setItem('userName', response.data.name);
        localStorage.setItem('userEmail', response.data.email);
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('userPhone', response.data.phone);
        localStorage.setItem('userImage', response.data.imageData);
        
        if (response.data.recruiterId) {
          localStorage.setItem('recruiterId', response.data.recruiterId);
        }

        // Add slight delay before navigation
        setTimeout(() => {
          navigate('/recruiter-dashboard');
          window.location.reload(); // Ensure full refresh to load dashboard
        }, 100);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="mm-login-container">
      <div className="mm-login-card">
        {/* Logo and Brand Name Section */}
        <div className="mm-brand-section">
          <img src="/Logoo.png" alt="MomentumMerge Logo" className="mm-main-logo" />
          <h1 className="mm-company-name">MomentumMerge</h1>
        </div>

        <h2 className="mm-login-title">Login to Dashboard</h2>
        <p className="mm-login-subtitle">Access your recruiter or admin panel</p>

        <div className="mm-role-tabs">
          <button 
            className={`mm-tab ${loginType === 'recruiter' ? 'active' : ''}`}
            onClick={() => setLoginType('recruiter')}
          >
            <FiUser className="mm-tab-icon" />
            Recruiter Login
          </button>
          <button 
            className={`mm-tab ${loginType === 'admin' ? 'active' : ''}`}
            onClick={() => setLoginType('admin')}
          >
            <FiShield className="mm-tab-icon" />
            Admin Login
          </button>
        </div>

        {error && <div className="mm-error-message">{error}</div>}

        <form className="mm-login-form" onSubmit={handleSubmit}>
          <div className="mm-form-group">
            <label>Email Address</label>
            <div className="mm-input-wrapper">
              <FiMail className="mm-input-icon" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={loginType === 'admin' ? 'admin@momentummerge.com' : 'your@email.com'}
                required
              />
            </div>
          </div>

          <div className="mm-form-group">
            <label>Password</label>
            <div className="mm-input-wrapper">
              <FiLock className="mm-input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
              <button 
                type="button" 
                className="mm-password-toggle"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FiEye /> : <FiEyeOff />}
              </button>
            </div>
          </div>

          <button type="submit" className="mm-login-btn" disabled={loading}>
            {loading ? 'Logging in...' : `Login as ${loginType === 'admin' ? 'Admin' : 'Recruiter'}`}
          </button>
        </form>

        {loginType === 'recruiter' && (
          <Link to="/recruiter-forgot-password" className="mm-forgot-link">
            Forgot password?
          </Link>
        )}

        {/* {loginType === 'admin' && (
          <div className="mm-admin-note">
            <FiShield className="mm-note-icon" />
            <span>Admin password can be changed in application.properties</span>
          </div>
        )} */}

        <div className="mm-footer-links">
          <Link to="/" className="mm-footer-link">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default RecruiterLogin;



// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { FiMail, FiLock, FiEye, FiEyeOff, FiUser } from 'react-icons/fi';
// import axios from 'axios';
// import '../Styles/RecruiterLogin.css';

// const RecruiterLogin = () => {
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
//         'http://localhost:8080/api/auth/recruiter-login',
//         formData,
//         {
//           withCredentials: true,
//           headers: {
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       if (response.data) {
//         // Store recruiter data in localStorage
//         localStorage.setItem('userRole', response.data.role);
//         localStorage.setItem('userName', response.data.name);
//         localStorage.setItem('userEmail', response.data.email);
//         localStorage.setItem('userId', response.data.userId);
//         localStorage.setItem('userPhone', response.data.phone);
//         localStorage.setItem('userImage', response.data.imageData);
        
//         if (response.data.recruiterId) {
//           localStorage.setItem('recruiterId', response.data.recruiterId);
//         }

//         // Navigate to recruiter dashboard
//         setTimeout(() => {
//           navigate('/recruiter/dashboard');
//           window.location.reload();
//         }, 100);
//       }
//     } catch (err) {
//       console.error('Recruiter login error:', err);
//       setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
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

//         <h2 className="mm-login-title">Recruiter Login</h2>
//         <p className="mm-login-subtitle">Access your recruiter dashboard</p>

//         <div className="mm-role-indicator">
//           <div className="mm-recruiter-indicator">
//             <FiUser className="mm-tab-icon" />
//             Recruiter Access
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
//                 placeholder="your@email.com"
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
//             {loading ? 'Logging in...' : 'Login as Recruiter'}
//           </button>
//         </form>

//         <Link to="/recruiter-forgot-password" className="mm-forgot-link">
//           Forgot password?
//         </Link>

//         <div className="mm-footer-links">
//           <Link to="/" className="mm-footer-link">← Back to Home</Link>
//           <Link to="/admin-login" className="mm-footer-link">Admin Login →</Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecruiterLogin;