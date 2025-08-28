
// import React from "react";
// import "../Styles/Footer.css";
// import { useNavigate, Link } from "react-router-dom";
// import {
//   FaBriefcase, FaLaptopCode, FaBuilding, FaPhoneAlt, FaMapMarkerAlt,
//   FaInstagram, FaLinkedin, FaFacebookF, FaEnvelope ,FaHeadset
// } from "react-icons/fa";
// function Footer() {
//   const navigate = useNavigate();
//   const handleNavigation = () => {
//     const isLoggedIn = localStorage.getItem("user");
//     if (isLoggedIn) {
//       navigate("/jobs");
//     } else {
//       navigate("/login");
//     }
//   };
//   return (
//     <div className="Footer">
//       <div className="secfooter">
//         <div className="secjdiv">
//           <h3>Employers Hub:</h3>
//            <ul>
//             <li><Link to="/recruiter-dashboard" style={linkStyle}>Employers Login</Link></li>
//             <li><Link to="/post-job" style={linkStyle}>Post a Job</Link></li>
//             <li><Link to="/candidate-search" style={linkStyle}>Candidate Search</Link></li>
//             <li><Link to="/recruiter-resources" style={linkStyle}>Resources</Link></li>
//           </ul>
//         </div>
//         <div className="secjdiv">
//         <h3> Support:</h3>
//           <ul>
//             <li><Link to="/get-assistance" style={linkStyle}>Get Assistance</Link></li>
//             <li><Link to="/feedback" style={linkStyle}>Feedback & Complaints</Link></li>
//             <li><Link to="/report-issue" style={linkStyle}>Report an Issue</Link></li>
//           </ul>
//         </div>
//         <div className="thirdjdiv">
//           <h3> About & Legal:</h3>
//           <ul>
//            <li><Link to="/terms&conditions" style={{ color: "inherit", textDecoration: "none" }}>Terms Of Use</Link></li>
//            <li><Link to="/privacypolicy" style={{ color: "inherit", textDecoration: "none" }}>Privacy Policy</Link></li>
//             <li><Link to="/contact" style={{ color: "inherit", textDecoration: "none" }}>Contact Us</Link></li>
//             <li><Link to="/About" style={{ color: "inherit", textDecoration: "none" }}>Company Info</Link></li>
//           </ul>
//         </div>
//         <div className="contactSection">
//           <h3>Contact:</h3>
//           <p><FaMapMarkerAlt /> Novel MSR Tech Park, Marathahalli, Bangalore</p>
//           <p><FaPhoneAlt /> +91 98765 43210</p>
//           <p><FaEnvelope /> support@momentum-merge.com</p>
//           <div className="socialIcons">
//             <a href="https://www.linkedin.com/company/momentummerge/posts/?feedView=all" target="_blank" rel="noreferrer"><FaLinkedin /></a>
//             <a href="https://www.facebook.com/people/MomentumMerge/61559698476789/" target="_blank" rel="noreferrer"><FaFacebookF /></a>
//             <a href="https://www.instagram.com/momentummerge/" target="_blank" rel="noreferrer"><FaInstagram /></a>
//           </div>
//           {/* <div className="qrCodeSection">
//             <img src="QRcode (2).png" alt="QR Code" className="qrImage" />
//             <a
//               href="https://www.momentum-merge.com/"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="qrLink"
//             >
//               Know More
//             </a>
//           </div> */}
//         </div>
//       </div>
//       <p className="paraj">
//         Copyright © 2025 | All rights reserved by MomentumMerge
//       </p>
//     </div>
//   );
// }
// const linkStyle = {
//   color: "inherit",
//   textDecoration: "none",
//   cursor: "pointer"
// };
// export default Footer;


import React from "react";
import "../Styles/Footer.css";
import { useNavigate, Link } from "react-router-dom";
import {
  FaBriefcase, FaLaptopCode, FaBuilding, FaPhoneAlt, FaMapMarkerAlt,
  FaInstagram, FaLinkedin, FaFacebookF, FaEnvelope, FaHeadset
} from "react-icons/fa";

function Footer() {
  const navigate = useNavigate();
  
  const handleNavigation = () => {
    const isLoggedIn = localStorage.getItem("user");
    if (isLoggedIn) {
      navigate("/jobs");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="Footer">
      <div className="footer-content">
        <div className="footer-column">
          <ul>
            <li><Link to="/recruiter-login" style={linkStyle}>Employer Hub</Link></li>
            <li><Link to="/momentum-blog" style={linkStyle}>Momentum Blog</Link></li>
            <li><Link to="/quick-links" style={linkStyle}>Quick Links</Link></li>
            <li><Link to="/feedback" style={linkStyle}>Feedback</Link></li>
          </ul>
        </div>
        
        <div className="footer-column">
          <ul>
            <li><Link to="/get-assistance" style={linkStyle}>Get Assistance</Link></li>
            <li><Link to="/feedback" style={linkStyle}>Complaints</Link></li>
            <li><Link to="/report-issue" style={linkStyle}>Report an Issue</Link></li>
          </ul>
        </div>
        
        <div className="footer-column">
          <ul>
            <li><Link to="/terms&conditions" style={linkStyle}>Terms Of Use</Link></li>
            <li><Link to="/privacypolicy" style={linkStyle}>Privacy Policy</Link></li>
            <li><Link to="/contact" style={linkStyle}>Contact Us</Link></li>
            <li><Link to="/About" style={linkStyle}>Company Info</Link></li>
          </ul>
        </div>
        
        <div className="footer-column contact-info">
          <ul>
            <li><FaMapMarkerAlt /> Novel MSR Tech Park, Marathahalli, Bangalore</li>
            <li><FaPhoneAlt /> +91 98765 43210</li>
            <li><FaEnvelope /> support@momentum-merge.com</li>
          </ul>
          
          <div className="social-icons">
            <a href="https://www.linkedin.com/company/momentummerge/posts/?feedView=all" target="_blank" rel="noreferrer"><FaLinkedin /></a>
            <a href="https://www.facebook.com/people/MomentumMerge/61559698476789/" target="_blank" rel="noreferrer"><FaFacebookF /></a>
            <a href="https://www.instagram.com/momentummerge/" target="_blank" rel="noreferrer"><FaInstagram /></a>
          </div>
        </div>
        
        <div className="footer-column qr-section">
          <img src="QRcode (2).png" alt="QR Code" className="qr-code" />
          <a
            href="https://www.momentum-merge.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="qr-link"
          >
            Scan to know more
          </a>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>Copyright © 2025 | All rights reserved by MomentumMerge</p>
      </div>
    </div>
  );
}

const linkStyle = {
  color: "inherit",
  textDecoration: "none",
  cursor: "pointer"
};

export default Footer;