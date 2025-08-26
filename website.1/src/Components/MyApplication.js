import React, { useState, useEffect } from 'react';
import { FiMail, FiChevronDown, FiChevronUp, FiCopy } from 'react-icons/fi';
import "../Styles/MyApplication.css";

const MyApplication = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: ''
  });
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showEmailFormat, setShowEmailFormat] = useState(false);
  const [copied, setCopied] = useState(false);

  // Get logged-in user email from localStorage or session
  const getLoggedInUserEmail = () => {
    // Get email from the same storage key used in navbar
    return localStorage.getItem('registeredEmail');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const loggedInEmail = getLoggedInUserEmail();
      
      console.log('Logged in email:', loggedInEmail); // Debug log
      
      if (!loggedInEmail) {
        setError('Unable to detect logged-in user. Please refresh the page or log in again.');
        return;
      }

      setLoading(true);
      try {
        // 1. Fetch user data
        const userResponse = await fetch(`http://localhost:8080/api/applications/user-data/${loggedInEmail}`);
        
        if (!userResponse.ok) {
          throw new Error(`Failed to fetch user data: ${userResponse.status}`);
        }
        
        const userData = await userResponse.json();
        if (userData.success) {
          setUserData({
            name: userData.user.name,
            email: userData.user.email
          });
        } else {
          throw new Error(userData.message || 'Failed to fetch user data');
        }

        // 2. Fetch applications data
        const appsResponse = await fetch(`http://localhost:8080/api/applications/user/${loggedInEmail}`);
        
        if (!appsResponse.ok) {
          throw new Error(`Failed to fetch applications: ${appsResponse.status}`);
        }
        
        const applicationsData = await appsResponse.json();
        if (Array.isArray(applicationsData)) {
          setApplications(applicationsData);
        } else {
          throw new Error('Failed to fetch applications');
        }
        
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message || 'Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

const handleWithdraw = async (applicationId) => {
    console.log('Withdraw button clicked for application:', applicationId); // Debug log
    
    if (!window.confirm('Are you sure you want to withdraw this application?')) {
        console.log('Withdrawal cancelled by user');
        return;
    }

    try {
        console.log('Attempting to withdraw application...');
        const response = await fetch(`http://localhost:8080/api/applications/withdraw/${applicationId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('Response status:', response.status); // Debug log
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error response:', errorData);
            throw new Error(errorData.message || 'Failed to withdraw application');
        }

        console.log('Withdrawal successful, refreshing applications...');
        // Refresh the applications list
        const loggedInEmail = getLoggedInUserEmail();
        const appsResponse = await fetch(`http://localhost:8080/api/applications/user/${loggedInEmail}`);
        const applicationsData = await appsResponse.json();
        setApplications(applicationsData);
        
        alert('Application withdrawn successfully');
    } catch (err) {
        console.error('Error withdrawing application:', err);
        alert(err.message || 'Failed to withdraw application');
    }
};



  const copyEmailTemplate = () => {
    const template = `To: supportjob@momentum-merge.in
Subject: Query Regarding My Job Application

Job Title: [Enter Job Title]
Job ID: [Enter Job ID]
Email ID: [Enter Your Registered Email]

What is your query or concern regarding the job application?
[Write your message here]`;
    
    navigator.clipboard.writeText(template);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Loading your applications...</p>
    </div>
  );

  if (error) return (
    <div className="error-container">
      <div className="error-icon">!</div>
      <p>{error}</p>
      <button className="retry-btn" onClick={() => window.location.reload()}>
        Try Again
      </button>
    </div>
  );

  return (
    <div className="my-application-container">
      {/* User Information Section */}
      <div className="user-info-card">
        <h2>My Applications</h2>
        <div className="user-details">
          <div className="detail-item">
            <span className="detail-label">Name:</span>
            <span className="detail-value">{userData.name || 'Not available'}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Email ID:</span>
            <span className="detail-value">{userData.email || 'Not available'}</span>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="table-card">
        <table className="applications-table">
          <thead>
            <tr>
              <th>Job ID</th>
              <th>Job Title</th>
              <th>Company Name</th>
              <th>Applied Date</th>
              <th>Status</th>
              <th>Action</th> 
            </tr>
          </thead>

          <tbody>
    {applications.length > 0 ? (
        applications.map((app) => (
            <tr key={app.id}>
                <td>{app.customJobId || app.jobId}</td>
                <td>{app.jobTitle}</td>
                <td>{app.companyName}</td>
                <td>{formatDate(app.appliedDate)}</td>
                <td>
                  {app.status}
                    {/* <span className={`my-status-badge status-${(app.status || '').toLowerCase().replace(/\s+/g, '-')}`}>
                        
                    </span> */}
                </td>

                <td>
                <button 
                    className="withdraw-btn"
                    onClick={() => {
                        console.log('Button clicked for app ID:', app.id); // Debug log
                        handleWithdraw(app.id);
                    }}
                >
                    Withdraw
                </button>
            </td>

            </tr>
        ))
    ) : (
        <tr>
            <td colSpan="6" className="no-applications"> {/* Update colspan to 6 */}
                <div className="empty-state">
                    <FiMail size={24} />
                    <p>No applications found</p>
                </div>
            </td>
        </tr>
    )}
</tbody>


        </table>
      </div>

      {/* Support Information */}
      <div className="support-card">
        <p className="support-note">
          Need help with your applications? Contact us at: <strong>supportjob@momentum-merge.in</strong>
        </p>
        
        <button 
          className="toggle-format-btn"
          onClick={() => setShowEmailFormat(!showEmailFormat)}
        >
          {showEmailFormat ? (
            <>
              <FiChevronUp /> Hide Email Format
            </>
          ) : (
            <>
              <FiChevronDown /> Show Email Format
            </>
          )}
        </button>

        {showEmailFormat && (
          <div className="email-template-card">
            <div className="template-header">
              <h4>Sample Email Format</h4>
              <button 
                className="copy-btn"
                onClick={copyEmailTemplate}
                title="Copy to clipboard"
              >
                <FiCopy /> {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="template-content">
              <p><strong>To:</strong> supportjob@momentum-merge.in</p>
              <p><strong>Subject:</strong> Query Regarding My Job Application</p>
              <p><strong>Job Title:</strong> [Enter Job Title]</p>
              <p><strong>Job ID:</strong> [Enter Job ID]</p>
              <p><strong>Email ID:</strong> [Enter Your Registered Email]</p>
              <p><strong>Your Query:</strong> [Write your message here]</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplication;