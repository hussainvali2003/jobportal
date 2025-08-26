import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../Styles/Search.css"; // Import the CSS file
const Search = ({ jobs = [], loading }) => {
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [showJobs, setShowJobs] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const filtered = jobs.filter(
      (job) =>
        job.title?.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (experience ? job.experience === experience : true) &&
        (location
          ? job.location?.toLowerCase().includes(location.toLowerCase())
          : true)
    );
    setFilteredJobs(filtered);
  }, [searchTerm, experience, location, jobs]);

  const handleSearch = () => {
    const userRole = localStorage.getItem("userRole");
    if (userRole) {
      navigate("/jobs",{
        state:{
          searchTerm,
          experience,
          location
        }
      });
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="search-wrapper">
      <h1 className="main-heading">The Easiest Way To Get Your Dream Job</h1>
      <p className="sub-text">Find your dream job in a few clicks!</p>
      <div className="searchcontainer">
        {loading ? (
          <p className="loading-text">Loading job listings...</p>
        ) : (
          <>
            <h2 className="search-heading">Search Jobs</h2>
            <div className="search-form">
              <input
                type="text"
                placeholder="Search by job title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="search-dropdown"
              >
                <option value="">Select Experience</option>
                <option value="Fresher">Fresher</option>
                <option value="1-2">1-2 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5-20">5+ years</option>
              </select>
              <input
                type="text"
                placeholder="Search by location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="search-input"
              />
              <button className="search-button" onClick={handleSearch}>
                <FaSearch /> Search Job
              </button>
            </div>
            {showJobs && (
              <ul className="jobs-list">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                    <li key={job.id} className="job-item">
                      <h3 className="job-title">{job.title}</h3>
                      <p className="job-company">{job.company} - {job.location}</p>
                      <p className="job-description">{job.description}</p>
                      <p className="job-detail"><strong>Experience:</strong> {job.experience}</p>
                      <p className="job-detail"><strong>Salary:</strong> {job.salary}</p>
                      <button
                        className="apply-button"
                        onClick={() =>
                          window.open(
                            "https://docs.google.com/forms/d/e/1FAIpQLSeKPlmGRQ7yUNWL_WWm9U5d7oDlJn4wkauZAvmv-fOvJiibkA/viewform?usp=header",
                            "_blank"
                          )
                        }
                      >
                        Apply Now
                      </button>
                    </li>
                  ))
                ) : (
                  <p className="no-jobs-message">
                    No jobs found. Try adjusting your search filters.
                  </p>
                )}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default Search;