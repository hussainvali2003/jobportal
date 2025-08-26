
// import React, { useState, useEffect } from "react";
// import { useNavigate, Link, useLocation } from "react-router-dom";
// import {
//   FaUserCircle, FaCog, FaQuestionCircle, FaCreditCard,
//   FaSignOutAlt, FaTimes, FaUserPlus, FaFileAlt
// } from "react-icons/fa";
// import { FiLogIn } from "react-icons/fi";
// import { Mail, MessageCircle, X } from "lucide-react";
// import ChatBox from "./ChatBox";
// import axios from "axios";
// import "../Styles/Navbar.css";
// function Navbar() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
//   const [userInfo, setUserInfo] = useState(null);
//   useEffect(() => {
//     const fetchUserInfo = async () => {
//       const storedEmail = localStorage.getItem("registeredEmail"); // use same key as Profile.js
//       if (!storedEmail) return;
//       try {
//         const res = await axios.get(`http://localhost:8080/api/auth/user?email=${storedEmail}`);
//         const { name, userrole, profilePic } = res.data;
//         setUserInfo({
//           name,
//           userrole,
//           profile_pic: profilePic ? `data:image/jpeg;base64,${profilePic}` : null,
//         });
//         // Also update userRole state if needed
//         if (userrole && userrole !== userRole) {
//           setUserRole(userrole);
//           localStorage.setItem("userRole", userrole);
//         }
//       } catch (error) {
//         console.error("Failed to fetch user info in navbar:", error);
//       }
//     };
//     fetchUserInfo();
//   }, []);
//   const handleLogout = () => {
//     localStorage.clear();
//     setUserRole(null);
//     setUserInfo(null);
//     navigate("/");
//   };
//   const toggleProfileDropdown = () => {
//     setIsProfileDropdownOpen(!isProfileDropdownOpen);
//   };
//   const closeProfileDropdown = () => {
//     setIsProfileDropdownOpen(false);
//   };
//   const isRecruiter = userRole === "RECRUITER";
//   const isAdmin = userRole === "ADMIN";
//   const isLoggedIn = !!userRole;
//   const hideNavItems =
//     location.pathname === "/recruiter-login" ||
//     location.pathname === "/recruiter-dashboard" ||
//     location.pathname === "/post-jobs" ||
//     location.pathname === "/add-recruiter"; // added /add-recruiter to hide nav items as in first component
//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (isProfileDropdownOpen && !event.target.closest(".profile-dropdown")) {
//         closeProfileDropdown();
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isProfileDropdownOpen]);
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const handleEmailClick = () => {
//     window.location.href =
//       "mailto:support@momentum-merge.com?subject=Apply%20To%20Job";
//   };
//   const handleWhatsAppClick = () => {
//     window.location.href = "https://wa.me/919731362240";
//   };
//   return (
//     <nav className="navbar-container">
//       <div className="navbar-left">
//         <Link to="/">
//           <img src="/Logoo.png" alt="Logo" className="logo-img" />
//         </Link>
//         <span className="company-name">MomentumMerge</span>
//         <div className="hamburger" onClick={toggleMobileMenu}>
//           <span className={isMobileMenuOpen ? "open" : ""}></span>
//           <span className={isMobileMenuOpen ? "open" : ""}></span>
//           <span className={isMobileMenuOpen ? "open" : ""}></span>
//         </div>
//       </div>
//       <div className={`navbar-right ${isMobileMenuOpen ? "mobile-active" : ""}`}>
//         <ul className={`nav-links ${isMobileMenuOpen ? "mobile-active" : ""}`}>
//           <li><Link to="/">HOME</Link></li>
//           {!hideNavItems && !isRecruiter && !isAdmin && (
//             <>
//               {isLoggedIn ? (
//                 <>
//                   <li><Link to="/services">SERVICES</Link></li>
//                   <li><Link to="/jobs">JOBS</Link></li>
//                 </>
//               ) : (
//                 <li><Link to="/login">JOBS</Link></li>
//               )}
//               <li><Link to="/About">ABOUT</Link></li>
//             </>
//           )}
//           {!isLoggedIn && !hideNavItems && (
//             <li><Link to="/recruiter-login" className="recruiter-login">ADMIN</Link></li>
//           )}
//           {(isRecruiter || isAdmin) && (
//             <>
//               <li><Link to="/post-jobs">POST JOBS</Link></li>
//               <li><Link to="/recruiter-dashboard">{isAdmin ? "DASHBOARD" : "DASHBOARD"}</Link></li>
//               <li><Link to="/jobs">JOBS</Link></li>
//               {isAdmin && (
//                 <li>
//                   <Link to="/add-recruiter" className="add-recruiter-link">
//                     <FaUserPlus className="add-icon" /> ADD RECRUITER
//                   </Link>
//                 </li>
//               )}
//             </>
//           )}
//         </ul>
//         {isLoggedIn && !isRecruiter && !isAdmin && (
//           <div className="profile-dropdown">
//             <button className="profile-link" onClick={toggleProfileDropdown}>
//               {userInfo?.profile_pic ? (
//                 <img src={userInfo?.profile_pic} alt="Profile" className="profile-thumb" />
//               ) : (
//                 <FaUserCircle className="profile-icon" />
//               )}
//               <span className="profile-text">My Profile</span>
//             </button>
//             {isProfileDropdownOpen && (
//               <div className="dropdown-content">
//                 <div className="dropdown-header">
//                   <button className="dropdown-close" onClick={closeProfileDropdown}>
//                     <FaTimes />
//                   </button>
//                   <img
//                     src={userInfo?.profile_pic || "/default-profile.png"}
//                     alt="Profile"
//                     className="dropdown-profile-img"
//                   />
//                   <div className="dropdown-profile-info">
//                     <h4>{userInfo?.name || "User Name"}</h4>
//                     <p>{userInfo?.userrole || "Job Seeker"}</p>
//                   </div>
//                 </div>
//                 <Link to="/profile" className="dropdown-item" onClick={closeProfileDropdown}>
//                   <FaUserCircle className="dropdown-icon" /> My Account
//                 </Link>
//                 <Link to="/my-applications" className="dropdown-item" onClick={closeProfileDropdown}>
//                   <FaFileAlt className="dropdown-icon" /> My Applications
//                 </Link>
//                 <Link to="/settings" className="dropdown-item" onClick={closeProfileDropdown}>
//                   <FaCog className="dropdown-icon" /> Settings
//                 </Link>
//                 <Link to="/faqs" className="dropdown-item" onClick={closeProfileDropdown}>
//                   <FaQuestionCircle className="dropdown-icon" /> FAQs
//                 </Link>
//                 <Link to="/payment" className="dropdown-item" onClick={closeProfileDropdown}>
//                   <FaCreditCard className="dropdown-icon" /> Payment
//                 </Link>
//                 <div className="dropdown-divider"></div>
//                 <button onClick={() => { handleLogout(); closeProfileDropdown(); }} className="dropdown-item">
//                   <FaSignOutAlt className="dropdown-icon" /> Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//         {(isRecruiter || isAdmin) && (
//           <div className="recruiter-logout">
//             <button onClick={handleLogout} className="logout-btn">
//               <FaSignOutAlt className="logout-icon" /> Logout
//             </button>
//           </div>
//         )}
//         {!isLoggedIn && (
//           <div className="auth-buttons">
//             <button className="signin-btn" onClick={() => navigate("/login")}>
//               <FiLogIn className="signin-icon" /> Sign In
//             </button>
//             <button className="register-btn" onClick={() => navigate("/register")}>Register</button>
//           </div>
//         )}
//       </div>
//       <div className="floating-buttons-container">
//         {/* Email Button */}
//         <button
//           onClick={handleEmailClick}
//           className="floating-btn email-btn"
//           aria-label="Send Email"
//         >
//           <Mail size={25} />
//           <span className="tooltip">Send Email</span>
//         </button>
//         {/* WhatsApp Button */}
//         <button
//           onClick={handleWhatsAppClick}
//           className="floating-btn whatsapp-btn"
//           aria-label="WhatsApp"
//         >
//           <svg viewBox="0 0 24 24" className="whatsapp-icon">
//             <path
//               fill="currentColor"
//               d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
//             />
//           </svg>
//           <span className="tooltip">WhatsApp</span>
//         </button>
//         {/* Chat Button */}
//         <button
//           onClick={() => setIsChatOpen(!isChatOpen)}
//           className={`floating-btn chat-btn ${isChatOpen ? "open" : ""}`}
//           aria-label={isChatOpen ? "Close Chat" : "Open Chat"}
//         >
//           {isChatOpen ? <X size={25} /> : <MessageCircle size={25} />}
//           <span className="tooltip">
//             {isChatOpen ? "Close Chat" : "Chat with us"}
//           </span>
//         </button>
//       </div>
//       {/* Chat Box */}
//       <ChatBox isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
//     </nav>
//   );
// }
// export default Navbar; 




// import React, { useState, useEffect } from "react";
// import { useNavigate, Link, useLocation } from "react-router-dom";
// import {
//   FaUserCircle, FaCog, FaQuestionCircle, FaCreditCard,
//   FaSignOutAlt, FaTimes, FaUserPlus, FaFileAlt, FaBell
// } from "react-icons/fa";
// import { FiLogIn } from "react-icons/fi";
// import { Mail, MessageCircle, X, Menu } from "lucide-react";
// import ChatBox from "./ChatBox";
// import axios from "axios";
// import "../Styles/Navbar.css";

// function Navbar() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
//   const [userInfo, setUserInfo] = useState(null);
//   const [notificationCount, setNotificationCount] = useState(3); // Example count

//   useEffect(() => {
//     const fetchUserInfo = async () => {
//       const storedEmail = localStorage.getItem("registeredEmail");
//       if (!storedEmail) return;
      
//       try {
//         const res = await axios.get(`http://localhost:8080/api/auth/user?email=${storedEmail}`);
//         const { name, userrole, profilePic } = res.data;
//         setUserInfo({
//           name,
//           userrole,
//           profile_pic: profilePic ? `data:image/jpeg;base64,${profilePic}` : null,
//         });
        
//         if (userrole && userrole !== userRole) {
//           setUserRole(userrole);
//           localStorage.setItem("userRole", userrole);
//         }
//       } catch (error) {
//         console.error("Failed to fetch user info in navbar:", error);
//       }
//     };
//     fetchUserInfo();
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     setUserRole(null);
//     setUserInfo(null);
//     navigate("/");
//   };

//   const toggleProfileDropdown = () => {
//     setIsProfileDropdownOpen(!isProfileDropdownOpen);
//   };

//   const closeProfileDropdown = () => {
//     setIsProfileDropdownOpen(false);
//   };

//   const isRecruiter = userRole === "RECRUITER";
//   const isAdmin = userRole === "ADMIN";
//   const isLoggedIn = !!userRole;

//   const hideNavItems =
//     location.pathname === "/recruiter-login" ||
//     location.pathname === "/recruiter-dashboard" ||
//     location.pathname === "/post-jobs" ||
//     location.pathname === "/add-recruiter";

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (isProfileDropdownOpen && !event.target.closest(".profile-dropdown")) {
//         closeProfileDropdown();
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isProfileDropdownOpen]);

//   const [isChatOpen, setIsChatOpen] = useState(false);

//   const handleEmailClick = () => {
//     window.location.href = "mailto:support@momentum-merge.com?subject=Apply%20To%20Job";
//   };

//   const handleWhatsAppClick = () => {
//     window.location.href = "https://wa.me/919731362240";
//   };

//   const handleNotificationClick = () => {
//     navigate("/notification");
//   };

//   return (
//     <nav className="navbar-container">
//       <div className="navbar-left">
//         <Link to="/" className="logo-container">
//           <img src="/Logoo.png" alt="Logo" className="logo-img" />
//           <span className="company-name">MomentumMerge</span>
//         </Link>
//       </div>

//       <div className="navbar-center">
//         <ul className={`nav-links ${isMobileMenuOpen ? "mobile-active" : ""}`}>
//           <li><Link to="/" onClick={closeMobileMenu}>HOME</Link></li>
//           {!hideNavItems && !isRecruiter && !isAdmin && (
//             <>
//               {isLoggedIn ? (
//                 <>
//                   <li><Link to="/services" onClick={closeMobileMenu}>SERVICES</Link></li>
//                   <li><Link to="/jobs" onClick={closeMobileMenu}>JOBS</Link></li>
//                 </>
//               ) : (
//                 <li><Link to="/login" onClick={closeMobileMenu}>JOBS</Link></li>
//               )}
//               <li><Link to="/About" onClick={closeMobileMenu}>ABOUT</Link></li>
//               {!isLoggedIn && (
//                 <>
//                   <li><Link to="/blog" onClick={closeMobileMenu}>BLOG</Link></li>
//                   <li><Link to="/helpcenter" onClick={closeMobileMenu}>HELP CENTER</Link></li>
//                 </>
//               )}
//             </>
//           )}
//           {!isLoggedIn && !hideNavItems && (
//             <li><Link to="/recruiter-login" className="recruiter-login" onClick={closeMobileMenu}>ADMIN</Link></li>
//           )}
//           {(isRecruiter || isAdmin) && (
//             <>
//               <li><Link to="/post-jobs" onClick={closeMobileMenu}>POST JOBS</Link></li>
//               <li><Link to="/recruiter-dashboard" onClick={closeMobileMenu}>{isAdmin ? "DASHBOARD" : "DASHBOARD"}</Link></li>
//               <li><Link to="/jobs" onClick={closeMobileMenu}>JOBS</Link></li>
//               {isAdmin && (
//                 <li>
//                   <Link to="/add-recruiter" className="add-recruiter-link" onClick={closeMobileMenu}>
//                     <FaUserPlus className="add-icon" /> ADD RECRUITER
//                   </Link>
//                 </li>
//               )}
//             </>
//           )}
//         </ul>
//       </div>

//       <div className="navbar-right">
//         {/* Notification Bell - Only for logged-in users, not recruiters */}
//         {isLoggedIn && !isRecruiter && !isAdmin && (
//           <div className="notification-container">
//             <button className="notification-btn" onClick={handleNotificationClick}>
//               <FaBell className="notification-icon" />
//               {notificationCount > 0 && (
//                 <span className="notification-badge">{notificationCount}</span>
//               )}
//             </button>
//           </div>
//         )}

//         {/* Profile Dropdown for logged-in users */}
//         {isLoggedIn && !isRecruiter && !isAdmin && (
//           <div className="profile-dropdown">
//             <button className="profile-link" onClick={toggleProfileDropdown}>
//               {userInfo?.profile_pic ? (
//                 <img src={userInfo?.profile_pic} alt="Profile" className="profile-thumb" />
//               ) : (
//                 <FaUserCircle className="profile-icon" />
//               )}
//               <span className="profile-text">My Profile</span>
//             </button>
//             {isProfileDropdownOpen && (
//               <div className="dropdown-content">
//                 <div className="dropdown-header">
//                   <button className="dropdown-close" onClick={closeProfileDropdown}>
//                     <FaTimes />
//                   </button>
//                   <img
//                     src={userInfo?.profile_pic || "/default-profile.png"}
//                     alt="Profile"
//                     className="dropdown-profile-img"
//                   />
//                   <div className="dropdown-profile-info">
//                     <h4>{userInfo?.name || "User Name"}</h4>
//                     <p>{userInfo?.userrole || "Job Seeker"}</p>
//                   </div>
//                 </div>
//                 <Link to="/profile" className="dropdown-item" onClick={closeProfileDropdown}>
//                   <FaUserCircle className="dropdown-icon" /> My Account
//                 </Link>
//                 <Link to="/my-applications" className="dropdown-item" onClick={closeProfileDropdown}>
//                   <FaFileAlt className="dropdown-icon" /> My Applications
//                 </Link>
//                 <Link to="/settings" className="dropdown-item" onClick={closeProfileDropdown}>
//                   <FaCog className="dropdown-icon" /> Settings
//                 </Link>
//                 <Link to="/faqs" className="dropdown-item" onClick={closeProfileDropdown}>
//                   <FaQuestionCircle className="dropdown-icon" /> FAQs
//                 </Link>
//                 <Link to="/payment" className="dropdown-item" onClick={closeProfileDropdown}>
//                   <FaCreditCard className="dropdown-icon" /> Payment
//                 </Link>
//                 <div className="dropdown-divider"></div>
//                 <button onClick={() => { handleLogout(); closeProfileDropdown(); }} className="dropdown-item">
//                   <FaSignOutAlt className="dropdown-icon" /> Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Recruiter/Admin Logout */}
//         {(isRecruiter || isAdmin) && (
//           <div className="recruiter-logout">
//             <button onClick={handleLogout} className="logout-btn">
//               <FaSignOutAlt className="logout-icon" /> Logout
//             </button>
//           </div>
//         )}

//         {/* Auth Buttons for non-logged-in users */}
//         {!isLoggedIn && (
//           <div className="auth-buttons">
//             <button className="join-employer-btn" onClick={() => navigate("/joinemployers")}>
//               Join as Employer
//             </button>
//             <button className="signin-btn" onClick={() => navigate("/login")}>
//               <FiLogIn className="signin-icon" /> Sign In
//             </button>
//             <button className="register-btn" onClick={() => navigate("/register")}>
//               Register
//             </button>
//           </div>
//         )}

//         {/* Mobile Menu Toggle */}
//         <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
//           <Menu size={24} />
//         </button>
//       </div>

//       {/* Mobile Menu Overlay */}
//       {isMobileMenuOpen && (
//         <div className="mobile-menu-overlay" onClick={closeMobileMenu}>
//           <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
//             <div className="mobile-menu-header">
//               <img src="/Logoo.png" alt="Logo" className="mobile-logo" />
//               <button className="mobile-menu-close" onClick={closeMobileMenu}>
//                 <X size={24} />
//               </button>
//             </div>
//             <ul className="mobile-nav-links">
//               <li><Link to="/" onClick={closeMobileMenu}>HOME</Link></li>
//               {!hideNavItems && !isRecruiter && !isAdmin && (
//                 <>
//                   {isLoggedIn ? (
//                     <>
//                       <li><Link to="/services" onClick={closeMobileMenu}>SERVICES</Link></li>
//                       <li><Link to="/jobs" onClick={closeMobileMenu}>JOBS</Link></li>
//                     </>
//                   ) : (
//                     <li><Link to="/login" onClick={closeMobileMenu}>JOBS</Link></li>
//                   )}
//                   <li><Link to="/About" onClick={closeMobileMenu}>ABOUT</Link></li>
//                   {!isLoggedIn && (
//                     <>
//                       <li><Link to="/blog" onClick={closeMobileMenu}>BLOG</Link></li>
//                       <li><Link to="/helpcenter" onClick={closeMobileMenu}>HELP CENTER</Link></li>
//                     </>
//                   )}
//                 </>
//               )}
//               {!isLoggedIn && !hideNavItems && (
//                 <li><Link to="/recruiter-login" className="recruiter-login" onClick={closeMobileMenu}>ADMIN</Link></li>
//               )}
//               {(isRecruiter || isAdmin) && (
//                 <>
//                   <li><Link to="/post-jobs" onClick={closeMobileMenu}>POST JOBS</Link></li>
//                   <li><Link to="/recruiter-dashboard" onClick={closeMobileMenu}>{isAdmin ? "DASHBOARD" : "DASHBOARD"}</Link></li>
//                   <li><Link to="/jobs" onClick={closeMobileMenu}>JOBS</Link></li>
//                   {isAdmin && (
//                     <li>
//                       <Link to="/add-recruiter" className="add-recruiter-link" onClick={closeMobileMenu}>
//                         <FaUserPlus className="add-icon" /> ADD RECRUITER
//                       </Link>
//                     </li>
//                   )}
//                 </>
//               )}
//             </ul>
            
//             {/* Mobile Auth Buttons */}
//             {!isLoggedIn && (
//               <div className="mobile-auth-buttons">
//                 <button className="mobile-join-employer-btn" onClick={() => { navigate("/joinemployers"); closeMobileMenu(); }}>
//                   Join as Employer
//                 </button>
//                 <button className="mobile-signin-btn" onClick={() => { navigate("/login"); closeMobileMenu(); }}>
//                   <FiLogIn className="signin-icon" /> Sign In
//                 </button>
//                 <button className="mobile-register-btn" onClick={() => { navigate("/register"); closeMobileMenu(); }}>
//                   Register
//                 </button>
//               </div>
//             )}

//             {/* Mobile Profile Section */}
//             {isLoggedIn && !isRecruiter && !isAdmin && (
//               <div className="mobile-profile-section">
//                 <div className="mobile-profile-header">
//                   <img
//                     src={userInfo?.profile_pic || "/default-profile.png"}
//                     alt="Profile"
//                     className="mobile-profile-img"
//                   />
//                   <div className="mobile-profile-info">
//                     <h4>{userInfo?.name || "User Name"}</h4>
//                     <p>{userInfo?.userrole || "Job Seeker"}</p>
//                   </div>
//                 </div>
//                 <div className="mobile-profile-links">
//                   <Link to="/profile" className="mobile-profile-link" onClick={closeMobileMenu}>
//                     <FaUserCircle className="mobile-profile-icon" /> My Account
//                   </Link>
//                   <Link to="/my-applications" className="mobile-profile-link" onClick={closeMobileMenu}>
//                     <FaFileAlt className="mobile-profile-icon" /> My Applications
//                   </Link>
//                   <Link to="/notification" className="mobile-profile-link" onClick={closeMobileMenu}>
//                     <FaBell className="mobile-profile-icon" /> Notifications
//                   </Link>
//                   <Link to="/settings" className="mobile-profile-link" onClick={closeMobileMenu}>
//                     <FaCog className="mobile-profile-icon" /> Settings
//                   </Link>
//                   <button onClick={() => { handleLogout(); closeMobileMenu(); }} className="mobile-profile-link logout-link">
//                     <FaSignOutAlt className="mobile-profile-icon" /> Logout
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Mobile Recruiter/Admin Logout */}
//             {(isRecruiter || isAdmin) && (
//               <div className="mobile-recruiter-logout">
//                 <button onClick={() => { handleLogout(); closeMobileMenu(); }} className="mobile-logout-btn">
//                   <FaSignOutAlt className="logout-icon" /> Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Floating Action Buttons - Keeping original styling */}
//       <div className="floating-buttons-container">
//         <button
//           onClick={handleEmailClick}
//           className="floating-btn email-btn"
//           aria-label="Send Email"
//         >
//           <Mail size={25} />
//           <span className="tooltip">Send Email</span>
//         </button>
//         <button
//           onClick={handleWhatsAppClick}
//           className="floating-btn whatsapp-btn"
//           aria-label="WhatsApp"
//         >
//           <svg viewBox="0 0 24 24" className="whatsapp-icon">
//             <path
//               fill="currentColor"
//               d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
//             />
//           </svg>
//           <span className="tooltip">WhatsApp</span>
//         </button>
//         <button
//           onClick={() => setIsChatOpen(!isChatOpen)}
//           className={`floating-btn chat-btn ${isChatOpen ? "open" : ""}`}
//           aria-label={isChatOpen ? "Close Chat" : "Open Chat"}
//         >
//           {isChatOpen ? <X size={25} /> : <MessageCircle size={25} />}
//           <span className="tooltip">
//             {isChatOpen ? "Close Chat" : "Chat with us"}
//           </span>
//         </button>
//       </div>

//       <ChatBox isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
//     </nav>
//   );
// }

// export default Navbar;


// import React, { useState, useEffect } from "react";
// import { useNavigate, Link, useLocation } from "react-router-dom";
// import {
//   FaUserCircle, FaCog, FaQuestionCircle, FaCreditCard,
//   FaSignOutAlt, FaTimes, FaUserPlus, FaFileAlt, FaBell
// } from "react-icons/fa";
// import { FiLogIn } from "react-icons/fi";
// import { Mail, MessageCircle, X, Menu } from "lucide-react";
// import ChatBox from "./ChatBox";
// import axios from "axios";
// import "../Styles/Navbar.css";

// function Navbar() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
//   const [userInfo, setUserInfo] = useState(null);
//   const [notificationCount] = useState(3); // Example count

//   useEffect(() => {
//     const fetchUserInfo = async () => {
//       const storedEmail = localStorage.getItem("registeredEmail");
//       if (!storedEmail) return;
      
//       try {
//         const res = await axios.get(`http://localhost:8080/api/auth/user?email=${storedEmail}`);
//         const { name, userrole, profilePic } = res.data;
//         setUserInfo({
//           name,
//           userrole,
//           profile_pic: profilePic ? `data:image/jpeg;base64,${profilePic}` : null,
//         });
        
//         if (userrole && userrole !== userRole) {
//           setUserRole(userrole);
//           localStorage.setItem("userRole", userrole);
//         }
//       } catch (error) {
//         console.error("Failed to fetch user info in navbar:", error);
//       }
//     };
//     fetchUserInfo();
//   }, [userRole]);

//   const handleLogout = () => {
//     localStorage.clear();
//     setUserRole(null);
//     setUserInfo(null);
//     navigate("/");
//   };

//   const toggleProfileDropdown = () => {
//     setIsProfileDropdownOpen(!isProfileDropdownOpen);
//   };

//   const closeProfileDropdown = () => {
//     setIsProfileDropdownOpen(false);
//   };

//   const isRecruiter = userRole === "RECRUITER";
//   const isAdmin = userRole === "ADMIN";
//   const isLoggedIn = !!userRole;

//   const hideNavItems =
//     location.pathname === "/recruiter-login" ||
//     location.pathname === "/recruiter-dashboard" ||
//     location.pathname === "/post-jobs" ||
//     location.pathname === "/add-recruiter";

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (isProfileDropdownOpen && !event.target.closest(".profile-dropdown")) {
//         closeProfileDropdown();
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isProfileDropdownOpen]);

//   const [isChatOpen, setIsChatOpen] = useState(false);

//   const handleEmailClick = () => {
//     window.location.href = "mailto:support@momentum-merge.com?subject=Apply%20To%20Job";
//   };

//   const handleWhatsAppClick = () => {
//     window.location.href = "https://wa.me/919731362240";
//   };

//   const handleNotificationClick = () => {
//     navigate("/notification");
//   };
//   return (
//     <nav className="navbar-container">
//       <div className="navbar-left">
//         <Link to="/" className="logo-container">
//           <img src="/Logoo.png" alt="Logo" className="logo-img" />
//           <span className="company-name">MomentumMerge</span>
//         </Link>
//       </div>

//       <div className="navbar-center">
//         <ul className={`nav-links ${isMobileMenuOpen ? "mobile-active" : ""}`}>
//           <li><Link to="/" onClick={closeMobileMenu}>HOME</Link></li>
//           {!hideNavItems && !isRecruiter && !isAdmin && (
//             <>
//               {isLoggedIn && (
//                 <li><Link to="/services" onClick={closeMobileMenu}>SERVICES</Link></li>
//               )}
//               <li><Link to="/jobs" onClick={closeMobileMenu}>JOBS</Link></li>
//               <li><Link to="/About" onClick={closeMobileMenu}>ABOUT</Link></li>
//               {!isLoggedIn && (
//                 <>
//                   <li><Link to="/blog" onClick={closeMobileMenu}>BLOG</Link></li>
//                   <li><Link to="/helpcenter" onClick={closeMobileMenu}>HELP CENTER</Link></li>
//                 </>
//               )}
//             </>
//           )}
//           {!isLoggedIn && !hideNavItems && (
//             <li><Link to="/recruiter-login" className="recruiter-login" onClick={closeMobileMenu}>ADMIN</Link></li>
//           )}
//           {(isRecruiter || isAdmin) && (
//             <>
//               <li><Link to="/post-jobs" onClick={closeMobileMenu}>POST JOBS</Link></li>
//               <li><Link to="/recruiter-dashboard" onClick={closeMobileMenu}>{isAdmin ? "DASHBOARD" : "DASHBOARD"}</Link></li>
//               <li><Link to="/jobs" onClick={closeMobileMenu}>JOBS</Link></li>
//               {isAdmin && (
//                 <li>
//                   <Link to="/add-recruiter" className="add-recruiter-link" onClick={closeMobileMenu}>
//                     <FaUserPlus className="add-icon" /> ADD RECRUITER
//                   </Link>
//                 </li>
//               )}
//             </>
//           )}
//         </ul>
//       </div>

//       <div className="navbar-right">
//         {/* Notification Bell - Only for logged-in users, not recruiters */}
//         {isLoggedIn && !isRecruiter && !isAdmin && (
//           <div className="notification-container">
//             <button className="notification-btn" onClick={handleNotificationClick}>
//               <FaBell className="notification-icon" />
//               {notificationCount > 0 && (
//                 <span className="notification-badge">{notificationCount}</span>
//               )}
//             </button>
//           </div>
//         )}

//         {/* Profile Dropdown for logged-in users */}
//         {isLoggedIn && !isRecruiter && !isAdmin && (
//           <div className="profile-dropdown">
//             <button className="profile-link" onClick={toggleProfileDropdown}>
//               {userInfo?.profile_pic ? (
//                 <img src={userInfo?.profile_pic} alt="Profile" className="profile-thumb" />
//               ) : (
//                 <FaUserCircle className="profile-icon" />
//               )}
//               <span className="profile-text">My Profile</span>
//             </button>
//             {isProfileDropdownOpen && (
//               <div className="dropdown-content" >
//                 <div className="dropdown-header" style={{marginTop:"-18px",borderRadius:"5px"}}>
//                   <button className="dropdown-close" onClick={closeProfileDropdown}>
//                     <FaTimes />
//                   </button>
//                   <img
//                     src={userInfo?.profile_pic || "/default-profile.png"}
//                     alt="Profile"
//                     className="dropdown-profile-img" style={{marginTop:"9px"}}
//                   />
//                   <div className="dropdown-profile-info" style={{marginRight:"70px"}}>
//                     <h4>{userInfo?.name || "User Name"}</h4>
//                     <p>{userInfo?.userrole || "Job Seeker"}</p>
//                   </div>
//                 </div>
//                 <Link to="/profile" className="dropdown-item" onClick={closeProfileDropdown}>
//                   <FaUserCircle className="dropdown-icon" /> My Account
//                 </Link>
//                 <Link to="/my-applications" className="dropdown-item" onClick={closeProfileDropdown}>
//                   <FaFileAlt className="dropdown-icon" /> My Applications
//                 </Link>
//                 <Link to="/settings" className="dropdown-item" onClick={closeProfileDropdown}>
//                   <FaCog className="dropdown-icon" /> Settings
//                 </Link>
//                 <Link to="/faqs" className="dropdown-item" onClick={closeProfileDropdown}>
//                   <FaQuestionCircle className="dropdown-icon" /> FAQs
//                 </Link>
//                 <Link to="/payment" className="dropdown-item" onClick={closeProfileDropdown}>
//                   <FaCreditCard className="dropdown-icon" /> Payment
//                 </Link>
//                 <div className="dropdown-divider"></div>
//                 <button onClick={() => { handleLogout(); closeProfileDropdown(); }} className="dropdown-item">
//                   <FaSignOutAlt className="dropdown-icon" /> Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Recruiter/Admin Logout */}
//         {(isRecruiter || isAdmin) && (
//           <div className="recruiter-logout">
//             <button onClick={handleLogout} className="logout-btn">
//               <FaSignOutAlt className="logout-icon" /> Logout
//             </button>
//           </div>
//         )}

//         {/* Auth Buttons for non-logged-in users */}
//         {!isLoggedIn && (
//           <div className="auth-buttons">
//             <button className="join-employer-btn" onClick={() => navigate("/joinemployers")}>
//               Join as Employer
//             </button>
//             <button className="signin-btn" onClick={() => navigate("/login")}>
//               <FiLogIn className="signin-icon" /> Sign In
//             </button>
//             <button className="register-btn" onClick={() => navigate("/register")}>
//               Register
//             </button>
//           </div>
//         )}

//         {/* Mobile Menu Toggle */}
//         <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
//           <Menu size={24} />
//         </button>
//       </div>

//       {/* Mobile Menu Overlay */}
//       {isMobileMenuOpen && (
//         <div className="mobile-menu-overlay" onClick={closeMobileMenu}>
//           <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
//             <div className="mobile-menu-header">
//               <img src="/Logoo.png" alt="Logo" className="mobile-logo" />
//               <button className="mobile-menu-close" onClick={closeMobileMenu}>
//                 <X size={24} />
//               </button>
//             </div>
//             <ul className="mobile-nav-links">
//               <li><Link to="/" onClick={closeMobileMenu}>HOME</Link></li>
//               {!hideNavItems && !isRecruiter && !isAdmin && (
//                 <>
//                   {isLoggedIn && (
//                     <li><Link to="/services" onClick={closeMobileMenu}>SERVICES</Link></li>
//                   )}
//                   <li><Link to="/jobs" onClick={closeMobileMenu}>JOBS</Link></li>
//                   <li><Link to="/About" onClick={closeMobileMenu}>ABOUT</Link></li>
//                   {!isLoggedIn && (
//                     <>
//                       <li><Link to="/blog" onClick={closeMobileMenu}>BLOG</Link></li>
//                       <li><Link to="/helpcenter" onClick={closeMobileMenu}>HELP CENTER</Link></li>
//                     </>
//                   )}
//                 </>
//               )}
//               {!isLoggedIn && !hideNavItems && (
//                 <li><Link to="/recruiter-login" className="recruiter-login" onClick={closeMobileMenu}>ADMIN</Link></li>
//               )}
//               {(isRecruiter || isAdmin) && (
//                 <>
//                   <li><Link to="/post-jobs" onClick={closeMobileMenu}>POST JOBS</Link></li>
//                   <li><Link to="/recruiter-dashboard" onClick={closeMobileMenu}>{isAdmin ? "DASHBOARD" : "DASHBOARD"}</Link></li>
//                   <li><Link to="/jobs" onClick={closeMobileMenu}>JOBS</Link></li>
//                   {isAdmin && (
//                     <li>
//                       <Link to="/add-recruiter" className="add-recruiter-link" onClick={closeMobileMenu}>
//                         <FaUserPlus className="add-icon" /> ADD RECRUITER
//                       </Link>
//                     </li>
//                   )}
//                 </>
//               )}
//             </ul>
            
//             {/* Mobile Auth Buttons */}
//             {!isLoggedIn && (
//               <div className="mobile-auth-buttons">
//                 <button className="mobile-join-employer-btn" onClick={() => { navigate("/joinemployers"); closeMobileMenu(); }}>
//                   Join as Employer
//                 </button>
//                 <button className="mobile-signin-btn" onClick={() => { navigate("/login"); closeMobileMenu(); }}>
//                   <FiLogIn className="signin-icon" /> Sign In
//                 </button>
//                 <button className="mobile-register-btn" onClick={() => { navigate("/register"); closeMobileMenu(); }}>
//                   Register
//                 </button>
//               </div>
//             )}

//             {/* Mobile Profile Section */}
//             {isLoggedIn && !isRecruiter && !isAdmin && (
//               <div className="mobile-profile-section">
//                 <div className="mobile-profile-header">
//                   <img
//                     src={userInfo?.profile_pic || "/default-profile.png"}
//                     alt="Profile"
//                     className="mobile-profile-img"
//                   />
//                   <div className="mobile-profile-info">
//                     <h4>{userInfo?.name || "User Name"}</h4>
//                     <p>{userInfo?.userrole || "Job Seeker"}</p>
//                   </div>
//                 </div>
//                 <div className="mobile-profile-links">
//                   <Link to="/profile" className="mobile-profile-link" onClick={closeMobileMenu}>
//                     <FaUserCircle className="mobile-profile-icon" /> My Account
//                   </Link>
//                   <Link to="/my-applications" className="mobile-profile-link" onClick={closeMobileMenu}>
//                     <FaFileAlt className="mobile-profile-icon" /> My Applications
//                   </Link>
//                   <Link to="/notification" className="mobile-profile-link" onClick={closeMobileMenu}>
//                     <FaBell className="mobile-profile-icon" /> Notifications
//                   </Link>
//                   <Link to="/settings" className="mobile-profile-link" onClick={closeMobileMenu}>
//                     <FaCog className="mobile-profile-icon" /> Settings
//                   </Link>
//                   <button onClick={() => { handleLogout(); closeMobileMenu(); }} className="mobile-profile-link logout-link">
//                     <FaSignOutAlt className="mobile-profile-icon" /> Logout
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Mobile Recruiter/Admin Logout */}
//             {(isRecruiter || isAdmin) && (
//               <div className="mobile-recruiter-logout">
//                 <button onClick={() => { handleLogout(); closeMobileMenu(); }} className="mobile-logout-btn">
//                   <FaSignOutAlt className="logout-icon" /> Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Floating Action Buttons - Keeping original styling */}
//       <div className="floating-buttons-container">
//         <button
//           onClick={handleEmailClick}
//           className="floating-btn email-btn"
//           aria-label="Send Email"
//         >
//           <Mail size={25} />
//           <span className="tooltip">Send Email</span>
//         </button>
//         <button
//           onClick={handleWhatsAppClick}
//           className="floating-btn whatsapp-btn"
//           aria-label="WhatsApp"
//         >
//           <svg viewBox="0 0 24 24" className="whatsapp-icon">
//             <path
//               fill="currentColor"
//               d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
//             />
//           </svg>
//           <span className="tooltip">WhatsApp</span>
//         </button>
//         <button
//           onClick={() => setIsChatOpen(!isChatOpen)}
//           className={`floating-btn chat-btn ${isChatOpen ? "open" : ""}`}
//           aria-label={isChatOpen ? "Close Chat" : "Open Chat"}
//         >
//           {isChatOpen ? <X size={25} /> : <MessageCircle size={25} />}
//           <span className="tooltip">
//             {isChatOpen ? "Close Chat" : "Chat with us"}
//           </span>
//         </button>
//       </div>

//       <ChatBox isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
//     </nav>
//   );
// }

// export default Navbar;



import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  FaUserCircle, FaCog, FaQuestionCircle, FaCreditCard,
  FaSignOutAlt, FaTimes, FaUserPlus, FaFileAlt, FaBell
} from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { Mail, MessageCircle, X, Menu } from "lucide-react";
import ChatBox from "./ChatBox";
import axios from "axios";
import "../Styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [unreadCount, setUnreadCount] = useState(
    parseInt(localStorage.getItem('unreadNotifications') || 0)
  );
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const storedEmail = localStorage.getItem("registeredEmail");
      if (!storedEmail) return;
      
      try {
        const res = await axios.get(`http://localhost:8080/api/auth/user?email=${storedEmail}`);
        const { name, userrole, profilePic } = res.data;
        setUserInfo({
          name,
          userrole,
          profile_pic: profilePic ? `data:image/jpeg;base64,${profilePic}` : null,
        });
        
        if (userrole && userrole !== userRole) {
          setUserRole(userrole);
          localStorage.setItem("userRole", userrole);
        }
      } catch (error) {
        console.error("Failed to fetch user info in navbar:", error);
      }
    };
    fetchUserInfo();
  }, [userRole]);

  useEffect(() => {
    const handleStorageChange = () => {
      setUnreadCount(parseInt(localStorage.getItem('unreadNotifications') || 0));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUserRole(null);
    setUserInfo(null);
    navigate("/");
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const closeProfileDropdown = () => {
    setIsProfileDropdownOpen(false);
  };

  const isRecruiter = userRole === "RECRUITER";
  const isAdmin = userRole === "ADMIN";
  const isLoggedIn = !!userRole;

  const hideNavItems =
    location.pathname === "/recruiter-login" ||
    location.pathname === "/recruiter-dashboard" ||
    location.pathname === "/post-jobs" ||
    location.pathname === "/add-recruiter";

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileDropdownOpen && !event.target.closest(".profile-dropdown")) {
        closeProfileDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isProfileDropdownOpen]);

  const handleEmailClick = () => {
    window.location.href = "mailto:support@momentum-merge.com?subject=Apply%20To%20Job";
  };

  const handleWhatsAppClick = () => {
    window.location.href = "https://wa.me/919731362240";
  };

  const handleNotificationClick = () => {
    navigate("/notification");
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-left">
        <Link to="/" className="logo-container">
          <img src="/Logoo.png" alt="Logo" className="logo-img" />
          <span className="company-name">MomentumMerge</span>
        </Link>
      </div>

      <div className="navbar-center">
        <ul className={`nav-links ${isMobileMenuOpen ? "mobile-active" : ""}`}>
          <li><Link to="/" onClick={closeMobileMenu}>HOME</Link></li>
          {!hideNavItems && !isRecruiter && !isAdmin && (
            <>
              {isLoggedIn && (
                <li><Link to="/services" onClick={closeMobileMenu}>SERVICES</Link></li>
              )}
              <li><Link to="/jobs" onClick={closeMobileMenu}>JOBS</Link></li>
              <li><Link to="/About" onClick={closeMobileMenu}>ABOUT</Link></li>
              {!isLoggedIn && (
                <>
                  <li><Link to="/blog" onClick={closeMobileMenu}>BLOG</Link></li>
                  <li><Link to="/helpcenter" onClick={closeMobileMenu}>HELP CENTER</Link></li>
                </>
              )}
            </>
          )}
          {!isLoggedIn && !hideNavItems && (
            <li><Link to="/recruiter-login" className="recruiter-login" onClick={closeMobileMenu}>ADMIN</Link></li>
          )}
          {(isRecruiter || isAdmin) && (
            <>
              <li><Link to="/post-jobs" onClick={closeMobileMenu}>POST JOBS</Link></li>
              <li><Link to="/recruiter-dashboard" onClick={closeMobileMenu}>{isAdmin ? "DASHBOARD" : "DASHBOARD"}</Link></li>
              <li><Link to="/jobs" onClick={closeMobileMenu}>JOBS</Link></li>
              {isAdmin && (
                <li>
                  <Link to="/add-recruiter" className="add-recruiter-link" onClick={closeMobileMenu}>
                    <FaUserPlus className="add-icon" /> ADD RECRUITER
                  </Link>
                </li>
              )}
            </>
          )}
        </ul>
      </div>

      <div className="navbar-right">
        {/* Notification Bell - Only for logged-in users, not recruiters */}
        {isLoggedIn && !isRecruiter && !isAdmin && (
          <div className="notification-container">
            <button className="notification-btn" onClick={handleNotificationClick}>
              <FaBell className="notification-icon" />
              {unreadCount > 0 && (
                <span className="notification-badge">{unreadCount}</span>
              )}
            </button>
          </div>
        )}

        {/* Profile Dropdown for logged-in users */}
        {isLoggedIn && !isRecruiter && !isAdmin && (
          <div className="profile-dropdown">
            <button className="profile-link" onClick={toggleProfileDropdown}>
              {userInfo?.profile_pic ? (
                <img src={userInfo?.profile_pic} alt="Profile" className="profile-thumb" />
              ) : (
                <FaUserCircle className="profile-icon" />
              )}
              <span className="profile-text">My Profile</span>
            </button>
            {isProfileDropdownOpen && (
              <div className="dropdown-content" >
                <div className="dropdown-headers" >
                  <button className="dropdown-close" onClick={closeProfileDropdown}>
                    <FaTimes />
                  </button>
                  <img
                    src={userInfo?.profile_pic || "/default-profile.png"}
                    alt="Profile"
                    className="dropdown-profile-img"
                  />
                  <div className="dropdown-profile-infos">
                    <h4>{userInfo?.name || "User Name"}</h4>
                    <p>{userInfo?.userrole || "Job Seeker"}</p>
                  </div>
                </div>
                <Link to="/profile" className="dropdown-item" onClick={closeProfileDropdown}>
                  <FaUserCircle className="dropdown-icon" /> My Account
                </Link>
                <Link to="/my-applications" className="dropdown-item" onClick={closeProfileDropdown}>
                  <FaFileAlt className="dropdown-icon" /> My Applications
                </Link>
                <Link to="/settings" className="dropdown-item" onClick={closeProfileDropdown}>
                  <FaCog className="dropdown-icon" /> Settings
                </Link>
                <Link to="/faqs" className="dropdown-item" onClick={closeProfileDropdown}>
                  <FaQuestionCircle className="dropdown-icon" /> FAQs
                </Link>
                <Link to="/payment" className="dropdown-item" onClick={closeProfileDropdown}>
                  <FaCreditCard className="dropdown-icon" /> Payment
                </Link>
                <div className="dropdown-divider"></div>
                <button onClick={() => { handleLogout(); closeProfileDropdown(); }} className="dropdown-item">
                  <FaSignOutAlt className="dropdown-icon" /> Logout
                </button>
              </div>
            )}
          </div>
        )}

        {/* Recruiter/Admin Logout */}
        {(isRecruiter || isAdmin) && (
          <div className="recruiter-logout">
            <button onClick={handleLogout} className="logout-btn">
              <FaSignOutAlt className="logout-icon" /> Logout
            </button>
          </div>
        )}

        {/* Auth Buttons for non-logged-in users */}
        {!isLoggedIn && (
          <div className="auth-buttons">
            <button className="join-employer-btn" onClick={() => navigate("/joinemployers")}>
              Join as Employer
            </button>
            <button className="signin-btn" onClick={() => navigate("/login")}>
              <FiLogIn className="signin-icon" /> Sign In
            </button>
            <button className="register-btn" onClick={() => navigate("/register")}>
              Register
            </button>
          </div>
        )}

        {/* Mobile Menu Toggle */}
        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMobileMenu}>
          <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <img src="/Logoo.png" alt="Logo" className="mobile-logo" />
              <button className="mobile-menu-close" onClick={closeMobileMenu}>
                <X size={24} />
              </button>
            </div>
            <ul className="mobile-nav-links">
              <li><Link to="/" onClick={closeMobileMenu}>HOME</Link></li>
              {!hideNavItems && !isRecruiter && !isAdmin && (
                <>
                  {isLoggedIn && (
                    <li><Link to="/services" onClick={closeMobileMenu}>SERVICES</Link></li>
                  )}
                  <li><Link to="/jobs" onClick={closeMobileMenu}>JOBS</Link></li>
                  <li><Link to="/About" onClick={closeMobileMenu}>ABOUT</Link></li>
                  {!isLoggedIn && (
                    <>
                      <li><Link to="/blog" onClick={closeMobileMenu}>BLOG</Link></li>
                      <li><Link to="/helpcenter" onClick={closeMobileMenu}>HELP CENTER</Link></li>
                    </>
                  )}
                </>
              )}
              {!isLoggedIn && !hideNavItems && (
                <li><Link to="/recruiter-login" className="recruiter-login" onClick={closeMobileMenu}>ADMIN</Link></li>
              )}
              {(isRecruiter || isAdmin) && (
                <>
                  <li><Link to="/post-jobs" onClick={closeMobileMenu}>POST JOBS</Link></li>
                  <li><Link to="/recruiter-dashboard" onClick={closeMobileMenu}>{isAdmin ? "DASHBOARD" : "DASHBOARD"}</Link></li>
                  <li><Link to="/jobs" onClick={closeMobileMenu}>JOBS</Link></li>
                  {isAdmin && (
                    <li>
                      <Link to="/add-recruiter" className="add-recruiter-link" onClick={closeMobileMenu}>
                        <FaUserPlus className="add-icon" /> ADD RECRUITER
                      </Link>
                    </li>
                  )}
                </>
              )}
            </ul>
            
            {/* Mobile Auth Buttons */}
            {!isLoggedIn && (
              <div className="mobile-auth-buttons">
                <button className="mobile-join-employer-btn" onClick={() => { navigate("/joinemployers"); closeMobileMenu(); }}>
                  Join as Employer
                </button>
                <button className="mobile-signin-btn" onClick={() => { navigate("/login"); closeMobileMenu(); }}>
                  <FiLogIn className="signin-icon" /> Sign In
                </button>
                <button className="mobile-register-btn" onClick={() => { navigate("/register"); closeMobileMenu(); }}>
                  Register
                </button>
              </div>
            )}

            {/* Mobile Profile Section */}
            {isLoggedIn && !isRecruiter && !isAdmin && (
              <div className="mobile-profile-section">
                <div className="mobile-profile-header">
                  <img
                    src={userInfo?.profile_pic || "/default-profile.png"}
                    alt="Profile"
                    className="mobile-profile-img"
                  />
                  <div className="mobile-profile-info">
                    <h4>{userInfo?.name || "User Name"}</h4>
                    <p>{userInfo?.userrole || "Job Seeker"}</p>
                  </div>
                </div>
                <div className="mobile-profile-links">
                  <Link to="/profile" className="mobile-profile-link" onClick={closeMobileMenu}>
                    <FaUserCircle className="mobile-profile-icon" /> My Account
                  </Link>
                  <Link to="/my-applications" className="mobile-profile-link" onClick={closeMobileMenu}>
                    <FaFileAlt className="mobile-profile-icon" /> My Applications
                  </Link>
                  <Link to="/notification" className="mobile-profile-link" onClick={closeMobileMenu}>
                    <FaBell className="mobile-profile-icon" /> Notifications
                    {unreadCount > 0 && (
                      <span className="mobile-notification-badge">{unreadCount}</span>
                    )}
                  </Link>
                  <Link to="/settings" className="mobile-profile-link" onClick={closeMobileMenu}>
                    <FaCog className="mobile-profile-icon" /> Settings
                  </Link>
                  <button onClick={() => { handleLogout(); closeMobileMenu(); }} className="mobile-profile-link logout-link">
                    <FaSignOutAlt className="mobile-profile-icon" /> Logout
                  </button>
                </div>
              </div>
            )}

            {/* Mobile Recruiter/Admin Logout */}
            {(isRecruiter || isAdmin) && (
              <div className="mobile-recruiter-logout">
                <button onClick={() => { handleLogout(); closeMobileMenu(); }} className="mobile-logout-btn">
                  <FaSignOutAlt className="logout-icon" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Action Buttons */}
      <div className="floating-buttons-container">
        <button
          onClick={handleEmailClick}
          className="floating-btn email-btn"
          aria-label="Send Email"
        >
          <Mail size={25} />
          <span className="tooltip">Send Email</span>
        </button>
        <button
          onClick={handleWhatsAppClick}
          className="floating-btn whatsapp-btn"
          aria-label="WhatsApp"
        >
          <svg viewBox="0 0 24 24" className="whatsapp-icon">
            <path
              fill="currentColor"
              d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335 .157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
            />
          </svg>
          <span className="tooltip">WhatsApp</span>
        </button>
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`floating-btn chat-btn ${isChatOpen ? "open" : ""}`}
          aria-label={isChatOpen ? "Close Chat" : "Open Chat"}
        >
          {isChatOpen ? <X size={25} /> : <MessageCircle size={25} />}
          <span className="tooltip">
            {isChatOpen ? "Close Chat" : "Chat with us"}
          </span>
        </button>
      </div>

      <ChatBox isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </nav>
  );
}

export default Navbar;

