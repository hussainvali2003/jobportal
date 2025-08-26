import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Plus } from 'lucide-react';
import "../Styles/Accomplishment.css";
import { useUpdateCompletion } from "../hooks";

const Accomplishment = () => {
  const [profiles, setProfiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
    const [LinkModel, SetLinkModel] = useState(false);
  const [formData, setFormData] = useState({
    profileName: "",
    profileUrl: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const userEmail = localStorage.getItem("registeredEmail");

  useEffect(() => {
    if (userEmail) {
      fetchProfiles();
    }
  }, [userEmail]);

  const fetchProfiles = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/api/accomplishments/${userEmail}`
      );
      setProfiles(response.data);
    } catch (error) {
      console.error("Error fetching profiles:", error);
      toast.error("Failed to load profiles");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleAddProfile = async () => {
    if (!formData.profileName.trim()) {
      toast.error("Please enter a profile name");
      return;
    }

    if (!formData.profileUrl.trim()) {
      toast.error("Please enter a URL");
      return;
    }

    if (!validateUrl(formData.profileUrl)) {
      toast.error("Please enter a valid URL (include http:// or https://)");
      return;
    }

    setIsLoading(true);
    try {
      await axios.post(
        `http://localhost:8080/api/accomplishments/${userEmail}`,
        {
          onlineProfile: formData.profileName,
          url: formData.profileUrl
        }
      );

      toast.success("Profile added successfully!");
      fetchProfiles();
      setFormData({ profileName: "", profileUrl: "" });
      setShowModal(false);
    } catch (error) {
      console.error("Error adding profile:", error);
      toast.error("Failed to add profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProfile = async (id) => {
    if (!window.confirm("Are you sure you want to delete this profile?")) {
      return;
    }

    setIsLoading(true);
    try {
      await axios.delete(`http://localhost:8080/api/accomplishments/${id}`);
      toast.success("Profile deleted successfully!");
      fetchProfiles();
    } catch (error) {
      console.error("Error deleting profile:", error);
      toast.error("Failed to delete profile");
    } finally {
      setIsLoading(false);
    }
  };

  useUpdateCompletion({
  sectionName: "accomplishment",
  checkFn: () => profiles.length > 0,
  dependencies: [profiles],
});

  return (
    <div id="accomplishments" style={{ scrollMarginTop: "100px" }}>
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

      <div className="fir-Acom">
        <h3>Accomplishments</h3>

        <div className="online-header">
          <h5>Online Profile</h5>
          <button 
            className="btn-add" style={{fontSize:"16px"}}
            onClick={() => setShowModal(true)}
            disabled={isLoading}
          >
            <Plus size={14} style={{ marginRight: "8px",marginTop:"1px" ,fontWeight:"20px"}} />
             Add
          </button>
        </div>

        <p>Add link to online professional profiles (e.g. LinkedIn, Github, etc.)</p>

        {isLoading ? (
          <div style={{ textAlign: "center", padding: "20px", color: "#6B7280" }}>
            Loading profiles...
          </div>
        ) : profiles.length > 0 ? (
          <div className="showacc">
            {profiles.map((profile) => (
              <div key={profile.id}>
                <ul>
                  <li>{profile.onlineProfile}</li>
                  <li>
                    <a
                      href={profile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#3B82F6" }}
                    >
                      {profile.url}
                    </a>
                  </li>
                </ul>
                <button
                  className="pro-del"
                  onClick={() => handleDeleteProfile(profile.id)}
                  disabled={isLoading}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: "center",
            padding: "30px",
            color: "#6B7280",
            fontStyle: "italic"
          }}>
            No profiles added yet
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" style={{
          backgroundColor: 'rgba(0,0,0,0.2)', // Light semi-transparent
          backdropFilter: 'blur(2px)', // Very subtle blur
          marginTop:"80px"
        }}>
          <div className="onlinepro" style={{
            width: '90%',
            // height:"340px",
            maxWidth: '520px',
            padding: '1.75rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            backgroundColor: 'white'
          }}>          <p>Add link to online professional profiles (e.g. LinkedIn, etc.)</p>
            <h4>Social Profile</h4>
            <input
              type="text"
              name="profileName"
              placeholder="Enter Social Profile Name"
              onChange={handleInputChange}
              value={formData.profileName}
              disabled={isLoading}
            />
            <h4>URL</h4>
            <input
              type="text"
              name="profileUrl"
              placeholder="Enter Social Profile URL"
              onChange={handleInputChange}
              value={formData.profileUrl}
              disabled={isLoading}
            />
            <div className="Action-model" style={{ marginTop: '1.75rem' }}>
              <button
                className="Accsave"
                onClick={() => setShowModal(false)}
                disabled={isLoading}
                style={{ padding: '0.85rem 1.5rem', fontSize: '0.95rem' }}
              >
                Cancel
              </button>
              <button
                className="Accdel"
                onClick={handleAddProfile}
                disabled={isLoading || !formData.profileName || !formData.profileUrl}
                style={{ padding: '0.85rem 1.5rem', fontSize: '0.95rem' }}
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accomplishment;