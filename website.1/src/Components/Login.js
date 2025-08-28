// import React, { useState, useEffect } from 'react';
// import '../Styles/Login.css';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import '@fortawesome/fontawesome-free/css/all.min.css';

// export const Login = () => {
//     const [showPassword, setShowPassword] = useState(false);
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const navigate = useNavigate();

//     const togglePasswordVisibility = () => {
//         setShowPassword((prev) => !prev);
//     };

//     useEffect(() => {
//         const isLoggedIn = localStorage.getItem("userRole");
//         if (isLoggedIn) {
//             navigate("/jobs");
//         }
//     }, [navigate]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post("http://localhost:8080/api/auth/login", null, {
//                 params: { email, password }
//             });

//             const userRole = response.data;
//             alert("Login successful as " + userRole);
//             localStorage.setItem("userRole", userRole);
//             localStorage.setItem("registeredEmail",email);

//             const redirectPath = localStorage.getItem("redirectAfterLogin") || "/jobs";
//             localStorage.removeItem("redirectAfterLogin");
//             navigate(redirectPath);
            
//         } catch (error) {
//             alert("Invalid email or password!");
//         }
//     };

//     const handleLogout = () => {
//         localStorage.removeItem("userRole");
//         setIsLoggedIn(false);
//         navigate("/");
//     };

//     const redirectToHome = () => {
//     navigate('/');
//   };

//     return (
//         <div className="login-body">
//             <div className="login-container">
//                 {/* Left Side with Image */}
//                 <div className="login-left">
//                     <img src="/LoginImage.jpg" alt="MomentumMerge" className="login-image" />
//                 </div>

//                 {/* Right Side with Login Form */}
//                 <div className="login-right">
//                     <div className="login-form-container">
//                         <div className="login-header">
//                         <img 
//                         src="/Logoo.png" 
//                         alt="MomentumMerge Logo" 
//                         className="login-logo" 
//                         onClick={redirectToHome}
//                         style={{ cursor: 'pointer' }}
//                         />
//                      <h1 className="login-company-name">MomentumMerge</h1>
//                         </div>

//                         {isLoggedIn ? (
//                             <div className="login-content">
//                                 <h3 className="login-h3">You are logged in</h3>
//                                 <button className="login-button" onClick={handleLogout}>
//                                     Logout
//                                 </button>
//                             </div>
//                         ) : (
//                             <form className="login-content" onSubmit={handleSubmit}>
//                                 <h3 className="login-h3">Welcome Back</h3>
                                
//                                 {/* Email Field */}
//                                 <div className="login-input-group">
//                                     <label htmlFor="email">Email</label>
//                                     <div className="login-input-field">
//                                         <input
//                                             type="email"
//                                             id="email"
//                                             placeholder="Enter your email"
//                                             value={email}
//                                             onChange={(e) => setEmail(e.target.value)}
//                                             required
//                                         />
//                                         <i className="fa fa-envelope icon"></i>
//                                     </div>
//                                 </div>

//                                 {/* Password Field */}
//                                 <div className="login-input-group">
//                                     <label htmlFor="password">Password</label>
//                                     <div className="login-input-field">
//                                         <input
//                                             type={showPassword ? 'text' : 'password'}
//                                             id="password"
//                                             placeholder="Enter your password"
//                                             value={password}
//                                             onChange={(e) => setPassword(e.target.value)}
//                                             autoComplete="off"
//                                             required
//                                         />
//                                         <i className="fa fa-lock icon"></i>
//                                         <i
//                                             className={`fa ${showPassword ? 'fa-eye' : 'fa-eye-slash'} password-toggle`}
//                                             onClick={togglePasswordVisibility}
//                                         ></i>
//                                     </div>
//                                 </div>

//                                 <div className="login-options">
//                                     <Link to="/forgot-password" className="login-forgot">Forgot password?</Link>
//                                 </div>

//                                 <button type="submit" className="login-button">Login</button>

//                                 <div className="login-register">
//                                     <span>Don't have an account? </span>
//                                     <Link to="/register" className="login-register-link">Sign Up</Link><br></br>
//                                     <span>Continue without signin?</span>
//                                     <Link to="/" className="login-register-link">EXPLORE</Link>
//                                 </div>
//                             </form>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;

 

// import React, { useState, useEffect } from 'react';
// import '../Styles/Login.css';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import '@fortawesome/fontawesome-free/css/all.min.css';

// export const Login = () => {
//     const [showPassword, setShowPassword] = useState(false);
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [formMessage, setFormMessage] = useState({ text: '', type: '' });
//     const navigate = useNavigate();

//     const togglePasswordVisibility = () => {
//         setShowPassword((prev) => !prev);
//     };

//     const API_BASE = process.env.REACT_APP_API_BASE_URL;


//     useEffect(() => {
//         const isLoggedIn = localStorage.getItem("userRole");
//         if (isLoggedIn) {
//             navigate("/jobs");
//         }
//     }, [navigate]);

//     // Google Sign-In initialization
//     useEffect(() => {
//         /* global google */
//         if (window.google) {
//             google.accounts.id.initialize({
//                 client_id: "1093967708101-qfvpm2i4217udqpq79k6cuqm9saj7ji1.apps.googleusercontent.com",
//                 callback: async (response) => {
//                     try {
//                         const res = await axios.post(`${API_BASE}/auth/google`, {
//                             idToken: response.credential
//                         });

//                         if (res.data) {
//                             const responseData = res.data;
                            
//                             // Extract email from token
//                             const decodedToken = JSON.parse(atob(response.credential.split('.')[1]));
//                             const userEmail = decodedToken?.email || "";
//                             const userName = decodedToken?.name || "";

//                             // Handle different response scenarios
//                             if (responseData === "exists") {
//                                 // User already exists, treat as login
//                                 setFormMessage({ text: "Google login successful! Redirecting to jobs...", type: "success" });
                                
//                                 // Save user data to localStorage
//                                 localStorage.setItem("userRole", "USER");
//                                 localStorage.setItem("registeredEmail", userEmail);
                                
//                                 // Redirect to jobs
//                                 const redirectPath = localStorage.getItem("redirectAfterLogin") || "/jobs";
//                                 localStorage.removeItem("redirectAfterLogin");
                                
//                                 setTimeout(() => {
//                                     navigate(redirectPath);
//                                 }, 1500);
                                
//                             } else if (responseData === "registered") {
//                                 // New user registered via Google login
//                                 setFormMessage({ text: "Registration successful with Google! Redirecting to jobs...", type: "success" });
                                
//                                 // Save user data to localStorage
//                                 localStorage.setItem("userRole", "USER");
//                                 localStorage.setItem("registeredEmail", userEmail);
                                
//                                 // Redirect to jobs
//                                 const redirectPath = localStorage.getItem("redirectAfterLogin") || "/jobs";
//                                 localStorage.removeItem("redirectAfterLogin");
                                
//                                 setTimeout(() => {
//                                     navigate(redirectPath);
//                                 }, 1500);
                                
//                             } else {
//                                 // Handle other response types (like direct role response)
//                                 setFormMessage({ text: "Google authentication successful! Redirecting to jobs...", type: "success" });
                                
//                                 // Save user data to localStorage
//                                 localStorage.setItem("userRole", responseData);
//                                 localStorage.setItem("registeredEmail", userEmail);
                                
//                                 // Redirect to jobs
//                                 const redirectPath = localStorage.getItem("redirectAfterLogin") || "/jobs";
//                                 localStorage.removeItem("redirectAfterLogin");
                                
//                                 setTimeout(() => {
//                                     navigate(redirectPath);
//                                 }, 1500);
//                             }
//                         } else {
//                             setFormMessage({ text: "Unexpected response from server.", type: "error" });
//                         }
//                     } catch (error) {
//                         console.error("Google authentication error:", error);
//                         let errorMessage = "Google authentication failed";
                        
//                         if (error.response?.data) {
//                             if (error.response.data === "invalid_token") {
//                                 errorMessage = "Invalid Google token. Please try again.";
//                             } else if (error.response.data === "error") {
//                                 errorMessage = "Server error during Google authentication. Please try again.";
//                             } else {
//                                 errorMessage = error.response.data;
//                             }
//                         } else if (error.message) {
//                             errorMessage = error.message;
//                         }
                        
//                         setFormMessage({ text: errorMessage, type: "error" });
//                     }
//                 }
//             });

//             // Render Google button inside #googleSignInDiv
//             google.accounts.id.renderButton(
//                 document.getElementById("googleSignInDiv"),
//                 { theme: "outline", size: "large", text: "continue_with", width: "300" }
//             );
//         }
//     }, [navigate]);

//     const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//         const response = await axios.post(`${API_BASE}/api/auth/login`, null, {
//             params: { email, password }
//         });

//         const userRole = response.data;
//         alert("Login successful as " + userRole);
//         localStorage.setItem("userRole", userRole);
//         localStorage.setItem("registeredEmail", email);

//         const redirectPath = localStorage.getItem("redirectAfterLogin") || "/jobs";
//         localStorage.removeItem("redirectAfterLogin");
        
//         setTimeout(() => {
//             navigate(redirectPath);
//         }, 1500);
        
//     } catch (error) {
//         alert("Invalid email or password!");
//     }
// };
//     const handleLogout = () => {
//         localStorage.removeItem("userRole");
//         localStorage.removeItem("registeredEmail");
//         setIsLoggedIn(false);
//         navigate("/");
//     };

//     const redirectToHome = () => {
//         navigate('/');
//     };

//     return (
//         <div className="login-body">
//             <div className="login-container">
//                 {/* Left Side with Image */}
//                 <div className="login-left">
//                     <img src="/LoginImage.jpg" alt="MomentumMerge" className="login-image" />
//                 </div>

//                 {/* Right Side with Login Form */}
//                 <div className="login-right">
//                     <div className="login-form-container">
//                         <div className="login-header">
//                             <img 
//                                 src="/Logoo.png" 
//                                 alt="MomentumMerge Logo" 
//                                 className="login-logo" 
//                                 onClick={redirectToHome}
//                                 style={{ cursor: 'pointer' }}
//                             />
//                             <h1 className="login-company-name">MomentumMerge</h1>
//                         </div>

//                         {isLoggedIn ? (
//                             <div className="login-content">
//                                 <h3 className="login-h3">You are logged in</h3>
//                                 <button className="login-button" onClick={handleLogout}>
//                                     Logout
//                                 </button>
//                             </div>
//                         ) : (
//                             <form className="login-content" onSubmit={handleSubmit}>
//                                 <h3 className="login-h3">Welcome Back</h3>
                                
//                                 {/* Google Sign-In Button - Added at the top */}
//                                 <div className="google-signin-container" style={{ marginBottom: '20px', textAlign: 'center' }}>
//                                     <div id="googleSignInDiv"></div>
//                                 </div>

//                                 {/* Form Message */}
//                                 {formMessage.text && (  
//                                     <div className={`login-message ${formMessage.type}`}>
//                                         {formMessage.text}
//                                     </div>
//                                 )}
                                
//                                 {/* Email Field */}
//                                 <div className="login-input-group">
//                                     <label htmlFor="email">Email</label>
//                                     <div className="login-input-field">
//                                         <input
//                                             type="email"
//                                             id="email"
//                                             placeholder="Enter your email"
//                                             value={email}
//                                             onChange={(e) => setEmail(e.target.value)}
//                                             required
//                                         />
//                                         <i className="fa fa-envelope icon"></i>
//                                     </div>
//                                 </div>

//                                 {/* Password Field */}
//                                 <div className="login-input-group">
//                                     <label htmlFor="password">Password</label>
//                                     <div className="login-input-field">
//                                         <input
//                                             type={showPassword ? 'text' : 'password'}
//                                             id="password"
//                                             placeholder="Enter your password"
//                                             value={password}
//                                             onChange={(e) => setPassword(e.target.value)}
//                                             autoComplete="off"
//                                             required
//                                         />
//                                         <i className="fa fa-lock icon"></i>
//                                         <i
//                                             className={`fa ${showPassword ? 'fa-eye' : 'fa-eye-slash'} password-toggle`}
//                                             onClick={togglePasswordVisibility}
//                                         ></i>
//                                     </div>
//                                 </div>

//                                 <div className="login-options">
//                                     <Link to="/forgot-password" className="login-forgot">Forgot password?</Link>
//                                 </div>

//                                 <button type="submit" className="login-button">Login</button>

//                                 <div className="login-register">
//                                     <span>Don't have an account? </span>
//                                     <Link to="/register" className="login-register-link">Sign Up</Link><br />
//                                     <span>Continue without signin? </span>
//                                     <Link to="/" className="login-register-link">EXPLORE</Link>
//                                 </div>
//                             </form>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;


// import React, { useState, useEffect } from "react";
// import "../Styles/Login.css";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// export const Login = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [formMessage, setFormMessage] = useState({ text: "", type: "" });
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const API_BASE = process.env.REACT_APP_API_BASE_URL;
//   const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

//   // Helper for successful login
//   const handleSuccessfulLogin = (role, email, redirectTo = "/jobs") => {
//     localStorage.setItem("userRole", role);
//     localStorage.setItem("registeredEmail", email);

//     const redirectPath = localStorage.getItem("redirectAfterLogin") || redirectTo;
//     localStorage.removeItem("redirectAfterLogin");

//     navigate(redirectPath);
//   };

//   // Auto-redirect if already logged in
//   useEffect(() => {
//     if (localStorage.getItem("userRole")) {
//       navigate("/jobs");
//     }
//   }, [navigate]);

//   // Google Sign-In setup
//   useEffect(() => {
//     /* global google */
//     if (window.google) {
//       google.accounts.id.initialize({
//         client_id:
//           "1093967708101-qfvpm2i4217udqpq79k6cuqm9saj7ji1.apps.googleusercontent.com",
//         callback: async (response) => {
//           try {
//             const res = await axios.post(`${API_BASE}/auth/google`, {
//               idToken: response.credential,
//             });

//             const responseData = res.data;
//             const decodedToken = JSON.parse(
//               atob(response.credential.split(".")[1])
//             );
//             const userEmail = decodedToken?.email || "";
//             const userName = decodedToken?.name || "";

//             if (responseData === "exists") {
//               setFormMessage({
//                 text: "Welcome back! Redirecting...",
//                 type: "success",
//               });
//               handleSuccessfulLogin("USER", userEmail);
//             } else if (responseData === "registered") {
//               setFormMessage({
//                 text: "Account created with Google! Redirecting...",
//                 type: "success",
//               });
//               handleSuccessfulLogin("USER", userEmail);
//             } else {
//               setFormMessage({
//                 text: "Login successful! Redirecting...",
//                 type: "success",
//               });
//               handleSuccessfulLogin(responseData, userEmail);
//             }
//           } catch (error) {
//             console.error("Google authentication error:", error);
//             const errorMessage =
//               error.response?.data === "invalid_token"
//                 ? "Invalid Google token. Please try again."
//                 : error.response?.data === "error"
//                 ? "Server error during Google authentication. Try again."
//                 : error.message || "Google authentication failed.";
//             setFormMessage({ text: errorMessage, type: "error" });
//           }
//         },
//       });

//       google.accounts.id.renderButton(
//         document.getElementById("googleSignInDiv"),
//         { theme: "outline", size: "large", text: "continue_with", width: "300" }
//       );
//     }
//   }, [navigate, API_BASE]);

//   // Normal login handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setFormMessage({ text: "", type: "" });

//     try {
//       const response = await axios.post(`${API_BASE}/api/auth/login`, {
//         email,
//         password,
//       });

//       const userRole = response.data;
//       setFormMessage({
//         text: `Login successful as ${userRole}. Redirecting...`,
//         type: "success",
//       });

//       handleSuccessfulLogin(userRole, email);
//     } catch (error) {
//       const message =
//         error.response?.data?.message || "Invalid email or password!";
//       setFormMessage({ text: message, type: "error" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-body">
//       <div className="login-container">
//         {/* Left Side with Image */}
//         <div className="login-left">
//           <img
//             src="/LoginImage.jpg"
//             alt="MomentumMerge"
//             className="login-image"
//           />
//         </div>

//         {/* Right Side with Login Form */}
//         <div className="login-right">
//           <div className="login-form-container">
//             <div className="login-header">
//               <img
//                 src="/Logoo.png"
//                 alt="MomentumMerge Logo"
//                 className="login-logo clickable"
//                 onClick={() => navigate("/")}
//               />
//               <h1 className="login-company-name">MomentumMerge</h1>
//             </div>

//             <form className="login-content" onSubmit={handleSubmit}>
//               <h3 className="login-h3">Welcome Back</h3>

//               {/* Google Sign-In Button */}
//               <div className="google-signin-container">
//                 <div id="googleSignInDiv"></div>
//               </div>

//               {/* Feedback Message */}
//               {formMessage.text && (
//                 <div className={`login-message ${formMessage.type}`}>
//                   {formMessage.text}
//                 </div>
//               )}

//               {/* Email Field */}
//               <div className="login-input-group">
//                 <label htmlFor="email">Email</label>
//                 <div className="login-input-field">
//                   <input
//                     type="email"
//                     id="email"
//                     placeholder="Enter your email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                   <i className="fa fa-envelope icon"></i>
//                 </div>
//               </div>

//               {/* Password Field */}
//               <div className="login-input-group">
//                 <label htmlFor="password">Password</label>
//                 <div className="login-input-field">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     id="password"
//                     placeholder="Enter your password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     autoComplete="off"
//                     required
//                   />
//                   <i className="fa fa-lock icon"></i>
//                   <i
//                     className={`fa ${
//                       showPassword ? "fa-eye" : "fa-eye-slash"
//                     } password-toggle`}
//                     onClick={() => setShowPassword((prev) => !prev)}
//                   ></i>
//                 </div>
//               </div>

//               <div className="login-options">
//                 <Link to="/forgot-password" className="login-forgot">
//                   Forgot password?
//                 </Link>
//               </div>

//               <button type="submit" className="login-button" disabled={loading}>
//                 {loading ? "Logging in..." : "Login"}
//               </button>

//               <div className="login-register">
//                 <span>Don't have an account? </span>
//                 <Link to="/register" className="login-register-link">
//                   Sign Up
//                 </Link>
//                 <br />
//                 <span>Continue without signing in? </span>
//                 <Link to="/" className="login-register-link">
//                   EXPLORE
//                 </Link>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


// import React, { useState, useEffect } from "react";
// import "../Styles/Login.css";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";

// export const Login = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [formMessage, setFormMessage] = useState({ text: "", type: "" });
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const API_BASE = process.env.REACT_APP_API_BASE_URL;
//   const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

//   // Helper for successful login
//   const handleSuccessfulLogin = (role, email, redirectTo = "/jobs") => {
//     localStorage.setItem("userRole", role);
//     localStorage.setItem("registeredEmail", email);

//     const redirectPath = localStorage.getItem("redirectAfterLogin") || redirectTo;
//     localStorage.removeItem("redirectAfterLogin");

//     navigate(redirectPath);
//   };

//   // Auto-redirect if already logged in
//   useEffect(() => {
//     if (localStorage.getItem("userRole")) {
//       navigate("/jobs");
//     }
//   }, [navigate]);

//   // Google Sign-In setup
//   useEffect(() => {
//     /* global google */
//     if (window.google) {
//       google.accounts.id.initialize({
//         client_id: "1093967708101-qfvpm2i4217udqpq79k6cuqm9saj7ji1.apps.googleusercontent.com",
//         callback: async (response) => {
//           try {
//             const res = await axios.post(`${API_BASE}/auth/google`, {
//               idToken: response.credential,
//             });

//             const responseData = res.data;
//             const decodedToken = JSON.parse(
//               atob(response.credential.split(".")[1])
//             );
//             const userEmail = decodedToken?.email || "";
//             const userName = decodedToken?.name || "";

//             if (responseData === "exists") {
//               setFormMessage({
//                 text: "Welcome back! Redirecting...",
//                 type: "success",
//               });
//               handleSuccessfulLogin("USER", userEmail);
//             } else if (responseData === "registered") {
//               setFormMessage({
//                 text: "Account created with Google! Redirecting...",
//                 type: "success",
//               });
//               handleSuccessfulLogin("USER", userEmail);
//             } else {
//               setFormMessage({
//                 text: "Login successful! Redirecting...",
//                 type: "success",
//               });
//               handleSuccessfulLogin(responseData, userEmail);
//             }
//           } catch (error) {
//             console.error("Google authentication error:", error);
//             const errorMessage =
//               error.response?.data === "invalid_token"
//                 ? "Invalid Google token. Please try again."
//                 : error.response?.data === "error"
//                 ? "Server error during Google authentication. Try again."
//                 : error.message || "Google authentication failed.";
//             setFormMessage({ text: errorMessage, type: "error" });
//           }
//         },
//       });

//       // Render Google Sign-In button
//       google.accounts.id.renderButton(
//         document.getElementById("googleSignInDiv"),
//         { 
//           theme: "outline", 
//           size: "large", 
//           text: "continue_with", 
//           width: "100%",
//           shape: "rectangular"
//         }
//       );
//     }
//   }, [navigate, API_BASE]);

//   // Normal login handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setFormMessage({ text: "", type: "" });

//     try {
//       const response = await axios.post(`${API_BASE}/api/auth/login`, {
//         email,
//         password,
//       });

//       const userRole = response.data;
//       setFormMessage({
//         text: `Login successful as ${userRole}. Redirecting...`,
//         type: "success",
//       });

//       handleSuccessfulLogin(userRole, email);
//     } catch (error) {
//       const message =
//         error.response?.data?.message || "Invalid email or password!";
//       setFormMessage({ text: message, type: "error" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-body">
//       {/* Background decorative elements */}
//       <div className="login-background">
//         <div className="floating-shape shape-1"></div>
//         <div className="floating-shape shape-2"></div>
//         <div className="floating-shape shape-3"></div>
//         <div className="floating-icon icon-1">
//           <i className="fas fa-briefcase"></i>
//         </div>
//         <div className="floating-icon icon-2">
//           <i className="fas fa-chart-line"></i>
//         </div>
//         <div className="floating-icon icon-3">
//           <i className="fas fa-users"></i>
//         </div>
//       </div>

//       <div className="login-container">
//         {/* Left Side - Welcome Content */}
//         <div className="login-left">
//           <div className="welcome-content">
//             <h1 className="welcome-title">
//               Welcome Back to
//               <span className="brand-name">MomentumMerge</span>
//             </h1>
//             <p className="welcome-subtitle">
//               Your career journey starts here – find opportunities that match your skills and accelerate your professional growth.
//             </p>
            
//             <div className="feature-highlights">
//               <div className="feature-item">
//                 <div className="feature-icon">
//                   <i className="fas fa-briefcase"></i>
//                 </div>
//                 <span>Access thousands of job opportunities</span>
//               </div>
//               <div className="feature-item">
//                 <div className="feature-icon">
//                   <i className="fas fa-chart-line"></i>
//                 </div>
//                 <span>Track your career progress</span>
//               </div>
//               <div className="feature-item">
//                 <div className="feature-icon">
//                   <i className="fas fa-users"></i>
//                 </div>
//                 <span>Connect with top employers</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Side - Login Form */}
//         <div className="login-right">
//           <div className="login-form-container">
//             {/* Logo and Header */}
//             <div className="login-header">
//               <div 
//                 className="login-logo-container"
//                 onClick={() => navigate("/")}
//               >
//                 <i className="fas fa-briefcase logo-icon"></i>
//               </div>
//               <h2 className="login-title">Welcome Back</h2>
//               <p className="login-subtitle">Sign in to continue your journey</p>
//             </div>

//             <form className="login-form" onSubmit={handleSubmit}>
//               {/* Google Sign-In Button */}
//               <div className="google-signin-container">
//                 <div id="googleSignInDiv"></div>
//               </div>

//               {/* Divider */}
//               <div className="login-divider">
//                 <span>Or continue with email</span>
//               </div>

//               {/* Feedback Message */}
//               {formMessage.text && (
//                 <div className={`login-message ${formMessage.type}`}>
//                   <i className={`fas ${formMessage.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
//                   {formMessage.text}
//                 </div>
//               )}

//               {/* Email Field */}
//               <div className="login-input-group">
//                 <label htmlFor="email" className="login-label">Email Address</label>
//                 <div className="login-input-field">
//                   <i className="fas fa-envelope input-icon"></i>
//                   <input
//                     type="email"
//                     id="email"
//                     placeholder="Enter your email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Password Field */}
//               <div className="login-input-group">
//                 <label htmlFor="password" className="login-label">Password</label>
//                 <div className="login-input-field">
//                   <i className="fas fa-lock input-icon"></i>
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     id="password"
//                     placeholder="Enter your password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     autoComplete="off"
//                     required
//                   />
//                   <i
//                     className={`fas ${showPassword ? "fa-eye" : "fa-eye-slash"} password-toggle`}
//                     onClick={() => setShowPassword((prev) => !prev)}
//                   ></i>
//                 </div>
//               </div>

//               {/* Forgot Password Link */}
//               <div className="login-options">
//                 <Link to="/forgot-password" className="login-forgot">
//                   Forgot password?
//                 </Link>
//               </div>

//               {/* Login Button */}
//               <button type="submit" className="login-button" disabled={loading}>
//                 {loading ? (
//                   <>
//                     <div className="loading-spinner"></div>
//                     <span>Signing in...</span>
//                   </>
//                 ) : (
//                   <>
//                     <span>Sign In</span>
//                     <i className="fas fa-arrow-right button-arrow"></i>
//                   </>
//                 )}
//               </button>

//               {/* Sign Up and Guest Links */}
//               <div className="login-footer">
//                 <div className="login-register">
//                   <span>Don't have an account? </span>
//                   <Link to="/register" className="login-register-link">
//                     Sign Up
//                   </Link>
//                 </div>
//                 <div className="login-register">
//                   <span>Continue without signing in? </span>
//                   <Link to="/" className="login-register-link guest-link">
//                     Explore as Guest
//                   </Link>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

// import React, { useState, useEffect } from "react";
// import "../Styles/Login.css";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";

// export const Login = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [formMessage, setFormMessage] = useState({ text: "", type: "" });
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const API_BASE = process.env.REACT_APP_API_BASE_URL;
//   const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

//   // Helper for successful login
//   const handleSuccessfulLogin = (role, email, redirectTo = "/jobs") => {
//     localStorage.setItem("userRole", role);
//     localStorage.setItem("registeredEmail", email);

//     const redirectPath = localStorage.getItem("redirectAfterLogin") || redirectTo;
//     localStorage.removeItem("redirectAfterLogin");

//     navigate(redirectPath);
//   };

//   // Auto-redirect if already logged in
//   useEffect(() => {
//     if (localStorage.getItem("userRole")) {
//       navigate("/jobs");
//     }
//   }, [navigate]);

//   // Google Sign-In setup
//   useEffect(() => {
//     /* global google */
//     if (window.google) {
//       google.accounts.id.initialize({
//         client_id: "1093967708101-qfvpm2i4217udqpq79k6cuqm9saj7ji1.apps.googleusercontent.com",
//         callback: async (response) => {
//           try {
//             const res = await axios.post(`${API_BASE}/auth/google`, {
//               idToken: response.credential,
//             });

//             const responseData = res.data;
//             const decodedToken = JSON.parse(
//               atob(response.credential.split(".")[1])
//             );
//             const userEmail = decodedToken?.email || "";
//             const userName = decodedToken?.name || "";

//             if (responseData === "exists") {
//               setFormMessage({
//                 text: "Welcome back! Redirecting...",
//                 type: "success",
//               });
//               handleSuccessfulLogin("USER", userEmail);
//             } else if (responseData === "registered") {
//               setFormMessage({
//                 text: "Account created with Google! Redirecting...",
//                 type: "success",
//               });
//               handleSuccessfulLogin("USER", userEmail);
//             } else {
//               setFormMessage({
//                 text: "Login successful! Redirecting...",
//                 type: "success",
//               });
//               handleSuccessfulLogin(responseData, userEmail);
//             }
//           } catch (error) {
//             console.error("Google authentication error:", error);
//             const errorMessage =
//               error.response?.data === "invalid_token"
//                 ? "Invalid Google token. Please try again."
//                 : error.response?.data === "error"
//                 ? "Server error during Google authentication. Try again."
//                 : error.message || "Google authentication failed.";
//             setFormMessage({ text: errorMessage, type: "error" });
//           }
//         },
//       });

//       // Custom Google Sign-In button - we'll style it ourselves
//       google.accounts.id.renderButton(
//         document.getElementById("googleSignInDiv"),
//         { 
//           theme: "outline", 
//           size: "large", 
//           text: "continue_with",
//           width: "100%",
//           shape: "pill"
//         }
//       );
//     }
//   }, [navigate, API_BASE]);

//   // Normal login handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setFormMessage({ text: "", type: "" });

//     try {
//       const response = await axios.post(`${API_BASE}/api/auth/login`, {
//         email,
//         password,
//       });

//       const userRole = response.data;
//       setFormMessage({
//         text: `Login successful as ${userRole}. Redirecting...`,
//         type: "success",
//       });

//       handleSuccessfulLogin(userRole, email);
//     } catch (error) {
//       const message =
//         error.response?.data?.message || "Invalid email or password!";
//       setFormMessage({ text: message, type: "error" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="mm-userlogin-body">
//       {/* Background decorative elements */}
//       <div className="mm-userlogin-background">
//         <div className="mm-userlogin-career-path"></div>
//         <div className="mm-userlogin-floating-shape mm-userlogin-shape-1"></div>
//         <div className="mm-userlogin-floating-shape mm-userlogin-shape-2"></div>
//         <div className="mm-userlogin-floating-shape mm-userlogin-shape-3"></div>
//         <div className="mm-userlogin-floating-icon mm-userlogin-icon-1">
//           <i className="fas fa-briefcase"></i>
//         </div>
//         <div className="mm-userlogin-floating-icon mm-userlogin-icon-2">
//           <i className="fas fa-chart-line"></i>
//         </div>
//         <div className="mm-userlogin-floating-icon mm-userlogin-icon-3">
//           <i className="fas fa-users"></i>
//         </div>
//       </div>

//       <div className="mm-userlogin-container">
//         {/* Left Side - Welcome Content */}
//         <div className="mm-userlogin-left">
//           <div className="mm-userlogin-welcome-content">
//             <h1 className="mm-userlogin-welcome-title">
//               Welcome Back to
//               <span className="mm-userlogin-brand-name">MomentumMerge</span>
//             </h1>
//             <p className="mm-userlogin-welcome-subtitle">
//               Your career journey starts here – find opportunities that match your skills and accelerate your professional growth.
//             </p>
            
//             <div className="mm-userlogin-feature-highlights">
//               <div className="mm-userlogin-feature-item">
//                 <div className="mm-userlogin-feature-icon">
//                   <i className="fas fa-briefcase"></i>
//                 </div>
//                 <span>Access thousands of job opportunities</span>
//               </div>
//               <div className="mm-userlogin-feature-item">
//                 <div className="mm-userlogin-feature-icon">
//                   <i className="fas fa-chart-line"></i>
//                 </div>
//                 <span>Track your career progress</span>
//               </div>
//               <div className="mm-userlogin-feature-item">
//                 <div className="mm-userlogin-feature-icon">
//                   <i className="fas fa-users"></i>
//                 </div>
//                 <span>Connect with top employers</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Side - Login Form */}
//         <div className="mm-userlogin-right">
//           <div className="mm-userlogin-form-container">
//             {/* Header */}
//             <div className="mm-userlogin-header">
//               <h2 className="mm-userlogin-title">Welcome Back</h2>
//               <p className="mm-userlogin-subtitle">Sign in to continue your journey</p>
//             </div>

//             <form className="mm-userlogin-form" onSubmit={handleSubmit}>
//               {/* Google Sign-In Button */}
//               <div className="mm-userlogin-google-signin-wrapper">
//                 <button type="button" className="mm-userlogin-google-button">
//                   <svg className="mm-userlogin-google-icon" viewBox="0 0 24 24" width="20" height="20">
//                     <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
//                     <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
//                     <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
//                     <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
//                   </svg>
//                   Continue with Google
//                 </button>
//                 <div id="googleSignInDiv" style={{ display: 'none' }}></div>
//               </div>

//               {/* Divider */}
//               <div className="mm-userlogin-divider">
//                 <span>or continue with email</span>
//               </div>

//               {/* Feedback Message */}
//               {formMessage.text && (
//                 <div className={`mm-userlogin-message ${formMessage.type}`}>
//                   <i className={`fas ${formMessage.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
//                   {formMessage.text}
//                 </div>
//               )}

//               {/* Email Field */}
//               <div className="mm-userlogin-input-group">
//                 <label htmlFor="email" className="mm-userlogin-label">Email Address</label>
//                 <div className="mm-userlogin-input-field">
//                   <i className="fas fa-envelope mm-userlogin-input-icon"></i>
//                   <input
//                     type="email"
//                     id="email"
//                     placeholder="Enter your email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Password Field */}
//               <div className="mm-userlogin-input-group">
//                 <label htmlFor="password" className="mm-userlogin-label">Password</label>
//                 <div className="mm-userlogin-input-field">
//                   <i className="fas fa-lock mm-userlogin-input-icon"></i>
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     id="password"
//                     placeholder="Enter your password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     autoComplete="off"
//                     required
//                   />
//                   <i
//                     className={`fas ${showPassword ? "fa-eye" : "fa-eye-slash"} mm-userlogin-password-toggle`}
//                     onClick={() => setShowPassword((prev) => !prev)}
//                   ></i>
//                 </div>
//               </div>

//               {/* Forgot Password Link */}
//               <div className="mm-userlogin-options">
//                 <Link to="/forgot-password" className="mm-userlogin-forgot">
//                   Forgot password?
//                 </Link>
//               </div>

//               {/* Login Button */}
//               <button type="submit" className="mm-userlogin-button" disabled={loading}>
//                 {loading ? (
//                   <>
//                     <div className="mm-userlogin-loading-spinner"></div>
//                     <span>Signing in...</span>
//                   </>
//                 ) : (
//                   <>
//                     <span>Sign In</span>
//                     <i className="fas fa-arrow-right mm-userlogin-button-arrow"></i>
//                   </>
//                 )}
//               </button>

//               {/* Sign Up and Guest Links */}
//               <div className="mm-userlogin-footer">
//                 <div className="mm-userlogin-register">
//                   <span>Don't have an account? </span>
//                   <Link to="/register" className="mm-userlogin-register-link">
//                     Sign Up
//                   </Link>
//                 </div>
//                 <div className="mm-userlogin-register">
//                   <span>Continue without signing in? </span>
//                   <Link to="/" className="mm-userlogin-register-link mm-userlogin-guest-link">
//                     Explore as Guest
//                   </Link>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState, useEffect } from "react";
import "../Styles/Login.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formMessage, setFormMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const API_BASE = process.env.REACT_APP_API_BASE_URL;
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  // Helper for successful login
  const handleSuccessfulLogin = (role, email, redirectTo = "/jobs") => {
    localStorage.setItem("userRole", role);
    localStorage.setItem("registeredEmail", email);

    const redirectPath = localStorage.getItem("redirectAfterLogin") || redirectTo;
    localStorage.removeItem("redirectAfterLogin");

    navigate(redirectPath);
  };

  // Auto-redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem("userRole")) {
      navigate("/jobs");
    }
  }, [navigate]);

  // Google Sign-In setup
  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: "1093967708101-qfvpm2i4217udqpq79k6cuqm9saj7ji1.apps.googleusercontent.com",
        callback: async (response) => {
          try {
            const res = await axios.post(`${API_BASE}/auth/google`, {
              idToken: response.credential,
            });

            const responseData = res.data;
            const decodedToken = JSON.parse(
              atob(response.credential.split(".")[1])
            );
            const userEmail = decodedToken?.email || "";
            const userName = decodedToken?.name || "";

            if (responseData === "exists") {
              setFormMessage({
                text: "Welcome back! Redirecting...",
                type: "success",
              });
              handleSuccessfulLogin("USER", userEmail);
            } else if (responseData === "registered") {
              setFormMessage({
                text: "Account created with Google! Redirecting...",
                type: "success",
              });
              handleSuccessfulLogin("USER", userEmail);
            } else {
              setFormMessage({
                text: "Login successful! Redirecting...",
                type: "success",
              });
              handleSuccessfulLogin(responseData, userEmail);
            }
          } catch (error) {
            console.error("Google authentication error:", error);
            const errorMessage =
              error.response?.data === "invalid_token"
                ? "Invalid Google token. Please try again."
                : error.response?.data === "error"
                ? "Server error during Google authentication. Try again."
                : error.message || "Google authentication failed.";
            setFormMessage({ text: errorMessage, type: "error" });
          }
        },
      });

      // Render the actual Google button but hide it
      google.accounts.id.renderButton(
        document.getElementById("googleSignInDiv"),
        { 
          theme: "outline", 
          size: "large", 
          text: "continue_with",
          width: "100%",
          shape: "pill"
        }
      );
    }
  }, [navigate, API_BASE]);

  // Handle custom Google button click
  const handleGoogleSignIn = () => {
    const googleButton = document.querySelector('#googleSignInDiv div[role="button"]');
    if (googleButton) {
      googleButton.click();
    }
  };

  // Normal login handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormMessage({ text: "", type: "" });

    try {
      const response = await axios.post(`${API_BASE}/api/auth/login`, {
        email,
        password,
      });

      const userRole = response.data;
      setFormMessage({
        text: `Login successful as ${userRole}. Redirecting...`,
        type: "success",
      });

      handleSuccessfulLogin(userRole, email);
    } catch (error) {
      const message =
        error.response?.data?.message || "Invalid email or password!";
      setFormMessage({ text: message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mm-userlogin-body">
      {/* Background decorative elements */}
      <div className="mm-userlogin-background">
        <div className="mm-userlogin-career-path"></div>
        <div className="mm-userlogin-floating-shape mm-userlogin-shape-1"></div>
        <div className="mm-userlogin-floating-shape mm-userlogin-shape-2"></div>
        <div className="mm-userlogin-floating-shape mm-userlogin-shape-3"></div>
        <div className="mm-userlogin-floating-icon mm-userlogin-icon-1">
          <i className="fas fa-briefcase"></i>
        </div>
        <div className="mm-userlogin-floating-icon mm-userlogin-icon-2">
          <i className="fas fa-chart-line"></i>
        </div>
        <div className="mm-userlogin-floating-icon mm-userlogin-icon-3">
          <i className="fas fa-users"></i>
        </div>
      </div>

      <div className="mm-userlogin-container">
        {/* Left Side - Welcome Content */}
        <div className="mm-userlogin-left">
          <div className="mm-userlogin-welcome-content">
            <h1 className="mm-userlogin-welcome-title">
              Welcome Back to
              <span className="mm-userlogin-brand-name">MomentumMerge</span>
            </h1>
            <p className="mm-userlogin-welcome-subtitle">
              Your career journey starts here – find opportunities that match your skills and accelerate your professional growth.
            </p>
            
            <div className="mm-userlogin-feature-highlights">
              <div className="mm-userlogin-feature-item">
                <div className="mm-userlogin-feature-icon">
                  <i className="fas fa-briefcase"></i>
                </div>
                <span>Access thousands of job opportunities</span>
              </div>
              <div className="mm-userlogin-feature-item">
                <div className="mm-userlogin-feature-icon">
                  <i className="fas fa-chart-line"></i>
                </div>
                <span>Track your career progress</span>
              </div>
              <div className="mm-userlogin-feature-item">
                <div className="mm-userlogin-feature-icon">
                  <i className="fas fa-users"></i>
                </div>
                <span>Connect with top employers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="mm-userlogin-right">
          <div className="mm-userlogin-form-container">
            {/* Header */}
            <div className="mm-userlogin-header">
              <h2 className="mm-userlogin-title">Welcome Back</h2>
              <p className="mm-userlogin-subtitle">Sign in to continue your journey</p>
            </div>

            <form className="mm-userlogin-form" onSubmit={handleSubmit}>
              {/* Google Sign-In Button */}
              <div className="mm-userlogin-google-signin-wrapper">
                <button type="button" className="mm-userlogin-google-button" onClick={handleGoogleSignIn}>
                  <svg className="mm-userlogin-google-icon" viewBox="0 0 24 24" width="20" height="20">
                    <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </button>
                {/* Hidden Google button */}
                <div id="googleSignInDiv" style={{ position: 'absolute', visibility: 'hidden', width: '1px', height: '1px' }}></div>
              </div>

              {/* Divider */}
              <div className="mm-userlogin-divider">
                <span>or continue with email</span>
              </div>

              {/* Feedback Message */}
              {formMessage.text && (
                <div className={`mm-userlogin-message ${formMessage.type}`}>
                  <i className={`fas ${formMessage.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
                  {formMessage.text}
                </div>
              )}

              {/* Email Field */}
              <div className="mm-userlogin-input-group">
                <label htmlFor="email" className="mm-userlogin-label">Email Address</label>
                <div className="mm-userlogin-input-field">
                  <i className="fas fa-envelope mm-userlogin-input-icon"></i>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="mm-userlogin-input-group">
                <label htmlFor="password" className="mm-userlogin-label">Password</label>
                <div className="mm-userlogin-input-field">
                  <i className="fas fa-lock mm-userlogin-input-icon"></i>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="off"
                    required
                  />
                  <i
                    className={`fas ${showPassword ? "fa-eye" : "fa-eye-slash"} mm-userlogin-password-toggle`}
                    onClick={() => setShowPassword((prev) => !prev)}
                  ></i>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="mm-userlogin-options">
                <Link to="/forgot-password" className="mm-userlogin-forgot">
                  Forgot password?
                </Link>
              </div>

              {/* Login Button */}
              <button type="submit" className="mm-userlogin-button" disabled={loading}>
                {loading ? (
                  <>
                    <div className="mm-userlogin-loading-spinner"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <i className="fas fa-arrow-right mm-userlogin-button-arrow"></i>
                  </>
                )}
              </button>

              {/* Sign Up and Guest Links */}
              <div className="mm-userlogin-footer">
                <div className="mm-userlogin-register">
                  <span>Don't have an account? </span>
                  <Link to="/register" className="mm-userlogin-register-link">
                    Sign Up
                  </Link>
                </div>
                <div className="mm-userlogin-register">
                  <span>Continue without signing in? </span>
                  <Link to="/" className="mm-userlogin-register-link mm-userlogin-guest-link">
                    Explore as Guest
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;