// import React, { useState, useRef } from "react";
// import Profile from './ProfileUpdate';
// import SideBar from "./SideBar";
// import "../Styles/MainProfile.css";
// import ResumeUpload from "./Resume";
// import Education from "./EducationSection";
// import KeySkills from "./SkillsSection";
// import ITSkills from "./ITSkills";
// import PersonalDetails from "./PersonalDetailsSection";
// import Employment from "./Employment";
// import Project from "./ProjectsSection";
// import Accomplishment from './Accomplishment'
// import { toast, ToastContainer } from "react-toastify";
// import AllDetails from "./AllDetails";
// const MainProfile = () => {
//   const [selectedSection, setSelectedSection] = useState(null);
//   const [isContentVisible, setIsContentVisible] = useState(false);
//   // Create a ref for the content container
//   const contentRef = useRef(null);
//   const handleSectionChange = (sectionId) => {
//     if (selectedSection === sectionId) {
//       // Close the current section
//       setIsContentVisible(false);
//       setTimeout(() => {
//         setSelectedSection(null);
//       }, 300);
//     } else {
//       // Open new section
//       setSelectedSection(sectionId);
//       setIsContentVisible(true);
//       // Scroll to the content after a slight delay to allow DOM update
//       setTimeout(() => {
//         if (contentRef.current) {
//           contentRef.current.scrollIntoView({
//             behavior: 'smooth',
//             block: 'start'
//           });
//         }
//       }, 100);
//     }
//   };
//   const handleCloseContent = () => {
//     setIsContentVisible(false);
//     setTimeout(() => {
//       setSelectedSection(null);
//     }, 300);
//   };
//   const renderSelectedContent = () => {
//     if (!selectedSection) return null;
//     const sectionComponents = {
//       "resume": <ResumeUpload onClose={handleCloseContent} />,
//       "education": <Education onClose={handleCloseContent} />,
//       "accomplishment": <Accomplishment onClose={handleCloseContent} />,
//       "career-profile": <Employment onClose={handleCloseContent} />,
//       "it-skills": <ITSkills onClose={handleCloseContent} />,
//       "projects": <Project onClose={handleCloseContent} />,
//       "KeySkills": <KeySkills onClose={handleCloseContent} />,
//       "personal-details": <PersonalDetails onClose={handleCloseContent} />,
//       "all-details": <AllDetails onClose={handleCloseContent} />,
//     };
// const getGradientForSection = (sectionId) => {
//   switch(sectionId) {
//     case 'resume':
//       return 'var(--resume-gradient)';
//     case 'education':
//       return 'var(--education-gradient)';
//     case 'KeySkills':
//       return 'var(--skills-gradient)';
//     case 'accomplishment':
//       return 'var(--accomplishment-gradient)';
//     case 'it-skills':
//       return 'var(--it-skills-gradient)';
//     case 'projects':
//       return 'var(--projects-gradient)';
//     case 'career-profile':
//       return 'var(--career-gradient)';
//     case 'personal-details':
//       return 'var(--personal-gradient)';
//     default:
//       return 'var(--resume-gradient)';
//   }
// };
//     return (
//       <div
//         className={`full-width-dropdown ${isContentVisible ? "visible" : ""}`}
//         ref={contentRef} // Attach the ref here
//       >
//         <div className="dropdown-container">
//           <div className="dropdown-header"  style={{
//     background: getGradientForSection(selectedSection)
//   }}>
//             <h2 className="section-titlemp">
//               {selectedSection
//                 .replace(/-/g, " ")
//                 .replace(/\b\w/g, (l) => l.toUpperCase())}
//             </h2>
//             <button
//               className="close-btn2"
//               onClick={handleCloseContent}
//               aria-label="Close section"
//             >
//               ×
//             </button>
//           </div>
//           <div className="dropdown-body">
//             {sectionComponents[selectedSection] || (
//               <div className="fallback-content">
//                 <p>Content for this section is not available.</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   };
//   return (
//     <div className="main-profile-container">
//       <div className="main-profile-wrapper">
//         {/* Top section with profile and sidebar */}
//         <div className="main-profile-layout">
//           <div className="profile-left-section">
//             <Profile />
//           </div>
//           <div className="profile-right-section">
//             <SideBar
//               selectedSection={selectedSection}
//               onSectionChange={handleSectionChange}
//             />
//           </div>
//         </div>
//         {/* Full width dropdown content below */}
//         {renderSelectedContent()}
//       </div>
//     </div>
//   );
// };
// export default MainProfile;



import React, { useState, useRef } from "react";
import Profile from './ProfileUpdate';
import SideBar from "./SideBar";
import "../Styles/MainProfile.css";
import ResumeUpload from "./Resume";
import Education from "./EducationSection";
import KeySkills from "./SkillsSection";
import ITSkills from "./ITSkills";
import PersonalDetails from "./PersonalDetailsSection";
import Employment from "./Employment";
import Project from "./ProjectsSection";
import Accomplishment from './Accomplishment';
import AllDetails from "./AllDetails";

// Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainProfile = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const contentRef = useRef(null);

  const handleSectionChange = (sectionId) => {
    if (selectedSection === sectionId) {
      // Close current section
      setIsContentVisible(false);
      setTimeout(() => {
        setSelectedSection(null);
      }, 300);
    } else {
      // Open new section
      setSelectedSection(sectionId);
      setIsContentVisible(true);
      setTimeout(() => {
        if (contentRef.current) {
          contentRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    }
  };

  const handleCloseContent = () => {
    setIsContentVisible(false);
    setTimeout(() => {
      setSelectedSection(null);
    }, 300);
  };

  const renderSelectedContent = () => {
    if (!selectedSection) return null;

    const sectionComponents = {
      "resume": <ResumeUpload onClose={handleCloseContent} />,
      "education": <Education onClose={handleCloseContent} />,
      "accomplishment": <Accomplishment onClose={handleCloseContent} />,
      "career-profile": <Employment onClose={handleCloseContent} />,
      "it-skills": <ITSkills onClose={handleCloseContent} />,
      "projects": <Project onClose={handleCloseContent} />,
      "KeySkills": <KeySkills onClose={handleCloseContent} />,
      "personal-details": <PersonalDetails onClose={handleCloseContent} />,
      "all-details": <AllDetails onClose={handleCloseContent} />,
    };

    const getGradientForSection = (sectionId) => {
      switch (sectionId) {
        case 'resume':
          return 'var(--resume-gradient)';
        case 'education':
          return 'var(--education-gradient)';
        case 'KeySkills':
          return 'var(--skills-gradient)';
        case 'accomplishment':
          return 'var(--accomplishment-gradient)';
        case 'it-skills':
          return 'var(--it-skills-gradient)';
        case 'projects':
          return 'var(--projects-gradient)';
        case 'career-profile':
          return 'var(--career-gradient)';
        case 'personal-details':
          return 'var(--personal-gradient)';
        default:
          return 'var(--resume-gradient)';
      }
    };

    return (
      <div
        className={`full-width-dropdown ${isContentVisible ? "visible" : ""}`}
        ref={contentRef}
      >
        <div className="dropdown-container">
          <div
            className="dropdown-header"
            style={{
              background: getGradientForSection(selectedSection)
            }}
          >
            <h2 className="section-titlemp">
              {selectedSection
                .replace(/-/g, " ")
                .replace(/\b\w/g, (l) => l.toUpperCase())}
            </h2>
            <button
              className="close-btn2"
              onClick={handleCloseContent}
              aria-label="Close section"
            >
              ×
            </button>
          </div>
          <div className="dropdown-body">
            {sectionComponents[selectedSection] || (
              <div className="fallback-content">
                <p>Content for this section is not available.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="main-profile-container">
      <div className="main-profile-wrapper">
        {/* Top section with profile and sidebar */}
        <div className="main-profile-layout">
          <div className="profile-left-section">
            <Profile />
          </div>
          <div className="profile-right-section">
            <SideBar
              selectedSection={selectedSection}
              onSectionChange={handleSectionChange}
            />
          </div>
        </div>

        {/* Full width dropdown content below */}
        {renderSelectedContent()}

        {/* Toast container for notifications */}
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default MainProfile;
