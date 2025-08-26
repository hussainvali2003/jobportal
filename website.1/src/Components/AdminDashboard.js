// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { User, Mail, Phone, IdCard, Shield, Users, Briefcase, UserPlus, FileText, Settings } from "lucide-react";
// import "../Styles/RecruiterDashboard.css";

// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const [userInfo, setUserInfo] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [dashboardStats, setDashboardStats] = useState({
//     activeJobs: 0,
//     users: 0,
//     recruiters: 0
//   });

//   // Authentication check - Admin only
//   useEffect(() => {
//     const checkAuth = () => {
//       const userRole = localStorage.getItem("userRole");
//       if (!userRole || userRole !== "ADMIN") {
//         navigate("/admin-login");
//         return;
//       }
//     };

//     checkAuth();
//     window.addEventListener("storage", checkAuth);

//     return () => {
//       window.removeEventListener("storage", checkAuth);
//     };
//   }, [navigate]);

//   // Fetch admin data and statistics
//   useEffect(() => {
//     const fetchAdminData = async () => {
//       try {
//         const userRole = localStorage.getItem("userRole");
//         const userName = localStorage.getItem("userName");
//         const userEmail = localStorage.getItem("userEmail");
//         const userId = localStorage.getItem("userId");
//         const userPhone = localStorage.getItem("userPhone");

//         setUserInfo({
//           role: userRole,
//           name: userName,
//           email: userEmail,
//           userId: userId,
//           phone: userPhone || "9876543210",
//           imageData: "/Logoo.png",
//         });

//         await fetchDashboardStats();
//       } catch (error) {
//         console.error("Admin data fetch failed:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAdminData();
//   }, []);

//   const fetchDashboardStats = async () => {
//     try {
//       // Fetch active jobs count
//       const jobsResponse = await fetch("http://localhost:8080/api/jobs", {
//         credentials: "include",
//       });
      
//       if (jobsResponse.ok) {
//         const jobs = await jobsResponse.json();
//         const activeJobsCount = jobs.filter(job => job.status !== 'CLOSED').length;
//         setDashboardStats(prev => ({ ...prev, activeJobs: activeJobsCount }));
//       }

//       // Fetch users count
//       const usersResponse = await fetch("http://localhost:8080/api/users/count", {
//         credentials: "include",
//       });
      
//       if (usersResponse.ok) {
//         const userCount = await usersResponse.json();
//         setDashboardStats(prev => ({ ...prev, users: userCount }));
//       }

//       // Fetch recruiters count
//       const recruitersResponse = await fetch("http://localhost:8080/api/recruiters/count", {
//         credentials: "include",
//       });
      
//       if (recruitersResponse.ok) {
//         const recruiterData = await recruitersResponse.json();
//         setDashboardStats(prev => ({ ...prev, recruiters: recruiterData.count }));
//       }
//     } catch (error) {
//       console.error("Error fetching dashboard stats:", error);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="recruiter-dashboard-loading-container">
//         <div className="recruiter-dashboard-loading-spinner"></div>
//         <p className="recruiter-dashboard-loading-text">Loading admin dashboard...</p>
//       </div>
//     );
//   }

//   if (!userInfo) {
//     return null;
//   }

//   return (
//     <div className="recruiter-dashboard-container">
//       <div className="recruiter-dashboard-header">
//         <div className="recruiter-dashboard-header-content">
//           <div className="recruiter-dashboard-user-profile-section">
//             <div className="recruiter-dashboard-profile-image-container">
//               <img
//                 src={userInfo.imageData}
//                 alt="Admin Profile"
//                 className="recruiter-dashboard-profile-image"
//               />
//             </div>
//             <div className="recruiter-dashboard-user-details">
//               <h1 className="recruiter-dashboard-welcome-title">Welcome Admin {userInfo.name}!</h1>
//               <div className="recruiter-dashboard-user-info">
//                 <span className="recruiter-dashboard-role-badge">
//                   <Shield size={14} />
//                   {userInfo.role}
//                 </span>
//                 <span className="recruiter-dashboard-user-email">
//                   <Mail size={14} />
//                   {userInfo.email}
//                 </span>
//                 <span className="recruiter-dashboard-user-phone">
//                   <Phone size={14} />
//                   {userInfo.phone}
//                 </span>
//               </div>
//               <div className="recruiter-dashboard-admin-info">
//                 <div className="recruiter-dashboard-admin-details">
//                   <div className="recruiter-dashboard-admin-detail">
//                     <span className="recruiter-dashboard-detail-label">
//                       <IdCard size={20} />
//                       Admin ID:
//                     </span>
//                     <span className="recruiter-dashboard-detail-value">{userInfo.userId}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           <div className="recruiter-dashboard-header-stats">
//             <div className="recruiter-dashboard-stat-item">
//               <div className="recruiter-dashboard-stat-icon">
//                 <Briefcase size={20} />
//               </div>
//               <div className="recruiter-dashboard-stat-content">
//                 <span className="recruiter-dashboard-stat-number">{dashboardStats.activeJobs}</span>
//                 <span className="recruiter-dashboard-stat-label">Active Jobs</span>
//               </div>
//             </div>
//             <div className="recruiter-dashboard-stat-item">
//               <div className="recruiter-dashboard-stat-icon">
//                 <Users size={20} />
//               </div>
//               <div className="recruiter-dashboard-stat-content">
//                 <span className="recruiter-dashboard-stat-number">{dashboardStats.users}</span>
//                 <span className="recruiter-dashboard-stat-label">Users</span>
//               </div>
//             </div>
//             <div className="recruiter-dashboard-stat-item">
//               <div className="recruiter-dashboard-stat-icon">
//                 <UserPlus size={20} />
//               </div>
//               <div className="recruiter-dashboard-stat-content">
//                 <span className="recruiter-dashboard-stat-number">{dashboardStats.recruiters}</span>
//                 <span className="recruiter-dashboard-stat-label">Recruiters</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="recruiter-dashboard-content">
//         <div className="recruiter-dashboard-quick-actions">
//           <h2 className="recruiter-dashboard-section-title">Admin Controls</h2>
//           <div className="recruiter-dashboard-grid">
            
//             {/* Recruiter Management */}
//             <div className="recruiter-dashboard-card recruiter-dashboard-card-success">
//               <div className="recruiter-dashboard-card-header">
//                 <div className="recruiter-dashboard-card-icon recruiter-dashboard-admin-icon">
//                   <UserPlus size={24} />
//                 </div>
//                 <div className="recruiter-dashboard-card-badge recruiter-dashboard-admin-badge">Admin Only</div>
//               </div>
//               <h3 className="recruiter-dashboard-card-title">Add Recruiter</h3>
//               <p className="recruiter-dashboard-card-description">Create new recruiter accounts and manage access</p>
//               <button
//                 className="recruiter-dashboard-card-action-btn"
//                 onClick={() => navigate("/add-recruiter")}
//               >
//                 <UserPlus size={16} />
//                 Add Recruiter
//               </button>
//             </div>

//             <div className="recruiter-dashboard-card recruiter-dashboard-card-info">
//               <div className="recruiter-dashboard-card-header">
//                 <div className="recruiter-dashboard-card-icon recruiter-dashboard-admin-icon">
//                   <Users size={24} />
//                 </div>
//                 <div className="recruiter-dashboard-card-badge recruiter-dashboard-admin-badge">Admin Only</div>
//               </div>
//               <h3 className="recruiter-dashboard-card-title">Manage Recruiters</h3>
//               <p className="recruiter-dashboard-card-description">Oversee all recruiters and their activities</p>
//               <button
//                 className="recruiter-dashboard-card-action-btn"
//                 onClick={() => navigate("/manage-recruiters")}
//               >
//                 <Users size={16} />
//                 View All
//               </button>
//             </div>

//             {/* User Management */}
//             <div className="recruiter-dashboard-card recruiter-dashboard-card-warning">
//               <div className="recruiter-dashboard-card-header">
//                 <div className="recruiter-dashboard-card-icon recruiter-dashboard-admin-icon">
//                   <User size={24} />
//                 </div>
//                 <div className="recruiter-dashboard-card-badge recruiter-dashboard-admin-badge">Admin Only</div>
//               </div>
//               <h3 className="recruiter-dashboard-card-title">Manage Users</h3>
//               <p className="recruiter-dashboard-card-description">View and manage all registered users</p>
//               <button
//                 className="recruiter-dashboard-card-action-btn"
//                 onClick={() => navigate("/manage-users")}
//               >
//                 <User size={16} />
//                 Manage Users
//               </button>
//             </div>

//             {/* Job Management */}
//             <div className="recruiter-dashboard-card recruiter-dashboard-card-primary">
//               <div className="recruiter-dashboard-card-header">
//                 <div className="recruiter-dashboard-card-icon">
//                   <Settings size={24} />
//                 </div>
//                 <div className="recruiter-dashboard-card-badge">Manage</div>
//               </div>
//               <h3 className="recruiter-dashboard-card-title">Manage Jobs</h3>
//               <p className="recruiter-dashboard-card-description">View, edit, and track all job listings</p>
//               <button
//                 className="recruiter-dashboard-card-action-btn"
//                 onClick={() => navigate("/manage-jobs")}
//               >
//                 <Briefcase size={16} />
//                 View Jobs
//               </button>
//             </div>

//             {/* Application Management */}
//             <div className="recruiter-dashboard-card recruiter-dashboard-card-info">
//               <div className="recruiter-dashboard-card-header">
//                 <div className="recruiter-dashboard-card-icon recruiter-dashboard-admin-icon">
//                   <FileText size={24} />
//                 </div>
//                 <div className="recruiter-dashboard-card-badge recruiter-dashboard-admin-badge">Admin Only</div>
//               </div>
//               <h3 className="recruiter-dashboard-card-title">Manage Applications</h3>
//               <p className="recruiter-dashboard-card-description">View and manage all job applications</p>
//               <button
//                 className="recruiter-dashboard-card-action-btn"
//                 onClick={() => navigate("/manage-applications")}
//               >
//                 <FileText size={16} />
//                 View All
//               </button>
//             </div>

//             {/* Job Posting - Admin can also post jobs */}
//             <div className="recruiter-dashboard-card recruiter-dashboard-card-secondary">
//               <div className="recruiter-dashboard-card-header">
//                 <div className="recruiter-dashboard-card-icon">
//                   <Briefcase size={24} />
//                 </div>
//                 <div className="recruiter-dashboard-card-badge">Create</div>
//               </div>
//               <h3 className="recruiter-dashboard-card-title">Post New Job</h3>
//               <p className="recruiter-dashboard-card-description">Create and publish new job listings</p>
//               <button
//                 className="recruiter-dashboard-card-action-btn"
//                 onClick={() => navigate("/post-jobs")}
//               >
//                 <Briefcase size={16} />
//                 Post Job
//               </button>
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;