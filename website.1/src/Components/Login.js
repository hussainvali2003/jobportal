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

 

import React, { useState, useEffect } from 'react';
import '../Styles/Login.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';

export const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [formMessage, setFormMessage] = useState({ text: '', type: '' });
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("userRole");
        if (isLoggedIn) {
            navigate("/jobs");
        }
    }, [navigate]);

    // Google Sign-In initialization
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
                            
                            // Extract email from token
                            const decodedToken = JSON.parse(atob(response.credential.split('.')[1]));
                            const userEmail = decodedToken?.email || "";
                            const userName = decodedToken?.name || "";

                            // Handle different response scenarios
                            if (responseData === "exists") {
                                // User already exists, treat as login
                                setFormMessage({ text: "Google login successful! Redirecting to jobs...", type: "success" });
                                
                                // Save user data to localStorage
                                localStorage.setItem("userRole", "USER");
                                localStorage.setItem("registeredEmail", userEmail);
                                
                                // Redirect to jobs
                                const redirectPath = localStorage.getItem("redirectAfterLogin") || "/jobs";
                                localStorage.removeItem("redirectAfterLogin");
                                
                                setTimeout(() => {
                                    navigate(redirectPath);
                                }, 1500);
                                
                            } else if (responseData === "registered") {
                                // New user registered via Google login
                                setFormMessage({ text: "Registration successful with Google! Redirecting to jobs...", type: "success" });
                                
                                // Save user data to localStorage
                                localStorage.setItem("userRole", "USER");
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

            // Render Google button inside #googleSignInDiv
            google.accounts.id.renderButton(
                document.getElementById("googleSignInDiv"),
                { theme: "outline", size: "large", text: "continue_with", width: "300" }
            );
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post("http://localhost:8080/api/auth/login", null, {
            params: { email, password }
        });

        const userRole = response.data;
        alert("Login successful as " + userRole);
        localStorage.setItem("userRole", userRole);
        localStorage.setItem("registeredEmail", email);

        const redirectPath = localStorage.getItem("redirectAfterLogin") || "/jobs";
        localStorage.removeItem("redirectAfterLogin");
        
        setTimeout(() => {
            navigate(redirectPath);
        }, 1500);
        
    } catch (error) {
        alert("Invalid email or password!");
    }
};
    const handleLogout = () => {
        localStorage.removeItem("userRole");
        localStorage.removeItem("registeredEmail");
        setIsLoggedIn(false);
        navigate("/");
    };

    const redirectToHome = () => {
        navigate('/');
    };

    return (
        <div className="login-body">
            <div className="login-container">
                {/* Left Side with Image */}
                <div className="login-left">
                    <img src="/LoginImage.jpg" alt="MomentumMerge" className="login-image" />
                </div>

                {/* Right Side with Login Form */}
                <div className="login-right">
                    <div className="login-form-container">
                        <div className="login-header">
                            <img 
                                src="/Logoo.png" 
                                alt="MomentumMerge Logo" 
                                className="login-logo" 
                                onClick={redirectToHome}
                                style={{ cursor: 'pointer' }}
                            />
                            <h1 className="login-company-name">MomentumMerge</h1>
                        </div>

                        {isLoggedIn ? (
                            <div className="login-content">
                                <h3 className="login-h3">You are logged in</h3>
                                <button className="login-button" onClick={handleLogout}>
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <form className="login-content" onSubmit={handleSubmit}>
                                <h3 className="login-h3">Welcome Back</h3>
                                
                                {/* Google Sign-In Button - Added at the top */}
                                <div className="google-signin-container" style={{ marginBottom: '20px', textAlign: 'center' }}>
                                    <div id="googleSignInDiv"></div>
                                </div>

                                {/* Form Message */}
                                {formMessage.text && (  
                                    <div className={`login-message ${formMessage.type}`}>
                                        {formMessage.text}
                                    </div>
                                )}
                                
                                {/* Email Field */}
                                <div className="login-input-group">
                                    <label htmlFor="email">Email</label>
                                    <div className="login-input-field">
                                        <input
                                            type="email"
                                            id="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                        <i className="fa fa-envelope icon"></i>
                                    </div>
                                </div>

                                {/* Password Field */}
                                <div className="login-input-group">
                                    <label htmlFor="password">Password</label>
                                    <div className="login-input-field">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            id="password"
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            autoComplete="off"
                                            required
                                        />
                                        <i className="fa fa-lock icon"></i>
                                        <i
                                            className={`fa ${showPassword ? 'fa-eye' : 'fa-eye-slash'} password-toggle`}
                                            onClick={togglePasswordVisibility}
                                        ></i>
                                    </div>
                                </div>

                                <div className="login-options">
                                    <Link to="/forgot-password" className="login-forgot">Forgot password?</Link>
                                </div>

                                <button type="submit" className="login-button">Login</button>

                                <div className="login-register">
                                    <span>Don't have an account? </span>
                                    <Link to="/register" className="login-register-link">Sign Up</Link><br />
                                    <span>Continue without signin? </span>
                                    <Link to="/" className="login-register-link">EXPLORE</Link>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;