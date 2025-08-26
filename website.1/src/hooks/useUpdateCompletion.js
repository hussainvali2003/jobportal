import { useEffect } from "react";
import { useProfileCompletion } from "../Context/ProfileCompletionContext";
export const useUpdateCompletion = ({ sectionName, checkFn, dependencies }) => {
  const { updateSectionCompletion } = useProfileCompletion();
  useEffect(() => {
    const isComplete = checkFn();
    updateSectionCompletion(sectionName, isComplete);
  }, dependencies); // runs every time dependencies change
};