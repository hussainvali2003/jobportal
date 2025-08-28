import React, { useState, useEffect,useRef } from "react";
import axios from "axios";
import "../Styles/ProjectsSection.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUpdateCompletion } from "../hooks";
const Projects = () => {
  const formRef = useRef(null);
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [formData, setFormData] = useState({
    projectTitle: "",
    client: "",
    projectStatus: "",
    workedFrom: "",
    workedFromMonth: "",
    detailsOfProject: ""
  });
  const userEmail = localStorage.getItem("registeredEmail");
  useUpdateCompletion({
    sectionName: "projects",
    checkFn: () => projects.length > 0,
    dependencies: [projects]
  });

    const API_BASE = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    if (userEmail) fetchProjects();
  }, [userEmail]);
  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/projects/${userEmail}`);
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast.error("Failed to load projects");
    }
  };
 const handleChange = (e) => {
  const value = e.target.name === 'detailsOfProject'
    ? e.target.value.replace(/\r?\n/g, '\n')
    : e.target.value;
  setFormData({ ...formData, [e.target.name]: value });
};
  const validateForm = () => {
    const { projectTitle, client, projectStatus, workedFrom, workedFromMonth, detailsOfProject } = formData;
    if (!projectTitle.trim()) {
      toast.error("Project title is required");
      return false;
    }
    if (!client.trim()) {
      toast.error("Client name is required");
      return false;
    }
    if (!projectStatus.trim()) {
      toast.error("Project status is required");
      return false;
    }
    if (!workedFrom.trim()) {
      toast.error("Worked from year is required");
      return false;
    }
    if (!workedFromMonth.trim()) {
      toast.error("Worked from month is required");
      return false;
    }
    if (!detailsOfProject.trim()) {
      toast.error("Project details are required");
      return false;
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
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const payload = {
      ...formData,
    };
    console.log("Sending payload:", payload); // Debug the request data
    if (editingProjectId) {
      const response = await axios.put(
        `${API_BASE}/api/projects/${editingProjectId}`,
        payload,
        config
      );
      console.log("Update response:", response.data); // Log success response
      toast.success("Project updated successfully!");
    } else {
      const response = await axios.post(
        `${API_BASE}/api/projects/${userEmail}`,
        payload,
        config
      );
      console.log("Create response:", response.data);
      toast.success("Project added successfully!");
    }
    fetchProjects();
    resetForm();
  } catch (error) {
    console.error("Full error object:", error);
    console.error("Error response data:", error.response?.data); // Log the server's error message
    toast.error(
      error.response?.data?.message ||
      "Failed to save project. Check the console for details."
    );
  }
};
  const handleEdit = (project) => {
    setFormData({
      projectTitle: project.projectTitle,
      client: project.client,
      projectStatus: project.projectStatus,
      workedFrom: project.workedFrom,
      workedFromMonth: project.workedFromMonth,
      detailsOfProject: project.detailsOfProject
    });
    setEditingProjectId(project.id);
    setShowForm(true);
        setTimeout(() => {
      formRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }, 100);
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/api/projects/${id}`);
      fetchProjects();
      toast.success("Project deleted successfully!");
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project. Please try again.");
    }
  };
  const resetForm = () => {
    setFormData({
      projectTitle: "",
      client: "",
      projectStatus: "",
      workedFrom: "",
      workedFromMonth: "",
      detailsOfProject: ""
    });
    setEditingProjectId(null);
    setShowForm(false);
  };
  return (
    <div className="projects-container" id="projects">
      <ToastContainer />
      <div className="projects-header">
        <h3>Projects</h3>
        <button className="add-project-btn" onClick={() => setShowForm(true)}>
          Add Project
        </button>
      </div>
      {/* Form appears below the header */}
      {showForm && (
        <div className="project-form-container" ref={formRef}>
          <div className="project-form">
            <h4>{editingProjectId ? "Edit Project" : "Add New Project"}</h4>
            <div className="form-group">
              <label>Project Title*</label>
              <input
                type="text"
                name="projectTitle"
                placeholder="Enter project title"
                onChange={handleChange}
                value={formData.projectTitle}
              />
            </div>
            <div className="form-group">
              <label>Client*</label>
              <input
                type="text"
                name="client"
                placeholder="Enter client name"
                onChange={handleChange}
                value={formData.client}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Status*</label>
                <select
                  name="projectStatus"
                  value={formData.projectStatus}
                  onChange={handleChange}
                >
                  <option value="">Select Status</option>
                  <option value="Completed">Completed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="On Hold">On Hold</option>
                </select>
              </div>
              <div className="form-group">
                <label>Year*</label>
                <input
                  type="number"
                  name="workedFrom"
                  placeholder="2023"
                  onChange={handleChange}
                  value={formData.workedFrom}
                />
              </div>
              <div className="form-group">
                <label>Month*</label>
                <select
                  name="workedFromMonth"
                  value={formData.workedFromMonth}
                  onChange={handleChange}
                >
                  <option value="">Select Month</option>
                  <option value="January">January</option>
                  <option value="February">February</option>
                  {/* Add other months */}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Project Details*</label>
              <textarea
                name="detailsOfProject"
                placeholder="Describe the project details"
                onChange={handleChange}
                value={formData.detailsOfProject}
              />
            </div>
            <div className="form-actions">
              <button className="cancel-btn" onClick={resetForm}>
                Cancel
              </button>
              <button className="save-btn" onClick={handleSave}>
                {editingProjectId ? "Update Project" : "Save Project"}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Projects displayed as cards */}
      <div className="projects-grid">
        {projects.length === 0 ? (
          <div className="no-projects">
            <p>No projects added yet. Click "Add Project" to get started.</p>
          </div>
        ) : (
          projects.map((project) => (
            <div className="project-card" key={project.id}>
              <div className="card-header">
                <h3>{project.projectTitle}</h3>
                <span className={`status-badge ${project.projectStatus.toLowerCase().replace(' ', '-')}`}>
                  {project.projectStatus}
                </span>
              </div>
              <div className="card-body">
                <div className="card-field">
                  <strong>Client:</strong> {project.client}
                </div>
                <div className="card-field">
                  <strong>Duration:</strong> {project.workedFromMonth} {project.workedFrom}
                </div>
                <div className="card-field">
                  <strong>Description:</strong> {project.detailsOfProject}
                </div>
              </div>
              <div className="card-actions">
                <button className="edit-btn" onClick={() => handleEdit(project)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(project.id)}>
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
export default Projects;