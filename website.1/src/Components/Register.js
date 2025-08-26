// // 📌 Add this import at the top (with your other imports)
// import { useEffect } from 'react';

// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import { FiCheck, FiX, FiEye, FiEyeOff } from 'react-icons/fi';
// import '../Styles/Register.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';

// export const Register = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [formMessage, setFormMessage] = useState({ text: '', type: '' });
//   const [acceptedTerms, setAcceptedTerms] = useState(false);
//   const [userData, setUserData] = useState({
//     name: '',
//     phoneno: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });

//   const [passwordRequirements, setPasswordRequirements] = useState({
//     minLength: false,
//     hasUpper: false,
//     hasLower: false,
//     hasNumber: false,
//     hasSpecial: false
//   });

//   const navigate = useNavigate();
//  useEffect(() => {
//   /* global google */
//   if (window.google) {
//     google.accounts.id.initialize({
//       client_id: "1093967708101-qfvpm2i4217udqpq79k6cuqm9saj7ji1.apps.googleusercontent.com",
//       callback: async (response) => {
//         try {
//           const res = await axios.post("http://localhost:8080/auth/google", {
//             idToken: response.credential
//           });

//           if (res.data && typeof res.data === 'string') {
//             const userRole = res.data;

//             // ✅ Extract email from token
//             const decodedToken = JSON.parse(atob(response.credential.split('.')[1]));
//             const userEmail = decodedToken?.email || "";

//             // ✅ Save to localStorage
//             localStorage.setItem("userRole", userRole);
//             localStorage.setItem("registeredEmail", userEmail);

//             setFormMessage({ text: "Google login successful! Redirecting to jobs...", type: "success" });

//             // ✅ Redirect to jobs
//             const redirectPath = localStorage.getItem("redirectAfterLogin") || "/jobs";
//             localStorage.removeItem("redirectAfterLogin");

//             setTimeout(() => {
//               navigate(redirectPath);
//             }, 1500);
//           } else {
//             setFormMessage({ text: "Unexpected response from server.", type: "error" });
//           }
//         } catch (error) {
//           setFormMessage({
//             text: error.response?.data || "Google login failed",
//             type: "error"
//           });
//         }
//       }
//     });

//     // ✅ Render Google button inside #googleSignInDiv
//     google.accounts.id.renderButton(
//       document.getElementById("googleSignInDiv"),
//       { theme: "outline", size: "large", text: "continue_with", width: "300" }
//     );
//   }
// }, []);



//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserData({ ...userData, [name]: value });

//     if (name === 'password') {
//       setPasswordRequirements({
//         minLength: value.length >= 8,
//         hasUpper: /[A-Z]/.test(value),
//         hasLower: /[a-z]/.test(value),
//         hasNumber: /[0-9]/.test(value),
//         hasSpecial: /[@$!%*?&]/.test(value)
//       });
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword((prev) => !prev);
//   };

//   const toggleConfirmPasswordVisibility = () => {
//     setShowConfirmPassword((prev) => !prev);
//   };

//   const isStrongPassword = (password) => {
//     return Object.values(passwordRequirements).every(req => req);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { name, phoneno, email, password, confirmPassword } = userData;
//     const phonePattern = /^[6-9]\d{9}$/;

//     if (!acceptedTerms) {
//       setFormMessage({
//         text: 'You must accept the Terms and Conditions and Privacy Policy.',
//         type: 'error'
//       });
//       return;
//     }

//     if (!phonePattern.test(phoneno)) {
//       setFormMessage({
//         text: 'Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9.',
//         type: 'error'
//       });
//       return;
//     }

//     if (password !== confirmPassword) {
//       setFormMessage({
//         text: 'Passwords do not match. Please try again.',
//         type: 'error'
//       });
//       return;
//     }

//     if (!isStrongPassword(password)) {
//       setFormMessage({
//         text: 'Password does not meet all requirements.',
//         type: 'error'
//       });
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:8080/api/auth/register', {
//         name,
//         phoneno,
//         email,
//         password,
//         role: 'user',
//         termsAndConditions: acceptedTerms ? 'I agreed' : '',
//         privacyPolicy: acceptedTerms ? 'I agreed' : ''
//       });

//       if (response.data.startsWith("Valid") || response.data.toLowerCase().includes("success")) {
//         setFormMessage({ text: 'Registration successful! Redirecting to login...', type: 'success' });
//         setTimeout(() => {
//           navigate('/jobs');
//         }, 2000);
//       } else {
//         setFormMessage({ text: response.data, type: 'error' });
//       }
//     } catch (error) {
//       const message =
//         error.response?.data?.message ||
//         error.response?.data ||
//         "An error occurred during registration.";
//       setFormMessage({ text: message, type: 'error' });
//     }
//   };

//   const redirectToHome = () => {
//     navigate('/jobs');
//   };

//   return (
//     <div className="register-body">
//       <div className="register-container">
//         <div className="register-left">
//           <img src="/RegisterImage.jpg" alt="Professional workspace" className="register-image" />
//         </div>

//         <div className="register-right">
//           <div className="register-form-container">
//             <div className="register-header">
//               <img 
//                 src="/Logoo.png" 
//                 alt="MomentumMerge Logo" 
//                 className="register-logo" 
//                 onClick={redirectToHome}
//                 style={{ cursor: 'pointer' }}
//               />
//               <h1 className="register-company-name">MomentumMerge</h1>
//             </div>

//             <form className="register-form" onSubmit={handleSubmit}>
//               <h2 className="register-title">SIGN UP</h2>

//               {formMessage.text && (
//                 <div className={`register-message ${formMessage.type}`}>
//                   {formMessage.text}
//                 </div>
//               )}

//               <div className="register-field-group">
//                 <label className="register-field-label">First Name</label>
//                 <div className="register-input-group">
//                   <input
//                     type="text"
//                     name="name"
//                     placeholder="Enter your first name"
//                     value={userData.name}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="register-field-group">
//                 <label className="register-field-label">Mobile Number</label>
//                 <div className="register-input-group">
//                   <input
//                     type="tel"
//                     name="phoneno"
//                     placeholder="Enter your mobile number"
//                     value={userData.phoneno}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="register-field-group">
//                 <label className="register-field-label">Email Address</label>
//                 <div className="register-input-group">
//                   <input
//                     type="email"
//                     name="email"
//                     placeholder="Enter your email address"
//                     value={userData.email}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="register-field-group">
//                 <label className="register-field-label">Password</label>
//                 <div className="register-input-group">
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     name="password"
//                     placeholder="Enter your password"
//                     value={userData.password}
//                     onChange={handleChange}
//                     required
//                   />
//                   <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
//                     {showPassword ? <FiEye />  : <FiEyeOff /> }

//                   </span>
//                 </div>
//               </div>

//               <div className="password-requirements">
//                 <h4>Password must include:</h4>
//                 <ul>
//                   <li className={passwordRequirements.minLength ? "valid" : "invalid"}>
//                     {passwordRequirements.minLength ? <FiCheck /> : <FiX />} At least 8 characters
//                   </li>
//                   <li className={passwordRequirements.hasUpper ? "valid" : "invalid"}>
//                     {passwordRequirements.hasUpper ? <FiCheck /> : <FiX />} One uppercase letter
//                   </li>
//                   <li className={passwordRequirements.hasLower ? "valid" : "invalid"}>
//                     {passwordRequirements.hasLower ? <FiCheck /> : <FiX />} One lowercase letter
//                   </li>
//                   <li className={passwordRequirements.hasNumber ? "valid" : "invalid"}>
//                     {passwordRequirements.hasNumber ? <FiCheck /> : <FiX />} One number
//                   </li>
//                   <li className={passwordRequirements.hasSpecial ? "valid" : "invalid"}>
//                     {passwordRequirements.hasSpecial ? <FiCheck /> : <FiX />} One special character (@$!%*?&)
//                   </li>
//                 </ul>
//               </div>

//               <div className="register-field-group">
//                 <label className="register-field-label">Confirm Password</label>
//                 <div className="register-input-group">
//                   <input
//                     type={showConfirmPassword ? 'text' : 'password'}
//                     name="confirmPassword"
//                     placeholder="Retype your password"
//                     value={userData.confirmPassword}
//                     onChange={handleChange}
//                     required
//                   />
//                   <span className="password-toggle-icon" onClick={toggleConfirmPasswordVisibility}>
//                     {showConfirmPassword ? <FiEye />  : <FiEyeOff /> }
//                   </span>
//                 </div>
//               </div>

//               {/* ✅ Terms & Conditions Checkbox */}
//               <div className="terms-checkbox-group">
//                 <label className="terms-checkbox-label">
//                   <input
//                     type="checkbox"
//                     checked={acceptedTerms}
//                     onChange={(e) => setAcceptedTerms(e.target.checked)}
//                   />
//                   <span>I agree to the&nbsp;</span>
//                   <a href="/terms&conditions" className="terms-link" target="_blank" rel="noopener noreferrer">
//                     Terms Of Use
//                   </a>
//                   <span>&nbsp;and&nbsp;</span>
//                   <a href="/privacypolicy" className="terms-link" target="_blank" rel="noopener noreferrer">
//                     Privacy Policy
//                   </a>
//                 </label>
//               </div>

//               <button
//                 type="submit"
//                 className="register-button"
//                 disabled={!isStrongPassword(userData.password) || !acceptedTerms}
//               >
//                 REGISTER
//               </button>
//               {/* ✅ Google Sign-In Button */}
//               <div className="google-signin-container" style={{ marginTop: '20px', textAlign: 'center' }}>
//                 <div id="googleSignInDiv"></div>
//               </div>


//               <div className="register-login-redirect">
//                 Already registered? <Link to="/login">Login here</Link><br />
//                 Continue without signup? <Link to="/">EXPLORE</Link>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// 📌 Add this import at the top (with your other imports)
// 

// 📌 Add this import at the top (with your other imports)
import { useEffect } from 'react';

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FiCheck, FiX, FiEye, FiEyeOff } from 'react-icons/fi';
import '../Styles/Register.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formMessage, setFormMessage] = useState({ text: '', type: '' });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    phoneno: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [passwordRequirements, setPasswordRequirements] = useState({
    minLength: false,
    hasUpper: false,
    hasLower: false,
    hasNumber: false,
    hasSpecial: false
  });

  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("userRole");
    if (isLoggedIn) {
      navigate("/jobs");
    }
  }, [navigate]);

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: "1093967708101-qfvpm2i4217udqpq79k6cuqm9saj7ji1.apps.googleusercontent.com",
        callback: async (response) => {
          try {
            const res = await axios.post("http://localhost:8080/auth/google", {
              idToken: response.credential
            });

            if (res.data) {
              const responseData = res.data;
              
              // ✅ Extract email from token
              const decodedToken = JSON.parse(atob(response.credential.split('.')[1]));
              const userEmail = decodedToken?.email || "";
              const userName = decodedToken?.name || "";

              // ✅ Handle different response scenarios
              if (responseData === "exists") {
                // User already exists, treat as login
                setFormMessage({ text: "Google login successful! Redirecting to jobs...", type: "success" });
                
                // Save user data to localStorage
                localStorage.setItem("userRole", "USER"); // Default role from backend
                localStorage.setItem("registeredEmail", userEmail);
                
                // Redirect to jobs
                const redirectPath = localStorage.getItem("redirectAfterLogin") || "/jobs";
                localStorage.removeItem("redirectAfterLogin");
                
                setTimeout(() => {
                  navigate(redirectPath);
                }, 1500);
                
              } else if (responseData === "registered") {
                // New user registered successfully
                setFormMessage({ text: "Registration successful with Google! Redirecting to jobs...", type: "success" });
                
                // Save user data to localStorage
                localStorage.setItem("userRole", "USER"); // Default role from backend
                localStorage.setItem("registeredEmail", userEmail);
                
                // Redirect to jobs
                const redirectPath = localStorage.getItem("redirectAfterLogin") || "/jobs";
                localStorage.removeItem("redirectAfterLogin");
                
                setTimeout(() => {
                  navigate(redirectPath);
                }, 1500);
                
              } else {
                // Handle other response types (like direct role response)
                setFormMessage({ text: "Google authentication successful! Redirecting to jobs...", type: "success" });
                
                // Save user data to localStorage
                localStorage.setItem("userRole", responseData);
                localStorage.setItem("registeredEmail", userEmail);
                
                // Redirect to jobs
                const redirectPath = localStorage.getItem("redirectAfterLogin") || "/jobs";
                localStorage.removeItem("redirectAfterLogin");
                
                setTimeout(() => {
                  navigate(redirectPath);
                }, 1500);
              }
            } else {
              setFormMessage({ text: "Unexpected response from server.", type: "error" });
            }
          } catch (error) {
            console.error("Google authentication error:", error);
            let errorMessage = "Google authentication failed";
            
            if (error.response?.data) {
              if (error.response.data === "invalid_token") {
                errorMessage = "Invalid Google token. Please try again.";
              } else if (error.response.data === "error") {
                errorMessage = "Server error during Google authentication. Please try again.";
              } else {
                errorMessage = error.response.data;
              }
            } else if (error.message) {
              errorMessage = error.message;
            }
            
            setFormMessage({ text: errorMessage, type: "error" });
          }
        }
      });

      // ✅ Render Google button inside #googleSignInDiv
      google.accounts.id.renderButton(
        document.getElementById("googleSignInDiv"),
        { theme: "outline", size: "large", text: "continue_with", width: "300" }
      );
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });

    if (name === 'password') {
      setPasswordRequirements({
        minLength: value.length >= 8,
        hasUpper: /[A-Z]/.test(value),
        hasLower: /[a-z]/.test(value),
        hasNumber: /[0-9]/.test(value),
        hasSpecial: /[@$!%*?&]/.test(value)
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const isStrongPassword = (password) => {
    return Object.values(passwordRequirements).every(req => req);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, phoneno, email, password, confirmPassword } = userData;
    const phonePattern = /^[6-9]\d{9}$/;

    if (!acceptedTerms) {
      setFormMessage({
        text: 'You must accept the Terms and Conditions and Privacy Policy.',
        type: 'error'
      });
      return;
    }

    if (!phonePattern.test(phoneno)) {
      setFormMessage({
        text: 'Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9.',
        type: 'error'
      });
      return;
    }

    if (password !== confirmPassword) {
      setFormMessage({
        text: 'Passwords do not match. Please try again.',
        type: 'error'
      });
      return;
    }

    if (!isStrongPassword(password)) {
      setFormMessage({
        text: 'Password does not meet all requirements.',
        type: 'error'
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', {
        name,
        phoneno,
        email,
        password,
        role: 'user',
        termsAndConditions: acceptedTerms ? 'I agreed' : '',
        privacyPolicy: acceptedTerms ? 'I agreed' : ''
      });

      if (response.data.startsWith("Valid") || response.data.toLowerCase().includes("success")) {
        setFormMessage({ text: 'Registration successful! Redirecting to jobs...', type: 'success' });
        
        // Save user data to localStorage (similar to login)
        localStorage.setItem("userRole", "USER");
        localStorage.setItem("registeredEmail", email);
        
        setTimeout(() => {
          navigate('/jobs');
        }, 2000);
      } else {
        setFormMessage({ text: response.data, type: 'error' });
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data ||
        "An error occurred during registration.";
      setFormMessage({ text: message, type: 'error' });
    }
  };

  const redirectToHome = () => {
    navigate('/jobs');
  };

  return (
    <div className="register-body">
      <div className="register-container">
        <div className="register-left">
          <img src="/RegisterImage.jpg" alt="Professional workspace" className="register-image" />
        </div>

        <div className="register-right">
          <div className="register-form-container">
            <div className="register-header">
              <img 
                src="/Logoo.png" 
                alt="MomentumMerge Logo" 
                className="register-logo" 
                onClick={redirectToHome}
                style={{ cursor: 'pointer' }}
              />
              <h1 className="register-company-name">MomentumMerge</h1>
            </div>

            <form className="register-form" onSubmit={handleSubmit}>
              <h2 className="register-title">SIGN UP</h2>

              {/* ✅ Google Sign-In Button - Moved to top */}
              <div className="google-signin-container" style={{ marginBottom: '20px', textAlign: 'center' }}>
                <div id="googleSignInDiv"></div>
              </div>
               

              {formMessage.text && (
                <div className={`register-message ${formMessage.type}`}>
                  {formMessage.text}
                </div>
              )}

              <div className="register-field-group">
                <label className="register-field-label">First Name</label>
                <div className="register-input-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your first name"
                    value={userData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="register-field-group">
                <label className="register-field-label">Mobile Number</label>
                <div className="register-input-group">
                  <input
                    type="tel"
                    name="phoneno"
                    placeholder="Enter your mobile number"
                    value={userData.phoneno}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="register-field-group">
                <label className="register-field-label">Email Address</label>
                <div className="register-input-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    value={userData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="register-field-group">
                <label className="register-field-label">Password</label>
                <div className="register-input-group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Enter your password"
                    value={userData.password}
                    onChange={handleChange}
                    required
                  />
                  <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                    {showPassword ? <FiEye />  : <FiEyeOff /> }
                  </span>
                </div>
              </div>

              <div className="password-requirements">
                <h4>Password must include:</h4>
                <ul>
                  <li className={passwordRequirements.minLength ? "valid" : "invalid"}>
                    {passwordRequirements.minLength ? <FiCheck /> : <FiX />} At least 8 characters
                  </li>
                  <li className={passwordRequirements.hasUpper ? "valid" : "invalid"}>
                    {passwordRequirements.hasUpper ? <FiCheck /> : <FiX />} One uppercase letter
                  </li>
                  <li className={passwordRequirements.hasLower ? "valid" : "invalid"}>
                    {passwordRequirements.hasLower ? <FiCheck /> : <FiX />} One lowercase letter
                  </li>
                  <li className={passwordRequirements.hasNumber ? "valid" : "invalid"}>
                    {passwordRequirements.hasNumber ? <FiCheck /> : <FiX />} One number
                  </li>
                  <li className={passwordRequirements.hasSpecial ? "valid" : "invalid"}>
                    {passwordRequirements.hasSpecial ? <FiCheck /> : <FiX />} One special character (@$!%*?&)
                  </li>
                </ul>
              </div>

              <div className="register-field-group">
                <label className="register-field-label">Confirm Password</label>
                <div className="register-input-group">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Retype your password"
                    value={userData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <span className="password-toggle-icon" onClick={toggleConfirmPasswordVisibility}>
                    {showConfirmPassword ? <FiEye />  : <FiEyeOff /> }
                  </span>
                </div>
              </div>

              {/* ✅ Terms & Conditions Checkbox */}
              <div className="terms-checkbox-group">
                <label className="terms-checkbox-label">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                  />
                  <span>I agree to the&nbsp;</span>
                  <a href="/terms&conditions" className="terms-link" target="_blank" rel="noopener noreferrer">
                    Terms Of Use
                  </a>
                  <span>&nbsp;and&nbsp;</span>
                  <a href="/privacypolicy" className="terms-link" target="_blank" rel="noopener noreferrer">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <button
                type="submit"
                className="register-button"
                disabled={!isStrongPassword(userData.password) || !acceptedTerms}
              >
                REGISTER
              </button>

              <div className="register-login-redirect">
                Already registered? <Link to="/login">Login here</Link><br />
                Continue without signup? <Link to="/">EXPLORE</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};