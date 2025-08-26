import { createContext, useContext, useState, useMemo } from "react";
const ProfileCompletionContext = createContext();
export const ProfileCompletionProvider = ({ children }) => {
  const [completionStatus, setCompletionStatus] = useState({
    resume: false,
    accomplishment: false,
    itSkills: false,
    education: false,
    profileDetails: false,
    skills: false,
    projects: false,
    personalDetails: false,
    employment: false,
  });
  const updateSectionCompletion = (section, isComplete) => {
    console.log(`[Context] Updating ${section} to ${isComplete}`);
    setCompletionStatus((prev) => ({ ...prev, [section]: isComplete }));
  };
   const getCompletionPercentage = () => {
    const total = Object.keys(completionStatus).length;
    const completed = Object.values(completionStatus).filter(Boolean).length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    console.log(`[Context] Completion: ${completed}/${total} (${percentage}%)`);
    return percentage;
  };
  return (
   <ProfileCompletionContext.Provider
    value={{ completionStatus, updateSectionCompletion, getCompletionPercentage }}>
    {children}
  </ProfileCompletionContext.Provider>
  );
};
export const useProfileCompletion = () => useContext(ProfileCompletionContext);
