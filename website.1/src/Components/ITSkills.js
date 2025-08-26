import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUpdateCompletion } from "../hooks";
import "../Styles/ITSkills.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ITSkills = () => {
  const [skills, setSkills] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    skillname: "",
    lastused: "",
    year: "",
    month: "",
  });
  useUpdateCompletion({
    sectionName: "itSkills",
    checkFn: () => skills.length > 0,
    dependencies: [skills],
  });
  const userEmail = localStorage.getItem("registeredEmail");
  useEffect(() => {
    if (userEmail) {
      fetchSkills();
    }
  }, [userEmail]);
  const fetchSkills = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/itskills/${userEmail}`);
      setSkills(response.data);
    } catch (error) {
      console.error("Error fetching IT skills:", error);
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const handleSave = async () => {
  if (!userEmail) {
    toast.error("User email not found. Please log in first.");
    return;
  }
  if (!formData.skillname.trim() || String(formData.lastused).trim() === "") {
    toast.error("Please fill in all required fields.");
    return;
  }
  try {
    if (isEditing) {
      await axios.put(`http://localhost:8080/api/itskills/${editId}`, formData);
      toast.success("IT-Skill successfully updated!");
    } else {
      await axios.post(`http://localhost:8080/api/itskills/${userEmail}`, formData);
      toast.success("IT-Skill successfully added!");
    }
    fetchSkills();
    resetForm();
  } catch (error) {
    console.error("Error saving/updating IT skill:", error);
    toast.error("Failed to save skill. Please try again.");
  }
};
const handleEdit = (skill) => {
  setIsEditing(true);
  setEditId(skill.id);
  setFormData({
    skillname: skill.skillname,
    lastused: skill.lastused,
    year: skill.year,
    month: skill.month,
  });
  setShowModal(true);
};
const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:8080/api/itskills/${id}`);
    toast.error("IT-Skill successfully deleted!");
    fetchSkills();
  } catch (error) {
    console.error("Error deleting IT skill:", error);
    toast.error("Failed to delete skill. Please try again.");
  }
};
const resetForm = () => {
  setFormData({
    skillname: "",
    lastused: "",
    year: "",
    month: "",
  });
  setIsEditing(false);
  setEditId(null);
  setShowModal(false);
};
    return (
      <div className="it-skills" id="it-skills">
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        <div className="header">
          <h3>IT Skills</h3>
          <button className="itadd-btn"   onClick={() => setShowModal(true)}>
            Add Details
          </button>
        </div>
        <table className="skills-table">
          <thead>
            <tr>
              <th>Skill</th>
              <th>Last Used</th>
              <th>Experience</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {skills.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No skills added
                </td>
              </tr>
            ) : (
              skills.map((skill) => (
                <tr key={skill.id}>
                  <td>{skill.skillname}</td>
                  <td>{skill.lastused}</td>
                  <td>
                    {`${skill.year || 0} Year${skill.year > 1 ? "s" : ""} ${skill.month || 0} Month${skill.month > 1 ? "s" : ""}`}
                  </td>
                  <td>
                    <button className="itedit-btn" onClick={() => handleEdit(skill)}>Edit</button>
                    <button className="itdelete-btn" onClick={() => handleDelete(skill.id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h4>{isEditing ? "Edit Skill" : "Add IT Skill"}</h4>
              <input
                type="text"
                name="skillname"
                placeholder="Skill / Software name"
                onChange={handleChange}
                value={formData.skillname}
              />
              <input
                type="text"
                name="lastused"
                placeholder="Last used (e.g., 2024)"
                onChange={handleChange}
                value={formData.lastused}
              />
              <div className="exp-row">
                <select name="year" onChange={handleChange} value={formData.year}>
                  <option value="">Years</option>
                  {[...Array(11)].map((_, i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
                <select name="month" onChange={handleChange} value={formData.month}>
                  <option value="">Months</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
              </div>
              <div className="modal-actions">
                <button onClick={resetForm}>Cancel</button>
                <button onClick={handleSave}>{isEditing ? "Update" : "Save"}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  export default ITSkills;