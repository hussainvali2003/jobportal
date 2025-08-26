// // import React from 'react';
// // import { Navigate, useLocation } from 'react-router-dom';

// // const ProtectedRoute = ({ children, allowedRoles, redirectTo = "/unauthorized" }) => {
// //   const location = useLocation();
// //   const userRole = localStorage.getItem('userRole');

// //   // If no user is logged in
// //   if (!userRole) {
// //     // Redirect to appropriate login based on the attempted route
// //     if (location.pathname.startsWith('/admin')) {
// //       return <Navigate to="/admin-login" state={{ from: location }} replace />;
// //     } else if (location.pathname.startsWith('/recruiter')) {
// //       return <Navigate to="/recruiter-login" state={{ from: location }} replace />;
// //     }
// //     return <Navigate to="/login" state={{ from: location }} replace />;
// //   }

// //   // If user role is not allowed for this route
// //   if (allowedRoles && !allowedRoles.includes(userRole)) {
// //     return <Navigate to={redirectTo} replace />;
// //   }

// //   // User is authorized, render the component
// //   return children;
// // };

// // export default ProtectedRoute;


// import React from "react";
// import { Navigate, useLocation } from "react-router-dom";

// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const location = useLocation();
//   const userRole = (localStorage.getItem("userRole") || "").toLowerCase();

//   // Not logged in
//   if (!userRole) {
//     if (location.pathname.startsWith("/admin")) {
//       return <Navigate to="/admin-login" state={{ from: location }} replace />;
//     }
//     if (location.pathname.startsWith("/recruiter")) {
//       return <Navigate to="/recruiter-login" state={{ from: location }} replace />;
//     }
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   // Role not allowed
//   if (allowedRoles && !allowedRoles.map(r => r.toLowerCase()).includes(userRole)) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   // Authorized → show child
//   return children;
// };

// export default ProtectedRoute;


import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles, redirectTo = "/unauthorized" }) => {
  const location = useLocation();
  const userRole = localStorage.getItem('userRole');

  // If no user is logged in
  if (!userRole) {
    if (location.pathname.startsWith('/admin')) {
      return <Navigate to="/admin-login" state={{ from: location }} replace />;
    } else if (location.pathname.startsWith('/recruiter')) {
      return <Navigate to="/recruiter-login" state={{ from: location }} replace />;
    }
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If allowedRoles is defined, enforce role check
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to={redirectTo} replace />;
  }

  // Otherwise, any logged-in user can access
  return children;
};

export default ProtectedRoute;
