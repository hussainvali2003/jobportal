import React, { useState, useEffect } from 'react';
import { Search, Download, Eye, Filter, Mail, Bell, ChevronDown, ChevronUp } from 'lucide-react';
import '../Styles/ApplicationsDashboard.css';

const ApplicationsDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [scoreFilter, setScoreFilter] = useState('all');
  const [customScoreThreshold, setCustomScoreThreshold] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [notifications, setNotifications] = useState([]);

  const scoreOptions = [
    { value: 'all', label: 'All Candidates' },
    { value: '90', label: 'Score > 90' },
    { value: '80', label: 'Score > 80' },
    { value: '70', label: 'Score > 70' },
    { value: '60', label: 'Score > 60' },
    { value: '50', label: 'Score > 50' },
    { value: '40', label: 'Score > 40' },
    { value: '30', label: 'Score > 30' },
    { value: '20', label: 'Score > 20' },
  ];

  const statusOptions = [
    'Pending',
    'Resume Shortlisted',
    'Rejected',
    'Interview',
    'Hired'
  ];

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [applications, searchTerm, scoreFilter, customScoreThreshold, sortOrder]);

  const API_BASE = process.env.REACT_APP_API_BASE_URL;

  const fetchApplications = async () => {
    try {
      
      const response = await fetch(`${API_BASE}/api/applications/all`);
      const data = await response.json();
      setApplications(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching applications:', error);
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...applications];

    if (searchTerm) {
      filtered = filtered.filter(app =>
        app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.customJobId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    const threshold = customScoreThreshold ? parseFloat(customScoreThreshold) : 
                     (scoreFilter === 'all' ? 0 : parseFloat(scoreFilter));
    
    if (scoreFilter !== 'all' || customScoreThreshold) {
      filtered = filtered.filter(app => app.score > threshold);
    }

    filtered.sort((a, b) => {
      return sortOrder === 'desc' ? b.score - a.score : a.score - b.score;
    });

    setFilteredApplications(filtered);
  };

  const handleStatusChange = async (applicationId, newStatus, currentApp) => {
    try {
      const response = await fetch(`${API_BASE}applications/status/${applicationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          status: newStatus,
          email: currentApp.email,
          name: currentApp.name,
          jobTitle: currentApp.jobTitle,
          companyName: currentApp.companyName
        }),
      });

      if (response.ok) {
        setApplications(prev => 
          prev.map(app => 
            app.id === applicationId ? { ...app, status: newStatus } : app
          )
        );
        addNotification(`Status updated to ${newStatus} for ${currentApp.name}`);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleRejectionReasonChange = async (applicationId, reason) => {
    try {
      const response = await fetch(`${API_BASE}/api/applications/rejection-reason/${applicationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rejectionReason: reason }),
      });

      if (response.ok) {
        setApplications(prev => 
          prev.map(app => 
            app.id === applicationId ? { ...app, rejectionReason: reason } : app
          )
        );
      }
    } catch (error) {
      console.error('Error updating rejection reason:', error);
    }
  };

  const handleBulkShortlist = async () => {
    const threshold = customScoreThreshold ? parseFloat(customScoreThreshold) : 
                     (scoreFilter === 'all' ? 80 : parseFloat(scoreFilter));
    
    try {
      const response = await fetch(`${API_BASE}/api/applications/bulk-shortlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ scoreThreshold: threshold }),
      });

      if (response.ok) {
        fetchApplications();
        addNotification(`Bulk shortlisting completed for candidates with score > ${threshold}`);
      }
    } catch (error) {
      console.error('Error in bulk shortlisting:', error);
    }
  };

  const addNotification = (message) => {
    const notification = {
      id: Date.now(),
      message,
      timestamp: new Date().toLocaleTimeString()
    };
    setNotifications(prev => [notification, ...prev.slice(0, 4)]);
  };

  const viewResume = (resumeFileName) => {
    window.open(`${API_BASE}/api/resumes/view/${resumeFileName}`, '_blank');
  };

  const downloadResume = (resumeFileName, candidateName) => {
    const link = document.createElement('a');
    link.href = `${API_BASE}/api/resumes/download/${resumeFileName}`;
    link.download = `${candidateName}_Resume.pdf`;
    link.click();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Resume Shortlisted': return 'ats-status-shortlisted';
      case 'Rejected': return 'ats-status-rejected';
      case 'Interview': return 'ats-status-interview';
      case 'Hired': return 'ats-status-hired';
      default: return 'ats-status-pending';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'ats-score-excellent';
    if (score >= 80) return 'ats-score-good';
    if (score >= 70) return 'ats-score-fair';
    if (score >= 60) return 'ats-score-average';
    return 'ats-score-poor';
  };

  if (loading) {
    return (
      <div className="ats-loading-state">
        <div className="ats-loading-spinner"></div>
        <p>Loading applications...</p>
      </div>
    );
  }

  return (
    <div className="ats-dashboard-container">
      {/* Header */}
      <div className="ats-dashboard-header">
        <h1 className="ats-dashboard-title">ATS Admin Dashboard</h1>
        <div className="ats-stats-container">
          <div className="ats-stat-card">
            <span className="ats-stat-number">{applications.length}</span>
            <span className="ats-stat-label">Total Applications</span>
          </div>
          <div className="ats-stat-card">
            <span className="ats-stat-number">{applications.filter(app => app.status === 'Resume Shortlisted').length}</span>
            <span className="ats-stat-label">Shortlisted</span>
          </div>
          <div className="ats-stat-card">
            <span className="ats-stat-number">{applications.filter(app => app.status === 'Rejected').length}</span>
            <span className="ats-stat-label">Rejected</span>
          </div>
        </div>
      </div>

      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="ats-notifications-panel">
          <div className="ats-notifications-header">
            <Bell size={16} />
            <span>Recent Updates</span>
          </div>
          {notifications.map(notification => (
            <div key={notification.id} className="ats-notification-item">
              <span className="ats-notification-message">{notification.message}</span>
              <span className="ats-notification-time">{notification.timestamp}</span>
            </div>
          ))}
        </div>
      )}

      {/* Filters */}
      <div className="ats-filters-container">
        <div className="ats-search-container">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search by name, email, job title, company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="ats-search-input"
          />
        </div>

        <div className="ats-filter-group">
          <select
            value={scoreFilter}
            onChange={(e) => setScoreFilter(e.target.value)}
            className="ats-filter-select"
          >
            {scoreOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Custom score threshold"
            value={customScoreThreshold}
            onChange={(e) => setCustomScoreThreshold(e.target.value)}
            className="ats-score-input"
            min="0"
            max="100"
          />

          <button
            onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
            className="ats-sort-button"
          >
            Score {sortOrder === 'desc' ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </button>

          <button
            onClick={handleBulkShortlist}
            className="ats-bulk-shortlist-btn"
          >
            Select Above Candidates
          </button>
        </div>
      </div>

      {/* Applications Table */}
      <div className="ats-table-container">
        <table className="ats-applications-table">
          <thead>
            <tr>
              <th>Candidate Info</th>
              <th>Job Details</th>
              <th>Recruiter</th>
              <th>Score & Experience</th>
              <th>Status</th>
              <th>Resume</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map(app => (
              <tr key={app.id} className={`ats-table-row ${getStatusColor(app.status)}`}>
                <td className="ats-candidate-info">
                  <div className="ats-candidate-name">{app.name}</div>
                  <div className="ats-candidate-email">{app.email}</div>
                  <div className="ats-candidate-phone">{app.phoneno}</div>
                </td>
                
                <td className="ats-job-details">
                  <div className="ats-job-title">{app.jobTitle}</div>
                  <div className="ats-company-name">{app.companyName}</div>
                  <div className="ats-job-id">{app.customJobId}</div>
                </td>
                
                <td className="ats-recruiter-info">
                  <div className="ats-recruiter-name">{app.recruiterName}</div>
                  <div className="ats-recruiter-id">{app.recruiterId}</div>
                </td>
                
                <td className="ats-score-experience">
                  <div className={`ats-score-badge ${getScoreColor(app.score)}`}>
                    Score: {app.score?.toFixed(1) || 'N/A'}
                  </div>
                  <div className="ats-experience-badge">
                    Exp: {app.atsExperience || 0} years
                  </div>
                </td>
                
                <td className="ats-status-cell">
                  <select
                    value={app.status}
                    onChange={(e) => handleStatusChange(app.id, e.target.value, app)}
                    className={`ats-status-select ${getStatusColor(app.status)}`}
                  >
                    {statusOptions.map(status => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  
                  {app.status === 'Rejected' && (
                    <textarea
                      placeholder="Rejection reason..."
                      value={app.rejectionReason || ''}
                      onChange={(e) => handleRejectionReasonChange(app.id, e.target.value)}
                      className="ats-rejection-reason-input"
                      rows="2"
                    />
                  )}
                </td>
                
                <td className="ats-resume-actions">
                  <button
                    onClick={() => viewResume(app.resume)}
                    className="ats-action-btn ats-view-btn"
                    title="View Resume"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => downloadResume(app.resume, app.name)}
                    className="ats-action-btn ats-download-btn"
                    title="Download Resume"
                  >
                    <Download size={16} />
                  </button>
                </td>
                
                <td className="ats-action-cell">
                  <button
                    onClick={() => addNotification(`Emailed ${app.name} about ${app.jobTitle}`)}
                    className="ats-action-btn ats-email-btn"
                    title="Send Email"
                  >
                    <Mail size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredApplications.length === 0 && (
        <div className="ats-empty-state">
          <Filter size={48} />
          <h3>No applications found</h3>
          <p>Try adjusting your filters or search criteria</p>
        </div>
      )}
    </div>
  );
};

export default ApplicationsDashboard;