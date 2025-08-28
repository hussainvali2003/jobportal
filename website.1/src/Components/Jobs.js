
import React, { useState, useEffect, useRef } from "react";
import { useDebounce } from 'use-debounce';
import { Link } from 'react-router-dom';
import {
  FaSearch,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaUserTie,
  FaTimes,
  FaClock,
  FaBullhorn,
  FaUser,
  FaExclamationTriangle,
  FaFilter,
  FaIdCard,
  FaDesktop,
  FaFileAlt,
  FaUsers,
  FaBriefcase,
  FaEye,
  FaChevronDown,
  FaChevronRight,
  FaPhone,
  FaEnvelope,
  FaUserCircle,
  FaCloudUploadAlt,
  FaSpinner,
  FaChevronLeft,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";
import { MdVerified } from 'react-icons/md'; 
import { RxCross2 } from "react-icons/rx";
import { useNavigate, useLocation } from "react-router-dom";
import "../Styles/Jobs.css";

const Jobs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [experience, setExperience] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [status, setStatus] = useState("");
  const [fieldFilter, setFieldFilter] = useState("");
  const [jobIdFilter, setJobIdFilter] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [jobDescriptionOpen, setJobDescriptionOpen] = useState(null);
  const [expandedSectors, setExpandedSectors] = useState({
    "IT Sector": false,
    "Non-IT Sector": false
  });
  const [displayedSearchTerm, setDisplayedSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const abortControllerRef = useRef(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [pageSize, setPageSize] = useState(6);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);

  // Application modal states
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userResumes, setUserResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState({});

  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("userRole");

  const recommendedJobs = {
    "IT Sector": [
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
      "Java Developer",
      "Python Developer",
      "Node.js Developer",
      "React Developer",
      "Angular Developer",
      ".NET Developer",
      "Software Tester",
      "UI/UX Designer",
      "Database Administrator (MySQL / Oracle / MongoDB)",
      "DevOps Engineer",
      "Cloud Engineer (AWS / Azure / GCP)",
      "Cybersecurity",
      "Data Scientist",
      "Data Analyst",
      "Machine Learning Engineer",
      "Android Developer",
      "iOS Developer",
      "Blockchain Developer"
    ],
    "Non-IT Sector": [
      "BPO Executive",
      "Customer Support Associate",
      "Sales Executive",
      "Marketing Executive",
      "Field Sales Representative",
      "Delivery Executive",
      "Driver (Car / Bike / Truck)",
      "Accountant",
      "Data Entry Operator",
      "Receptionist",
      "Office Assistant",
      "HR Executive",
      "Recruiter",
      "Admin Executive",
      "Warehouse Staff",
      "Electrician",
      "Plumber",
      "Security Guard",
      "Telecaller",
      "Store Manager"
    ]
  };

  const API_BASE = process.env.REACT_APP_API_BASE_URL;


  const fetchJobs = async (page = 0, size = pageSize) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/jobs/filter?page=${page}&size=${size}`);
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      const data = await response.json();
      
      // Handle paginated response
      setJobs(data.jobs || []);
      setFilteredJobs(data.jobs || []);
      setCurrentPage(data.currentPage || 0);
      setTotalPages(data.totalPages || 0);
      setTotalItems(data.totalItems || 0);
      setHasNext(data.hasNext || false);
      setHasPrevious(data.hasPrevious || false);
      setError('');
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError(err.message || 'An error occurred while fetching jobs.');
      // Set empty state for error
      setJobs([]);
      setFilteredJobs([]);
      setCurrentPage(0);
      setTotalPages(0);
      setTotalItems(0);
      setHasNext(false);
      setHasPrevious(false);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFilteredJobs = async (page = 0, size = pageSize) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    abortControllerRef.current = new AbortController();
    
    setIsSearching(true);
    try {
      const params = new URLSearchParams();
      if (debouncedSearchTerm) params.append('searchTerm', debouncedSearchTerm);
      if (experience) params.append('experience', experience);
      if (locationFilter) params.append('location', locationFilter);
      if (status) params.append('status', status);
      if (fieldFilter) params.append('field', fieldFilter);
      if (jobIdFilter) params.append('jobId', jobIdFilter);
      params.append('page', page.toString());
      params.append('size', size.toString());

      const response = await fetch(`${API_BASE}/api/jobs/filter?${params.toString()}`, {
        signal: abortControllerRef.current.signal
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch filtered jobs');
      }
      
      const data = await response.json();
      setDisplayedSearchTerm(debouncedSearchTerm);
      
      // Handle paginated response
      setFilteredJobs(data.jobs || []);
      setCurrentPage(data.currentPage || 0);
      setTotalPages(data.totalPages || 0);
      setTotalItems(data.totalItems || 0);
      setHasNext(data.hasNext || false);
      setHasPrevious(data.hasPrevious || false);
      setError('');
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Error fetching filtered jobs:', err);
        setError(err.message || 'An error occurred while filtering jobs.');
        // Set empty state for error
        setFilteredJobs([]);
        setCurrentPage(0);
        setTotalPages(0);
        setTotalItems(0);
        setHasNext(false);
        setHasPrevious(false);
      }
    } finally {
      setIsSearching(false);
      abortControllerRef.current = null;
    }
  };

  const checkApplicationStatus = async (userEmail) => {
    try {
      // Get all jobs first to check application status
      const allJobsResponse = await fetch(`${API_BASE}/api/jobs`);
      const allJobs = await allJobsResponse.json();
      
      const statusPromises = allJobs.map(async (job) => {
        const response = await fetch(`${API_BASE}/api/applications/check/${userEmail}/${job.id}`);
        const data = await response.json();
        return { jobId: job.id, hasApplied: data.hasApplied };
      });
      
      const results = await Promise.all(statusPromises);
      const statusMap = {};
      results.forEach(result => {
        statusMap[result.jobId] = result.hasApplied;
      });
      
      setApplicationStatus(statusMap);
    } catch (err) {
      console.error('Error checking application status:', err);
    }
  };

  // Pagination handlers
  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Reset filters when changing page without search terms
      if (!debouncedSearchTerm && !experience && !locationFilter && !status && !fieldFilter && !jobIdFilter) {
        fetchJobs(newPage, pageSize);
      } else {
        fetchFilteredJobs(newPage, pageSize);
      }
    }
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(0); // Reset to first page
    
    if (!debouncedSearchTerm && !experience && !locationFilter && !status && !fieldFilter && !jobIdFilter) {
      fetchJobs(0, newSize);
    } else {
      fetchFilteredJobs(0, newSize);
    }
  };

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 0; i < totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const halfVisible = Math.floor(maxVisiblePages / 2);
      let startPage = Math.max(0, currentPage - halfVisible);
      let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);
      
      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(0, endPage - maxVisiblePages + 1);
      }
      
      if (startPage > 0) {
        pageNumbers.push(0);
        if (startPage > 1) pageNumbers.push('...');
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      if (endPage < totalPages - 1) {
        if (endPage < totalPages - 2) pageNumbers.push('...');
        pageNumbers.push(totalPages - 1);
      }
    }
    
    return pageNumbers;
  };

  useEffect(() => {
    // Allow all users to view jobs, no login check needed
    fetchJobs(0, pageSize);
    
    // Only check application status if user is logged in
    if (isLoggedIn) {
      const userEmail = localStorage.getItem("registeredEmail") || localStorage.getItem("userEmail");
      if (userEmail) {
        checkApplicationStatus(userEmail);
      }
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [isLoggedIn, pageSize]);

  useEffect(() => {
    if (location.state?.refreshJobs) {
      fetchJobs(0, pageSize);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate, location.pathname, pageSize]);

  useEffect(() => {
    const controller = new AbortController();
    abortControllerRef.current = controller;

    const fetchData = async () => {
      setIsSearching(true);
      try {
        const params = new URLSearchParams();
        if (debouncedSearchTerm) params.append('searchTerm', debouncedSearchTerm);
        if (experience) params.append('experience', experience);
        if (locationFilter) params.append('location', locationFilter);
        if (status) params.append('status', status);
        if (fieldFilter) params.append('field', fieldFilter);
        if (jobIdFilter) params.append('jobId', jobIdFilter);
        params.append('page', '0'); // Reset to first page on new search
        params.append('size', pageSize.toString());

        const response = await fetch(`${API_BASE}/api/jobs/filter?${params.toString()}`, {
          signal: controller.signal
        });
        
        if (!response.ok) throw new Error('Failed to fetch filtered jobs');
        
        const data = await response.json();
        setDisplayedSearchTerm(debouncedSearchTerm);
        
        // Handle paginated response
        setFilteredJobs(data.jobs || []);
        setCurrentPage(data.currentPage || 0);
        setTotalPages(data.totalPages || 0);
        setTotalItems(data.totalItems || 0);
        setHasNext(data.hasNext || false);
        setHasPrevious(data.hasPrevious || false);
        setError('');
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error fetching filtered jobs:', err);
          setError(err.message || 'An error occurred while filtering jobs.');
          // Set empty state for error
          setFilteredJobs([]);
          setCurrentPage(0);
          setTotalPages(0);
          setTotalItems(0);
          setHasNext(false);
          setHasPrevious(false);
        }
      } finally {
        setIsSearching(false);
      }
    };

    if (debouncedSearchTerm || experience || locationFilter || status || fieldFilter || jobIdFilter) {
      setCurrentPage(0); // Reset to first page
      fetchData();
    } else {
      setCurrentPage(0); // Reset to first page
      fetchJobs(0, pageSize);
    }

    return () => {
      controller.abort();
    };
  }, [debouncedSearchTerm, experience, locationFilter, status, fieldFilter, jobIdFilter, pageSize]);

  const handleRecommendedJobClick = (jobTitle) => {
    setSearchTerm(jobTitle);
    setCurrentPage(0); // Reset to first page
  };

  const toggleSector = (sector) => {
    setExpandedSectors(prev => ({
      ...prev,
      [sector]: !prev[sector]
    }));
  };

  const openJobDescription = (jobId) => {
    setJobDescriptionOpen(jobId);
  };

  const closeJobDescription = () => {
    setJobDescriptionOpen(null);
  };

  const clearLocationSearch = () => {
    setLocationFilter("");
    setCurrentPage(0);
  };

  const clearJobIdSearch = () => {
    setJobIdFilter("");
    setCurrentPage(0);
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setExperience("");
    setLocationFilter("");
    setStatus("");
    setFieldFilter("");
    setJobIdFilter("");
    setCurrentPage(0);
  };

  const handleApplyNow = async (job) => {
    if (!isLoggedIn) {
      localStorage.setItem("redirectAfterLogin", "/jobs");
      navigate("/login");
      return;
    }

    const userEmail = localStorage.getItem("registeredEmail") || localStorage.getItem("userEmail");
    if (!userEmail) {
      console.error("No user email found in localStorage");
      localStorage.setItem("redirectAfterLogin", "/jobs");
      navigate("/login");
      return;
    }

    console.log("Applying for job:", job.id, "with email:", userEmail);
    setSelectedJob(job);
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${API_BASE}/api/applications/user-data/${userEmail}`);
      const data = await response.json();
      
      console.log("User data response:", data);
      
      if (data.success) {
        setUserData(data.user);
        setUserResumes(data.resumes);
        if (data.resumes.length > 0) {
          setSelectedResume(data.resumes[0].resume);
        }
        setApplyModalOpen(true);
      } else {
        console.error("Error fetching user data:", data.message);
        alert("Error fetching user data: " + data.message);
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
      alert("Error fetching user data. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitApplication = async () => {
    if (!selectedResume) {
      alert("Please select a resume");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${API_BASE}/api/applications/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userData.email,
          jobId: selectedJob.id,
          resume: selectedResume,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        alert("Application submitted successfully!");
        setApplyModalOpen(false);
        setApplicationStatus(prev => ({
          ...prev,
          [selectedJob.id]: true
        }));
      } else {
        alert("Error: " + data.message);
      }
    } catch (err) {
      console.error('Error submitting application:', err);
      alert("Error submitting application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeApplyModal = () => {
    setApplyModalOpen(false);
    setSelectedJob(null);
    setUserData(null);
    setUserResumes([]);
    setSelectedResume('');
  };

  const getResumeDisplayName = (resumeFileName) => {
    return resumeFileName || "Resume";
  };

  const handleResumeView = (resumeFileName) => {
    const resumeUrl = `${API_BASE}/api/resumes/download/${resumeFileName}`;
    window.open(resumeUrl, '_blank');
  };

  if (isLoading) {
    return (
      <div className="jobs-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading amazing job opportunities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="jobs-page">
      <div className="jobs-header">
        <h1>Find Your Dream Job</h1>
        <p className="subtitle">Discover thousands of job opportunities across industries</p>
              {!isLoggedIn && (
          <div className="login-notice">
            <p>
             
               You can browse all jobs!{' '}
              <Link to="/login" className="login-redirect-link">
                <strong>Login</strong>
              </Link>{' '}
              to apply for positions.
            </p>
          </div>
        )}

        {error && (
          <div className="error-banner">
            <FaExclamationTriangle className="error-icon" />
            <span>{error}</span>
          </div>
        )}
      </div>

      <div className="jobs-container">
        <div className="recommended-jobs-sidebar">
          <h3 className="recommended-title">Recommended Jobs</h3>
          
          {Object.entries(recommendedJobs).map(([sector, jobs]) => (
            <div key={sector} className="recommended-sector">
              <div 
                className="sector-header" 
                onClick={() => toggleSector(sector)}
              >
                {sector === "IT Sector" ? (
                  <FaDesktop className="sector-icon" />
                ) : (
                  <FaFileAlt className="sector-icon" />
                )}
                <h4>{sector}</h4>
                {expandedSectors[sector] ? (
                  <FaChevronDown className="chevron-icon" />
                ) : (
                  <FaChevronRight className="chevron-icon" />
                )}
              </div>
              {expandedSectors[sector] && (
                <ul className="recommended-jobs-list">
                  {jobs.map((job, index) => (
                    <li 
                      key={index} 
                      className="recommended-job-item"
                      onClick={() => handleRecommendedJobClick(job)}
                    >
                      <span className="job-title">{job}</span>
                      <span className="job-arrow">→</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="jobs-main-content">
          <div className="search-container">
            <div className="search-filters">
              <div className="search-input-wrapper">
                <div className="search-input">
                  <FaSearch className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search by job title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {isSearching && (
                    <div className="search-loading">
                      <FaSpinner className="spinner" />
                    </div>
                  )}
                </div>
              </div>

              <div className="search-input-wrapper">
                <div className="search-input">
                  <FaIdCard className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search by Job ID..."
                    value={jobIdFilter}
                    onChange={(e) => setJobIdFilter(e.target.value)}
                  />
                  {jobIdFilter && (
                    <button
                      className="clear-search-btn"
                      onClick={clearJobIdSearch}
                      aria-label="Clear job ID search"
                    >
                      <FaTimes className="clear-icon" />
                    </button>
                  )}
                </div>
              </div>

          <div className="search-input-wrapper">
  <div className="search-input">
    <FaClock className="search-icon" />
    <select
      value={experience}
      onChange={(e) => setExperience(e.target.value)}
    >
      <option value="" disabled hidden>
        Experience
      </option>
      <option value="0-1">Fresher</option>
      <option value="1-2">1-2 years</option>
      <option value="3-5">3-5 years</option>
      <option value="5-50">5+ years</option>
    </select>
  </div>
</div>

<div className="search-input-wrapper">
  <div className="search-input">
    <FaSearch className="search-icon" />
    <select
      value={status}
      onChange={(e) => setStatus(e.target.value)}
    >
      <option value="" disabled hidden>
        Status
      </option>
      <option value="live">LIVE</option>
      <option value="closed">CLOSED</option>
    </select>
  </div>
</div>

<div className="search-input-wrapper">
  <div className="search-input">
    <FaFilter className="search-icon" />
    <select
      value={fieldFilter}
      onChange={(e) => setFieldFilter(e.target.value)}
    >
      <option value="" disabled hidden>
        Field
      </option>
      <option value="IT">IT</option>
      <option value="Non IT">Non IT</option>
    </select>
  </div>
</div>


              <div className="search-input-wrapper">
                <div className="search-input">
                  <FaMapMarkerAlt className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search by location..."
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                  />
                  {locationFilter && (
                    <button
                      className="clear-search-btn"
                      onClick={clearLocationSearch}
                      aria-label="Clear location search"
                    >
                      <FaTimes className="clear-icon" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {(searchTerm || experience || locationFilter || status || fieldFilter || jobIdFilter) && (
              <div className="clear-all-container">
                <button className="clear-all-btn" onClick={clearAllFilters}>
                  Clear All Filters
                </button>
              </div>
            )}
          </div>

          {/* Pagination Controls - Top */}
          {totalItems > 0 && (
            <div className="pagination-container">
              <div className="pagination-info">
                <span>
                  Showing {currentPage * pageSize + 1} to {Math.min((currentPage + 1) * pageSize, totalItems)} of {totalItems} jobs
                </span>
                <select 
                  className="page-size-selector"
                  value={pageSize} 
                  onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                >
                  <option value={3}>3 per page</option>
                  <option value={6}>6 per page</option>
                  <option value={9}>9 per page</option>
                  <option value={12}>12 per page</option>
                  <option value={24}>24 per page</option>
                </select>
              </div>
              
              <div className="pagination-controls">
                <button 
                  className="pagination-btn" 
                  onClick={() => handlePageChange(0)}
                  disabled={currentPage === 0}
                  title="First page"
                >
                  <FaAngleDoubleLeft />
                </button>
                
                <button 
                  className="pagination-btn" 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={!hasPrevious}
                  title="Previous page"
                >
                  <FaChevronLeft />
                </button>
                
                <div className="page-numbers">
                  {generatePageNumbers().map((pageNum, index) => (
                    <span key={index}>
                      {pageNum === '...' ? (
                        <span className="pagination-ellipsis">...</span>
                      ) : (
                        <button
                          className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
                          onClick={() => handlePageChange(pageNum)}
                        >
                          {pageNum + 1}
                        </button>
                      )}
                    </span>
                  ))}
                </div>
                
                <button 
                  className="pagination-btn" 
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={!hasNext}
                  title="Next page"
                >
                  <FaChevronRight />
                </button>
                
                <button 
                  className="pagination-btn" 
                  onClick={() => handlePageChange(totalPages - 1)}
                  disabled={currentPage === totalPages - 1}
                  title="Last page"
                >
                  <FaAngleDoubleRight />
                </button>
              </div>
            </div>
          )}

          <div className="jobs-grid">
            {isSearching ? (
              <div className="no-jobs">
                <div className="no-jobs-icon">
                  <FaSpinner className="spinner" />
                </div>
                <h3>Searching jobs...</h3>
                <p>Finding matches for "{searchTerm}"</p>
              </div>
            ) : filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div key={job.id} className="job-card">
                  <div className="job-card-header">
                    <div className="job-status">
                      <span className={`status-badge ${job.status?.toLowerCase() === 'closed' ? 'closed' : 'live'}`}>
                        {job.status || "Live"}
                      </span>
                    </div>
                    <div className="job-type">
                      <span className="job-type-badge">
                        {job.jobType || "Full Time"}
                      </span>
                    </div>
                  </div>

                  <div className="job-company">
                    <div className="company--logo">
                      <FaBullhorn className="company--icon" />
                    </div>
                    <div className="company--info">
                      <div className="company--name-container">
                        <h3 className="company--name">{job.company}</h3>
                        <MdVerified className="verified-badge" title="Verified Company" />
                      </div>
                      <p className="company--location">
                        <FaMapMarkerAlt className="location-icon" />
                        {job.location}
                      </p>
                    </div>
                  </div>

                  <h2 className="job-title">{job.title}</h2>

                  <div className="job-meta">
                    <div className="meta-item">
                      <FaUserTie className="meta-icon" />
                      <span>{job.experience}</span>
                    </div>
                    <div className="meta-item">
                      <FaRupeeSign className="meta-icon" />
                      <span>{job.salary} LPA</span>
                    </div>
                    <div className="meta-item">
                      <FaUsers className="meta-icon" />
                      <span>Openings: {job.openings || 1}</span>
                    </div>
                    {job.noticePeriod && (
                      <div className="meta-item">
                        <FaClock className="meta-icon" />
                        <span>Notice Period: {job.noticePeriod}</span>
                      </div>
                    )}
                  </div>

                  {job.field && (
                    <div className="job-skills">
                      <div className="skills-container">
                        {job.field.split(',').slice(0, 3).map((skill, index) => (
                          <span key={index} className="skill-tag">
                            {skill.trim()}
                          </span>
                        ))}
                        {job.field.split(',').length > 3 && (
                          <span className="skill-tag more">
                            +{job.field.split(',').length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="job-description-preview">
                    <p className="description-text">
                      {job.description?.substring(0, 120)}
                      {job.description?.length > 120 ? '...' : ''}
                    </p>
                  </div>

                  <div className="job-card-footer">
                    <button
                      className="view-details-btn"
                      onClick={() => openJobDescription(job.id)}
                    >
                      <FaEye className="btn-icon" />
                      View Details
                    </button>
                    <button
                      className={`apply-btn ${
                        job.status?.toLowerCase() === 'closed' ? 'closed' : 
                        isLoggedIn && applicationStatus[job.id] ? 'applied' : ''
                      }`}
                      onClick={() => {
                        if (job.status?.toLowerCase() !== 'closed' && !(isLoggedIn && applicationStatus[job.id])) {
                          handleApplyNow(job);
                        }
                      }}
                      disabled={job.status?.toLowerCase() === 'closed' || (isLoggedIn && applicationStatus[job.id])}
                    >
                      {job.status?.toLowerCase() === 'closed' ? 'Closed' : 
                       isLoggedIn && applicationStatus[job.id] ? 'Applied' : 'Apply Now'}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-jobs">
                <div className="no-jobs-icon">
                  <FaSearch />
                </div>
                <h3>No jobs found {displayedSearchTerm && `for "${displayedSearchTerm}"`}</h3>
                <p>Try adjusting your search filters or check back later for new opportunities</p>
                <button className="refresh-btn" onClick={() => fetchJobs(0, pageSize)}>
                  Refresh Jobs
                </button>
              </div>
            )}
          </div>

          {/* Pagination Controls - Bottom */}
          {totalItems > 0 && (
            <div className="pagination-container">
              <div className="pagination-info">
                <span>
                  Page {currentPage + 1} of {totalPages} ({totalItems} total jobs)
                </span>
              </div>
              
              <div className="pagination-controls">
                <button 
                  className="pagination-btn" 
                  onClick={() => handlePageChange(0)}
                  disabled={currentPage === 0}
                  title="First page"
                >
                  <FaAngleDoubleLeft />
                </button>
                
                <button 
                  className="pagination-btn" 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={!hasPrevious}
                  title="Previous page"
                >
                  <FaChevronLeft />
                </button>
                
                <div className="page-numbers">
                  {generatePageNumbers().map((pageNum, index) => (
                    <span key={index}>
                      {pageNum === '...' ? (
                        <span className="pagination-ellipsis">...</span>
                      ) : (
                        <button
                          className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
                          onClick={() => handlePageChange(pageNum)}
                        >
                          {pageNum + 1}
                        </button>
                      )}
                    </span>
                  ))}
                </div>
                
                <button 
                  className="pagination-btn" 
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={!hasNext}
                  title="Next page"
                >
                  <FaChevronRight />
                </button>
                
                <button 
                  className="pagination-btn" 
                  onClick={() => handlePageChange(totalPages - 1)}
                  disabled={currentPage === totalPages - 1}
                  title="Last page"
                >
                  <FaAngleDoubleRight />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {jobDescriptionOpen && (
        <div className="modal-overlay">
          <div className="job-description-modal">
            <button className="close-modal" onClick={closeJobDescription}>
              <RxCross2 />
            </button>

            <div className="modal-header">
              <div className="modal-status">
                <span className={`status-badge ${filteredJobs.find(j => j.id === jobDescriptionOpen)?.status?.toLowerCase() === 'closed'
                    ? 'closed'
                    : 'live'
                  }`}>
                  {filteredJobs.find(j => j.id === jobDescriptionOpen)?.status || "Live"}
                </span>
              </div>
              <h3>{filteredJobs.find(j => j.id === jobDescriptionOpen)?.title}</h3>
              <div className="modal-company-container">
                <p className="modal-company">
                  {filteredJobs.find(j => j.id === jobDescriptionOpen)?.company}
                </p>
                <MdVerified className="verified-badge" title="Verified Company" />
              </div>
            </div>

            <div className="modal-details">
              <p className="detail-item">
                <FaMapMarkerAlt className="detail-icon" />
                <span>{filteredJobs.find(j => j.id === jobDescriptionOpen)?.location}</span>
              </p>
              <p className="detail-item">
                <FaUserTie className="detail-icon" />
                <span>Experience: {filteredJobs.find(j => j.id === jobDescriptionOpen)?.experience}</span>
              </p>
              <p className="detail-item">
                <FaRupeeSign className="detail-icon" />
                <span>Salary: {filteredJobs.find(j => j.id === jobDescriptionOpen)?.salary}</span>
              </p>
              <p className="detail-item">
                <FaUsers className="detail-icon" />
                <span>Openings: {filteredJobs.find(j => j.id === jobDescriptionOpen)?.openings || 1}</span>
              </p>
              <p className="detail-item">
                <FaBriefcase className="detail-icon" />
                <span>Type: {filteredJobs.find(j => j.id === jobDescriptionOpen)?.jobType || "Full Time"}</span>
              </p>
              {filteredJobs.find(j => j.id === jobDescriptionOpen)?.noticePeriod && (
                <p className="detail-item">
                  <FaClock className="detail-icon" />
                  <span>Notice Period: {filteredJobs.find(j => j.id === jobDescriptionOpen)?.noticePeriod}</span>
                </p>
              )}
            </div>

            {filteredJobs.find(j => j.id === jobDescriptionOpen)?.jobId && (
              <div className="modal-job-id">
                <h4>Job ID</h4>
                <div className="job-id-details">
                  <p className="detail-item">
                    <FaIdCard className="detail-icon" />
                    <span className="job-id-text">
                      {filteredJobs.find(j => j.id === jobDescriptionOpen)?.jobId}
                    </span>
                  </p>
                </div>
              </div>
            )}

            <div className="modal-description">
              <h4>Job Description</h4>
              <p className="description-text">
                {filteredJobs.find(j => j.id === jobDescriptionOpen)?.description || "No description available"}
              </p>
            </div>

            {filteredJobs.find(j => j.id === jobDescriptionOpen)?.field && (
              <div className="modal-skills">
                <h4>Field</h4>
                <div className="skills-container">
                  {filteredJobs.find(j => j.id === jobDescriptionOpen)?.field.split(',').map((skill, index) => (
                    <span key={index} className="skill-tag">
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {filteredJobs.find(j => j.id === jobDescriptionOpen)?.recruiterId && (
              <div className="modal-recruiter">
                <h4>Recruiter Information</h4>
                <div className="recruiter-details">
                  <p className="detail-item">
                    <FaUser className="detail-icon" />
                    <span>Recruiter ID: {filteredJobs.find(j => j.id === jobDescriptionOpen)?.recruiterId}</span>
                  </p>
                  {filteredJobs.find(j => j.id === jobDescriptionOpen)?.recruiterName && (
                    <p className="detail-item">
                      <FaUser className="detail-icon" />
                      <span>Recruiter Name: {filteredJobs.find(j => j.id === jobDescriptionOpen)?.recruiterName}</span>
                    </p>
                  )}
                </div>
              </div>
            )}

            <button
              className={`apply-btn modal-apply ${
                filteredJobs.find(j => j.id === jobDescriptionOpen)?.status?.toLowerCase() === 'closed' ? 'closed' : 
                isLoggedIn && applicationStatus[jobDescriptionOpen] ? 'applied' : ''
              }`}
              onClick={() => {
                const job = filteredJobs.find(j => j.id === jobDescriptionOpen);
                if (job?.status?.toLowerCase() !== 'closed' && !(isLoggedIn && applicationStatus[jobDescriptionOpen])) {
                  handleApplyNow(job);
                }
              }}
              disabled={filteredJobs.find(j => j.id === jobDescriptionOpen)?.status?.toLowerCase() === 'closed' || (isLoggedIn && applicationStatus[jobDescriptionOpen])}
            >
              {filteredJobs.find(j => j.id === jobDescriptionOpen)?.status?.toLowerCase() === 'closed'
                ? 'Recruitment Closed'
                : isLoggedIn && applicationStatus[jobDescriptionOpen] ? 'Already Applied' : 'Apply Now'}
            </button>
          </div>
        </div>
      )}

      {applyModalOpen && (
        <div className="modal-overlay">
          <div className="apply-modal">
            <button className="close-modal" onClick={closeApplyModal}>
              <RxCross2 />
            </button>

            <div className="apply-modal-header">
              <h3>Apply for Job</h3>
              <div className="job-info-header">
                <h4>{selectedJob?.title}</h4>
                <p>{selectedJob?.company} • {selectedJob?.location}</p>
                {selectedJob?.recruiterName && (
                  <p className="recruiter-info">
                    <FaUser className="recruiter-icon" />
                    Recruiter: {selectedJob.recruiterName} ({selectedJob.recruiterId})
                  </p>
                )}
              </div>
            </div>

            <div className="apply-modal-content">
              <div className="user-info-section">
                <h4><FaUserCircle className="section-icon" />Personal Information</h4>
                <div className="user-details">
                  <div className="detail-row">
                    <span className="detail-label">
                      <FaUser className="detail-icon" />
                      Full Name:
                    </span>
                    <span className="detail-value non-editable">{userData?.name}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">
                      <FaEnvelope className="detail-icon" />
                      Email:
                    </span>
                    <span className="detail-value non-editable">{userData?.email}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">
                      <FaPhone className="detail-icon" />
                      Phone:
                    </span>
                    <span className="detail-value non-editable">{userData?.phoneno}</span>
                  </div>
                </div>
              </div>

              <div className="resume-section">
                <h4><FaCloudUploadAlt className="section-icon" />Resume Selection</h4>
                {userResumes.length > 0 ? (
                  <div className="resume-list">
                    {userResumes.map((resume, index) => (
                      <div key={index} className="resume-item">
                        <div className="resume-item-content">
                          <input
                            type="radio"
                            id={`resume-${index}`}
                            name="resume"
                            value={resume.resume}
                            checked={selectedResume === resume.resume}
                            onChange={(e) => setSelectedResume(e.target.value)}
                          />
                          <label htmlFor={`resume-${index}`} className="resume-label">
                            <FaFileAlt className="resume-icon" />
                            <span className="resume-name">
                              {getResumeDisplayName(resume.resume)}
                            </span>
                          </label>
                        </div>
                        <button
                          className="view-resume-btn"
                          onClick={() => handleResumeView(resume.resume)}
                          type="button"
                        >
                          <FaEye className="btn-icon" />
                          View
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-resume">
                    <p>No resumes found. Please upload a resume first.</p>
                    <button 
                      className="upload-resume-btn"
                      onClick={() => navigate('/profile')}
                    >
                      Upload Resume
                    </button>
                  </div>
                )}
              </div>

              <div className="apply-modal-footer">
                <button
                  className="cancel-btn"
                  onClick={closeApplyModal}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  className="submit-application-btn"
                  onClick={handleSubmitApplication}
                  disabled={isSubmitting || !selectedResume}
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="spinner" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;