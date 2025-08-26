import "../Styles/Services.css";
import React, { useState } from 'react';
import { FaBriefcase, FaChalkboardTeacher, FaFileAlt, FaHandshake, FaLaptopCode, FaBell, FaUsers, FaProjectDiagram, FaTimes } from 'react-icons/fa';
import { MdTrendingUp, MdSecurity } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';


const Services = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      icon: <FaBriefcase className="service-icon" />,
      title: "Premium Job Matching",
      description: "Get matched with opportunities that align perfectly with your skills and career aspirations through our AI-powered job matching system.",
      fullContent: "Our AI-powered job matching system goes beyond keyword filtering. It intelligently analyzes your resume, skills, experience, education, and career goals to match you with opportunities that truly align with your potential. The system uses smart algorithms and machine learning to understand both your hard and soft skills, preferences, and even your growth aspirations. Unlike generic job portals, we deliver curated opportunities directly to you—reducing time spent browsing and increasing relevance. You'll receive personalized job recommendations that improve over time based on your activity and feedback. This helps you focus on what really matters: preparing for roles that match your goals. Whether you're looking for your first job or planning your next big move, our system ensures every opportunity you receive is a meaningful one. Backed by real-time data and constantly evolving models, it helps you stay one step ahead in the competitive job market and boosts your chances of landing your ideal role faster."
    },
    {
      icon: <FaChalkboardTeacher className="service-icon" />,
      title: "Expert Career Guidance",
      description: "Receive personalized career counseling from industry experts who help you make informed decisions about your professional journey.",
      fullContent: "Navigating a career can be challenging without proper direction, especially with the rapidly changing job market. Our Expert Career Guidance service connects you with qualified professionals who have real-world experience across various domains. Whether you're a student, fresher, mid-career switcher, or a seasoned employee, our mentors help you gain clarity on your goals, skills, and industry expectations. We offer tailored sessions where you can ask questions, assess opportunities, and receive actionable advice for career transitions, higher studies, certifications, and job hunting. You'll get help in building a realistic and achievable career roadmap. Our experts also assist in identifying hidden strengths, fixing skill gaps, and preparing for specific job roles. The goal is to give you a 360-degree view of your professional journey. With guidance rooted in current industry trends, you'll make informed decisions, avoid common mistakes, and grow with confidence. Empower your journey with insights that go beyond just theory."
    },
    {
      icon: <FaFileAlt className="service-icon" />,
      title: "Professional Resume Services",
      description: "Stand out with ATS-optimized resumes and compelling cover letters crafted by our professional writers.",
      fullContent: "Your resume is often your first impression—and it must be perfect. Our Professional Resume Services offer expertly written, visually appealing, and ATS (Applicant Tracking System) compliant resumes that highlight your achievements and skills effectively. Our writers work closely with you to understand your background, roles, and future aspirations. We then craft a tailored resume that speaks directly to hiring managers. Whether you're targeting startups, MNCs, or government sectors, we create industry-specific versions that resonate with employers. Beyond resumes, we also offer cover letters, LinkedIn profile optimization, and job-specific application tailoring. With design and structure aligned to global standards, our service ensures your application doesn't get lost in the pile. We even offer review rounds to fine-tune everything until it's perfect. A compelling resume not only lands interviews—it sets the tone for your professional identity. Invest in your resume and unlock new career possibilities with the confidence that your first impression will be your best."
    },
    {
      icon: <FaHandshake className="service-icon" />,
      title: "Interview Preparation",
      description: "Master the art of interviewing with mock sessions, feedback, and insider tips from industry professionals.",
      fullContent: "Interviews can be nerve-wracking, but the right preparation makes all the difference. Our Interview Preparation service equips you with the tools and confidence to perform your best in any interview scenario. We offer mock interview sessions tailored to your job role, industry, and experience level. These simulations include HR, technical, managerial, and behavioral rounds. You'll receive immediate feedback on your responses, body language, and communication style. Additionally, we teach structured answering techniques like the STAR method, tips for resume-based questions, and how to tackle tricky or situational problems. Special focus is given to virtual interview etiquette, group discussions, and handling assessment tests. We also provide prep guides and common question banks. With our support, you'll walk into interviews knowing what to expect and how to handle it. Our goal is not just to help you pass the interview but to help you impress, connect, and negotiate the best opportunities confidently."
    },
    {
      icon: <FaLaptopCode className="service-icon" />,
      title: "Skill Enhancement Programs",
      description: "Access cutting-edge training programs and workshops to stay ahead in your field with the latest technologies and skills.",
      fullContent: "In today's dynamic job market, constant learning is essential to stay competitive. Our Skill Enhancement Programs are designed to upskill and reskill professionals across all experience levels. We offer courses in trending areas like web development, AI/ML, cloud computing, digital marketing, business analysis, finance, communication, and more. Each program is curated by industry experts and includes live sessions, hands-on projects, quizzes, and certifications. Whether you're switching domains or enhancing your current role, our training gives you both practical knowledge and credibility. We also offer soft skills training such as public speaking, leadership, and teamwork. You'll have access to mentors who can guide you through real-world applications. These programs help you bridge the gap between academic knowledge and industry demands. Upon completion, you'll not only gain valuable skills but also improved confidence, better job readiness, and access to a network of learners and professionals. Our mission is to future-proof your career through meaningful learning."
    },
    {
      icon: <FaBell className="service-icon" />,
      title: "Smart Job Alerts",
      description: "Never miss an opportunity with personalized job alerts based on your preferences and career goals.",
      fullContent: "Finding the right job at the right time can be a game-changer. Our Smart Job Alerts system keeps you ahead by sending personalized job opportunities directly to your email or dashboard based on your preferences. You can set filters by job title, location, industry, experience level, and more. Our AI-powered engine constantly scans new listings and alerts you as soon as a match appears—so you never miss out. It learns from your interactions, refining recommendations to improve accuracy. You can also control the frequency of alerts—daily, weekly, or instant. Whether you're actively looking or passively exploring, this feature ensures you stay updated without doing the legwork. It's especially useful for professionals who are short on time but don't want to miss out on better roles. Each alert comes with all necessary details—job description, requirements, company profile—so you can decide quickly. Stay informed, stay ready, and always be just one click away from your next opportunity."
    },
    {
      icon: <FaUsers className="service-icon" />,
      title: "Mentorship Network",
      description: "Connect with industry leaders and experienced professionals for guidance and networking opportunities.",
      fullContent: "Having a mentor can drastically transform your career journey. Our Mentorship Network connects you with experienced professionals across various domains who are passionate about sharing knowledge and guidance. Whether you're a student, a career switcher, or aiming for leadership, our mentors help you set clear goals, provide industry insights, and guide you through challenges. You'll benefit from regular one-on-one sessions, feedback on resumes and interview readiness, and networking tips. Our platform also hosts live Q&A events, mentorship panels, and success story webinars. These interactions not only provide clarity but also build your confidence and communication skills. Mentors often become long-term allies who support you through transitions, promotions, and personal growth. With guidance from someone who has already walked the path you're on, you avoid common pitfalls and stay motivated. A strong mentor relationship opens doors, builds perspective, and can even lead to referrals and job leads. You're not just learning—you're building meaningful professional relationships."
    },
    {
      icon: <FaProjectDiagram className="service-icon" />,
      title: "Career Development Resources",
      description: "Access our comprehensive library of career development resources, including webinars, e-books, and industry insights.",
      fullContent: "Your success depends not just on jobs and interviews, but also on what you know. Our Career Development Resources section offers a growing library of valuable tools to boost your employability. You'll find resume templates, job search strategies, webinar recordings, expert interviews, career planning guides, and more. These resources are written and reviewed by professionals from top industries and are tailored for both beginners and experienced individuals. Whether you want to switch roles, negotiate your salary, or understand workplace culture, our materials have you covered. We continuously update the content to reflect the latest industry standards, job market shifts, and recruitment trends. The platform supports self-paced learning, so you can explore topics based on your interests. These resources also complement our other services, giving you full control over your learning journey. Empower yourself with the knowledge and tools that help you make smart decisions and navigate your career with purpose."
    },
    {
      icon: <MdTrendingUp className="service-icon" />,
      title: "Market Insights",
      description: "Stay informed with the latest industry trends, salary insights, and market analysis to make better career decisions.",
      fullContent: "Understanding market dynamics is key to making informed career moves. Our Market Insights service provides real-time data and expert analysis on hiring trends, in-demand skills, salary benchmarks, and industry forecasts. We publish regular reports, visual dashboards, and comparative insights tailored to specific roles, locations, and sectors. Whether you're planning to negotiate a salary, explore a new industry, or simply understand where you stand, our insights help you make smart choices. We also highlight emerging job roles and declining markets, enabling you to pivot early and stay competitive. These insights are compiled from trusted sources, employer feedback, and recruitment data—ensuring accuracy and relevance. Additionally, we provide career planning suggestions based on current and future trends. You'll gain clarity on whether to invest in certifications, relocate, or switch roles. With access to such detailed and actionable intelligence, you'll never feel lost in your career journey. Stay informed, prepared, and always one step ahead of the curve."
    },
    {
      icon: <MdSecurity className="service-icon" />,
      title: "Career Protection",
      description: "Get guidance on employment contracts, salary negotiation, and workplace rights to ensure your career interests are protected.",
      fullContent: "Your career is one of your most important investments, and protecting it is vital. Our Career Protection services provide legal, contractual, and negotiation support so you're never exploited or left in the dark. We offer guidance on reviewing employment offers, understanding clauses in contracts, negotiating fair compensation, and recognizing unethical practices. Our team of experts helps you deal with issues like workplace harassment, wrongful termination, unpaid dues, and job disputes. You'll also receive access to templates, resignation letters, complaint formats, and negotiation scripts. We work to ensure that you not only get what you deserve but also maintain your dignity and confidence throughout the process. Whether you're a fresher or a seasoned employee, knowing your rights gives you strength. We aim to create awareness, prevent exploitation, and build a safer and fairer work environment for all our users. With us, you're not just building a career—you're securing it from all angles."
    }
  ];

  const openServiceModal = (service) => {
    setSelectedService(service);
  };

  const closeServiceModal = () => {
    setSelectedService(null);
  };

  const handleEnrollNow = () => {
    navigate('/payment');
  };

  return (
    <div className="services-container">
      <div className="services-header">
        <h1>Our Professional Services</h1>
        <p className="header-description">
          Empowering your career journey with comprehensive professional services tailored to your success
        </p>
      </div>

      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card" onClick={() => openServiceModal(service)}>
            <div className="service-image">
              <div className="service-overlay">
                {service.icon}
              </div>
            </div>
            <div className="service-content">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="read-more-indicator">
                <span>Click to learn more</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="service-modal-overlay" onClick={closeServiceModal}>
          <div className="service-modal" onClick={(e) => e.stopPropagation()}>
            <div className="service-modal-header">
              <div className="service-modal-icon">
                {selectedService.icon}
              </div>
              <h2>{selectedService.title}</h2>
              <button className="close-modal-btn" onClick={closeServiceModal}>
                <FaTimes />
              </button>
            </div>
            
            <div className="service-modal-content">
              <div className="service-modal-text">
                {selectedService.fullContent}
              </div>
              
              <div className="service-modal-actions">
                <button className="enroll-now-btn" onClick={handleEnrollNow}>
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* <div className="cta-section">
        <h2>Ready to Accelerate Your Career?</h2>
        <p>Join thousands of professionals who have transformed their careers with our services</p>
        <div className="cta-buttons">
          <button className="cta-button primary">Get Started</button>
          <button className="cta-button secondary">Learn More</button>
        </div>
      </div> */}
    </div>
  );
};

export default Services;
