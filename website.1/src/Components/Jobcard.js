import React, { useState, useRef, useEffect } from "react";
import "../Styles/Jobcard.css";
function Jobcard() {
  const scrollRef = useRef(null);
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollPosition = 0;
    const scrollSpeed = 1;
    const scrollInterval = setInterval(() => {
      if (scrollContainer) {
        scrollPosition += scrollSpeed;
        if (scrollPosition >= scrollContainer.scrollHeight / 2) {
          scrollPosition = 0;
        }
        scrollContainer.style.transform = `translateY(-${scrollPosition}px)`;
      }
    }, 30);
    return () => clearInterval(scrollInterval);
  }, []);
  const [modalContent, setModalContent] = useState(null);
  const openModal = (title, content) => {
    setModalContent({ title, content });
  };
  const closeModal = () => {
    setModalContent(null);
  };
  return (
    <div id="jbox">
      <h1 className="section-titles">What We Offer</h1>
      <div className="job-section">
        <div className="job-cards-container">
          <div className="box">
            <h3>Searching the Best Jobs</h3>
            <p className="job-description">
              Finding the right job is both a challenge and an opportunity. With
              a clear strategy and the right mindset, your job search can lead
              to a fulfilling and successful career path.
            </p>
            <button
              className="read-more1" style={{marginTop:"25px"}}
              onClick={() =>
                openModal(
                  "Searching the Best Jobs",
                  <>
                    <h3>1. Define Your Career Objectives</h3>
                    <p>
                      Begin by identifying your professional interests and
                      long-term career goals. Consider the industry, company
                      values, work environment, and potential for advancement. A
                      clear vision will help guide your job search in the right
                      direction.
                    </p>
                    <h3>2. Craft a Compelling Resume and Cover Letter</h3>
                    <p>
                      Tailor your resume to highlight relevant skills,
                      achievements, and experience. Use action-oriented language
                      and quantifiable results wherever possible. Pair it with a
                      personalized cover letter that speaks to the specific role
                      and company.
                    </p>
                    <h3>3. Leverage Job Portals and Networking Platforms</h3>
                    <p>
                      Utilize reputable job search websites such as LinkedIn,
                      Indeed, and Glassdoor. Set up alerts for new opportunities
                      and maintain an updated, professional online profile.
                      Donâ€™t underestimate the power of networkingâ€”connect with
                      professionals in your field.
                    </p>
                    <h3>4. Prepare Strategically for Interviews</h3>
                    <p>
                      Research each company thoroughly and understand the role
                      you're applying for. Practice answering behavioral and
                      technical questions, and prepare thoughtful questions for
                      the interviewer. Dress appropriately, maintain eye
                      contact, and demonstrate enthusiasm and confidence.
                    </p>
                    <h3>5. Follow Up and Stay Positive</h3>
                    <p>
                      After interviews, send a brief thank-you email expressing
                      your appreciation and continued interest. Rejections are
                      part of the processâ€”stay persistent, seek feedback, and
                      continue improving.
                    </p>
                  </>
                )
              }
            >
              Read More
            </button>
          </div>
          <div className="box">
            <h3>Apply for a Good Job</h3>
            <p className="job-description">
              A strategic and well-prepared job search significantly improves
              your chances of securing the right opportunity. Explore the
              essential steps to position yourself for success.
            </p>
            <button
              className="read-more1" style={{marginTop:"15px"}}
              onClick={() =>
                openModal(
                  "Apply for a Good Job",
                  <>
                    <h3>1. Set Clear Career Goals</h3>
                    <p>
                      Define your desired role, industry, and career path to
                      focus your job search and make informed decisions.
                    </p>
                    <h3>2. Build a Strong, Professional Resume</h3>
                    <p>
                      Use our resume tools to highlight your skills, experience,
                      and accomplishments that align with current market
                      demands.
                    </p>
                    <h3>3. Search and Apply with Confidence</h3>
                    <p>
                      Explore thousands of verified job listings on our
                      platform. Filter by role, location, or company to find
                      your perfect match.
                    </p>
                    <h3>4. Upskill and Stay Competitive</h3>
                    <p>
                      Take advantage of learning resources and certifications
                      offered through our portal to enhance your qualifications
                      and stay ahead.
                    </p>
                  </>
                )
              }
            >
              READ More
            </button>
          </div>
         <div className="box">
  <h3>Apply for Your Ideal Job</h3>
  <p className="job-description">
    Discover career opportunities from trusted employers, tailored to your goals. Our platform streamlines the application processâ€”fast, simple, and effective.
  </p>
  <button
    className="read-more1" style={{marginTop:"25px"}}
    onClick={() =>
      openModal(
        "Apply for Your Ideal Job",
        <>
          <h3>1. Browse Curated Job Listings</h3>
          <p>
            Access verified opportunities from reputable companies across industries, updated regularly to match market demand.
          </p>
          <h3>2. Simplified Application Experience</h3>
          <p>
            Apply to roles quickly and efficiently through our user-friendly platformâ€”no lengthy forms or repetitive uploads.
          </p>
          <h3>3. Smart Job Matching</h3>
          <p>
            Receive personalized job recommendations powered by AI, based on your skills, interests, and career history.
          </p>
          <h3>4. Resume Tools & Career Resources</h3>
          <p>
            Build a standout resume using our expert templates and get actionable advice to boost your job search success.
          </p>
        </>
      )
    }
  >
    READ More
  </button>
</div>
        </div>
      </div>
      {modalContent && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{modalContent.title}</h2>
            {modalContent.content}
            <button
              className="close-modal"
              onClick={closeModal}
              aria-label="Close"
            >
              &times; {/* This is the Ã— symbol */}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default Jobcard;

