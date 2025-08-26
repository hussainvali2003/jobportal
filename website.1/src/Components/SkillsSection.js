import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../Styles/SkillsSection.css";
import CreatableSelect from 'react-select/creatable';
import { Pencil } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUpdateCompletion } from "../hooks";
const initialSkills = [
  "Java", "JSP", "JavaScript", "JDBC", "J2EE", "React.js", "Python",
  "Spring", "Spring Boot", "Express.js", "HTML", "CSS", "MySQL", "Hibernate Framework",
  "Software Development", "Project Management", "Problem Solving", "Web Development",
  "C++", "Bootstrap", "Node.js", ".NET", "PostgreSQL", "MongoDB", "Git & GitHub",
  "REST API", "Postman", "Swagger", "Apache Tomcat", "Netlify", "Vercel",
  "Agile Development", "DevOps", "UI/UX Design", "Automation & Scripting",
  "GCP", "AWS", "Microsoft Azure"
];
const toOptions = (skills) => skills.map(skill => ({ label: skill, value: skill }));
const KeySkills = () => {
  const [skills, setSkills] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState([]);
  const [skillOptions, setSkillOptions] = useState(toOptions(initialSkills));
  const [isLoading, setIsLoading] = useState(false);
  const userEmail = localStorage.getItem("registeredEmail");
  useEffect(() => {
    if (userEmail) {
      fetchSkills();
    }
  }, [userEmail]);
  const fetchSkills = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/keyskills/${userEmail}`);
      const fetchedSkills = response.data.map(skill => skill.skillname);
      setSkills(fetchedSkills);
    } catch (error) {
      console.error("Error fetching skills:", error);
      toast.error("Failed to load skills");
    } finally {
      setIsLoading(false);
    }
  };
  const handleSaveSkills = async () => {
    if (!selectedSkill.length) {
      toast.warning("Please select or enter at least one skill");
      return;
    }
    const newSkills = selectedSkill
      .map(skill => skill.value)
      .filter(skill => !skills.includes(skill));
    if (!newSkills.length) {
      toast.info("No new skills to add");
      setSelectedSkill([]);
      setIsEditing(false);
      return;
    }
    setIsLoading(true);
    try {
      // Save skills to backend
      const savePromises = newSkills.map(skill =>
        axios.post(`http://localhost:8080/api/keyskills/${userEmail}`, {
          skillname: skill
        })
      );
      await Promise.all(savePromises);
      // Update UI
      setSkills(prev => [...prev, ...newSkills]);
      // Add new custom skills to options
      const newOptions = selectedSkill.filter(
        skill => !skillOptions.some(opt => opt.value === skill.value)
      );
      setSkillOptions(prev => [...prev, ...newOptions]);
      setSelectedSkill([]);
      setIsEditing(false);
      toast.success(`${newSkills.length} skill(s) added successfully!`);
    } catch (error) {
      console.error("Error saving skills:", error);
      toast.error("Failed to save some skills");
    } finally {
      setIsLoading(false);
    }
  };
useUpdateCompletion({
    sectionName: "skills",
    checkFn: () => skills.length > 0,
    dependencies: [skills],
  });
  const handleDelete = async (index) => {
    const skillToDelete = skills[index];
    if (!window.confirm(`Are you sure you want to delete "${skillToDelete}"?`)) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/keyskills/${userEmail}`);
      const skillObject = response.data.find(s => s.skillname === skillToDelete);
      if (skillObject?.id) {
        await axios.delete(`http://localhost:8080/api/keyskills/${skillObject.id}`);
        setSkills(prev => prev.filter(skill => skill !== skillToDelete));
        toast.success(`"${skillToDelete}" deleted successfully`);
      }
    } catch (error) {
      console.error("Error deleting skill:", error);
      toast.error(`Failed to delete "${skillToDelete}"`);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="key-skills-container" id='KeySkills' style={{ scrollMarginTop: '100px' }}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="key-skills-header">
        <h3 style={{ fontSize: "26px" }}>Key Skills</h3>
        <div
          className="edit-icon-wrapper"
          onClick={() => setIsEditing(!isEditing)}
          title={isEditing ? "Cancel editing" : "Edit skills"}
        >
          <Pencil size={18} color="#333" />
        </div>
      </div>
      {isEditing && (
        <div className="add-skill-form">
          <CreatableSelect
            isMulti
            options={skillOptions}
            value={selectedSkill}
            onChange={setSelectedSkill}
            placeholder="Search or type new skills"
            className="custom-react-select"
            classNamePrefix="select"
            isDisabled={isLoading}
          />
          <div className="skill-actions">
            <button
              onClick={handleSaveSkills}
              className="add-button"
              disabled={isLoading || !selectedSkill.length}
            >
              {isLoading ? "Saving..." : "Save Skills"}
            </button>
            <button
              onClick={() => {
                setSelectedSkill([]);
                setIsEditing(false);
              }}
              className="cancel-button"
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {isLoading && !isEditing ? (
        <div className="loading-message">Loading skills...</div>
      ) : (
        <div className="skills-list">
          {skills.length > 0 ? (
            skills.map((skill, index) => (
              <div className="skill-badge" key={index}>
                <span>{skill}</span>
                {isEditing && (
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(index)}
                    disabled={isLoading}
                    title={`Delete ${skill}`}
                  >
                    ×
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="no-skills-message">
              {isEditing ? "Add your skills above" : "No skills added yet"}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default KeySkills;
