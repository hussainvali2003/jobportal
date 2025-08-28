
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faArrowLeft,
  faPencilAlt,
  faTrashAlt,
  faTimes,
  faSave,
  faExclamationTriangle,
  faSearch,
  faBriefcase,
  faBuilding,
  faMapMarkerAlt,
  faUserTie,
  faDollarSign,
  faCalendarAlt,
  faChartBar,
  faTools,
  faFileAlt,
  faIdCard,
  faAlignLeft
} from '@fortawesome/free-solid-svg-icons';
import '../Styles/ManageJobs.css';

const ManageJobs = () => {
    
const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [filters, setFilters] = useState({
    status: '',
    title: '',
    company: '',
    location: '',
    experience: '',
    field: '',
    salary: '',
    jobId: ''
  });

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'RECRUITER' && userRole !== 'ADMIN') {
      navigate('/recruiter-login');
      return;
    }
    
    fetchCurrentUser();
    fetchJobs();
  }, [navigate]);

  const API_BASE = process.env.REACT_APP_API_BASE_URL;


  const fetchCurrentUser = async () => {
    try {
      const userRole = localStorage.getItem('userRole');
      
      if (userRole === 'ADMIN') {
        setCurrentUser({
          role: 'ADMIN',
          name: localStorage.getItem('userName') || 'Administrator',
          email: localStorage.getItem('userEmail') || '',
          recruiterId: localStorage.getItem('userId') || 'ADMIN_001',
          phone: '9876543210',
          imageData: '/static/Logoo.png'
        });
      } else {
        try {
          const response = await axios.get(`${API_BASE}/api/recruiters/me`, {
            withCredentials: true
          });
          setCurrentUser({
            role: 'RECRUITER',
            ...response.data
          });
        } catch (error) {
          console.error('Error fetching recruiter info:', error);
          setCurrentUser({
            role: 'RECRUITER',
            name: localStorage.getItem('userName') || 'Recruiter',
            email: localStorage.getItem('userEmail') || '',
            recruiterId: localStorage.getItem('userId') || '',
            phone: localStorage.getItem('userPhone') || '',
            imageData: localStorage.getItem('userImage') || ''
          });
        }
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/api/jobs`, {
        withCredentials: true
      });
      
      const currentUserId = localStorage.getItem('userId');
      const currentUserRole = localStorage.getItem('userRole');
      
      let jobsData = response.data;
      
      // Filter jobs based on user role
      if (currentUserRole === 'RECRUITER') {
        // Show only jobs posted by current recruiter
        jobsData = jobsData.filter(job => job.recruiterId === currentUserId);
      }
      // Admin sees all jobs
      
      // Sort jobs: current user's jobs first for recruiters, all jobs for admin
      if (currentUserRole === 'RECRUITER') {
        jobsData = jobsData.sort((a, b) => {
          const aIsCurrentUser = a.recruiterId === currentUserId;
          const bIsCurrentUser = b.recruiterId === currentUserId;
          
          if (aIsCurrentUser && !bIsCurrentUser) return -1;
          if (!aIsCurrentUser && bIsCurrentUser) return 1;
          
          return new Date(b.postedAt) - new Date(a.postedAt);
        });
      } else {
        jobsData = jobsData.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
      }
      
      setJobs(jobsData);
      setFilteredJobs(jobsData);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setError('Failed to fetch jobs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (!term) {
      setFilteredJobs(jobs);
      return;
    }
    
    const filtered = jobs.filter(job => {
      const searchFields = [
        job.title,
        job.company,
        job.location,
        job.experience,
        job.field,
        job.description,
        job.recruiterName,
        job.jobId
      ].join(' ').toLowerCase();
      
      return searchFields.includes(term.toLowerCase());
    });
    
    setFilteredJobs(filtered);
  };

  const handleFilterChange = (filterName, value) => {
    const newFilters = { ...filters, [filterName]: value };
    setFilters(newFilters);
    
    const filtered = jobs.filter(job => {
      return Object.keys(newFilters).every(key => {
        if (!newFilters[key]) return true;
        
        const jobValue = job[key]?.toString().toLowerCase() || '';
        const filterValue = newFilters[key].toLowerCase();
        
        return jobValue.includes(filterValue);
      });
    });
    
    setFilteredJobs(filtered);
  };

  const clearFilters = () => {
    setFilters({
      status: '',
      title: '',
      company: '',
      location: '',
      experience: '',
      field: '',
      salary: '',
      jobId: ''
    });
    setFilteredJobs(jobs);
    setSearchTerm('');
  };

  const canEditJob = (job) => {
    if (currentUser?.role === 'ADMIN') return true;
    return job.recruiterId === currentUser?.recruiterId;
  };

  const canDeleteJob = (job) => {
    if (currentUser?.role === 'ADMIN') return true;
    return job.recruiterId === currentUser?.recruiterId;
  };

  const handleEdit = (job) => {
    if (!canEditJob(job)) {
      alert('You can only edit your own job postings.');
      return;
    }
    setEditingJob({ ...job });
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`${API_BASE}/api/jobs/${editingJob.id}`, editingJob, {
        withCredentials: true
      });
      
      const updatedJobs = jobs.map(job => 
        job.id === editingJob.id ? editingJob : job
      );
      setJobs(updatedJobs);
      setFilteredJobs(updatedJobs);
      setIsEditing(false);
      setEditingJob(null);
    } catch (error) {
      console.error('Error updating job:', error);
      setError('Failed to update job. Please check your data and try again.');
    }
  };

  const handleDelete = async (jobId) => {
    try {
      await axios.delete(`${API_BASE}/api/jobs/${jobId}`, {
        withCredentials: true
      });
      
      const updatedJobs = jobs.filter(job => job.id !== jobId);
      setJobs(updatedJobs);
      setFilteredJobs(updatedJobs);
      setShowDeleteModal(false);
      setJobToDelete(null);
    } catch (error) {
      console.error('Error deleting job:', error);
      setError('Failed to delete job. Please try again.');
    }
  };

  const confirmDelete = (job) => {
    if (!canDeleteJob(job)) {
      alert('You can only delete your own job postings.');
      return;
    }
    setJobToDelete(job);
    setShowDeleteModal(true);
  };

  if (loading) {
    return (
      <div className="manage-jobs-loading-container">
        <div className="manage-jobs-loading-spinner"></div>
        <p>Loading jobs...</p>
      </div>
    );
  }

  return (
    <div className="manage-jobs-container">
      {/* Header */}
      <div className="manage-jobs-page-header">
        <div className="manage-jobs-header-content">
          <h1>Manage Job Postings</h1>
          <p>View, edit, and manage all job listings</p>
        </div>
        <div className="manage-jobs-header-actions">
          <button 
            className="manage-jobs-primary-button"
            onClick={() => navigate('/post-jobs')}
          >
            <FontAwesomeIcon icon={faPlus} /> Post New Job
          </button>
          <button 
            className="manage-jobs-secondary-button"
            onClick={() => navigate('/recruiter-dashboard')}
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Back to Dashboard
          </button>
        </div>
      </div>

      {error && (
        <div className="manage-jobs-error-banner">
          <FontAwesomeIcon icon={faExclamationTriangle} /> {error}
        </div>
      )}

      {/* Search and Filters */}
      <div className="manage-jobs-search-filters-section">
        <div className="manage-jobs-search-bar">
          <input
            type="text"
            placeholder="Search jobs by title, company, skills, Job ID..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        
        <div className="manage-jobs-filters-section">
          <div className="manage-jobs-filters-header">
            <h3><FontAwesomeIcon icon={faSearch} /> Filters</h3>
            {Object.values(filters).some(filter => filter) && (
              <button className="manage-jobs-text-button" onClick={clearFilters}>
                Clear All
              </button>
            )}
          </div>
          
          <div className="manage-jobs-filters-grid">
            <div className="manage-jobs-filter-group">
              <label>Job ID</label>
              <input
                type="text"
                placeholder="Filter by Job ID..."
                value={filters.jobId}
                onChange={(e) => handleFilterChange('jobId', e.target.value)}
              />
            </div>

            <div className="manage-jobs-filter-group">
              <label>Status</label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="">All Statuses</option>
                <option value="LIVE">Live</option>
                <option value="CLOSED">Closed</option>
              </select>
            </div>
            
            <div className="manage-jobs-filter-group">
              <label> Job Title</label>
              <input
                type="text"
                placeholder="Filter by title..."
                value={filters.title}
                onChange={(e) => handleFilterChange('title', e.target.value)}
              />
            </div>
            
            <div className="manage-jobs-filter-group">
              <label>Company</label>
              <input
                type="text"
                placeholder="Filter by company..."
                value={filters.company}
                onChange={(e) => handleFilterChange('company', e.target.value)}
              />
            </div>
            
            <div className="manage-jobs-filter-group">
              <label>Location</label>
              <input
                type="text"
                placeholder="Filter by location..."
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="manage-jobs-table-container">
        <div className="manage-jobs-table-header">
          <h3>Job Listings</h3>
          <div className="manage-jobs-table-stats">
            Showing {filteredJobs.length} of {jobs.length} jobs
          </div>
        </div>
        
        {filteredJobs.length > 0 ? (
          <div className="manage-jobs-table-responsive">
            <table className="manage-jobs-table">
              <thead>
                <tr>
                  <th><FontAwesomeIcon icon={faIdCard} /> Job ID</th>
                  <th> <FontAwesomeIcon icon={faBriefcase} /> Job Title</th>
                  <th> <FontAwesomeIcon icon={faBuilding} /> Company</th>
                  <th><FontAwesomeIcon icon={faMapMarkerAlt} /> Location</th>
                  <th><FontAwesomeIcon icon={faUserTie} /> Experience</th>
                  <th><FontAwesomeIcon icon={faTools} /> Fields</th>
                  <th><FontAwesomeIcon icon={faDollarSign} /> Salary</th>
                  <th><FontAwesomeIcon icon={faCalendarAlt} /> Posted</th>
                  <th> <FontAwesomeIcon icon={faChartBar} />  Status</th>
                  {/* Admin-only columns */}
                  {currentUser?.role === 'ADMIN' && (
                    <>
                      <th><FontAwesomeIcon icon={faIdCard} />  Recruiter ID</th>
                      <th><FontAwesomeIcon icon={faUserTie} />  Recruiter Name</th>
                    </>
                  )}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.map((job) => (
                  <tr key={job.id} className={job.recruiterId === currentUser?.recruiterId ? 'manage-jobs-current-user-job' : ''}>
                    <td>
                      <span className="manage-jobs-job-id-badge">
                        {job.jobId || 'N/A'}
                      </span>
                    </td>
                    <td>
                      <div className="manage-jobs-job-title-cell">
                        <strong>{job.title}</strong>
                        {job.recruiterId === currentUser?.recruiterId && (
                          <span className="manage-jobs-your-job-badge">Your Job</span>
                        )}
                      </div>
                    </td>
                    <td>{job.company}</td>
                    <td>{job.location}</td>
                    <td>{job.experience}</td>
                   
                    <td>
                      <div className="manage-jobs-skills-cell">
                        {job.field?.split(',').map(skill => (
                          <span key={skill} className="manage-jobs-skill-tag">{skill.trim()}</span>
                        ))}
                      </div>
                    </td>
                    <td>{job.salary} LPA</td>
                    <td>{new Date(job.postedAt).toLocaleDateString()}</td>
                    <td>
                      <span className={`manage-jobs-status-badge ${job.status?.toLowerCase() === 'closed' ? 'closed' : 'live'}`}>
                        {job.status || 'LIVE'}
                      </span>
                    </td>
                    {/* Admin-only columns */}
                    {currentUser?.role === 'ADMIN' && (
                      <>
                        <td>
                          <span className="manage-jobs-recruiter-id-badge">
                            {job.recruiterId || 'N/A'}
                          </span>
                        </td>
                        <td>
                          <span className="manage-jobs-recruiter-name">
                            {job.recruiterName || 'Unknown'}
                          </span>
                        </td>
                      </>
                    )}
                    <td>
                      <div className="manage-jobs-action-buttons">
                        <button 
                          className={`manage-jobs-icon-button edit ${!canEditJob(job) ? 'disabled' : ''}`}
                          onClick={() => handleEdit(job)}
                          title={canEditJob(job) ? "Edit Job" : "You can only edit your own jobs"}
                          disabled={!canEditJob(job)}
                        >
                          <FontAwesomeIcon icon={faPencilAlt} />
                        </button>
                        <button 
                          className={`manage-jobs-icon-button delete ${!canDeleteJob(job) ? 'disabled' : ''}`}
                          onClick={() => confirmDelete(job)}
                          title={canDeleteJob(job) ? "Delete Job" : "You can only delete your own jobs"}
                          disabled={!canDeleteJob(job)}
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="manage-jobs-no-jobs-found">
            <div className="manage-jobs-no-jobs-content">
              <h4>No jobs found matching your criteria</h4>
              <p>Try adjusting your search or filters, or post a new job opening</p>
              <button 
                className="manage-jobs-primary-button"
                onClick={() => navigate('/post-job')}
              >
                <FontAwesomeIcon icon={faPlus} /> Post New Job
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Edit Modal */}
      {isEditing && editingJob && (
        <div className="manage-jobs-modal-overlay" onClick={() => setIsEditing(false)}>
          <div className="manage-jobs-edit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="manage-jobs-modal-header">
              <div className="manage-jobs-modal-title">
                <span className="manage-jobs-modal-icon">
                  <FontAwesomeIcon icon={faPencilAlt} />
                </span>
                <h3>Edit Job Posting</h3>
              </div>
              <button 
                className="manage-jobs-close-btn"
                onClick={() => setIsEditing(false)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            
            <div className="manage-jobs-modal-content">
              <div className="manage-jobs-form-section">
                <h4><FontAwesomeIcon icon={faFileAlt} /> Basic Information</h4>
                
                {editingJob.jobId && (
                  <div className="manage-jobs-form-row">
                    <div className="manage-jobs-form-group">
                      <label><FontAwesomeIcon icon={faIdCard} /> Job ID (Read Only)</label>
                      <input
                        type="text"
                        value={editingJob.jobId}
                        disabled
                        className="readonly-input"
                        style={{ backgroundColor: '#f8f9fa', cursor: 'not-allowed' }}
                      />
                      <small style={{ color: '#6c757d', fontSize: '0.8rem' }}>
                        Job ID cannot be changed once posted
                      </small>
                    </div>
                  </div>
                )}
                
                <div className="manage-jobs-form-row">
                  <div className="manage-jobs-form-group">
                    <label><FontAwesomeIcon icon={faBriefcase} /> Job Title*</label>
                    <input
                      type="text"
                      value={editingJob.title}
                      onChange={(e) => setEditingJob({...editingJob, title: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="manage-jobs-form-group">
                    <label><FontAwesomeIcon icon={faBuilding} /> Company*</label>
                    <input
                      type="text"
                      value={editingJob.company}
                      onChange={(e) => setEditingJob({...editingJob, company: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="manage-jobs-form-row">
                  <div className="manage-jobs-form-group">
                    <label><FontAwesomeIcon icon={faMapMarkerAlt} /> Location*</label>
                    <input
                      type="text"
                      value={editingJob.location}
                      onChange={(e) => setEditingJob({...editingJob, location: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="manage-jobs-form-group">
                    <label><FontAwesomeIcon icon={faUserTie} /> Experience Level*</label>
                    <input
                      type="text"
                      value={editingJob.experience}
                      onChange={(e) => setEditingJob({...editingJob, experience: e.target.value})}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="manage-jobs-form-section">
                <h4><FontAwesomeIcon icon={faDollarSign} /> Compensation & Fields</h4>
                <div className="manage-jobs-form-row">
                  <div className="manage-jobs-form-group">
                    <label><FontAwesomeIcon icon={faTools} /> Fields*</label>
                    <input
                      type="text"
                      value={editingJob.software}
                      onChange={(e) => setEditingJob({...editingJob, software: e.target.value})}
                      placeholder="Separate skills with commas"
                      required
                    />
                  </div>
                  
                  <div className="manage-jobs-form-group">
                    <label><FontAwesomeIcon icon={faDollarSign} /> Salary Range*</label>
                    <input
                      type="text"
                      value={editingJob.salary}
                      onChange={(e) => setEditingJob({...editingJob, salary: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="manage-jobs-form-row">
                  <div className="manage-jobs-form-group">
                    <label><FontAwesomeIcon icon={faChartBar} /> Status*</label>
                    <select
                      value={editingJob.status}
                      onChange={(e) => setEditingJob({...editingJob, status: e.target.value})}
                      required
                    >
                      <option value="LIVE">Live</option>
                      <option value="CLOSED">Closed</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="manage-jobs-form-section">
                <h4><FontAwesomeIcon icon={faAlignLeft} /> Job Description</h4>
                <div className="manage-jobs-form-group full-width">
                  <label>Description*</label>
                  <textarea
                    value={editingJob.description}
                    onChange={(e) => setEditingJob({...editingJob, description: e.target.value})}
                    rows="6"
                    required
                    placeholder="Provide a detailed job description..."
                  />
                </div>
              </div>
            </div>
            
            <div className="manage-jobs-modal-actions">
              <button className="manage-jobs-secondary-button" onClick={() => setIsEditing(false)}>
                <FontAwesomeIcon icon={faTimes} /> Cancel
              </button>
              <button className="manage-jobs-primary-button" onClick={handleSaveEdit}>
                <FontAwesomeIcon icon={faSave} /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && jobToDelete && (
        <div className="manage-jobs-modal-overlay">
          <div className="manage-jobs-delete-modal">
            <div className="manage-jobs-modal-header">
              <div className="manage-jobs-modal-title">
                <span className="manage-jobs-modal-icon">
                  <FontAwesomeIcon icon={faTrashAlt} />
                </span>
                <h3>Confirm Deletion</h3>
              </div>
            </div>
            
            <div className="manage-jobs-modal-content">
              <div className="manage-jobs-warning-message">
                <span className="manage-jobs-warning-icon">
                  <FontAwesomeIcon icon={faExclamationTriangle} />
                </span>
                <p>You are about to delete the following job posting:</p>
              </div>
              
              <div className="manage-jobs-job-to-delete">
                <h4>{jobToDelete.title}</h4>
                <p>{jobToDelete.company} • {jobToDelete.location}</p>
                {jobToDelete.jobId && <p><strong>Job ID:</strong> {jobToDelete.jobId}</p>}
              </div>
              
              <p className="manage-jobs-delete-consequences">
                This action cannot be undone. All applications for this position will also be removed.
              </p>
            </div>
            
            <div className="manage-jobs-modal-actions">
              <button 
                className="manage-jobs-secondary-button" 
                onClick={() => setShowDeleteModal(false)}
              >
                <FontAwesomeIcon icon={faTimes} /> Cancel
              </button>
              <button 
                className="manage-jobs-danger-button" 
                onClick={() => handleDelete(jobToDelete.id)}
              >
                <FontAwesomeIcon icon={faTrashAlt} /> Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageJobs;