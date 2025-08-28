// // // 📌 Add this import at the top (with your other imports)
// // import { useEffect } from 'react';

// // import React, { useState } from 'react';
// // import { useNavigate, Link } from 'react-router-dom';
// // import axios from 'axios';
// // import { FiCheck, FiX, FiEye, FiEyeOff } from 'react-icons/fi';
// // import '../Styles/Register.css';
// // import '@fortawesome/fontawesome-free/css/all.min.css';

// // export const Register = () => {
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
// //   const [formMessage, setFormMessage] = useState({ text: '', type: '' });
// //   const [acceptedTerms, setAcceptedTerms] = useState(false);
// //   const [userData, setUserData] = useState({
// //     name: '',
// //     phoneno: '',
// //     email: '',
// //     password: '',
// //     confirmPassword: ''
// //   });

// //   const [passwordRequirements, setPasswordRequirements] = useState({
// //     minLength: false,
// //     hasUpper: false,
// //     hasLower: false,
// //     hasNumber: false,
// //     hasSpecial: false
// //   });

// //   const navigate = useNavigate();
// //  useEffect(() => {
// //   /* global google */
// //   if (window.google) {
// //     google.accounts.id.initialize({
// //       client_id: "1093967708101-qfvpm2i4217udqpq79k6cuqm9saj7ji1.apps.googleusercontent.com",
// //       callback: async (response) => {
// //         try {
// //           const res = await axios.post("http://localhost:8080/auth/google", {
// //             idToken: response.credential
// //           });

// //           if (res.data && typeof res.data === 'string') {
// //             const userRole = res.data;

// //             // ✅ Extract email from token
// //             const decodedToken = JSON.parse(atob(response.credential.split('.')[1]));
// //             const userEmail = decodedToken?.email || "";

// //             // ✅ Save to localStorage
// //             localStorage.setItem("userRole", userRole);
// //             localStorage.setItem("registeredEmail", userEmail);

// //             setFormMessage({ text: "Google login successful! Redirecting to jobs...", type: "success" });

// //             // ✅ Redirect to jobs
// //             const redirectPath = localStorage.getItem("redirectAfterLogin") || "/jobs";
// //             localStorage.removeItem("redirectAfterLogin");

// //             setTimeout(() => {
// //               navigate(redirectPath);
// //             }, 1500);
// //           } else {
// //             setFormMessage({ text: "Unexpected response from server.", type: "error" });
// //           }
// //         } catch (error) {
// //           setFormMessage({
// //             text: error.response?.data || "Google login failed",
// //             type: "error"
// //           });
// //         }
// //       }
// //     });

// //     // ✅ Render Google button inside #googleSignInDiv
// //     google.accounts.id.renderButton(
// //       document.getElementById("googleSignInDiv"),
// //       { theme: "outline", size: "large", text: "continue_with", width: "300" }
// //     );
// //   }
// // }, []);



// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setUserData({ ...userData, [name]: value });

// //     if (name === 'password') {
// //       setPasswordRequirements({
// //         minLength: value.length >= 8,
// //         hasUpper: /[A-Z]/.test(value),
// //         hasLower: /[a-z]/.test(value),
// //         hasNumber: /[0-9]/.test(value),
// //         hasSpecial: /[@$!%*?&]/.test(value)
// //       });
// //     }
// //   };

// //   const togglePasswordVisibility = () => {
// //     setShowPassword((prev) => !prev);
// //   };

// //   const toggleConfirmPasswordVisibility = () => {
// //     setShowConfirmPassword((prev) => !prev);
// //   };

// //   const isStrongPassword = (password) => {
// //     return Object.values(passwordRequirements).every(req => req);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const { name, phoneno, email, password, confirmPassword } = userData;
// //     const phonePattern = /^[6-9]\d{9}$/;

// //     if (!acceptedTerms) {
// //       setFormMessage({
// //         text: 'You must accept the Terms and Conditions and Privacy Policy.',
// //         type: 'error'
// //       });
// //       return;
// //     }

// //     if (!phonePattern.test(phoneno)) {
// //       setFormMessage({
// //         text: 'Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9.',
// //         type: 'error'
// //       });
// //       return;
// //     }

// //     if (password !== confirmPassword) {
// //       setFormMessage({
// //         text: 'Passwords do not match. Please try again.',
// //         type: 'error'
// //       });
// //       return;
// //     }

// //     if (!isStrongPassword(password)) {
// //       setFormMessage({
// //         text: 'Password does not meet all requirements.',
// //         type: 'error'
// //       });
// //       return;
// //     }

// //     try {
// //       const response = await axios.post('http://localhost:8080/api/auth/register', {
// //         name,
// //         phoneno,
// //         email,
// //         password,
// //         role: 'user',
// //         termsAndConditions: acceptedTerms ? 'I agreed' : '',
// //         privacyPolicy: acceptedTerms ? 'I agreed' : ''
// //       });

// //       if (response.data.startsWith("Valid") || response.data.toLowerCase().includes("success")) {
// //         setFormMessage({ text: 'Registration successful! Redirecting to login...', type: 'success' });
// //         setTimeout(() => {
// //           navigate('/jobs');
// //         }, 2000);
// //       } else {
// //         setFormMessage({ text: response.data, type: 'error' });
// //       }
// //     } catch (error) {
// //       const message =
// //         error.response?.data?.message ||
// //         error.response?.data ||
// //         "An error occurred during registration.";
// //       setFormMessage({ text: message, type: 'error' });
// //     }
// //   };

// //   const redirectToHome = () => {
// //     navigate('/jobs');
// //   };

// //   return (
// //     <div className="register-body">
// //       <div className="register-container">
// //         <div className="register-left">
// //           <img src="/RegisterImage.jpg" alt="Professional workspace" className="register-image" />
// //         </div>

// //         <div className="register-right">
// //           <div className="register-form-container">
// //             <div className="register-header">
// //               <img 
// //                 src="/Logoo.png" 
// //                 alt="MomentumMerge Logo" 
// //                 className="register-logo" 
// //                 onClick={redirectToHome}
// //                 style={{ cursor: 'pointer' }}
// //               />
// //               <h1 className="register-company-name">MomentumMerge</h1>
// //             </div>

// //             <form className="register-form" onSubmit={handleSubmit}>
// //               <h2 className="register-title">SIGN UP</h2>

// //               {formMessage.text && (
// //                 <div className={`register-message ${formMessage.type}`}>
// //                   {formMessage.text}
// //                 </div>
// //               )}

// //               <div className="register-field-group">
// //                 <label className="register-field-label">First Name</label>
// //                 <div className="register-input-group">
// //                   <input
// //                     type="text"
// //                     name="name"
// //                     placeholder="Enter your first name"
// //                     value={userData.name}
// //                     onChange={handleChange}
// //                     required
// //                   />
// //                 </div>
// //               </div>

// //               <div className="register-field-group">
// //                 <label className="register-field-label">Mobile Number</label>
// //                 <div className="register-input-group">
// //                   <input
// //                     type="tel"
// //                     name="phoneno"
// //                     placeholder="Enter your mobile number"
// //                     value={userData.phoneno}
// //                     onChange={handleChange}
// //                     required
// //                   />
// //                 </div>
// //               </div>

// //               <div className="register-field-group">
// //                 <label className="register-field-label">Email Address</label>
// //                 <div className="register-input-group">
// //                   <input
// //                     type="email"
// //                     name="email"
// //                     placeholder="Enter your email address"
// //                     value={userData.email}
// //                     onChange={handleChange}
// //                     required
// //                   />
// //                 </div>
// //               </div>

// //               <div className="register-field-group">
// //                 <label className="register-field-label">Password</label>
// //                 <div className="register-input-group">
// //                   <input
// //                     type={showPassword ? 'text' : 'password'}
// //                     name="password"
// //                     placeholder="Enter your password"
// //                     value={userData.password}
// //                     onChange={handleChange}
// //                     required
// //                   />
// //                   <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
// //                     {showPassword ? <FiEye />  : <FiEyeOff /> }

// //                   </span>
// //                 </div>
// //               </div>

// //               <div className="password-requirements">
// //                 <h4>Password must include:</h4>
// //                 <ul>
// //                   <li className={passwordRequirements.minLength ? "valid" : "invalid"}>
// //                     {passwordRequirements.minLength ? <FiCheck /> : <FiX />} At least 8 characters
// //                   </li>
// //                   <li className={passwordRequirements.hasUpper ? "valid" : "invalid"}>
// //                     {passwordRequirements.hasUpper ? <FiCheck /> : <FiX />} One uppercase letter
// //                   </li>
// //                   <li className={passwordRequirements.hasLower ? "valid" : "invalid"}>
// //                     {passwordRequirements.hasLower ? <FiCheck /> : <FiX />} One lowercase letter
// //                   </li>
// //                   <li className={passwordRequirements.hasNumber ? "valid" : "invalid"}>
// //                     {passwordRequirements.hasNumber ? <FiCheck /> : <FiX />} One number
// //                   </li>
// //                   <li className={passwordRequirements.hasSpecial ? "valid" : "invalid"}>
// //                     {passwordRequirements.hasSpecial ? <FiCheck /> : <FiX />} One special character (@$!%*?&)
// //                   </li>
// //                 </ul>
// //               </div>

// //               <div className="register-field-group">
// //                 <label className="register-field-label">Confirm Password</label>
// //                 <div className="register-input-group">
// //                   <input
// //                     type={showConfirmPassword ? 'text' : 'password'}
// //                     name="confirmPassword"
// //                     placeholder="Retype your password"
// //                     value={userData.confirmPassword}
// //                     onChange={handleChange}
// //                     required
// //                   />
// //                   <span className="password-toggle-icon" onClick={toggleConfirmPasswordVisibility}>
// //                     {showConfirmPassword ? <FiEye />  : <FiEyeOff /> }
// //                   </span>
// //                 </div>
// //               </div>

// //               {/* ✅ Terms & Conditions Checkbox */}
// //               <div className="terms-checkbox-group">
// //                 <label className="terms-checkbox-label">
// //                   <input
// //                     type="checkbox"
// //                     checked={acceptedTerms}
// //                     onChange={(e) => setAcceptedTerms(e.target.checked)}
// //                   />
// //                   <span>I agree to the&nbsp;</span>
// //                   <a href="/terms&conditions" className="terms-link" target="_blank" rel="noopener noreferrer">
// //                     Terms Of Use
// //                   </a>
// //                   <span>&nbsp;and&nbsp;</span>
// //                   <a href="/privacypolicy" className="terms-link" target="_blank" rel="noopener noreferrer">
// //                     Privacy Policy
// //                   </a>
// //                 </label>
// //               </div>

// //               <button
// //                 type="submit"
// //                 className="register-button"
// //                 disabled={!isStrongPassword(userData.password) || !acceptedTerms}
// //               >
// //                 REGISTER
// //               </button>
// //               {/* ✅ Google Sign-In Button */}
// //               <div className="google-signin-container" style={{ marginTop: '20px', textAlign: 'center' }}>
// //                 <div id="googleSignInDiv"></div>
// //               </div>


// //               <div className="register-login-redirect">
// //                 Already registered? <Link to="/login">Login here</Link><br />
// //                 Continue without signup? <Link to="/">EXPLORE</Link>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // 📌 Add this import at the top (with your other imports)
// // 

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

//     const API_BASE = process.env.REACT_APP_API_BASE_URL;

//   // Check if user is already logged in
//   useEffect(() => {
//     const isLoggedIn = localStorage.getItem("userRole");
//     if (isLoggedIn) {
//       navigate("/jobs");
//     }
//   }, [navigate]);

//   useEffect(() => {
//     /* global google */
//     if (window.google) {
//       google.accounts.id.initialize({
//         client_id: "1093967708101-qfvpm2i4217udqpq79k6cuqm9saj7ji1.apps.googleusercontent.com",
//         callback: async (response) => {
//           try {
//             const res = await axios.post(`${API_BASE}/auth/google`, {
//               idToken: response.credential
//             });

//             if (res.data) {
//               const responseData = res.data;
              
//               // ✅ Extract email from token
//               const decodedToken = JSON.parse(atob(response.credential.split('.')[1]));
//               const userEmail = decodedToken?.email || "";
//               const userName = decodedToken?.name || "";

//               // ✅ Handle different response scenarios
//               if (responseData === "exists") {
//                 // User already exists, treat as login
//                 setFormMessage({ text: "Google login successful! Redirecting to jobs...", type: "success" });
                
//                 // Save user data to localStorage
//                 localStorage.setItem("userRole", "USER"); // Default role from backend
//                 localStorage.setItem("registeredEmail", userEmail);
                
//                 // Redirect to jobs
//                 const redirectPath = localStorage.getItem("redirectAfterLogin") || "/jobs";
//                 localStorage.removeItem("redirectAfterLogin");
                
//                 setTimeout(() => {
//                   navigate(redirectPath);
//                 }, 1500);
                
//               } else if (responseData === "registered") {
//                 // New user registered successfully
//                 setFormMessage({ text: "Registration successful with Google! Redirecting to jobs...", type: "success" });
                
//                 // Save user data to localStorage
//                 localStorage.setItem("userRole", "USER"); // Default role from backend
//                 localStorage.setItem("registeredEmail", userEmail);
                
//                 // Redirect to jobs
//                 const redirectPath = localStorage.getItem("redirectAfterLogin") || "/jobs";
//                 localStorage.removeItem("redirectAfterLogin");
                
//                 setTimeout(() => {
//                   navigate(redirectPath);
//                 }, 1500);
                
//               } else {
//                 // Handle other response types (like direct role response)
//                 setFormMessage({ text: "Google authentication successful! Redirecting to jobs...", type: "success" });
                
//                 // Save user data to localStorage
//                 localStorage.setItem("userRole", responseData);
//                 localStorage.setItem("registeredEmail", userEmail);
                
//                 // Redirect to jobs
//                 const redirectPath = localStorage.getItem("redirectAfterLogin") || "/jobs";
//                 localStorage.removeItem("redirectAfterLogin");
                
//                 setTimeout(() => {
//                   navigate(redirectPath);
//                 }, 1500);
//               }
//             } else {
//               setFormMessage({ text: "Unexpected response from server.", type: "error" });
//             }
//           } catch (error) {
//             console.error("Google authentication error:", error);
//             let errorMessage = "Google authentication failed";
            
//             if (error.response?.data) {
//               if (error.response.data === "invalid_token") {
//                 errorMessage = "Invalid Google token. Please try again.";
//               } else if (error.response.data === "error") {
//                 errorMessage = "Server error during Google authentication. Please try again.";
//               } else {
//                 errorMessage = error.response.data;
//               }
//             } else if (error.message) {
//               errorMessage = error.message;
//             }
            
//             setFormMessage({ text: errorMessage, type: "error" });
//           }
//         }
//       });

//       // ✅ Render Google button inside #googleSignInDiv
//       google.accounts.id.renderButton(
//         document.getElementById("googleSignInDiv"),
//         { theme: "outline", size: "large", text: "continue_with", width: "300" }
//       );
//     }
//   }, [navigate]);

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
//       const response = await axios.post(`${API_BASE}/api/auth/register`, {
//         name,
//         phoneno,
//         email,
//         password,
//         role: 'user',
//         termsAndConditions: acceptedTerms ? 'I agreed' : '',
//         privacyPolicy: acceptedTerms ? 'I agreed' : ''
//       });

//       if (response.data.startsWith("Valid") || response.data.toLowerCase().includes("success")) {
//         setFormMessage({ text: 'Registration successful! Redirecting to jobs...', type: 'success' });
        
//         // Save user data to localStorage (similar to login)
//         localStorage.setItem("userRole", "USER");
//         localStorage.setItem("registeredEmail", email);
        
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

//               {/* ✅ Google Sign-In Button - Moved to top */}
//               <div className="google-signin-container" style={{ marginBottom: '20px', textAlign: 'center' }}>
//                 <div id="googleSignInDiv"></div>
//               </div>
               

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


import { useEffect } from 'react';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FiEye, FiEyeOff, FiUser, FiMail, FiPhone, FiLock, FiCheckCircle, FiFileText, FiTrendingUp, FiUsers } from 'react-icons/fi';
import '../Styles/Register.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formMessage, setFormMessage] = useState({ text: '', type: '' });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    phoneno: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const API_BASE = process.env.REACT_APP_API_BASE_URL;

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
            const res = await axios.post(`${API_BASE}/auth/google`, {
              idToken: response.credential
            });

            if (res.data) {
              const responseData = res.data;
              const decodedToken = JSON.parse(atob(response.credential.split('.')[1]));
              const userEmail = decodedToken?.email || "";
              const userName = decodedToken?.name || "";

              if (responseData === "exists") {
                setFormMessage({ text: "Google authentication successful! Welcome back to MomentumMerge.", type: "success" });
                localStorage.setItem("userRole", "USER");
                localStorage.setItem("registeredEmail", userEmail);
                
                const redirectPath = localStorage.getItem("redirectAfterLogin") || "/jobs";
                localStorage.removeItem("redirectAfterLogin");
                
                setTimeout(() => {
                  navigate(redirectPath);
                }, 1500);
                
              } else if (responseData === "registered") {
                setFormMessage({ text: "Registration successful with Google! Your career journey begins now.", type: "success" });
                localStorage.setItem("userRole", "USER");
                localStorage.setItem("registeredEmail", userEmail);
                
                const redirectPath = localStorage.getItem("redirectAfterLogin") || "/jobs";
                localStorage.removeItem("redirectAfterLogin");
                
                setTimeout(() => {
                  navigate(redirectPath);
                }, 1500);
                
              } else {
                setFormMessage({ text: "Google authentication successful! Redirecting to jobs...", type: "success" });
                localStorage.setItem("userRole", responseData);
                localStorage.setItem("registeredEmail", userEmail);
                
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

      google.accounts.id.renderButton(
        document.getElementById("mm-userregister-google-signin-div"),
        { theme: "outline", size: "large", text: "continue_with", width: "100%" }
      );
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const isStrongPassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[@$!%*?&]/.test(password);
    
    return minLength && hasUpper && hasLower && hasNumber && hasSpecial;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, phoneno, email, password } = userData;
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

    if (!isStrongPassword(password)) {
      setFormMessage({
        text: 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&).',
        type: 'error'
      });
      return;
    }

    try {
      const response = await axios.post(`${API_BASE}/api/auth/register`, {
        name,
        phoneno,
        email,
        password,
        role: 'user',
        termsAndConditions: acceptedTerms ? 'I agreed' : '',
        privacyPolicy: acceptedTerms ? 'I agreed' : ''
      });

      if (response.data.startsWith("Valid") || response.data.toLowerCase().includes("success")) {
        setFormMessage({ 
          text: 'Registration successful! Your MomentumMerge account has been created. Redirecting to your career dashboard...', 
          type: 'success' 
        });
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
    <div className="mm-userregister-container">
      <div className="mm-userregister-background"></div>
      
      <div className="mm-userregister-content">
        {/* Left Side - Benefits Section */}
        <div className="mm-userregister-benefits">
          <div className="mm-userregister-logo-section">
            <span className="mm-userregister-company-name">MomentumMerge</span>
          </div>
          
          <div className="mm-userregister-hero-content">
            <h1 className="mm-userregister-title">Create Your Account</h1>
            <h2 className="mm-userregister-subtitle">Unlock Your Career Potential</h2>
            <p className="mm-userregister-tagline">
              Join MomentumMerge and connect with opportunities that accelerate your career.
            </p>
          </div>

          <div className="mm-userregister-benefits-list">
            <h3>Why Join MomentumMerge?</h3>
            <div className="mm-userregister-benefit-item">
              <FiCheckCircle className="mm-userregister-benefit-icon" />
              <span>Get personalized job recommendations</span>
            </div>
            <div className="mm-userregister-benefit-item">
              <FiFileText className="mm-userregister-benefit-icon" />
              <span>Showcase your resume and skills</span>
            </div>
            <div className="mm-userregister-benefit-item">
              <FiTrendingUp className="mm-userregister-benefit-icon" />
              <span>Track applications in real-time</span>
            </div>
            <div className="mm-userregister-benefit-item">
              <FiUsers className="mm-userregister-benefit-icon" />
              <span>Connect with top recruiters instantly</span>
            </div>
          </div>
        </div>

        {/* Right Side - Form Section */}
        <div className="mm-userregister-form-container">
          <div className="mm-userregister-card">
            <div className="mm-userregister-form-header">
              <h2>Sign Up</h2>
              <p>Create your account to get started</p>
            </div>

            <form className="mm-userregister-form" onSubmit={handleSubmit}>
              {/* Custom Google Sign-In Button */}
              <button 
                type="button" 
                className="mm-userregister-custom-google-btn"
                onClick={() => document.getElementById("mm-userregister-google-signin-div").querySelector("div[role=button]").click()}
              >
                <img 
                  src="https://developers.google.com/identity/images/g-logo.png" 
                  alt="Google logo" 
                  className="mm-userregister-google-icon"
                />
                Continue with Google
              </button>

              <div className="mm-userregister-divider">
                <span>or sign up with email</span>
              </div>

              {formMessage.text && (
                <div className={`mm-userregister-message ${formMessage.type}`}>
                  {formMessage.text}
                </div>
              )}

              <div className="mm-userregister-input-group">
                <label className="mm-userregister-label">First Name</label>
                <div className="mm-userregister-input-wrapper">
                  <FiUser className="mm-userregister-input-icon" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your first name"
                    value={userData.name}
                    onChange={handleChange}
                    className="mm-userregister-input"
                    required
                  />
                </div>
              </div>

              <div className="mm-userregister-input-group">
                <label className="mm-userregister-label">Mobile Number</label>
                <div className="mm-userregister-input-wrapper">
                  <FiPhone className="mm-userregister-input-icon" />
                  <input
                    type="tel"
                    name="phoneno"
                    placeholder="Enter your mobile number"
                    value={userData.phoneno}
                    onChange={handleChange}
                    className="mm-userregister-input"
                    required
                  />
                </div>
              </div>

              <div className="mm-userregister-input-group">
                <label className="mm-userregister-label">Email Address</label>
                <div className="mm-userregister-input-wrapper">
                  <FiMail className="mm-userregister-input-icon" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    value={userData.email}
                    onChange={handleChange}
                    className="mm-userregister-input"
                    required
                  />
                </div>
              </div>

              <div className="mm-userregister-input-group">
                <label className="mm-userregister-label">Password</label>
                <div className="mm-userregister-input-wrapper">
                  <FiLock className="mm-userregister-input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Create a strong password"
                    value={userData.password}
                    onChange={handleChange}
                    className="mm-userregister-input"
                    required
                  />
                  <button
                    type="button"
                    className="mm-userregister-password-toggle"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FiEye /> : <FiEyeOff />}
                  </button>
                </div>
              </div>

              <div className="mm-userregister-terms-group">
                <label className="mm-userregister-checkbox-label">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mm-userregister-checkbox"
                  />
                  {/* <span className="mm-userregister-checkmark"></span> */}
                  <span className="mm-userregister-terms-text">
                    I agree to the{' '}
                    <Link to="/terms&conditions" className="mm-userregister-link" target="_blank" rel="noopener noreferrer">
                      Terms of Use
                    </Link>
                    {' '}and{' '}
                    <Link to="/privacypolicy" className="mm-userregister-link" target="_blank" rel="noopener noreferrer">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className={`mm-userregister-submit-btn ${!acceptedTerms ? 'disabled' : ''}`}
                disabled={!acceptedTerms}
              >
                Create Account
              </button>

              <div className="mm-userregister-login-link">
                Already have an account?{' '}
                <Link to="/login" className="mm-userregister-link">Login</Link>
              </div>
            </form>
            
            {/* Hidden Google signin div for functionality */}
            <div id="mm-userregister-google-signin-div" style={{ display: 'none' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};