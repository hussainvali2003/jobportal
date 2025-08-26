import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Profile from './ProfileUpdate'
import Resume from './Resume'
import Education from './EducationSection'
import KeySkills from './SkillsSection';
import Accomplishment from './Accomplishment'
import ITSkills from './ITSkills';
import Projects from './ProjectsSection';
import CareerProfile, { Employment } from './Employment';
import PersonalDetails from './PersonalDetailsSection';
const MainContent = () => {
  const [activeSection, setActiveSection] = useState('resume');
const sidebarOptions = [
    {
      id: 'resume',
      title: 'Resume',
      description: 'Upload and manage your resume',
      icon: ':page_facing_up:'
    },
    {
      id: 'profile-summary',
      title: 'Profile Summary',
      description: 'Professional summary',
      icon: ':bust_in_silhouette:'
    },
    {
      id: 'education',
      title: 'Education',
      description: 'Academic background',
      icon: ':mortar_board:'
    },
    {
      id: 'key-skills',
      title: 'Key Skills',
      description: 'Core competencies',
      icon: ':trophy:'
    },
    {
      id: 'accomplishments',
      title: 'Accomplishments',
      description: 'Achievements & awards',
      icon: ':sports_medal:'
    },
    {
      id: 'it-skills',
      title: 'IT Skills',
      description: 'Technical expertise',
      icon: ':computer:'
    },
    {
      id: 'projects',
      title: 'Projects',
      description: 'Portfolio showcase',
      icon: ':file_folder:'
    },
    {
      id: 'career-profile',
      title: 'Career Profile',
      description: 'Professional goals',
      icon: ':briefcase:'
    },
    {
      id: 'personal-details',
      title: 'Personal Details',
      description: 'Contact information',
      icon: ':white_check_mark:'
    },
  ];
  const componentMap = {
    'resume': Resume,
    'profile-summary': ProfileSummary,
    'education': Education,
    'key-skills': KeySkills,
    'accomplishment': Accomplishment,
    'it-skills': ITSkills,
    'projects': Projects,
    'career-profile': Employment,
    'personal-details': PersonalDetails,
  };
 const handleCardClick = (sectionId) => {
    if (activeSection === sectionId) {
      setActiveSection(null); // Close if already open
    } else {
      setActiveSection(sectionId); // Open new section
    }
  };
  const ActiveComponent = activeSection ? componentMap[activeSection] : null;
 return (
    <div className="main-layout">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      {/* Left Side - Profile Details */}
      <div className="left-profile-section">
        <Profile />
      </div>
      {/* Right Side - Sidebar with Cards */}
      <div className="right-sidebar-section">
        <div className="sidebar-header">
          <h2>Resume Builder</h2>
          <p>Build your professional resume</p>
        </div>
        <div className="sidebar-cards-container">
          {sidebarOptions.map((option) => (
            <div
              key={option.id}
              className={`sidebar-option-card ${activeSection === option.id ? 'active' : ''}`}
              onClick={() => handleCardClick(option.id)}
            >
              <div className="card-header">
                <div className="card-icon">{option.icon}</div>
                <div className="card-info">
                  <h3 className="card-title">{option.title}</h3>
                  <p className="card-description">{option.description}</p>
                </div>
                <div className="card-toggle">
                  {activeSection === option.id ? '−' : '+'}
                </div>
              </div>
              {activeSection === option.id && (
                <div className="card-content">
                  {ActiveComponent && <ActiveComponent />}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default MainContent;