
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faTrashAlt,
  faDownload,
  faSearch,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faUserTie,
  faBriefcase,
  faFileAlt,
  faExclamationTriangle,
  faTimes,
  faUser,
  faKey,
  faShieldAlt,
  faIdCard,
  faUserFriends
} from '@fortawesome/free-solid-svg-icons';
import '../Styles/ManageUsers.css';

const ManageUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [securityKey, setSecurityKey] = useState('');
  const [securityError, setSecurityError] = useState('');

  const [filters, setFilters] = useState({
    name: '',
    email: '',
    location: '',
    experience: ''
  });

  const API_BASE = process.env.REACT_APP_API_BASE_URL;


  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'ADMIN') {
      navigate('/admin-login');
      return;
    }

    fetchUsers();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/api/users/all`, {
        withCredentials: true
      });

      const usersData = response.data;
      setUsers(usersData);
      setFilteredUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to fetch users. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterName, value) => {
    const newFilters = { ...filters, [filterName]: value };
    setFilters(newFilters);

    const filtered = users.filter(user => {
      return Object.keys(newFilters).every(key => {
        if (!newFilters[key]) return true;

        const userValue = user[key]?.toString().toLowerCase() || '';
        const filterValue = newFilters[key].toLowerCase();

        // Special handling for experience filter as number comparison (minimum years)
        if (key === 'experience' && filterValue) {
          const userExp = parseFloat(userValue);
          const filterExp = parseFloat(filterValue);
          if (isNaN(userExp)) return false;
          return userExp >= filterExp;
        }

        return userValue.includes(filterValue);
      });
    });

    setFilteredUsers(filtered);
  };

  const clearFilters = () => {
    setFilters({
      name: '',
      email: '',
      location: '',
      experience: ''
    });
    setFilteredUsers(users);
  };

  const handleDownloadResume = async (userEmail, userName) => {
    try {
      const response = await axios.get(`${API_BASE}/api/resumes/${userEmail}`, {
        withCredentials: true
      });

      if (response.data && response.data.length > 0) {
        const resume = response.data[0];
        const downloadResponse = await axios.get(`${API_BASE}/api/resumes/download/${resume.id}`, {
          responseType: 'blob',
          withCredentials: true
        });

        const url = window.URL.createObjectURL(new Blob([downloadResponse.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${userName}_Resume.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      } else {
        alert('No resume found for this user.');
      }
    } catch (error) {
      console.error('Error downloading resume:', error);
      alert('Failed to download resume. Please try again.');
    }
  };

  const confirmDelete = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
    setSecurityKey('');
    setSecurityError('');
  };

  const handleDelete = async () => {
    if (securityKey !== '@Delete-UserData!') {
      setSecurityError('Invalid security key. You are not authorized to delete this profile.');
      return;
    }

    try {
      await axios.delete(`${API_BASE}/api/users/${userToDelete.id}`, {
        headers: {
          'Security-Key': securityKey
        },
        withCredentials: true
      });

      const updatedUsers = users.filter(user => user.id !== userToDelete.id);
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      setShowDeleteModal(false);
      setUserToDelete(null);
      setSecurityKey('');
      setSecurityError('');
    } catch (error) {
      console.error('Error deleting user:', error);
      setSecurityError('Failed to delete user. Please try again.');
    }
  };

  const getProfilePicture = (user) => {
    if (user.profilePic) {
      return `data:image/jpeg;base64,${user.profilePic}`;
    }
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=667eea&color=ffffff&size=100`;
  };

  if (loading) {
    return (
      <div className="manage-users-loading-container">
        <div className="manage-users-loading-spinner"></div>
        <p>Loading users...</p>
      </div>
    );
  }

  return (
    <div className="manage-users-container">
      {/* Header */}
      <div className="manage-users-page-header">
        <div className="manage-users-header-content">
          <h1><FontAwesomeIcon icon={faUserFriends} /> Manage Users</h1>
          <p>View and manage all user profiles and data</p>
        </div>
        <div className="manage-users-header-actions">
          <button
            className="manage-users-secondary-button"
            onClick={() => navigate('/admin-dashboard')}
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Back to Dashboard
          </button>
        </div>
      </div>

      {error && (
        <div className="manage-users-error-banner">
          <FontAwesomeIcon icon={faExclamationTriangle} /> {error}
        </div>
      )}

      {/* Filters Section */}
      <div className="manage-users-search-filters-section">

        <div className="manage-users-filters-section">
          <div className="manage-users-filters-header">
            <h3><FontAwesomeIcon icon={faSearch} /> Filters</h3>
            {Object.values(filters).some(filter => filter) && (
              <button className="manage-users-text-button" onClick={clearFilters}>
                Clear All
              </button>
            )}
          </div>
          
          <div className="manage-users-filters-grid">
            <div className="manage-users-filter-group">
              <label>Name</label>
              <input
                type="text"
                placeholder="Filter by name..."
                value={filters.name}
                onChange={(e) => handleFilterChange('name', e.target.value)}
              />
            </div>

            <div className="manage-users-filter-group">
              <label>Email</label>
              <input
                type="text"
                placeholder="Filter by email..."
                value={filters.email}
                onChange={(e) => handleFilterChange('email', e.target.value)}
              />
            </div>
            
            <div className="manage-users-filter-group">
              <label>Location</label>
              <input
                type="text"
                placeholder="Filter by location..."
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
              />
            </div>

            <div className="manage-users-filter-group">
              <label>Experience</label>
              <input
                type="number"
                placeholder="Min years..."
                value={filters.experience}
                onChange={(e) => handleFilterChange('experience', e.target.value)}
                min="0"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="manage-users-table-container">
        <div className="manage-users-table-header">
          <h3><FontAwesomeIcon icon={faUserFriends} /> User Profiles</h3>
          <div className="manage-users-table-stats">
            Showing {filteredUsers.length} of {users.length} users
          </div>
        </div>
        
        {filteredUsers.length > 0 ? (
          <div className="manage-users-table-responsive">
            <table className="manage-users-table">
              <thead>
                <tr>
                  {/* Removed User ID column */}
                  {/* <th><FontAwesomeIcon icon={faIdCard} /> User ID</th> */}
                  <th><FontAwesomeIcon icon={faUser} /> Profile</th>
                  <th><FontAwesomeIcon icon={faEnvelope} /> Email</th>
                  <th><FontAwesomeIcon icon={faPhone} /> Phone</th>
                  <th><FontAwesomeIcon icon={faMapMarkerAlt} /> Location</th>
                  <th><FontAwesomeIcon icon={faUserTie} /> Role</th>
                  <th><FontAwesomeIcon icon={faBriefcase} /> Experience</th>
                  <th><FontAwesomeIcon icon={faFileAlt} /> Resume</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    {/* User ID cell removed */}
                    {/* <td>
                      <span className="manage-users-user-id-badge">{user.id}</span>
                    </td> */}
                    
                    <td>
                      <div className="manage-users-profile-cell">
                        <div className="manage-users-profile-pic-small">
                          <img 
                            src={getProfilePicture(user)} 
                            alt={user.name}
                            onError={(e) => {
                              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=667eea&color=ffffff&size=40`;
                            }}
                          />
                        </div>
                        <div className="manage-users-profile-info-small">
                          <strong>{user.name}</strong>
                          {user.emailVerified && (
                            <span className="manage-users-verified-badge-small">
                              <FontAwesomeIcon icon={faShieldAlt} /> Email Verified
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>{user.phoneno || 'Not provided'}</td>
                    <td>{user.location || 'Not specified'}</td>
                    <td>
                      <span className={`manage-users-role-badge ${user.role?.toLowerCase()}`}>
                        {user.role || 'USER'}
                      </span>
                    </td>
                    <td>{user.experience ? `${user.experience} years` : 'Not specified'}</td>
                    <td>
                      <button 
                        className="manage-users-resume-download-btn-small"
                        onClick={() => handleDownloadResume(user.email, user.name)}
                        title="Download Resume"
                      >
                        <FontAwesomeIcon icon={faDownload} /> Download
                      </button>
                    </td>
                    <td>
                      <div className="manage-users-action-buttons">
                        <button 
                          className="manage-users-action-button download"
                          onClick={() => handleDownloadResume(user.email, user.name)}
                          title="Download Resume"
                        >
                          <FontAwesomeIcon icon={faDownload} />
                        </button>
                        <button 
                          className="manage-users-action-button delete"
                          onClick={() => confirmDelete(user)}
                          title="Delete Profile"
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
          <div className="manage-users-no-users-found">
            <div className="manage-users-no-users-content">
              <FontAwesomeIcon icon={faUserFriends} size="3x" />
              <h4>No users found matching your criteria</h4>
              <p>Try adjusting your filters</p>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && userToDelete && (
        <div className="manage-users-modal-overlay">
          <div className="manage-users-delete-modal">
            <div className="manage-users-modal-header">
              <div className="manage-users-modal-title">
                <span className="manage-users-modal-icon">
                  <FontAwesomeIcon icon={faTrashAlt} />
                </span>
                <h3>Confirm Profile Deletion</h3>
              </div>
              <button 
                className="manage-users-close-btn"
                onClick={() => setShowDeleteModal(false)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            
            <div className="manage-users-modal-content">
              <div className="manage-users-warning-message">
                <span className="manage-users-warning-icon">
                  <FontAwesomeIcon icon={faExclamationTriangle} />
                </span>
                <p>You are about to permanently delete the following user profile:</p>
              </div>
              
              <div className="manage-users-user-to-delete">
                <div className="manage-users-user-preview">
                  <img src={getProfilePicture(userToDelete)} alt={userToDelete.name} />
                  <div className="manage-users-user-details">
                    <h4>{userToDelete.name}</h4>
                    <p>{userToDelete.email}</p>
                    <p><strong>Role:</strong> {userToDelete.role}</p>
                  </div>
                </div>
              </div>
              
              <div className="manage-users-security-section">
                <p className="manage-users-security-warning">
                  <FontAwesomeIcon icon={faKey} /> 
                  This action requires a security key to proceed:
                </p>
                <input
                  type="password"
                  placeholder="Enter security key..."
                  value={securityKey}
                  onChange={(e) => {
                    setSecurityKey(e.target.value);
                    setSecurityError('');
                  }}
                  className={securityError ? 'error' : ''}
                />
                {securityError && (
                  <div className="manage-users-security-error">
                    <FontAwesomeIcon icon={faExclamationTriangle} />
                    {securityError}
                  </div>
                )}
              </div>
              
              <p className="manage-users-delete-consequences">
                This action cannot be undone. All user data, applications, and resumes will be permanently removed.
              </p>
            </div>
            
            <div className="manage-users-modal-actions">
              <button 
                className="manage-users-secondary-button" 
                onClick={() => setShowDeleteModal(false)}
              >
                <FontAwesomeIcon icon={faTimes} /> Cancel
              </button>
              <button 
                className="manage-users-danger-button" 
                onClick={handleDelete}
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

export default ManageUsers;
