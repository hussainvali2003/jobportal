import React, { useState, useRef, useEffect } from 'react';
import '../Styles/Resume.css';
import '../Styles/SideBar.css';
import SideBar from './SideBar';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import { Download, Trash2, Pencil, Eye, EyeOff } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";
import { useUpdateCompletion } from '../hooks';
const ResumeUpload = () => {
  const location = useLocation();
  const fileInputRef = useRef(null);
  const [resumeName, setResumeName] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [isResumeVisible, setIsResumeVisible] = useState(true);
  const [isEditingHeadline, setIsEditingHeadline] = useState(false);
  const [headline, setHeadline] = useState('');
  const [headlineInput, setHeadlineInput] = useState('');
const [resumeUploaded, setResumeUploaded] = useState(false);
  const userEmail = localStorage.getItem("registeredEmail");
 useUpdateCompletion({
    sectionName: "resume",
    checkFn: () => resumeFile !== null,
    dependencies: [resumeFile],
  });
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);
  useEffect(() => {
    if (userEmail) {
      fetchProfileSummary();
    }
  }, [userEmail]);

    const API_BASE = process.env.REACT_APP_API_BASE_URL;

  const fetchProfileSummary = async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/resumes/${userEmail}`);
      const data = response.data;
      if (data && data.length > 0) {
        setHeadline(data[0].profilesummary || '');
        setResumeName(data[0].resume || '');
      }
    } catch (error) {
      console.error('Error fetching profile summary:', error);
    }
  };
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };
const handleFileChange = async (event) => {
  const file = event.target.files[0];
  if (file) {
    // :white_check_mark: Validate file type
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/rtf",
    ];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a valid file type (PDF, DOC, DOCX, RTF)", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    // :white_check_mark: Validate file size (2MB max)
    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("File size exceeds 2MB limit. Please upload a smaller file.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    // :white_check_mark: Frontend state update
    setResumeName(file.name);
    setResumeFile(file);
    // :white_check_mark: Proceed to backend upload
    const formData = new FormData();
    formData.append("resumeFile", file);
    formData.append("userEmail", userEmail);
    try {
      const response = await axios.post(`${API_BASE}/api/resumes/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Resume uploaded successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      console.log(response.data);
      fetchProfileSummary(); // Refresh resume + profile summary from backend
    } catch (error) {
      console.error("Error uploading resume:", error);
      toast.error("Failed to upload resume. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  }
};
  const handleEditClick = () => {
    setHeadlineInput(headline);
    setIsEditingHeadline(true);
  };
 const handleSaveClick = async () => {
  if (!headlineInput.trim()) {
    toast.error("Profile summary cannot be empty", {
      position: "top-right",
      autoClose: 3000,
    });
    return;
  }
  try {
    const response = await axios.post(`${API_BASE}/api/resumes/summary`, {
      userEmail,
      profilesummary: headlineInput,
    });
    setHeadline(headlineInput);
    setIsEditingHeadline(false);
    toast.success("Successfully added your profile summary", {
      position: "top-right",
      autoClose: 3000,
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error saving profile summary:', error);
    toast.error("Failed to save profile summary. Please try again.", {
      position: "top-right",
      autoClose: 3000,
    });
  }
};
   const toggleResumeVisibility = () => {
    setIsResumeVisible(!isResumeVisible);
    toast.info(`Resume is now ${isResumeVisible ? "hidden" : "visible"}`, {
      position: "top-right",
      autoClose: 2000,
    });
  };
    const handleDeleteResume = () => {
    setResumeName("");
    setResumeFile(null);
    toast.info("Resume deleted.", {
      position: "top-right",
      autoClose: 3000,
    });
  };
    const handleDownloadResume = () => {
    if (!resumeFile) {
      toast.error("No resume file available to download", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    try {
      const url = URL.createObjectURL(resumeFile);
      const link = document.createElement("a");
      link.href = url;
      link.download = resumeName || "resume";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 100);
      toast.success("Download started!", {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Failed to download resume", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
    useEffect(() => {
    const saved = localStorage.getItem("resumeCompleted") === "true";
    setResumeUploaded(saved);
  }, []);
   return (
    <div
      className="resume-modal-content"
      id="resume"
      style={{ scrollMarginBottom: "100px" }}
    >
      {/* <Sidebar /> */}
      <ToastContainer />
      <div className="resume-section">
        <div className="resume-header-row">
          <h3 style={{ fontSize: "26px" }}>Resume</h3>
          {resumeName && (
            <button
              className="visibility-btn"
              onClick={toggleResumeVisibility}
              title={isResumeVisible ? "Hide resume" : "Show resume"}
            >
              {isResumeVisible ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>
        {isResumeVisible && resumeName && (
          <div className="resume-header" >
            <div>
              <p className="file-name">{resumeName}</p>
            </div>
            <div className="resume-actions">
              <button
                className="icon-btn"
                onClick={handleDownloadResume}
                title="Download"
              >
                <Download size={18} />
              </button>
              <button
                className="icon-btn"
                onClick={handleDeleteResume}
                title="Delete"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        )}
        <div className="upload-box">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
            accept=".pdf,.doc,.docx,.rtf"
          />
          <button className="update-btn" onClick={handleUploadClick}>
            {resumeName ? "Replace Resume" : "Upload Resume"}
          </button>
          <p className="file-size-note">Maximum file size: 2MB</p>
        </div>
      </div>
      {/* Profile Summary */}
      <div
        className="headline-container"
        id="profile-summary"
        style={{ scrollMarginBottom: "10px" }}
      >
        <div className="headline-header">
          <h3 style={{ color: "black", fontSize: "26px" }}>Profile Summary</h3>
          {!isEditingHeadline && (
            <button className="icon-btn" onClick={handleEditClick} title="Edit">
              <Pencil size={18} />
            </button>
          )}
        </div>
        {isEditingHeadline ? (
          <div>
            <textarea
              className="headline-textarea"
              placeholder="Write a summary of your career achievements..."
              value={headlineInput}
              onChange={(e) => setHeadlineInput(e.target.value)}
              rows={5}
            />
            <div className="button-group">
              <button className="save-btn" onClick={handleSaveClick}>
                Save
              </button>
              <button
                className="sumcancel"
                onClick={() => setIsEditingHeadline(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="headline-text">
            {headline || "No profile summary added yet."}
          </p>
        )}
      </div>
    </div>
  );
};
export default ResumeUpload;