import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Styles/Employment.css";
import { useUpdateCompletion } from "../hooks";
const Employment = () => {
  const [employments, setEmployments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    currentEmployment: "",
    empType: "",
    joinYear: "",
    joinMonth: "",
    comname: "",
    currentJobTitle: "",
    currentSalary: "",
    skill: "",
    jobProfile: "",
    noticePeriod: ""
  });
  const userEmail = localStorage.getItem("registeredEmail");
  useUpdateCompletion({
    sectionName: "employment",
    checkFn: () => employments.length > 0,
    dependencies: [employments]
  })
  useEffect(() => {
    if (userEmail) {
      fetchEmployments();
    }
  }, [userEmail]);
  const fetchEmployments = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/employments/${userEmail}`);
      setEmployments(response.data);
    } catch (error) {
      console.error("Error fetching employments:", error);
      toast.error("Failed to load employments");
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const validateForm = () => {
    const requiredFields = [
      { field: "currentJobTitle", message: "Job title is required" },
      { field: "empType", message: "Employment type is required" },
      { field: "comname", message: "Company name is required" },
      { field: "joinYear", message: "Join year is required" },
      { field: "joinMonth", message: "Join month is required" }
    ];
    for (const { field, message } of requiredFields) {
      if (!formData[field]?.trim()) {
        toast.error(message);
        return false;
      }
    }
    return true;
  };
  const handleSave = async () => {
    if (!userEmail) {
      toast.error("User email not found. Please log in first.");
      return;
    }
    if (!validateForm()) return;
    try {
      if (editMode) {
        await axios.put(`http://localhost:8080/api/employments/${editingId}`, formData);
        toast.success("Employment updated successfully!");
      } else {
        await axios.post(`http://localhost:8080/api/employments/${userEmail}`, formData);
        toast.success("Employment added successfully!");
      }
      fetchEmployments();
      resetForm();
    } catch (error) {
      console.error("Error saving employment:", error);
      toast.error("Failed to save employment. Please try again.");
    }
  };
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employment record?")) {
      try {
        await axios.delete(`http://localhost:8080/api/employments/${id}`);
        fetchEmployments();
        toast.success("Employment deleted successfully!");
      } catch (error) {
        console.error("Error deleting employment:", error);
        toast.error("Failed to delete employment. Please try again.");
      }
    }
  };
  const handleEdit = (emp) => {
    setFormData(emp);
    setEditingId(emp.id);
    setEditMode(true);
    setShowForm(true);
  };
  const resetForm = () => {
    setFormData({
      currentEmployment: "",
      empType: "",
      joinYear: "",
      joinMonth: "",
      comname: "",
      currentJobTitle: "",
      currentSalary: "",
      skill: "",
      jobProfile: "",
      noticePeriod: ""
    });
    setEditMode(false);
    setEditingId(null);
    setShowForm(false);
  };
  return (
    <div className="employment-container" id="career-profile">
      <ToastContainer />
      <div className="employment-header">
        <h3>Employment</h3>
        <button className="add-btn" onClick={() => setShowForm(true)}>
          Add Employment
        </button>
      </div>
      {showForm && (
        <div className="employment-form-container">
          <div className="employment-form">
            <h4>{editMode ? "Edit Employment" : "Add Employment"}</h4>
            <div className="form-group">
              <label>Current Employment*</label>
              <select
                name="currentEmployment"
                value={formData.currentEmployment}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="form-group">
              <label>Employment Type*</label>
              <select
                name="empType"
                value={formData.empType}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Join Year*</label>
                <input
                  type="text"
                  name="joinYear"
                  placeholder="Year"
                  onChange={handleChange}
                  value={formData.joinYear}
                />
              </div>
              <div className="form-group">
                <label>Join Month*</label>
                <input
                  type="text"
                  name="joinMonth"
                  placeholder="Month"
                  onChange={handleChange}
                  value={formData.joinMonth}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Company Name*</label>
              <input
                type="text"
                name="comname"
                placeholder="Company Name"
                onChange={handleChange}
                value={formData.comname}
              />
            </div>
            <div className="form-group">
              <label>Job Title*</label>
              <input
                type="text"
                name="currentJobTitle"
                placeholder="Job Title"
                onChange={handleChange}
                value={formData.currentJobTitle}
              />
            </div>
            <div className="form-group">
              <label>Current Salary</label>
              <input
                type="number"
                name="currentSalary"
                placeholder="Current Salary"
                onChange={handleChange}
                value={formData.currentSalary}
              />
            </div>
            <div className="form-group">
              <label>Skills</label>
              <input
                type="text"
                name="skill"
                placeholder="Skills (comma separated)"
                onChange={handleChange}
                value={formData.skill}
              />
            </div>
            <div className="form-group">
              <label>Job Profile</label>
              <textarea
                name="jobProfile"
                placeholder="Describe your role"
                onChange={handleChange}
                value={formData.jobProfile}
              />
            </div>
            <div className="form-group">
              <label>Notice Period</label>
              <select
                name="noticePeriod"
                value={formData.noticePeriod}
                onChange={handleChange}
              >
                <option value="">Select Notice Period</option>
                <option value="15 Days or Less">15 Days or Less</option>
                <option value="1 Month">1 Month</option>
                <option value="2 Months">2 Months</option>
                <option value="3 Months">3 Months</option>
                <option value="More than 3 Months">More than 3 Months</option>
              </select>
            </div>
            <div className="form-actions">
              <button className="cancel-btn" onClick={resetForm}>
                Cancel
              </button>
              <button className="save-btn" onClick={handleSave}>
                {editMode ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="employment-cards">
        {employments.length === 0 ? (
          <div className="no-employments">
            <p>No employments added yet. Click "Add Employment" to get started.</p>
          </div>
        ) : (
          employments.map((emp) => (
            <div className="employment-card" key={emp.id}>
              <div className="card-header">
                <h4>{emp.currentJobTitle}</h4>
                <span className={`employment-type ${emp.empType.toLowerCase()}`}>
                  {emp.empType}
                </span>
              </div>
              <div className="card-body">
                <div className="card-field">
                  <strong>Company:</strong> {emp.comname}
                </div>
                <div className="card-field">
                  <strong>Experience:</strong> {emp.joinYear} year(s) {emp.joinMonth} month(s)
                </div>
                <div className="card-field">
                  <strong>Current Employment:</strong> {emp.currentEmployment === "yes" ? "Yes" : "No"}
                </div>
                <div className="card-field">
                  <strong>Salary:</strong> {emp.currentSalary || "Not specified"}
                </div>
                <div className="card-field">
                  <strong>Skills:</strong> {emp.skill || "Not specified"}
                </div>
                <div className="card-field">
                  <strong>Notice Period:</strong> {emp.noticePeriod || "Not specified"}
                </div>
                <div className="card-field">
                  <strong>Job Profile:</strong>
                  <p>{emp.jobProfile || "Not specified"}</p>
                </div>
              </div>
              <div className="card-actions">
                <button className="edit-btn" onClick={() => handleEdit(emp)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(emp.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default Employment;
