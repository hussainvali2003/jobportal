
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers, 
  faPlus, 
  faArrowLeft,
  faUserTie, 
  faIdCard, 
  faEnvelope, 
  faPhone, 
  faCheckCircle, 
  faTimesCircle, 
  faCalendarAlt, 
  faCog, 
  faEdit, 
  faTrashAlt, 
  faTimes, 
  faSave,
  faExclamationTriangle,
  faUserCircle
} from '@fortawesome/free-solid-svg-icons';
import '../Styles/ManageRecruiter.css';

const ManageRecruiters = () => {
  const navigate = useNavigate();
  const [recruiters, setRecruiters] = useState([]);
  const [filteredRecruiters, setFilteredRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingRecruiter, setEditingRecruiter] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [recruiterToDelete, setRecruiterToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'ADMIN') {
      navigate('/recruiter-login');
      return;
    }
    
    fetchRecruiters();
  }, [navigate]);

  const fetchRecruiters = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/recruiters/all', {
        withCredentials: true
      });
      
      setRecruiters(response.data);
      setFilteredRecruiters(response.data);
    } catch (error) {
      console.error('Error fetching recruiters:', error);
      setError('Failed to fetch recruiters. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (!term) {
      setFilteredRecruiters(recruiters);
      return;
    }
    
    const filtered = recruiters.filter(recruiter => {
      const searchFields = [
        recruiter.name,
        recruiter.email,
        recruiter.phone,
        recruiter.recruiterId
      ].join(' ').toLowerCase();
      
      return searchFields.includes(term.toLowerCase());
    });
    
    setFilteredRecruiters(filtered);
  };

  const handleEdit = (recruiter) => {
    setEditingRecruiter({ ...recruiter });
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:8080/api/recruiters/${editingRecruiter.id}`, editingRecruiter, {
        withCredentials: true
      });
      
      const updatedRecruiters = recruiters.map(recruiter => 
        recruiter.id === editingRecruiter.id ? editingRecruiter : recruiter
      );
      setRecruiters(updatedRecruiters);
      setFilteredRecruiters(updatedRecruiters);
      setIsEditing(false);
      setEditingRecruiter(null);
    } catch (error) {
      console.error('Error updating recruiter:', error);
      setError('Failed to update recruiter. Please check your data and try again.');
    }
  };

  const handleDelete = async (recruiterId) => {
    try {
      await axios.delete(`http://localhost:8080/api/recruiters/${recruiterId}`, {
        withCredentials: true
      });
      
      const updatedRecruiters = recruiters.filter(recruiter => recruiter.id !== recruiterId);
      setRecruiters(updatedRecruiters);
      setFilteredRecruiters(updatedRecruiters);
      setShowDeleteModal(false);
      setRecruiterToDelete(null);
    } catch (error) {
      console.error('Error deleting recruiter:', error);
      setError('Failed to delete recruiter. Please try again.');
    }
  };

  const confirmDelete = (recruiter) => {
    setRecruiterToDelete(recruiter);
    setShowDeleteModal(true);
  };

  if (loading) {
    return (
      <div className="manage-recruiters-loading-container">
        <div className="manage-recruiters-loading-spinner"></div>
        <p>Loading recruiters...</p>
      </div>
    );
  }

  return (
    <div className="manage-recruiters-container">
      {/* Header */}
      <div className="manage-recruiters-page-header">
        <div className="manage-recruiters-header-content">
          <h1>
            <FontAwesomeIcon icon={faUsers} className="header-icon" /> 
            Manage Recruiters
          </h1>
          <p>View, edit, and manage all recruiter accounts</p>
        </div>
        <div className="manage-recruiters-header-actions">
          <button 
            className="manage-recruiters-primary-button"
            onClick={() => navigate('/add-recruiter')}
          >
            <FontAwesomeIcon icon={faPlus} /> Add New Recruiter
          </button>
          <button 
            className="manage-recruiters-secondary-button"
            onClick={() => navigate('/recruiter-dashboard')}
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Back to Dashboard
          </button>
        </div>
      </div>

      {error && (
        <div className="manage-recruiters-error-banner">
          <FontAwesomeIcon icon={faExclamationTriangle} /> {error}
        </div>
      )}

      {/* Search */}
      <div className="manage-recruiters-search-section">
        <div className="manage-recruiters-search-bar">
          <input
            type="text"
            placeholder="Search recruiters by name, email, phone, or ID..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Recruiters Table */}
      <div className="manage-recruiters-table-container">
        <div className="manage-recruiters-table-header">
          <h3>
            <FontAwesomeIcon icon={faUserTie} className="table-header-icon" /> 
            Recruiter Accounts
          </h3>
          <div className="manage-recruiters-table-stats">
            Showing {filteredRecruiters.length} of {recruiters.length} recruiters
          </div>
        </div>
        
        {filteredRecruiters.length > 0 ? (
          <div className="manage-recruiters-table-responsive">
            <table className="manage-recruiters-table">
              <thead>
                <tr>
                  <th><FontAwesomeIcon icon={faUserCircle} /> Profile</th>
                  <th><FontAwesomeIcon icon={faIdCard} /> Recruiter ID</th>
                  <th><FontAwesomeIcon icon={faUserTie} /> Name</th>
                  <th><FontAwesomeIcon icon={faEnvelope} /> Email</th>
                  <th><FontAwesomeIcon icon={faPhone} /> Phone</th>
                  <th><FontAwesomeIcon icon={faCheckCircle} /> Email Verified</th>
                  <th><FontAwesomeIcon icon={faCheckCircle} /> Phone Verified</th>
                  <th><FontAwesomeIcon icon={faCalendarAlt} /> Created</th>
                  <th><FontAwesomeIcon icon={faCog} /> Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecruiters.map((recruiter) => (
                  <tr key={recruiter.id}>
                    <td>
                      <div className="manage-recruiters-profile-cell">
                        {recruiter.imageData ? (
                          <img 
                            src={recruiter.imageData} 
                            alt="Profile" 
                            className="manage-recruiters-profile-image"
                          />
                        ) : (
                          <div className="manage-recruiters-default-avatar">
                            {recruiter.name?.charAt(0) || 'R'}
                          </div>
                        )}
                      </div>
                    </td>
                    <td>
                      <span className="manage-recruiters-id-text">
                        {recruiter.recruiterId}
                      </span>
                    </td>
                    <td>
                      <strong className="manage-recruiters-name">
                        {recruiter.name}
                      </strong>
                    </td>
                    <td>{recruiter.email}</td>
                    <td>{recruiter.phone || 'Not provided'}</td>
                    <td>
                      <span className={`manage-recruiters-status-badge ${recruiter.emailVerified ? 'verified' : 'unverified'}`}>
                        {recruiter.emailVerified ? 
                          <><FontAwesomeIcon icon={faCheckCircle} /> Verified</> : 
                          <><FontAwesomeIcon icon={faTimesCircle} /> Unverified</>
                        }
                      </span>
                    </td>
                    <td>
                      <span className={`manage-recruiters-status-badge ${recruiter.phoneVerified ? 'verified' : 'unverified'}`}>
                        {recruiter.phoneVerified ? 
                          <><FontAwesomeIcon icon={faCheckCircle} /> Verified</> : 
                          <><FontAwesomeIcon icon={faTimesCircle} /> Unverified</>
                        }
                      </span>
                    </td>
                    <td>{new Date(recruiter.createdAt).toLocaleDateString()}</td>
                    <td>
                      <div className="manage-recruiters-action-buttons">
                        <button 
                          className="manage-recruiters-icon-button edit"
                          onClick={() => handleEdit(recruiter)}
                          title="Edit Recruiter"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button 
                          className="manage-recruiters-icon-button delete"
                          onClick={() => confirmDelete(recruiter)}
                          title="Delete Recruiter"
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
          <div className="manage-recruiters-no-recruiters-found">
            <div className="manage-recruiters-no-recruiters-content">
              <h4>No recruiters found</h4>
              <p>Try adjusting your search or add a new recruiter</p>
              <button 
                className="manage-recruiters-primary-button"
                onClick={() => navigate('/add-recruiter')}
              >
                <FontAwesomeIcon icon={faPlus} /> Add New Recruiter
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {isEditing && editingRecruiter && (
        <div className="manage-recruiters-modal-overlay" onClick={() => setIsEditing(false)}>
          <div className="manage-recruiters-edit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="manage-recruiters-modal-header">
              <div className="manage-recruiters-modal-title">
                <FontAwesomeIcon icon={faEdit} className="modal-icon" />
                <h3>Edit Recruiter</h3>
              </div>
              <button 
                className="manage-recruiters-close-btn"
                onClick={() => setIsEditing(false)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            
            <div className="manage-recruiters-modal-content">
              <div className="manage-recruiters-form-section">
                <h4><FontAwesomeIcon icon={faUserCircle} /> Personal Information</h4>
                <div className="manage-recruiters-form-row">
                  <div className="manage-recruiters-form-group">
                    <label><FontAwesomeIcon icon={faUserTie} /> Full Name*</label>
                    <input
                      type="text"
                      value={editingRecruiter.name}
                      onChange={(e) => setEditingRecruiter({...editingRecruiter, name: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="manage-recruiters-form-group">
                    <label><FontAwesomeIcon icon={faEnvelope} /> Email Address*</label>
                    <input
                      type="email"
                      value={editingRecruiter.email}
                      onChange={(e) => setEditingRecruiter({...editingRecruiter, email: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="manage-recruiters-form-row">
                  <div className="manage-recruiters-form-group">
                    <label><FontAwesomeIcon icon={faPhone} /> Phone Number</label>
                    <input
                      type="tel"
                      value={editingRecruiter.phone}
                      onChange={(e) => setEditingRecruiter({...editingRecruiter, phone: e.target.value})}
                    />
                  </div>
                  
                  <div className="manage-recruiters-form-group">
                    <label><FontAwesomeIcon icon={faIdCard} /> New Password (Optional)</label>
                    <input
                      type="password"
                      placeholder="Leave blank to keep current password"
                      onChange={(e) => setEditingRecruiter({...editingRecruiter, password: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="manage-recruiters-modal-actions">
              <button className="manage-recruiters-secondary-button" onClick={() => setIsEditing(false)}>
                <FontAwesomeIcon icon={faTimes} /> Cancel
              </button>
              <button className="manage-recruiters-primary-button" onClick={handleSaveEdit}>
                <FontAwesomeIcon icon={faSave} /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && recruiterToDelete && (
        <div className="manage-recruiters-modal-overlay">
          <div className="manage-recruiters-delete-modal">
            <div className="manage-recruiters-modal-header">
              <div className="manage-recruiters-modal-title">
                <FontAwesomeIcon icon={faTrashAlt} className="modal-icon" />
                <h3>Confirm Deletion</h3>
              </div>
            </div>
            
            <div className="manage-recruiters-modal-content">
              <div className="manage-recruiters-warning-message">
                <FontAwesomeIcon icon={faExclamationTriangle} className="warning-icon" />
                <p>You are about to delete the following recruiter account:</p>
              </div>
              
              <div className="manage-recruiters-recruiter-to-delete">
                <h4>{recruiterToDelete.name}</h4>
                <p>{recruiterToDelete.email} • {recruiterToDelete.recruiterId}</p>
              </div>
              
              <p className="manage-recruiters-delete-consequences">
                This action cannot be undone. All job postings by this recruiter will remain but will be orphaned.
              </p>
            </div>
            
            <div className="manage-recruiters-modal-actions">
              <button 
                className="manage-recruiters-secondary-button" 
                onClick={() => setShowDeleteModal(false)}
              >
                <FontAwesomeIcon icon={faTimes} /> Cancel
              </button>
              <button 
                className="manage-recruiters-danger-button" 
                onClick={() => handleDelete(recruiterToDelete.id)}
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

export default ManageRecruiters;