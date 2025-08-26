
import React from "react";
import "../Styles/Footer.css";
import { useNavigate, Link } from "react-router-dom";
import {
  FaBriefcase, FaLaptopCode, FaBuilding, FaPhoneAlt, FaMapMarkerAlt,
  FaInstagram, FaLinkedin, FaFacebookF, FaEnvelope
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
      <div className="secfooter">
        <div className="fjdiv">
          <h3><FaBriefcase /> Jobs By Function</h3>
          <ul>
            <li><span onClick={handleNavigation} style={linkStyle}>IT Jobs</span></li>
            <li><span onClick={handleNavigation} style={linkStyle}>Non IT Jobs</span></li>
            <li><span onClick={handleNavigation} style={linkStyle}>More Jobs</span></li>
          </ul>
        </div>
        <div className="secjdiv">
          <h3><FaLaptopCode /> IT Job Skills</h3>
          <ul>
            <li><span onClick={handleNavigation} style={linkStyle}>Java Jobs</span></li>
            <li><span onClick={handleNavigation} style={linkStyle}>SAP Jobs</span></li>
            <li><span onClick={handleNavigation} style={linkStyle}>.NET Jobs</span></li>
            <li><span onClick={handleNavigation} style={linkStyle}>SQL Jobs</span></li>
            <li><span onClick={handleNavigation} style={linkStyle}>Data Analytics Jobs</span></li>
            <li><span onClick={handleNavigation} style={linkStyle}>Developer Jobs</span></li>
            <li><span onClick={handleNavigation} style={linkStyle}>Software Testing Jobs</span></li>
            <li><span onClick={handleNavigation} style={linkStyle}>All Jobs</span></li>
          </ul>
        </div>
        <div className="thirdjdiv">
          <h3><FaBuilding /> Companies</h3>
          <ul>
           <li><Link to="/terms&conditions" style={{ color: "inherit", textDecoration: "none" }}>Terms Of Use</Link></li>
           <li><Link to="/privacypolicy" style={{ color: "inherit", textDecoration: "none" }}>Privacy Policy</Link></li>
            <li><Link to="/contact" style={{ color: "inherit", textDecoration: "none" }}>Contact Us</Link></li>
            <li><Link to="/About" style={{ color: "inherit", textDecoration: "none" }}>Company Info</Link></li>
          </ul>
        </div>
        <div className="contactSection">
          <h3>Contact</h3>
          <p><FaMapMarkerAlt /> Novel Office, Marathahalli, Bangalore</p>
          <p><FaPhoneAlt /> +91 98765 43210</p>
          <p><FaEnvelope /> contact@momentummerge.com</p>
          <div className="socialIcons">
            <a href="https://www.linkedin.com/company/momentummerge/posts/?feedView=all" target="_blank" rel="noreferrer"><FaLinkedin /></a>
            <a href="https://www.facebook.com/people/MomentumMerge/61559698476789/" target="_blank" rel="noreferrer"><FaFacebookF /></a>
            <a href="https://www.instagram.com/momentummerge/" target="_blank" rel="noreferrer"><FaInstagram /></a>
          </div>
          <div className="qrCodeSection">
            <img src="QRcode (2).png" alt="QR Code" className="qrImage" />
            <a
              href="https://www.momentum-merge.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="qrLink"
            >
              Know More
            </a>
          </div>
        </div>
      </div>
      <p className="paraj">
        Copyright © 2025 | All rights reserved by MomentumMerge
      </p>
    </div>
  );
}
const linkStyle = {
  color: "inherit",
  textDecoration: "none",
  cursor: "pointer"
};
export default Footer;