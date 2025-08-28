
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, IdCard, Shield, Plus, Settings, Users, Briefcase, UserPlus, FileText, Activity, BarChart3, Clock, CheckCircle } from "lucide-react";
import "../Styles/RecruiterDashboard.css";

const RecruiterDashboard = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dashboardStats, setDashboardStats] = useState({
    activeJobs: 0,
    users: 0,
    recruiters: 0
  });

  // Authentication check
  useEffect(() => {
    const checkAuth = () => {
      const userRole = localStorage.getItem("userRole");
      if (!userRole || (userRole !== "ADMIN" && userRole !== "RECRUITER")) {
        navigate("/recruiter-login");
      }
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, [navigate]);

  // Data fetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRole = localStorage.getItem("userRole");
        const userName = localStorage.getItem("userName");
        const userEmail = localStorage.getItem("userEmail");
        const userId = localStorage.getItem("userId");
        const userPhone = localStorage.getItem("userPhone");
        const userImage = localStorage.getItem("userImage");
        const recruiterId = localStorage.getItem("recruiterId");



        if (userRole === "ADMIN") {
          setUserInfo({
            role: userRole,
            name: userName,
            email: userEmail,
            userId: userId,
            phone: userPhone || "9876543210",
            imageData: "/Logoo.png",
          });
          await fetchDashboardStats();
        } else {
          try {
            const response = await fetch(
              `${API_BASE}/api/recruiters/me`,
              {
                credentials: "include",
              }
            );

            if (response.ok) {
              const data = await response.json();
              setUserInfo({
                role: userRole,
                ...data,
              });
            } else {
              throw new Error("API call failed");
            }
          } catch (error) {
            console.error("Error fetching recruiter info:", error);
            setUserInfo({
              role: userRole,
              name: userName,
              email: userEmail,
              userId: userId,
              phone: userPhone || "",
              imageData: userImage || "",
              recruiterId: recruiterId || "",
            });
          }
        }
      } catch (error) {
        console.error("Data fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

    const API_BASE = process.env.REACT_APP_API_BASE_URL;

  const fetchDashboardStats = async () => {
    try {
      // Fetch active jobs count
      const jobsResponse = await fetch(`${API_BASE}/api/jobs`, {
        credentials: "include",
      });
      
      if (jobsResponse.ok) {
        const jobs = await jobsResponse.json();
        const activeJobsCount = jobs.filter(job => job.status !== 'CLOSED').length;
        setDashboardStats(prev => ({ ...prev, activeJobs: activeJobsCount }));
      }

      // Fetch users count
      const usersResponse = await fetch(`${API_BASE}/api/users/count`, {
        credentials: "include",
      });
      
      if (usersResponse.ok) {
        const userCount = await usersResponse.json();
        setDashboardStats(prev => ({ ...prev, users: userCount }));
      }

      // Fetch recruiters count
      const recruitersResponse = await fetch(`${API_BASE}/api/recruiters/count`, {
        credentials: "include",
      });
      
      if (recruitersResponse.ok) {
        const recruiterData = await recruitersResponse.json();
        setDashboardStats(prev => ({ ...prev, recruiters: recruiterData.count }));
      }
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    }
  };

  if (loading) {
    return (
      <div className="recruiter-dashboard-loading-container">
        <div className="recruiter-dashboard-loading-spinner"></div>
        <p className="recruiter-dashboard-loading-text">Loading dashboard...</p>
      </div>
    );
  }

  if (!userInfo) {
    return null;
  }

  return (
    <div className="recruiter-dashboard-container">
      <div className="recruiter-dashboard-header">
        <div className="recruiter-dashboard-header-content">
          <div className="recruiter-dashboard-user-profile-section">
            <div className="recruiter-dashboard-profile-image-container">
              {userInfo.imageData ? (
                userInfo.imageData.startsWith("data:image") ? (
                  <img
                    src={userInfo.imageData}
                    alt="Profile"
                    className="recruiter-dashboard-profile-image"
                  />
                ) : userInfo.role === "ADMIN" ? (
                  <img
                    src={userInfo.imageData}
                    alt="Admin Profile"
                    className="recruiter-dashboard-profile-image"
                  />
                ) : (
                  <img
                    src={`${API_BASE}${userInfo.imageData}`}
                    alt="Profile"
                    className="recruiter-dashboard-profile-image"
                  />
                )
              ) : (
                <div className="recruiter-dashboard-default-avatar">
                  <User size={32} />
                </div>
              )}
            </div>
            <div className="recruiter-dashboard-user-details">
              <h1 className="recruiter-dashboard-welcome-title">Welcome {userInfo.name} !</h1>
              <div className="recruiter-dashboard-user-info">
                <span className="recruiter-dashboard-role-badge">
                  <Shield size={14} />
                  {userInfo.role}
                </span>
                <span className="recruiter-dashboard-user-email">
                  <Mail size={14} />
                  {userInfo.email}
                </span>
                {userInfo.phone && (
                  <span className="recruiter-dashboard-user-phone">
                    <Phone size={14} />
                    {userInfo.phone}
                  </span>
                )}
                {userInfo.recruiterId && (
                  <span className="recruiter-dashboard-user-id">
                    <IdCard size={20} />
                    ID: {userInfo.recruiterId}
                  </span>
                )}
              </div>
              {userInfo.role === "ADMIN" && (
                <div className="recruiter-dashboard-admin-info">
                  <div className="recruiter-dashboard-admin-details">
                    <div className="recruiter-dashboard-admin-detail">
                      <span className="recruiter-dashboard-detail-label">
                        <IdCard size={20} />
                        Admin ID:
                      </span>
                      <span className="recruiter-dashboard-detail-value">{userInfo.userId}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {userInfo.role === "ADMIN" && (
            <div className="recruiter-dashboard-header-stats">
              <div className="recruiter-dashboard-stat-item">
                <div className="recruiter-dashboard-stat-icon">
                  <Briefcase size={20} />
                </div>
                <div className="recruiter-dashboard-stat-content">
                  <span className="recruiter-dashboard-stat-number">{dashboardStats.activeJobs}</span>
                  <span className="recruiter-dashboard-stat-label">Active Jobs</span>
                </div>
              </div>
              <div className="recruiter-dashboard-stat-item">
                <div className="recruiter-dashboard-stat-icon">
                  <Users size={20} />
                </div>
                <div className="recruiter-dashboard-stat-content">
                  <span className="recruiter-dashboard-stat-number">{dashboardStats.users}</span>
                  <span className="recruiter-dashboard-stat-label">Users</span>
                </div>
              </div>
              <div className="recruiter-dashboard-stat-item">
                <div className="recruiter-dashboard-stat-icon">
                  <UserPlus size={20} />
                </div>
                <div className="recruiter-dashboard-stat-content">
                  <span className="recruiter-dashboard-stat-number">{dashboardStats.recruiters}</span>
                  <span className="recruiter-dashboard-stat-label">Recruiters</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="recruiter-dashboard-content">
        <div className="recruiter-dashboard-quick-actions">
          <h2 className="recruiter-dashboard-section-title">Quick Actions</h2>
          <div className="recruiter-dashboard-grid">
            <div className="recruiter-dashboard-card recruiter-dashboard-card-primary">
              <div className="recruiter-dashboard-card-header">
                <div className="recruiter-dashboard-card-icon">
                  <Plus size={24} />
                </div>
                <div className="recruiter-dashboard-card-badge">Popular</div>
              </div>
              <h3 className="recruiter-dashboard-card-title">Post New Job</h3>
              <p className="recruiter-dashboard-card-description">Create and publish new job listings to attract top talent</p>
              <button
                className="recruiter-dashboard-card-action-btn"
                onClick={() => navigate("/post-jobs")}
              >
                <FileText size={16} />
                Post Job
              </button>
            </div>

            <div className="recruiter-dashboard-card recruiter-dashboard-card-secondary">
              <div className="recruiter-dashboard-card-header">
                <div className="recruiter-dashboard-card-icon">
                  <Settings size={24} />
                </div>
                <div className="recruiter-dashboard-card-badge">Manage</div>
              </div>
              <h3 className="recruiter-dashboard-card-title">Manage Jobs</h3>
              <p className="recruiter-dashboard-card-description">View, edit, and track your posted job listings</p>
              <button
                className="recruiter-dashboard-card-action-btn"
                onClick={() => navigate("/manage-jobs")}
              >
                <Briefcase size={16} />
                View Jobs
              </button>
            </div>

            {userInfo.role === "ADMIN" && (
              <>
                <div className="recruiter-dashboard-card recruiter-dashboard-card-success">
                  <div className="recruiter-dashboard-card-header">
                    <div className="recruiter-dashboard-card-icon recruiter-dashboard-admin-icon">
                      <UserPlus size={24} />
                    </div>
                    <div className="recruiter-dashboard-card-badge recruiter-dashboard-admin-badge">Admin</div>
                  </div>
                  <h3 className="recruiter-dashboard-card-title">Add Recruiter</h3>
                  <p className="recruiter-dashboard-card-description">Create new recruiter accounts and manage access</p>
                  <button
                    className="recruiter-dashboard-card-action-btn"
                    onClick={() => navigate("/add-recruiter")}
                  >
                    <UserPlus size={16} />
                    Add Recruiter
                  </button>
                </div>

                <div className="recruiter-dashboard-card recruiter-dashboard-card-info">
                  <div className="recruiter-dashboard-card-header">
                    <div className="recruiter-dashboard-card-icon recruiter-dashboard-admin-icon">
                      <Users size={24} />
                    </div>
                    <div className="recruiter-dashboard-card-badge recruiter-dashboard-admin-badge">Admin</div>
                  </div>
                  <h3 className="recruiter-dashboard-card-title">Manage Recruiters</h3>
                  <p className="recruiter-dashboard-card-description">Oversee all recruiters and their activities</p>
                  <button
                    className="recruiter-dashboard-card-action-btn"
                    onClick={() => navigate("/manage-recruiters")}
                  >
                    <Users size={16} />
                    View All
                  </button>
                </div>

                <div className="recruiter-dashboard-card recruiter-dashboard-card-warning">
                  <div className="recruiter-dashboard-card-header">
                    <div className="recruiter-dashboard-card-icon recruiter-dashboard-admin-icon">
                      <User size={24} />
                    </div>
                    <div className="recruiter-dashboard-card-badge recruiter-dashboard-admin-badge">Admin</div>
                  </div>
                  <h3 className="recruiter-dashboard-card-title">Manage Users</h3>
                  <p className="recruiter-dashboard-card-description">View and manage all registered users</p>
                  <button
                    className="recruiter-dashboard-card-action-btn"
                    onClick={() => navigate("/manage-users")}
                  >
                    <User size={16} />
                    Manage Users
                  </button>
                </div>

                <div className="recruiter-dashboard-card recruiter-dashboard-card-info">
                  <div className="recruiter-dashboard-card-header">
                    <div className="recruiter-dashboard-card-icon recruiter-dashboard-admin-icon">
                      <Users size={24} />
                    </div>
                    <div className="recruiter-dashboard-card-badge recruiter-dashboard-admin-badge">Admin</div>
                  </div>
                  <h3 className="recruiter-dashboard-card-title">Manage Job Applications</h3>
                  <p className="recruiter-dashboard-card-description">View and manage all applied users job</p>
                  <button
                    className="recruiter-dashboard-card-action-btn"
                    onClick={() => navigate("/manage-applications")}
                  >
                    <Users size={16} />
                    View All
                  </button>
                </div>

                
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;



// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { User, Mail, Phone, IdCard, Shield, Plus, Settings, Briefcase } from "lucide-react";
// import "../Styles/RecruiterDashboard.css";

// const RecruiterDashboard = () => {
//   const navigate = useNavigate();
//   const [userInfo, setUserInfo] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Authentication check - Recruiter only
//   useEffect(() => {
//     const checkAuth = () => {
//       const userRole = localStorage.getItem("userRole");
//       if (!userRole || userRole !== "RECRUITER") {
//         navigate("/recruiter-login");
//         return;
//       }
//     };

//     checkAuth();
//     window.addEventListener("storage", checkAuth);

//     return () => {
//       window.removeEventListener("storage", checkAuth);
//     };
//   }, [navigate]);

//   // Fetch recruiter data
//   useEffect(() => {
//     const fetchRecruiterData = async () => {
//       try {
//         const userRole = localStorage.getItem("userRole");
//         const userName = localStorage.getItem("userName");
//         const userEmail = localStorage.getItem("userEmail");
//         const userId = localStorage.getItem("userId");
//         const userPhone = localStorage.getItem("userPhone");
//         const userImage = localStorage.getItem("userImage");
//         const recruiterId = localStorage.getItem("recruiterId");

//         // Try to fetch updated data from API
//         try {
//           const response = await fetch("http://localhost:8080/api/recruiters/me", {
//             credentials: "include",
//           });

//           if (response.ok) {
//             const data = await response.json();
//             setUserInfo({
//               role: userRole,
//               ...data,
//             });
//           } else {
//             throw new Error("API call failed");
//           }
//         } catch (error) {
//           console.error("Error fetching recruiter info:", error);
//           // Fallback to localStorage data
//           setUserInfo({
//             role: userRole,
//             name: userName,
//             email: userEmail,
//             userId: userId,
//             phone: userPhone || "",
//             imageData: userImage || "",
//             recruiterId: recruiterId || "",
//           });
//         }
//       } catch (error) {
//         console.error("Recruiter data fetch failed:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRecruiterData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="recruiter-dashboard-loading-container">
//         <div className="recruiter-dashboard-loading-spinner"></div>
//         <p className="recruiter-dashboard-loading-text">Loading recruiter dashboard...</p>
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
//               {userInfo.imageData ? (
//                 userInfo.imageData.startsWith("data:image") ? (
//                   <img
//                     src={userInfo.imageData}
//                     alt="Profile"
//                     className="recruiter-dashboard-profile-image"
//                   />
//                 ) : (
//                   <img
//                     src={`http://localhost:8080${userInfo.imageData}`}
//                     alt="Profile"
//                     className="recruiter-dashboard-profile-image"
//                   />
//                 )
//               ) : (
//                 <div className="recruiter-dashboard-default-avatar">
//                   <User size={32} />
//                 </div>
//               )}
//             </div>
//             <div className="recruiter-dashboard-user-details">
//               <h1 className="recruiter-dashboard-welcome-title">Welcome {userInfo.name}!</h1>
//               <div className="recruiter-dashboard-user-info">
//                 <span className="recruiter-dashboard-role-badge">
//                   <Shield size={14} />
//                   {userInfo.role}
//                 </span>
//                 <span className="recruiter-dashboard-user-email">
//                   <Mail size={14} />
//                   {userInfo.email}
//                 </span>
//                 {userInfo.phone && (
//                   <span className="recruiter-dashboard-user-phone">
//                     <Phone size={14} />
//                     {userInfo.phone}
//                   </span>
//                 )}
//                 {userInfo.recruiterId && (
//                   <span className="recruiter-dashboard-user-id">
//                     <IdCard size={20} />
//                     ID: {userInfo.recruiterId}
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="recruiter-dashboard-content">
//         <div className="recruiter-dashboard-quick-actions">
//           <h2 className="recruiter-dashboard-section-title">Recruiter Actions</h2>
//           <div className="recruiter-dashboard-grid">
            
//             {/* Post New Job */}
//             <div className="recruiter-dashboard-card recruiter-dashboard-card-primary">
//               <div className="recruiter-dashboard-card-header">
//                 <div className="recruiter-dashboard-card-icon">
//                   <Plus size={24} />
//                 </div>
//                 <div className="recruiter-dashboard-card-badge">Popular</div>
//               </div>
//               <h3 className="recruiter-dashboard-card-title">Post New Job</h3>
//               <p className="recruiter-dashboard-card-description">Create and publish new job listings to attract top talent</p>
//               <button
//                 className="recruiter-dashboard-card-action-btn"
//                 onClick={() => navigate("/post-jobs")}
//               >
//                 <Plus size={16} />
//                 Post Job
//               </button>
//             </div>

//             {/* Manage Jobs */}
//             <div className="recruiter-dashboard-card recruiter-dashboard-card-secondary">
//               <div className="recruiter-dashboard-card-header">
//                 <div className="recruiter-dashboard-card-icon">
//                   <Settings size={24} />
//                 </div>
//                 <div className="recruiter-dashboard-card-badge">Manage</div>
//               </div>
//               <h3 className="recruiter-dashboard-card-title">Manage Jobs</h3>
//               <p className="recruiter-dashboard-card-description">View, edit, and track your posted job listings</p>
//               <button
//                 className="recruiter-dashboard-card-action-btn"
//                 onClick={() => navigate("/manage-jobs")}
//               >
//                 <Briefcase size={16} />
//                 View Jobs
//               </button>
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecruiterDashboard;