
// import {
//   FileText,
//   GraduationCap,
//   Zap,
//   Trophy,
//   Code,
//   Rocket,
//   Briefcase,
//   User
// } from "lucide-react";
// import "../Styles/SideBar.css";
// const tabs = [
//   {
//     id: "resume",
//     name: "Resume",
//     icon: FileText,
//     color: "resume"
//   },
//   {
//     id: "education",
//     name: "Education",
//     icon: GraduationCap,
//     color: "education"
//   },
//   {
//     id: "KeySkills",
//     name: "Key Skills",
//     icon: Zap,
//     color: "skills"
//   },
//   {
//     id: "accomplishment",
//     name: "Accomplishment",
//     icon: Trophy,
//     color: "accomplishment"
//   },
//   {
//     id: "it-skills",
//     name: "IT Skills",
//     icon: Code,
//     color: "it-skills1"
//   },
//   {
//     id: "projects",
//     name: "Projects",
//     icon: Rocket,
//     color: "projects"
//   },
//   {
//     id: "career-profile",
//     name: "Career Profile",
//     icon: Briefcase,
//     color: "career"
//   },
//   {
//     id: "personal-details",
//     name: "Personal Details",
//     icon: User,
//     color: "personal"
//   },
//   {
//   id: "all-details",
//   name: "All Details",
//   icon: FileText,
//   color: "all-details"
// }
// ];
// const SideBar = ({ selectedSection, onSectionChange }) => {
//   return (
//     <div className="sidebar-wrapper">
//       <div className="sidebar-header">
//         <h2>Profile Management</h2>
//         <p>Select a section to view and manage your profile information</p>
//       </div>
//       <div className="sidebar-grid">
//         {tabs.map((tab, index) => {
//           const IconComponent = tab.icon;
//           const isActive = selectedSection === tab.id;
//           return (
//             <div
//               key={tab.id}
//               className={`grid-card ${tab.color} ${isActive ? 'active' : ''}`}
//               onClick={() => onSectionChange(tab.id)}
//               style={{
//                 animationDelay: `${index * 0.15}s`,
//                 '--hover-delay': `${index * 0.05}s`
//               }}
//             >
//               <div className="card-background"></div>
//               <div className="card-content">
//                 <div className="card-iconud-wrapper">
//                   <div className="icon-background"></div>
//                   <IconComponent className="card-iconud" size={32} color="white" />
//                 </div>
//                 <h3 className="card-title">{tab.name}</h3>
//                 <div className="card-status">
//                   <div className={`status-indicator ${isActive ? 'active' : ''}`}>
//                     <span className="status-dot"></span>
//                     <span className="status-text">
//                       {isActive ? 'Active' : 'Select'}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//               <div className="card-glow"></div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };
// export default SideBar;



import React from "react";
import {
  FileText,
  GraduationCap,
  Zap,
  Trophy,
  Code,
  Rocket,
  Briefcase,
  User
} from "lucide-react";
import "../Styles/SideBar.css";
const tabs = [
  {
    id: "resume",
    name: "Resume",
    icon: FileText,
    color: "resume"
  },
  {
    id: "education",
    name: "Education",
    icon: GraduationCap,
    color: "education"
  },
  {
    id: "KeySkills",
    name: "Key Skills",
    icon: Zap,
    color: "skills"
  },
  {
    id: "accomplishment",
    name: "Accomplishment",
    icon: Trophy,
    color: "accomplishment"
  },
  {
    id: "it-skills",
    name: "IT Skills",
    icon: Code,
    color: "it-skills1"
  },
  {
    id: "projects",
    name: "Projects",
    icon: Rocket,
    color: "projects"
  },
  {
    id: "career-profile",
    name: "Career Profile",
    icon: Briefcase,
    color: "career"
  },
  {
    id: "personal-details",
    name: "Personal Details",
    icon: User,
    color: "personal"
  },
 {
  id: "all-details",
  name: "All Details",
  icon: FileText,
  color: "all-details"
}
];
const SideBar = ({ selectedSection, onSectionChange }) => {
  return (
    <div className="sidebar-wrapper">
      <div className="sidebar-header">
        <h2>Profile Management</h2>
        <p>Select a section to view and manage your profile information</p>
      </div>
      <div className="sidebar-grid">
        {tabs.map((tab, index) => {
          const IconComponent = tab.icon;
          const isActive = selectedSection === tab.id;
          return (
            <div
              key={tab.id}
              className={`grid-card ${tab.color} ${isActive ? 'active' : ''}`}
              onClick={() => onSectionChange(tab.id)}
              style={{
                animationDelay: `${index * 0.15}s`,
                '--hover-delay': `${index * 0.05}s`
              }}
            >
              <div className="card-background"></div>
              <div className="card-content">
                <div className="card-iconud-wrapper">
                  <div className="icon-background"></div>
                  <IconComponent className="card-iconud" size={32} color="white" />
                </div>
                <h3 className="card-title">{tab.name}</h3>
                <div className="card-status">
                  <div className={`status-indicator ${isActive ? 'active' : ''}`}>
                    <span className="status-dot"></span>
                    <span className="status-text">
                      {isActive ? 'Active' : 'Select'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="card-glow"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default SideBar;