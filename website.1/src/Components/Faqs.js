import React, { useState } from 'react';
import "../Styles/Faqs.css";
import { ChevronDown, ChevronUp, Search, Compass, FileText, Briefcase, Mic, Settings, GraduationCap, Globe, Users, Languages, UserPlus, UserCheck, PenTool as Tool, Phone, Mail } from 'lucide-react';

const Faqs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedItems, setExpandedItems] = useState({});

  const categories = [
    { id: 'getting-started', icon: <Compass className="category-icon" />, title: 'Getting Started' },
    { id: 'profile-resume', icon: <FileText className="category-icon" />, title: 'Profile and Resume' },
    { id: 'job-applications', icon: <Briefcase className="category-icon" />, title: 'Job Applications' },
    { id: 'interviews', icon: <Mic className="category-icon" />, title: 'Interviews and Selection' },
    { id: 'advanced', icon: <Settings className="category-icon" />, title: 'Advanced Features' },
    { id: 'freshers', icon: <GraduationCap className="category-icon" />, title: 'For Freshers' },
    { id: 'platform', icon: <Globe className="category-icon" />, title: 'Platform Use' },
    { id: 'non-it', icon: <Users className="category-icon" />, title: 'Non-IT Jobs' },
    { id: 'language', icon: <Languages className="category-icon" />, title: 'Language & Support' },
    { id: 'women', icon: <UserPlus className="category-icon" />, title: 'For Women' },
    { id: 'senior', icon: <UserCheck className="category-icon" />, title: 'Senior Professionals' }
  ];

  const faqData = {
    'getting-started': [
      {
        question: "How do I create an account?",
        answer: "Click the \"Sign Up\" button on the homepage and fill in your details such as name, email, and password. You'll receive a verification email to activate your account."
      },
      {
        question: "What if I forget my password?",
        answer: "Click on the \"Forgot Password\" link on the login page. Enter your registered email and follow the instructions to reset your password."
      }
    ],
    'profile-resume': [
      {
        question: "How do I complete my profile?",
        answer: "After logging in, go to your dashboard and click on \"Edit Profile.\" Add your personal details, education, work experience, and upload your resume."
      },
      {
        question: "Can I upload multiple resumes?",
        answer: "Yes, you can upload different resumes tailored for different job roles, and select the most relevant one when applying."
      },
      {
        question: "Is my personal information safe?",
        answer: "Absolutely. We follow strict data privacy policies to ensure your personal data is protected and not shared without your consent."
      }
    ],
    'job-applications': [
      {
        question: "How can I apply for a job?",
        answer: "Visit the Jobs section, browse or search for openings, and click \"Apply Now\" on any listing to submit your application instantly."
      },
      {
        question: "Can I track the status of my application?",
        answer: "Yes, go to the \"My Applications\" tab on your dashboard to check the status of your submitted job applications."
      },
      {
        question: "What happens after I apply for a job?",
        answer: "Employers will review your application. If shortlisted, you'll receive a message or email with further steps, such as interview details."
      }
    ],
    'interviews': [
      {
        question: "Will I be notified about interview calls?",
        answer: "Yes, if an employer selects your application, you'll receive an email, dashboard notification, or SMS with interview details."
      },
      {
        question: "Can I reschedule an interview?",
        answer: "If the employer allows rescheduling, you'll see that option in the interview invitation message. Otherwise, contact the employer directly using the provided contact details."
      },
      {
        question: "Do you conduct interviews on this platform?",
        answer: "Some employers may schedule virtual interviews through our platform. You'll receive a link and time slot if this applies."
      }
    ],
    'advanced': [
      {
        question: "What is the \"Recommended for You\" section?",
        answer: "This section shows jobs that best match your profile, skills, and past applications using our smart algorithm."
      },
      {
        question: "How do I improve my profile visibility to employers?",
        answer: "Make sure your profile is 100% complete, add relevant keywords to your resume, and stay active by applying to jobs regularly."
      }
    ],
    'freshers': [
      {
        question: "I'm a fresher. Can I still apply for jobs?",
        answer: "Absolutely! Use the \"Fresher Jobs\" filter on the job search page to find openings suitable for candidates with no prior work experience."
      },
      {
        question: "Do you provide internship listings?",
        answer: "Yes, we have a separate category for internships and entry-level jobs to help students and recent graduates gain experience."
      }
    ],
    'platform': [
      {
        question: "Is this platform only for IT jobs?",
        answer: "No! Our platform supports both IT and Non-IT job seekers. Whether you're looking for roles in BPO, Security, Accounts, HR, Marketing, or Logistics – you'll find opportunities here."
      },
      {
        question: "How do I search for Non-IT jobs?",
        answer: "Use the category filters (e.g., \"BPO,\" \"Accounts,\" \"HR,\" \"Driver,\" \"Security,\" \"Receptionist,\" etc.) or simply type the job title in the search bar."
      }
    ],
    'non-it': [
      {
        question: "What types of Non-IT jobs are available?",
        answer: "We list jobs in various fields such as BPO & Customer Support, Security Guard, Office Assistant, Data Entry Operator, Accountant, Sales & Marketing, Human Resources, Delivery Executive, Front Office/Receptionist, and Warehouse & Packing."
      },
      {
        question: "Do I need a resume to apply for these jobs?",
        answer: "Having a resume helps, but for many entry-level or Non-IT jobs, you can also apply by filling out a basic profile with your experience and contact details."
      }
    ],
    'language': [
      {
        question: "Is this website available in local languages?",
        answer: "We are working to support multiple languages. For now, most job listings are in English, but some are also available in Hindi, Telugu, Tamil, and others."
      },
      {
        question: "Can I get help while applying?",
        answer: "Yes, our customer support team is available via phone, WhatsApp, or chat to assist you."
      }
    ],
    'women': [
      {
        question: "Do you list jobs for women returning after a career break?",
        answer: "Absolutely. Many employers support second careers for women. Use the filter \"Women Restart Jobs\" or \"Work-from-Home for Women.\""
      },
      {
        question: "Are there safe job options for women?",
        answer: "Yes. All verified jobs come from trusted employers, and you can search for office-based, remote, or female-only hiring opportunities."
      }
    ],
    'senior': [
      {
        question: "I have 10+ years of experience. Can I find mid to senior-level jobs?",
        answer: "Yes, we list managerial and senior roles in HR, Accounts, Sales, IT, Admin, and Operations. Use filters like \"Experience 10+ years\" or search for \"Manager,\" \"Lead,\" or \"Senior Executive.\""
      },
      {
        question: "Are consultancy roles or part-time advisory jobs listed?",
        answer: "Yes, especially in fields like Finance, HR, and Business Strategy. Look under \"Consultant\" or \"Freelance\" roles."
      }
    ]
  };

  const toggleItem = (categoryId, index) => {
    setExpandedItems(prev => ({
      ...prev,
      [`${categoryId}-${index}`]: !prev[`${categoryId}-${index}`]
    }));
  };

  const filteredFaqs = Object.entries(faqData).reduce((acc, [category, items]) => {
    if (activeCategory === 'all' || activeCategory === category) {
      const filtered = items.filter(item =>
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (filtered.length > 0) {
        acc[category] = filtered;
      }
    }
    return acc;
  }, {});

  return (
    <div className="faqs-container">
      <div className="faq-header">
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions about our job search platform</p>
        
        <div className="search-bar">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="category-filters">
          <button
            className={`category-btn ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.icon} {category.title}
            </button>
          ))}
        </div>
      </div>

      <div className="faq-content">
        {Object.entries(filteredFaqs).map(([category, items]) => (
          <div key={category} className="faq-category">
            <h2>{categories.find(c => c.id === category)?.title}</h2>
            <div className="faq-items">
              {items.map((item, index) => (
                <div
                  key={index}
                  className={`faq-item ${expandedItems[`${category}-${index}`] ? 'expanded' : ''}`}
                  onClick={() => toggleItem(category, index)}
                >
                  <div className="faq-question">
                    <h3>{item.question}</h3>
                    {expandedItems[`${category}-${index}`] ? (
                      <ChevronUp className="chevron-icon" />
                    ) : (
                      <ChevronDown className="chevron-icon" />
                    )}
                  </div>
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="faq-footer">
        <img
          src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Support team"
          className="support-image"
        />
        <div className="support-content">
          <h3>Still have questions?</h3>
          <p>Our support team is here to help you 24/7</p>
          <div className="contact-info">
            <div className="contact-item">
              <Mail className="contact-icon" />
              <span>support@momentum-merge.com</span>
            </div>
            <div className="contact-item">
              <Phone className="contact-icon" />
              <span>9876543210</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faqs;