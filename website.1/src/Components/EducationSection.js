import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import '../Styles/Education.css';
import { useUpdateCompletion } from "../hooks";
const Education = () => {
  const [educationList, setEducationList] = useState([]);
  const [activeForm, setActiveForm] = useState(null);
  const [formData, setFormData] = useState({
    educationType: "",
    board: "",
    passingYear: "",
    marks: "",
    degree: "",
    specialization: "",
    institution: "",
    year: "",
    type: "",
    percentage: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [degreeSuggestions, setDegreeSuggestions] = useState([]);
  const [universitySuggestions, setUniversitySuggestions] = useState([]);
  const [showDegreeDropdown, setShowDegreeDropdown] = useState(false);
  const [showUniversityDropdown, setShowUniversityDropdown] = useState(false);
  const [specializationSuggestions, setSpecializationSuggestions] = useState([]);
  const [showSpecializationDropdown, setShowSpecializationDropdown] = useState(false);
  const [colleges, setColleges] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const userEmail = localStorage.getItem("registeredEmail");
  const degreeOptions = [
    "B.Tech", "B.E.", "B.Sc", "B.A.", "B.Com", "BBA", "M.Tech", "M.Sc",
    "MBA", "PhD", "MBBS", "LLB", "LLM", "M.A.", "M.Com", "MD", "MS"
  ];
  const specializationOptions = [
    "Computer Science", "Electronics & Communication", "Mechanical Engineering",
    "Civil Engineering", "Electrical Engineering", "Biotechnology", "Physics",
    "Chemistry", "Mathematics", "Psychology", "History", "Political Science",
    "Economics", "Accounting", "Finance", "Marketing", "Human Resources",
    "General Medicine", "Pediatrics", "Surgery"
  ];
  const universityOptions = [
    "IIT Bombay", "IIT Delhi", "IIT Madras", "IIM Ahmedabad", "IIM Bangalore",
    "AIIMS Delhi", "NIT Trichy", "JNU Delhi", "Delhi University", "BHU Varanasi",
    "Osmania University", "Mumbai University", "Anna University", "Calcutta University",
    "VIT Vellore", "SRM University", "Manipal University", "Amity University",
    "Periyar University", "Ashoka University"
  ];
  // Fetch education data from backend
  useEffect(() => {
    if (userEmail) {
      fetchEducation();
    }
  }, [userEmail]);
  const fetchEducation = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/education/user/${userEmail}`);
      setEducationList(response.data);
    } catch (error) {
      console.error("Error fetching education:", error);
      toast.error("Failed to load education data");
    }
  };
  // Helper functions to check if education levels exist
  const hasClassX = () => educationList.some((edu) => edu.educationType === "Class X");
  const hasClassXII = () => educationList.some((edu) => edu.educationType === "Class XII");
  const hasUG = () => educationList.some((edu) => edu.educationType === "Undergraduate");
  const hasPG = () => educationList.some((edu) => edu.educationType === "Postgraduate");
  const hasPhD = () => educationList.some((edu) => edu.educationType === "PhD");
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (field === "degree") {
      setShowDegreeDropdown(true);
      const filtered = degreeOptions.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      );
      setDegreeSuggestions(filtered);
    } else if (field === "institution") {
      setShowUniversityDropdown(true);
      const filtered = universityOptions.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      );
      setUniversitySuggestions(filtered);
    } else if (field === "specialization") {
      setShowSpecializationDropdown(true);
      const filtered = specializationOptions.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      );
      setSpecializationSuggestions(filtered);
    }
  };
  const handleSuggestionClick = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (field === "degree") setShowDegreeDropdown(false);
    if (field === "institution") setShowUniversityDropdown(false);
    if (field === "specialization") setShowSpecializationDropdown(false);
  };
  const handleSave = async () => {
    if (!userEmail) {
      toast.error("Please log in to save education details");
      return;
    }
   if (activeForm === "x" || activeForm === "xii") {
      if (!formData.board || !formData.institution || !formData.passingYear) {
        toast.error("Please fill all required fields (Board, School Name, Passing Year)");
        return;
      }
      if (formData.marks && (formData.marks < 0 || formData.marks > 100)) {
        toast.error("Marks must be between 0 and 100");
        return;
      }
    }
    // Validation for Higher Education
    else {
      if (!formData.degree || !formData.institution || !formData.year || !formData.type) {
        toast.error("Please fill all required fields (Degree, Institution, Year, Type)");
        return;
      }
      if (formData.percentage && (formData.percentage < 0 || formData.percentage > 100)) {
        toast.error("Percentage must be between 0 and 100");
        return;
      }
      // Validate year format (YYYY-YYYY)
      const yearPattern = /^\d{4}\s*[-–]\s*\d{4}$/;
      if (!yearPattern.test(formData.year)) {
        toast.error("Please enter year in format YYYY-YYYY");
        return;
      }
    }
    // Prepare education data for backend
    const educationData = {
      educationType: activeForm === "x" ? "Class X" :
                    activeForm === "xii" ? "Class XII" :
                    activeForm === "ug" ? "Undergraduate" :
                    activeForm === "pg" ? "Postgraduate" : "PhD",
      degree: formData.degree,
      specialization: formData.specialization,
      institution: formData.institution,
      year: formData.year,
      type: formData.type,
      percentage: formData.percentage,
      board: formData.board,
      passingYear: formData.passingYear,
      marks: formData.marks
    };
     try {
      if (editingId) {
        // Update existing entry
        await axios.put(`http://localhost:8080/api/education/${editingId}?email=${userEmail}`, educationData);
        toast.success("Education updated successfully!");
      } else {
        // Add new entry
        await axios.post(`http://localhost:8080/api/education?email=${userEmail}`, educationData);
        toast.success("Education added successfully!");
      }
      fetchEducation();
      resetForm();
    } catch (error) {
      console.error("Error saving education:", error);
      toast.error("Failed to save education");
    }
  };
  const handleEdit = (id) => {
    const edu = educationList.find(item => item.id === id);
    if (!edu) return;
    setFormData({
      educationType: edu.educationType,
      board: edu.board || "",
      passingYear: edu.passingYear || "",
      marks: edu.marks || "",
      degree: edu.degree || "",
      specialization: edu.specialization || "",
      institution: edu.institution || "",
      year: edu.year || "",
      type: edu.type || "",
      percentage: edu.percentage || "",
    });
    // Determine which form to show
    if (edu.educationType === "Class X") setActiveForm("x");
    else if (edu.educationType === "Class XII") setActiveForm("xii");
    else if (edu.educationType === "Undergraduate") setActiveForm("ug");
    else if (edu.educationType === "Postgraduate") setActiveForm("pg");
    else setActiveForm("phd");
    setEditingId(id);
  };
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this education entry?")) {
      try {
        await axios.delete(`http://localhost:8080/api/education/${id}?email=${userEmail}`);
        toast.success("Education deleted successfully!");
        fetchEducation();
      } catch (error) {
        console.error("Error deleting education:", error);
        toast.error("Failed to delete education");
      }
    }
  };
  const resetForm = () => {
    setFormData({
      educationType: "",
      board: "",
      passingYear: "",
      marks: "",
      degree: "",
      specialization: "",
      institution: "",
      year: "",
      type: "",
      percentage: "",
    });
    setEditingId(null);
    setActiveForm(null);
  };
  const handleDropdownMouseDown = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    const fetchColleges = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://universities.hipolabs.com/search?country=India");
        const data = await response.json();
        setColleges(data);
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchColleges();
  }, []);
  const handleCollegeSearch = (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    const filtered = colleges.filter((college) =>
      college.name.toLowerCase().includes(query.toLowerCase())
    );
    setSuggestions(filtered);
  };
  const renderClassXForm = () => (
    <div className="education-form">
      <div className="input-group">
        <label className="input-label">
          Board <span className="required">*</span>
        </label>
        <select
          value={formData.board}
          onChange={(e) => handleChange("board", e.target.value)}
          required
        >
          <option value="">Select Board</option>
          <option value="CBSE">CBSE</option>
          <option value="ICSE">ICSE</option>
          <option value="NIOS">NIOS</option>
          <option value="CISCE">CISCE</option>
          <option value="MSBSHSE">MSBSHSE</option>
          <option value="UPMSP">UPMSP</option>
          <option value="WBCHSE">WBCHSE</option>
          <option value="PSEB">PSEB</option>
          <option value="GSEB">GSEB</option>
          <option value="RBSE">RBSE</option>
                    <option value="TN Board">AP Board</option>
          <option value="TN Board">KA Board</option>
          <option value="TN Board">TN Board</option>
          <option value="KSEEB/PUC Board">KSEEB / PUC Board</option>
          <option value="BSEAP">BSEAP</option>
        </select>
      </div>
      <div className="input-group">
        <label className="input-label">
          School Name <span className="required">*</span>
        </label>
        <input
          type="text"
          value={formData.institution}
          onChange={(e) => handleChange("institution", e.target.value)}
          placeholder="Enter school name"
          required
        />
      </div>
      <div className="input-group">
        <label className="input-label">
          Passing Year <span className="required">*</span>
        </label>
        <input
          type="text"
          value={formData.passingYear}
          onChange={(e) => handleChange("passingYear", e.target.value)}
          placeholder="e.g., 2012"
          required
        />
      </div>
      <div className="input-group">
        <label className="input-label">Marks (Percentage)</label>
        <input
          type="number"
          value={formData.marks}
          onChange={(e) => handleChange("marks", e.target.value)}
          placeholder="e.g., 85"
          min="0"
          max="100"
          step="0.1"
        />
      </div>
    </div>
  );
  const renderClassXIIForm = () => (
    <div className="education-form">
      <div className="input-group">
        <label className="input-label">
          Board <span className="required">*</span>
        </label>
        <select
          value={formData.board}
          onChange={(e) => handleChange("board", e.target.value)}
          required
        >
          <option value="">Select Board</option>
          <option value="CBSE">CBSE</option>
          <option value="ICSE">ICSE</option>
          <option value="NIOS">NIOS</option>
          <option value="CISCE">CISCE</option>
          <option value="MSBSHSE">MSBSHSE</option>
          <option value="UPMSP">UPMSP</option>
          <option value="WBCHSE">WBCHSE</option>
          <option value="PSEB">PSEB</option>
          <option value="GSEB">GSEB</option>
          <option value="RBSE">RBSE</option>
          <option value="TN Board">AP Board</option>
          <option value="TN Board">KA Board</option>
          <option value="TN Board">TN Board</option>
          <option value="KSEEB/PUC Board">KSEEB / PUC Board</option>
          <option value="BSEAP">BSEAP</option>
        </select>
      </div>
      <div className="input-group">
        <label className="input-label">
          School/College Name <span className="required">*</span>
        </label>
        <input
          type="text"
          value={formData.institution}
          onChange={(e) => handleChange("institution", e.target.value)}
          placeholder="Enter school/college name"
          required
        />
      </div>
      <div className="input-group">
        <label className="input-label">
          Passing Year <span className="required">*</span>
        </label>
        <input
          type="text"
          value={formData.passingYear}
          onChange={(e) => handleChange("passingYear", e.target.value)}
          placeholder="e.g., 2014"
          required
        />
      </div>
      <div className="input-group">
        <label className="input-label">Marks (Percentage)</label>
        <input
          type="number"
          value={formData.marks}
          onChange={(e) => handleChange("marks", e.target.value)}
          placeholder="e.g., 85"
          min="0"
          max="100"
          step="0.1"
        />
      </div>
    </div>
  );
  const renderHigherEducationForm = () => (
    <div className="education-form">
      <div className="input-group">
        <label className="input-label">
          Degree <span className="required">*</span>
        </label>
        <input
          type="text"
          value={formData.degree}
          onChange={(e) => handleChange("degree", e.target.value)}
          placeholder="e.g., B.Tech, M.Sc, PhD"
          onFocus={() => setShowDegreeDropdown(true)}
          onBlur={() => setTimeout(() => setShowDegreeDropdown(false), 200)}
          required
        />
        {showDegreeDropdown && degreeSuggestions.length > 0 && (
          <div className="suggestion-dropdown" onMouseDown={handleDropdownMouseDown}>
            {degreeSuggestions.map((degree, index) => (
              <div
                key={index}
                className="suggestion-item"
                onClick={() => handleSuggestionClick("degree", degree)}
              >
                {degree}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="input-group">
        <label className="input-label">Specialization</label>
        <input
          type="text"
          value={formData.specialization}
          onChange={(e) => handleChange("specialization", e.target.value)}
          placeholder="Enter your specialization"
          onFocus={() => setShowSpecializationDropdown(true)}
          onBlur={() => setTimeout(() => setShowSpecializationDropdown(false), 200)}
        />
        {showSpecializationDropdown && specializationSuggestions.length > 0 && (
          <div className="suggestion-dropdown" onMouseDown={handleDropdownMouseDown}>
            {specializationSuggestions.map((spec, index) => (
              <div
                key={index}
                className="suggestion-item"
                onClick={() => handleSuggestionClick("specialization", spec)}
              >
                {spec}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="input-group">
        <label className="input-label">
          Institution/College name <span className="required">*</span>
        </label>
        <input
          type="text"
          value={formData.institution}
          onChange={(e) => {
            handleChange("institution", e.target.value);
            handleCollegeSearch(e.target.value);
          }}
          placeholder="Search IIT, DU, etc."
          disabled={loading}
        />
        {suggestions.length > 0 && (
          <div className="suggestion-dropdown">
            {suggestions.slice(0, 5).map((college, index) => (
              <div
                key={index}
                className="suggestion-item"
                onClick={() => {
                  handleChange("institution", college.name);
                  setSuggestions([]);
                }}
              >
                {college.name} {college.state_province && `(${college.state_province})`}
              </div>
            ))}
          </div>
        )}
        {loading && <div className="loading-text">Loading colleges...</div>}
      </div>
      <div className="input-group">
        <label className="input-label">
          Year <span className="required">*</span>
        </label>
        <input
          type="text"
          value={formData.year}
          onChange={(e) => handleChange("year", e.target.value)}
          placeholder={activeForm === "phd" ? "e.g., 2020-2024" : "e.g., 2016-2020"}
          required
        />
      </div>
      <div className="input-group">
        <label className="input-label">
          Type <span className="required">*</span>
        </label>
        <select
          value={formData.type}
          onChange={(e) => handleChange("type", e.target.value)}
          required
        >
          <option value="">Select Type</option>
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
          {activeForm === "phd" && <option value="Research">Research</option>}
        </select>
      </div>
      <div className="input-group">
        <label className="input-label">Percentage (out of 100)</label>
        <input
          type="number"
          value={formData.percentage}
          onChange={(e) => handleChange("percentage", e.target.value)}
          placeholder="e.g., 85"
          min="0"
          max="100"
          step="0.1"
        />
      </div>
    </div>
  );
useUpdateCompletion({
    sectionName: "education",
    checkFn: () => educationList.length > 0,
    dependencies: [educationList],
  });
  return (
    <div className="education-container" id="education" style={{ scrollMarginTop: "100px" }}>
      <ToastContainer />
      <div className="education-header">
        <h3 style={{ color: "black", fontSize: "26px" }}>Education</h3>
      </div>
      {!activeForm && (
        <div className="education-options">
          {!hasClassX() && (
            <button className="education-option-btn" onClick={() => setActiveForm("x")}>
              <Plus size={16} /> Add Class X
            </button>
          )}
          {!hasClassXII() && (
            <button className="education-option-btn" onClick={() => setActiveForm("xii")}>
              <Plus size={16} /> Add Class XII
            </button>
          )}
          {!hasUG() && (
            <button className="education-option-btn" onClick={() => setActiveForm("ug")}>
              <Plus size={16} /> Add UG
            </button>
          )}
          {!hasPG() && (
            <button className="education-option-btn" onClick={() => setActiveForm("pg")}>
              <Plus size={16} /> Add Masters/PG
            </button>
          )}
          {!hasPhD() && (
            <button className="education-option-btn" onClick={() => setActiveForm("phd")}>
              <Plus size={16} /> Add PhD
            </button>
          )}
        </div>
      )}
      {activeForm === "x" && renderClassXForm()}
      {activeForm === "xii" && renderClassXIIForm()}
      {(activeForm === "ug" || activeForm === "pg" || activeForm === "phd") && renderHigherEducationForm()}
      {activeForm && (
        <div className="form-actions" style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" }}>
          <button className="save-btn" onClick={handleSave}>
            {setEditingId !== null ? "Update" : "Save"}
          </button>
          <button className="cancel-btn" onClick={resetForm}>
            Cancel
          </button>
        </div>
      )}
         <div className="education-list">
        {educationList.length === 0 ? (
          <p className="no-education">No education entries added yet.</p>
        ) : (
          educationList.map((edu) => (
            <div key={edu.id} className="education-item">
              <p className="edu-degree">
                {edu.educationType === "Class X"
                  ? "Class X"
                  : edu.educationType === "Class XII"
                    ? "Class XII"
                    : edu.degree || edu.educationType}
                <span className="icon-group">
                  <Pencil size={16} className="edit-icon" onClick={() => handleEdit(edu.id)} />
                  <Trash2 size={16} className="delete-icon" onClick={() => handleDelete(edu.id)} />
                </span>
              </p>
              <p className="edu-institute">{edu.institution}</p>
              <p className="edu-meta">
                {edu.board && <>{edu.board} | </>}
                {edu.specialization && <>{edu.specialization} | </>}
                {edu.passingYear || edu.year}
                {edu.type && <> | {edu.type}</>}
                {(edu.marks || edu.percentage) && <> | {edu.marks || edu.percentage}%</>}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default Education;

