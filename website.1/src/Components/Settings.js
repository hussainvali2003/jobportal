import React, { useState } from 'react';
import { Settings as SettingsIcon, FileText, Lock, ChevronRight, Upload, Key, File, Save, CheckCircle, XCircle, Trash2 } from 'lucide-react';
import '../Styles/Settings.css';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('account');
  
  // Resume & Documents states
  const [resumeFile, setResumeFile] = useState(null);
  const [isSavingDocuments, setIsSavingDocuments] = useState(false);
  const [documentSuccess, setDocumentSuccess] = useState(false);
  
  // Document states for each type
  const [documents, setDocuments] = useState({
    aadharCard: null,
    panCard: null,
    tenthMarksheet: null,
    twelfthMarksheet: null,
    collegeMarksheet: null,
    pfHistory: null,
    payslips: []
  });
  
  // Password change states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  
  // Job Alerts
  const [jobAlertCriteria, setJobAlertCriteria] = useState({
    keywords: '',
    location: '',
    experienceLevel: '',
    salaryRange: ''
  });
  const [alertSuccess, setAlertSuccess] = useState(false);
  
  // Account info
  const [accountInfo, setAccountInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    hasWorkExperience: false
  });

  
  const [accountSuccess, setAccountSuccess] = useState(false);
  
  // Application tracking
  const [jobApplications] = useState([]);

  const menuItems = [
    { id: 'account', label: 'Account Settings', icon: <Lock size={20} /> },
    { id: 'jobAlerts', label: 'Job Alert Management', icon: <SettingsIcon size={20} /> },
    { id: 'resume', label: 'Resume & Documents', icon: <FileText size={20} /> },
    { id: 'application', label: 'Application Settings', icon: <FileText size={20} /> },
  ];

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
      setDocumentSuccess(false);
    }
  };

  const handleDocumentUpload = (documentType, e) => {
    const file = e.target.files[0];
    if (file) {
      setDocuments(prev => ({
        ...prev,
        [documentType]: file
      }));
      setDocumentSuccess(false);
    }
  };

  const handlePayslipsUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setDocuments(prev => ({
        ...prev,
        payslips: [...prev.payslips, ...files.slice(0, 3 - prev.payslips.length)] // Limit to 3 payslips
      }));
      setDocumentSuccess(false);
    }
  };

  const removePayslip = (index) => {
    setDocuments(prev => {
      const newPayslips = [...prev.payslips];
      newPayslips.splice(index, 1);
      return {
        ...prev,
        payslips: newPayslips
      };
    });
  };

  const saveDocuments = () => {
    setIsSavingDocuments(true);
    
    // Validate mandatory documents
    const mandatoryDocs = [
      documents.aadharCard,
      documents.panCard,
      documents.tenthMarksheet,
      documents.twelfthMarksheet,
      documents.collegeMarksheet
    ];
    
    if (mandatoryDocs.some(doc => !doc)) {
      setPasswordError("Please upload all mandatory documents");
      setIsSavingDocuments(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      setIsSavingDocuments(false);
      setDocumentSuccess(true);
      setTimeout(() => setDocumentSuccess(false), 3000);
    }, 1500);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords don't match");
      return;
    }
    setPasswordError('');
    // Simulate API call
    setTimeout(() => {
      setPasswordSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPasswordSuccess(false), 3000);
    }, 1000);
  };

  const saveJobAlerts = () => {
    // Simulate API call
    setAlertSuccess(true);
    setTimeout(() => setAlertSuccess(false), 3000);
  };

  const saveAccountInfo = () => {
    // Simulate API call
    setAccountSuccess(true);
    setTimeout(() => setAccountSuccess(false), 3000);
  };

  const renderSuccessMessage = (message) => (
    <div className="success-message">
      <CheckCircle size={16} />
      <span>{message}</span>
    </div>
  );

  const renderAccountSettings = () => (
    <div className="settings-content">
      <h2>Account Settings</h2>
      
      <div className="settings-group">
        <h3>Personal Information</h3>
        <div className="form-group">
          <label>Full Name</label>
          <input 
            type="text" 
            className="select-input" 
            value={accountInfo.fullName}
            onChange={(e) => setAccountInfo({...accountInfo, fullName: e.target.value})}
            placeholder="Enter your full name" 
          />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input 
            type="email" 
            className="select-input" 
            value={accountInfo.email}
            onChange={(e) => setAccountInfo({...accountInfo, email: e.target.value})}
            placeholder="Enter your email" 
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input 
            type="tel" 
            className="select-input" 
            value={accountInfo.phone}
            onChange={(e) => setAccountInfo({...accountInfo, phone: e.target.value})}
            placeholder="Enter your phone number" 
          />
        </div>
        <div className="form-group">
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={accountInfo.hasWorkExperience}
              onChange={(e) => setAccountInfo({...accountInfo, hasWorkExperience: e.target.checked})}
            />
            <span className="checkmark"></span>
            I have prior work experience
          </label>
        </div>
        {accountSuccess && renderSuccessMessage("Personal information updated successfully!")}
      </div>

      <div className="settings-group">
        <h3>
          <Key size={18} style={{ marginRight: '8px' }} />
          Change Password
        </h3>
        <form onSubmit={handlePasswordChange}>
          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              className="select-input"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              className="select-input"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength="8"
            />
          </div>
          <div className="form-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              className="select-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {passwordError && (
            <div className="error-message">
              <XCircle size={16} />
              <span>{passwordError}</span>
            </div>
          )}
          {passwordSuccess && renderSuccessMessage("Password changed successfully!")}
          <button type="submit" className="btn-primary">
            <Save size={16} style={{ marginRight: '8px' }} />
            Update Password
          </button>
        </form>
      </div>
    </div>
  );

  const renderJobAlerts = () => (
    <div className="settings-content">
      <h2>Job Alert Management</h2>
      <div className="settings-group">
        <h3>Job Alert Criteria</h3>
        <div className="form-group">
          <label>Keywords</label>
          <input 
            type="text" 
            className="select-input" 
            value={jobAlertCriteria.keywords}
            onChange={(e) => setJobAlertCriteria({...jobAlertCriteria, keywords: e.target.value})}
            placeholder="e.g., Software Engineer, Developer" 
          />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input 
            type="text" 
            className="select-input" 
            value={jobAlertCriteria.location}
            onChange={(e) => setJobAlertCriteria({...jobAlertCriteria, location: e.target.value})}
            placeholder="e.g., Mumbai, Delhi" 
          />
        </div>
        <div className="form-group">
          <label>Experience Level</label>
          <select 
            className="select-input"
            value={jobAlertCriteria.experienceLevel}
            onChange={(e) => setJobAlertCriteria({...jobAlertCriteria, experienceLevel: e.target.value})}
          >
            <option value="">Select experience level</option>
            <option value="0-2 years">0-2 years</option>
            <option value="2-5 years">2-5 years</option>
            <option value="5-8 years">5-8 years</option>
            <option value="8+ years">8+ years</option>
          </select>
        </div>
        <div className="form-group">
          <label>Salary Range</label>
          <select 
            className="select-input"
            value={jobAlertCriteria.salaryRange}
            onChange={(e) => setJobAlertCriteria({...jobAlertCriteria, salaryRange: e.target.value})}
          >
            <option value="">Select salary range</option>
            <option value="3-6 LPA">3-6 LPA</option>
            <option value="6-10 LPA">6-10 LPA</option>
            <option value="10-15 LPA">10-15 LPA</option>
            <option value="15+ LPA">15+ LPA</option>
          </select>
        </div>
        <button 
          className="btn-primary"
          onClick={saveJobAlerts}
        >
          <Save size={16} style={{ marginRight: '8px' }} />
          Save Alert Preferences
        </button>
        {alertSuccess && renderSuccessMessage("Job alert preferences saved successfully!")}
      </div>
    </div>
  );

  const renderDocumentUpload = (label, documentType, required = false) => (
    <div className="form-group">
      <label>
        {label} {required && <span className="required">*</span>}
      </label>
      <div className="upload-section">
        <label className="btn-primary">
          <Upload size={16} style={{ marginRight: '8px' }} />
          Upload {label}
          <input 
            type="file" 
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" 
            onChange={(e) => handleDocumentUpload(documentType, e)}
            style={{ display: 'none' }}
          />
        </label>
        <p className="upload-info">Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 5MB)</p>
        {documents[documentType] && (
          <div className="file-preview">
            <File size={16} style={{ marginRight: '8px' }} />
            <span>{documents[documentType].name}</span>
          </div>
        )}
      </div>
    </div>
  );

  const renderResumeDocuments = () => (
    <div className="settings-content">
      <h2>Resume & Documents</h2>
      
      <div className="settings-group">
        <h3>Resume</h3>
        <div className="form-group">
          <label>Resume <span className="required">*</span></label>
          <div className="upload-section">
            <label className="btn-primary">
              <Upload size={16} style={{ marginRight: '8px' }} />
              Upload Resume
              <input 
                type="file" 
                accept=".pdf,.doc,.docx" 
                onChange={handleResumeUpload}
                style={{ display: 'none' }}
              />
            </label>
            <p className="upload-info">Supported formats: PDF, DOC, DOCX (Max 5MB)</p>
            {resumeFile && (
              <div className="file-preview">
                <File size={16} style={{ marginRight: '8px' }} />
                <span>{resumeFile.name}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="settings-group">
        <h3>Mandatory Documents</h3>
        {renderDocumentUpload("Aadhar Card", "aadharCard", true)}
        {renderDocumentUpload("PAN Card", "panCard", true)}
        {renderDocumentUpload("10th Mark Sheet", "tenthMarksheet", true)}
        {renderDocumentUpload("12th Mark Sheet", "twelfthMarksheet", true)}
        {renderDocumentUpload("College Mark Sheet", "collegeMarksheet", true)}
      </div>
      
      {accountInfo.hasWorkExperience && (
        <div className="settings-group">
          <h3>Work Experience Documents</h3>
          {renderDocumentUpload("PF History", "pfHistory")}
          
          <div className="form-group">
            <label>Last 3 Months' Payslips</label>
            <div className="upload-section">
              <label className="btn-primary">
                <Upload size={16} style={{ marginRight: '8px' }} />
                Upload Payslips
                <input 
                  type="file" 
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" 
                  onChange={handlePayslipsUpload}
                  style={{ display: 'none' }}
                  disabled={documents.payslips.length >= 3}
                />
              </label>
              <p className="upload-info">Upload up to 3 payslips (Max 5MB each)</p>
              {documents.payslips.length > 0 && (
                <div className="files-list">
                  {documents.payslips.map((file, index) => (
                    <div key={index} className="file-preview">
                      <File size={16} style={{ marginRight: '8px' }} />
                      <span>{file.name}</span>
                      <button 
                        type="button" 
                        className="delete-btn"
                        onClick={() => removePayslip(index)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      <div className="action-buttons">
        <button 
          className="btn-primary"
          onClick={saveDocuments}
          disabled={isSavingDocuments || !resumeFile}
        >
          {isSavingDocuments ? (
            'Saving...'
          ) : (
            <>
              <Save size={16} style={{ marginRight: '8px' }} />
              Save All Documents
            </>
          )}
        </button>
        {documentSuccess && renderSuccessMessage("Documents uploaded and saved successfully!")}
        {passwordError && (
          <div className="error-message">
            <XCircle size={16} />
            <span>{passwordError}</span>
          </div>
        )}
      </div>
    </div>
  );

  const renderApplicationSettings = () => (
    <div className="settings-content">
      <h2>Application Settings</h2>
      <div className="settings-group">
        <h3>Your Job Applications</h3>
        <div className="applications-table">
          <table>
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Job ID</th>
                <th>Applied Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {jobApplications.length > 0 ? (
                jobApplications.map((app) => (
                  <tr key={app.id}>
                    <td>{app.jobTitle}</td>
                    <td>{app.jobId}</td>
                    <td>{app.appliedDate}</td>
                    <td>
                      <span className={`status-badge ${app.status.toLowerCase().replace(' ', '-')}`}>
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="no-applications">
                    No applications found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'account':
        return renderAccountSettings();
      case 'jobAlerts':
        return renderJobAlerts();
      case 'resume':
        return renderResumeDocuments();
      case 'application':
        return renderApplicationSettings();
      default:
        return (
          <div className="settings-content">
            <h2>Select a section</h2>
            <p>Please choose a section from the sidebar to view and edit settings.</p>
          </div>
        );
    }
  };

  return (
    <div className="settings-wrapper">
      <div className="settings-container">
        <div className="settings-sidebar">
          <div className="sidebar-header">
            <h1>Settings</h1>
            <p className="sidebar-subtitle">Manage your account preferences</p>
          </div>
          <nav>
            {menuItems.map(item => (
              <button
                key={item.id}
                className={`sidebar-item ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => setActiveSection(item.id)}
              >
                <span className="sidebar-icon">{item.icon}</span>
                <span className="sidebar-label">{item.label}</span>
                <ChevronRight size={16} className="chevron" />
              </button>
            ))}
          </nav>
        </div>
        <main className="settings-main">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Settings;