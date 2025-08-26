import React from "react";
import "../Styles/About.css";
import { FaEye, FaHandshake, FaRocket, FaGlobe } from "react-icons/fa";
const About = () => {
  return (
    <div className="about-page">
      <section className="intro-section">
        <div className="intro-text">
          <h1>Welcome to <strong>MomentumMerge</strong></h1>
          <p>A comprehensive job portal designed to bridge the gap between talented professionals and leading companies.</p>
          <p>We believe in a smarter, faster, and more human approach to job hunting and recruitment.</p>
        </div>
        <div className="intro-image image-1" />
      </section>
      <section className="split-section">
        <div className="left-text rotated-text">
          <h2 style={{color:"white"}}>Who we Are</h2>
        </div>
        <div className="right-content">
          <h2>Our Mission</h2>
          <p>
            Our mission is to empower individuals by providing access to meaningful job opportunities and helping businesses grow by connecting them with top talent.
          </p>
          <h2>Our Vision</h2>
          <p>
            We envision a world where finding a job or hiring the right person is seamless and hassle-free, where technology and empathy go hand-in-hand in shaping careers.
          </p>
          <h2>How It Works</h2>
          <p><strong>CareerConnect</strong> offers a two-sided platform:</p>
          <ul>
            <li><strong>Job Seekers:</strong> Register, build your profile, upload your resume, and apply for jobs that match your skills and interests.</li>
            <li><strong>Employers:</strong> Post job openings, browse qualified candidates, and manage applications effortlessly.</li>
          </ul>
        </div>
      </section>
      <section className="dual-section">
        <div className="text-section">
          <h2>For Job Seekers</h2>
          <p>
            We offer advanced search filters, resume-building tools, email alerts for new job matches, and a personalized dashboard to track applications.
            Our AI-based matching system ensures you only see jobs that truly suit your profile.
          </p>
          <h2>For Employers</h2>
          <p>
            CareerConnect helps companies reach top talent quickly through targeted listings, smart candidate suggestions, and robust hiring analytics.
            Whether you're a startup or a Fortune 500 company, we provide the tools you need to hire with confidence.
          </p>
        </div>
        <div className="intro-image image-2" />
      </section>
 <section className="value-section">
  <h2>Our Core Values</h2>
  <ul className="values-list">
    <li><FaEye className="icon" /> <strong>Transparency:</strong> We ensure clarity in listings and communication.</li>
    <li><FaHandshake className="icon" /> <strong>Trust:</strong> We build trusted relationships with our users and partners.</li>
    <li><FaRocket className="icon" /> <strong>Innovation:</strong> We constantly evolve to provide cutting-edge solutions.</li>
    <li><FaGlobe className="icon" /> <strong>Inclusivity:</strong> We believe in equal opportunity for all.</li>
  </ul>
</section>
      <section className="contact-section">
        <h2>Contact Us</h2>
        <p>
          Have questions or feedback? We're here to help! Reach out to us at <strong>support@momentum-merge.com</strong> or visit our <a href="/contact">Contact Page</a>.
        </p>
      </section>
    </div>
  );
};
export default About;