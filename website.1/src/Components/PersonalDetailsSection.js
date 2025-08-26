import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Styles/PersonalDetailsSection.css";
import { useUpdateCompletion } from '../hooks';
const languageOptions = ["English", "Tamil", "Hindi", "Telugu", "Kannada", "Malayalam"];
const genderOptions = ["Male", "Female", "Other", "Prefer not to say"];
const maritalStatusOptions = ["Single", "Married", "Divorced", "Widowed"];
const workPermitOptions = ["Yes", "No", "Not Required"];
const PersonalDetails = () => {
  const userEmail = localStorage.getItem("registeredEmail");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    email: userEmail,
    gender: '',
    maritalStatus: '',
    dob: '',
    workPermit: '',
    address: '',
    nationality: '',
    languages: [],
    socialLink: '',
    emergencyContact: '',
    differentlyAbled: 'No',
  });
  const [newLanguage, setNewLanguage] = useState('');
  const [submittedData, setSubmittedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (userEmail) {
      fetchPersonalDetails();
    }
  }, [userEmail]);
  const fetchPersonalDetails = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:8080/api/personal-details/${userEmail}`);
      if (response.data) {
        const data = response.data;
        setSubmittedData({
          ...data,
          languages: data.languages ? data.languages.split(', ') : []
        });
        setFormData({
          email: userEmail,
          gender: data.gender || '',
          maritalStatus: data.maritalStatus || '',
          dob: data.dob || '',
          workPermit: data.workPermit || '',
          address: data.address || '',
          nationality: data.nationality || '',
          languages: data.languages ? data.languages.split(', ') : [],
          socialLink: data.socialLink || '',
          emergencyContact: data.emergencyContact || '',
          differentlyAbled: data.differentlyAbled || 'No',
        });
      }
    } catch (error) {
      console.error("Error fetching personal details:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const toggleForm = () => setShowForm(!showForm);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    const updatedLanguages = formData.languages.includes(lang)
      ? formData.languages.filter(l => l !== lang)
      : [...formData.languages, lang];
    setFormData(prev => ({ ...prev, languages: updatedLanguages }));
  };
  const handleNewLanguage = (e) => {
    e.preventDefault();
    if (newLanguage.trim() && !formData.languages.includes(newLanguage.trim())) {
      setFormData(prev => ({
        ...prev,
        languages: [...prev.languages, newLanguage.trim()]
      }));
      setNewLanguage('');
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate required fields
    if (
      !formData.gender ||
      !formData.maritalStatus ||
      !formData.dob ||
      !formData.workPermit ||
      !formData.address ||
      !formData.nationality ||
      formData.languages.length === 0 ||
      !formData.emergencyContact
    ) {
      toast.error("Please fill all required fields", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          backgroundColor: '#FFEBEE',
          color: '#D32F2F',
          fontWeight: 'bold'
        }
      });
      return;
    }
    try {
      setIsLoading(true);
      const dataToSend = {
        ...formData,
        languages: formData.languages.join(', ')
      };
      let response;
      if (submittedData && submittedData.id) {
        response = await axios.put(
          `http://localhost:8080/api/personal-details/${submittedData.id}`,
          dataToSend
        );
      } else {
        response = await axios.post(
          `http://localhost:8080/api/personal-details/${userEmail}`,
          dataToSend
        );
      }
      setSubmittedData({
        ...response.data,
        languages: response.data.languages ? response.data.languages.split(', ') : []
      });
      setShowForm(false);
      toast.success("Personal details saved successfully!", {
         position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
        style: {
        background: '#E8F5E9',
        color: '#2E7D32',
        fontWeight: 'bold',
        fontSize: '14px'
      },
      bodyStyle: {
        padding: '12px'
      }
      });
    } catch (error) {
    toast.error("Failed to save personal details. Please try again.", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {
        background: '#FFEBEE',
        color: '#D32F2F',
        fontWeight: 'bold',
        fontSize: '14px'
      }
    });
  } finally {
    setIsLoading(false);
  }
};
useUpdateCompletion({
  sectionName: 'personalDetails',
  checkFn: () => {
    if (!submittedData) return false;
    const requiredFields = [
      'gender',
      'maritalStatus',
      'dob',
      'workPermit',
      'address',
      'nationality',
      'emergencyContact'
    ];
const hasAllFields = requiredFields.every(field =>
      submittedData[field] && submittedData[field].toString().trim() !== ''
    );
    const hasLanguages = Array.isArray(submittedData.languages) && submittedData.languages.length > 0;
    return hasAllFields && hasLanguages;
  },
  dependencies: [submittedData]
});
  return (
    <div className="personal-details-container" id="personal-details">
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
      />
      <div className="header-row">
        <h2 className="title">Enter Personal Details</h2>
        <button
          className="peradd-button"
          onClick={toggleForm}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : showForm ? "Hide Form" : submittedData ? "Edit Details" : "Add Details"}
        </button>
      </div>
      {showForm && (
        <form onSubmit={handleSubmit} className="details-grid">
          <div className="detail-block">
            <label>Gender <span className="required">*</span></label>
            <select
              name="gender"
              onChange={handleChange}
              value={formData.gender}
              required
            >
              <option value="">Select Gender</option>
              {genderOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="detail-block">
            <label>Marital Status <span className="required">*</span></label>
            <select
              name="maritalStatus"
              onChange={handleChange}
              value={formData.maritalStatus}
              required
            >
              <option value="">Select Marital Status</option>
              {maritalStatusOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="detail-block">
            <label>Date of Birth <span className="required">*</span></label>
            <input
              type="date"
              name="dob"
              onChange={handleChange}
              value={formData.dob}
              required
            />
          </div>
          <div className="detail-block">
            <label>Work Permit <span className="required">*</span></label>
            <select
              name="workPermit"
              onChange={handleChange}
              value={formData.workPermit}
              required
            >
              <option value="">Select Option</option>
              {workPermitOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="detail-block">
            <label>Address <span className="required">*</span></label>
            <input
              name="address"
              onChange={handleChange}
              value={formData.address}
              required
            />
          </div>
          <div className="detail-block">
            <label>Nationality <span className="required">*</span></label>
            <input
              name="nationality"
              onChange={handleChange}
              value={formData.nationality}
              required
            />
          </div>
          <div className="detail-block">
            <label>Language(s) Spoken <span className="required">*</span></label>
            <div className="checkbox-group">
              {languageOptions.map(lang => (
                <label key={lang} className="checkbox-label">
                  <input
                    type="checkbox"
                    value={lang}
                    checked={formData.languages.includes(lang)}
                    onChange={handleLanguageChange}
                  />
                  {lang}
                </label>
              ))}
            </div>
            <div className="add-language-container">
              <input
                type="text"
                value={newLanguage}
                onChange={(e) => setNewLanguage(e.target.value)}
                placeholder="Add other language"
                className="language-input"
              />
              <button
                onClick={handleNewLanguage}
                className="add-language-button"
                disabled={!newLanguage.trim()}
              >
                Add
              </button>
            </div>
          </div>
          <div className="detail-block">
            <label>Social Media Link</label>
            <input
              type="url"
              name="socialLink"
              onChange={handleChange}
              value={formData.socialLink}
            />
          </div>
          <div className="detail-block">
            <label>Emergency Contact <span className="required">*</span></label>
            <input
              type="tel"
              name="emergencyContact"
              onChange={handleChange}
              value={formData.emergencyContact}
              required
            />
          </div>
          <div className="detail-block">
            <label>Differently Abled</label>
            <select
              name="differentlyAbled"
              onChange={handleChange}
              value={formData.differentlyAbled}
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
          <button
            type="submit"
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Submit"}
          </button>
        </form>
      )}
      {submittedData && !showForm && (
        <>
          <h2 className="title" style={{ marginTop: '40px' }}>Submitted Details</h2>
          <div className="details-grid" style={{ marginTop: '40px' }}>
            <div className="detail-block"><label>Gender</label><p>{submittedData.gender}, {submittedData.maritalStatus}</p></div>
            <div className="detail-block"><label>Date of Birth</label><p>{submittedData.dob}</p></div>
            <div className="detail-block"><label>Work Permit</label><p>{submittedData.workPermit}</p></div>
            <div className="detail-block"><label>Address</label><p>{submittedData.address}</p></div>
            <div className="detail-block"><label>Nationality</label><p>{submittedData.nationality}</p></div>
            <div className="detail-block"><label>Languages</label><p>{submittedData.languages.join(', ')}</p></div>
            <div className="detail-block"><label>Social Media Link</label><p>{submittedData.socialLink || 'Not provided'}</p></div>
            <div className="detail-block"><label>Emergency Contact</label><p>{submittedData.emergencyContact}</p></div>
            <div className="detail-block"><label>Differently Abled</label><p>{submittedData.differentlyAbled}</p></div>
          </div>
        </>
      )}
    </div>
  );
};
export default PersonalDetails;