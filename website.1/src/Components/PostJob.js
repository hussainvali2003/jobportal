
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { FaCheck, FaTimes } from "react-icons/fa";
// import "../Styles/PostJobs.css";

// const PostJobs = () => {
//   const navigate = useNavigate();
//   const [recruiterInfo, setRecruiterInfo] = useState(null);
//   const [job, setJob] = useState({
//     title: "",
//     company: "",
//     location: "",
//     description: "",
//     salary: "",
//     software: "",
//     experience: "",
//     status: "LIVE",
//     recruiterName: "",
//     recruiterId: "",
//     jobId: ""
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [message, setMessage] = useState({ text: "", type: "" });
//   const [jobIdValidation, setJobIdValidation] = useState({ 
//     isValid: null, 
//     isChecking: false, 
//     message: "" 
//   });

//   useEffect(() => {
//     const userRole = localStorage.getItem("userRole");
//     if (userRole !== "RECRUITER" && userRole !== "ADMIN") {
//       navigate("/recruiter-login");
//       return;
//     }
    
//     const recruiterData = {
//       name: localStorage.getItem("userName") || "",
//       recruiterId: localStorage.getItem("userId") || ""
//     };
    
//     setRecruiterInfo(recruiterData);
//     setJob(prev => ({
//       ...prev,
//       recruiterName: recruiterData.name,
//       recruiterId: recruiterData.recruiterId
//     }));
//   }, [navigate]);

//   const validateJobId = async (jobId) => {
//     if (!jobId || jobId === "MMJOB-") {
//       setJobIdValidation({ isValid: null, isChecking: false, message: "" });
//       return;
//     }

//     const jobIdRegex = /^MMJOB-\d{4}$/;
//     if (!jobIdRegex.test(jobId)) {
//       setJobIdValidation({ 
//         isValid: false, 
//         isChecking: false, 
//         message: "Format must be MMJOB-XXXX (4 digits)" 
//       });
//       return;
//     }

//     setJobIdValidation({ isValid: null, isChecking: true, message: "Checking..." });

//     try {
//       const response = await axios.get(`http://localhost:8080/api/jobs/check-job-id/${jobId}`);
      
//       if (response.data.exists) {
//         setJobIdValidation({ 
//           isValid: false, 
//           isChecking: false, 
//           message: "Job ID already exists" 
//         });
//       } else {
//         setJobIdValidation({ 
//           isValid: true, 
//           isChecking: false, 
//           message: "Job ID available" 
//         });
//       }
//     } catch (error) {
//       console.error("Error checking job ID:", error);
//       setJobIdValidation({ 
//         isValid: false, 
//         isChecking: false, 
//         message: "Error checking availability" 
//       });
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
    
//     if (name === "jobId") {
//       let formattedValue = value;
      
//       if (!formattedValue.startsWith("MMJOB-")) {
//         formattedValue = "MMJOB-" + formattedValue.replace(/^MMJOB-?/, "");
//       }
      
//       const afterPrefix = formattedValue.substring(6);
//       const digitsOnly = afterPrefix.replace(/\D/g, "");
//       const limitedDigits = digitsOnly.substring(0, 4);
//       formattedValue = "MMJOB-" + limitedDigits;
      
//       setJob({ ...job, [name]: formattedValue });
//       validateJobId(formattedValue);
//     } else {
//       setJob({ ...job, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!job.jobId || !jobIdValidation.isValid) {
//       setMessage({ text: "Please provide a valid and unique Job ID", type: "error" });
//       return;
//     }
    
//     setIsLoading(true);
//     setMessage({ text: "", type: "" });
    
//     try {
//       const response = await axios.post(
//         "http://localhost:8080/api/jobs/post",
//         job,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           }
//         }
//       );
      
//       setMessage({ text: "Job posted successfully!", type: "success" });
      
//       // Reset form
//       setJob({
//         title: "",
//         company: "",
//         location: "",
//         description: "",
//         salary: "",
//         software: "",
//         experience: "",
//         status: "LIVE",
//         recruiterName: recruiterInfo?.name || "",
//         recruiterId: recruiterInfo?.recruiterId || "",
//         jobId: ""
//       });
      
//       setJobIdValidation({ isValid: null, isChecking: false, message: "" });
      
//       // Redirect to jobs page with refresh flag
//       setTimeout(() => {
//         navigate("/jobs", { state: { refreshJobs: true } });
//       }, 1500);
//     } catch (error) {
//       console.error("Error posting job:", error);
      
//       if (error.response) {
//         setMessage({ 
//           text: `Error: ${error.response.data || 'Failed to post job'}`, 
//           type: "error" 
//         });
//       } else if (error.request) {
//         setMessage({ text: "Network error. Please check your connection.", type: "error" });
//       } else {
//         setMessage({ text: "Error posting job. Please try again.", type: "error" });
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="post-job-container">
//       <h2 className="post-job-title">Post a New Job</h2>
      
//       {message.text && (
//         <div className={`message ${message.type}`}>
//           {message.text}
//         </div>
//       )}
      
//       <form onSubmit={handleSubmit} className="post-job-form">
//         <div className="form-row">
//           <div className="form-group">
//             <label className="input-label">Recruiter Name</label>
//             <input
//               type="text"
//               className="form-input readonly-input"
//               value={recruiterInfo?.name || ""}
//               readOnly
//               disabled
//             />
//           </div>
          
//           <div className="form-group">
//             <label className="input-label">Recruiter ID</label>
//             <input
//               type="text"
//               className="form-input readonly-input"
//               value={recruiterInfo?.recruiterId || ""}
//               readOnly
//               disabled
//             />
//           </div>
//         </div>

//         <div className="form-row">
//           <div className="form-group">
//             <label className="input-label">Job ID *</label>
//             <div className="job-id-input-container">
//               <input
//                 type="text"
//                 name="jobId"
//                 className="form-input job-id-input"
//                 placeholder="MMJOB-0000"
//                 value={job.jobId}
//                 onChange={handleChange}
//                 required
//               />
//               <div className="job-id-validation">
//                 {jobIdValidation.isChecking && (
//                   <div className="validation-loading">⟳</div>
//                 )}
//                 {!jobIdValidation.isChecking && jobIdValidation.isValid === true && (
//                   <FaCheck className="validation-icon valid" />
//                 )}
//                 {!jobIdValidation.isChecking && jobIdValidation.isValid === false && (
//                   <FaTimes className="validation-icon invalid" />
//                 )}
//               </div>
//             </div>
//             {jobIdValidation.message && (
//               <span className={`validation-message ${jobIdValidation.isValid ? 'valid' : 'invalid'}`}>
//                 {jobIdValidation.message}
//               </span>
//             )}
//             <small className="input-help">Format: MMJOB-XXXX (4 digits)</small>
//           </div>
//         </div>

//         <div className="form-row">
//           <div className="form-group">
//             <label className="input-label">Job Title</label>
//             <input
//               type="text"
//               name="title"
//               className="form-input"
//               placeholder="e.g. Senior Software Engineer"
//               value={job.title}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label className="input-label">Company</label>
//             <input
//               type="text"
//               name="company"
//               className="form-input"
//               placeholder="Your company name"
//               value={job.company}
//               onChange={handleChange}
//               required
//             />
//           </div>
//         </div>

//         <div className="form-row">
//           <div className="form-group">
//             <label className="input-label">Location</label>
//             <input
//               type="text"
//               name="location"
//               className="form-input"
//               placeholder="e.g. Bengaluru, India"
//               value={job.location}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label className="input-label">Field</label>
//             <select
//               name="software"
//               className="form-input"
//               value={job.software}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Select Field</option>
//               <option value="IT">IT</option>
//               <option value="Non IT">Non IT</option>
//             </select>
//           </div>
//         </div>

//         <div className="form-group full-width">
//           <label className="input-label">Job Description</label>
//           <textarea
//             name="description"
//             className="form-input form-textarea"
//             placeholder="Detailed job description..."
//             value={job.description}
//             onChange={handleChange}
//             required
//           ></textarea>
//         </div>

//         <div className="form-row">
//           <div className="form-group">
//             <label className="input-label">Salary</label>
//             <input
//               type="text"
//               name="salary"
//               className="form-input"
//               placeholder="e.g. 10LPA"
//               value={job.salary}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label className="input-label">Experience Required</label>
//             <input
//               type="text"
//               name="experience"
//               className="form-input"
//               placeholder="e.g. 2-3 years"
//               value={job.experience}
//               onChange={handleChange}
//               required
//             />
//           </div>
//         </div>

//         <div className="form-row">
//           <div className="form-group">
//             <label className="input-label">Status</label>
//             <select
//               name="status"
//               className="form-input"
//               value={job.status}
//               onChange={handleChange}
//               required
//             >
//               <option value="LIVE">LIVE</option>
//               <option value="CLOSED">CLOSED</option>
//             </select>
//           </div>
//         </div>

//         <button 
//           type="submit" 
//           className="submit-button" 
//           disabled={isLoading || jobIdValidation.isValid !== true}
//         >
//           {isLoading ? "Posting..." : "Post Job"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PostJobs;



import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaCheck, FaTimes, FaBriefcase, FaUsers, FaClock } from "react-icons/fa";
import "../Styles/PostJobs.css";

const PostJobs = () => {
  const navigate = useNavigate();
  const [recruiterInfo, setRecruiterInfo] = useState(null);
  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    salary: "",
    field: "",
    experience: "",
    status: "LIVE",
    recruiterName: "",
    recruiterId: "",
    jobId: "",
    jobType: "",
    openings: "",
    noticePeriod: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [jobIdValidation, setJobIdValidation] = useState({ 
    isValid: null, 
    isChecking: false, 
    message: "" 
  });

    const API_BASE = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "RECRUITER" && userRole !== "ADMIN") {
      navigate("/recruiter-login");
      return;
    }
    
    const recruiterData = {
      name: localStorage.getItem("userName") || "",
      recruiterId: localStorage.getItem("userId") || ""
    };
    
    setRecruiterInfo(recruiterData);
    setJob(prev => ({
      ...prev,
      recruiterName: recruiterData.name,
      recruiterId: recruiterData.recruiterId
    }));
  }, [navigate]);

  const validateJobId = async (jobId) => {
    if (!jobId || jobId === "MMJOB-") {
      setJobIdValidation({ isValid: null, isChecking: false, message: "" });
      return;
    }

    const jobIdRegex = /^MMJOB-\d{4}$/;
    if (!jobIdRegex.test(jobId)) {
      setJobIdValidation({ 
        isValid: false, 
        isChecking: false, 
        message: "Format must be MMJOB-XXXX (4 digits)" 
      });
      return;
    }

    setJobIdValidation({ isValid: null, isChecking: true, message: "Checking..." });

    try {
      const response = await axios.get(`${API_BASE}/api/jobs/check-job-id/${jobId}`);
      
      if (response.data.exists) {
        setJobIdValidation({ 
          isValid: false, 
          isChecking: false, 
          message: "Job ID already exists" 
        });
      } else {
        setJobIdValidation({ 
          isValid: true, 
          isChecking: false, 
          message: "Job ID available" 
        });
      }
    } catch (error) {
      console.error("Error checking job ID:", error);
      setJobIdValidation({ 
        isValid: false, 
        isChecking: false, 
        message: "Error checking availability" 
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "jobId") {
      let formattedValue = value;
      
      if (!formattedValue.startsWith("MMJOB-")) {
        formattedValue = "MMJOB-" + formattedValue.replace(/^MMJOB-?/, "");
      }
      
      const afterPrefix = formattedValue.substring(6);
      const digitsOnly = afterPrefix.replace(/\D/g, "");
      const limitedDigits = digitsOnly.substring(0, 4);
      formattedValue = "MMJOB-" + limitedDigits;
      
      setJob({ ...job, [name]: formattedValue });
      validateJobId(formattedValue);
    } else if (name === "openings") {
      // Only allow positive integers
      const numericValue = value.replace(/[^0-9]/g, "");
      if (numericValue === "" || parseInt(numericValue) > 0) {
        setJob({ ...job, [name]: numericValue });
      }
    } else {
      setJob({ ...job, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!job.jobId || !jobIdValidation.isValid) {
      setMessage({ text: "Please provide a valid and unique Job ID", type: "error" });
      return;
    }
    
    setIsLoading(true);
    setMessage({ text: "", type: "" });
    
    try {
      // Convert openings to integer
      const jobData = {
        ...job,
        openings: job.openings ? parseInt(job.openings) : 1
      };
      
      const response = await axios.post(
        `${API_BASE}/api/jobs/post`,
        jobData,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      
      setMessage({ text: "Job posted successfully!", type: "success" });
      
      // Reset form
      setJob({
        title: "",
        company: "",
        location: "",
        description: "",
        salary: "",
        field: "",
        experience: "",
        status: "LIVE",
        recruiterName: recruiterInfo?.name || "",
        recruiterId: recruiterInfo?.recruiterId || "",
        jobId: "",
        jobType: "",
        openings: "",
        noticePeriod: ""
      });
      
      setJobIdValidation({ isValid: null, isChecking: false, message: "" });
      
      // Redirect to jobs page with refresh flag
      setTimeout(() => {
        navigate("/jobs", { state: { refreshJobs: true } });
      }, 1500);
    } catch (error) {
      console.error("Error posting job:", error);
      
      if (error.response) {
        setMessage({ 
          text: `Error: ${error.response.data || 'Failed to post job'}`, 
          type: "error" 
        });
      } else if (error.request) {
        setMessage({ text: "Network error. Please check your connection.", type: "error" });
      } else {
        setMessage({ text: "Error posting job. Please try again.", type: "error" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="post-job-container">
      <h2 className="post-job-title">Post a New Job</h2>
      
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="post-job-form">
        <div className="form-row">
          <div className="form-group">
            <label className="input-label">Recruiter Name</label>
            <input
              type="text"
              className="form-input readonly-input"
              value={recruiterInfo?.name || ""}
              readOnly
              disabled
            />
          </div>
          
          <div className="form-group">
            <label className="input-label">Recruiter ID</label>
            <input
              type="text"
              className="form-input readonly-input"
              value={recruiterInfo?.recruiterId || ""}
              readOnly
              disabled
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="input-label">Job ID *</label>
            <div className="job-id-input-container">
              <input
                type="text"
                name="jobId"
                className="form-input job-id-input"
                placeholder="MMJOB-0000"
                value={job.jobId}
                onChange={handleChange}
                required
              />
              <div className="job-id-validation">
                {jobIdValidation.isChecking && (
                  <div className="validation-loading">⟳</div>
                )}
                {!jobIdValidation.isChecking && jobIdValidation.isValid === true && (
                  <FaCheck className="validation-icon valid" />
                )}
                {!jobIdValidation.isChecking && jobIdValidation.isValid === false && (
                  <FaTimes className="validation-icon invalid" />
                )}
              </div>
            </div>
            {jobIdValidation.message && (
              <span className={`validation-message ${jobIdValidation.isValid ? 'valid' : 'invalid'}`}>
                {jobIdValidation.message}
              </span>
            )}
            <small className="input-help">Format: MMJOB-XXXX (4 digits)</small>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="input-label">Job Title *</label>
            <input
              type="text"
              name="title"
              className="form-input"
              placeholder="e.g. Senior Software Engineer"
              value={job.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="input-label">Company *</label>
            <input
              type="text"
              name="company"
              className="form-input"
              placeholder="Your company name"
              value={job.company}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="input-label">Location *</label>
            <input
              type="text"
              name="location"
              className="form-input"
              placeholder="e.g. Bengaluru, India"
              value={job.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="input-label">Field *</label>
            <select
              name="field"
              className="form-input"
              value={job.field}
              onChange={handleChange}
              required
            >
              <option value="">Select Field</option>
              <option value="IT">IT</option>
              <option value="Non IT">Non IT</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="input-label">
             
              Job Type *
            </label>
            <select
              name="jobType"
              className="form-input"
              value={job.jobType}
              onChange={handleChange}
              required
            >
              <option value="">Select Job Type</option>
              <option value="Full Time">Full Time</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Internship">Internship</option>
              <option value="Part Time">Part Time</option>
            </select>
          </div>

          <div className="form-group">
            <label className="input-label">
            
              Number of Openings *
            </label>
            <input
              type="text"
              name="openings"
              className="form-input"
              placeholder="e.g. 5"
              value={job.openings}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="input-label">
              
              Notice Period *
            </label>
            <select
              name="noticePeriod"
              className="form-input"
              value={job.noticePeriod}
              onChange={handleChange}
              required
            >
              <option value="">Select Notice Period</option>
              <option value="Immediate">Immediate</option>
              <option value="15 Days">15 Days</option>
              <option value="30 Days">30 Days</option>
              <option value="45 Days">45 Days</option>
              <option value="60 Days">60 Days</option>
              <option value="75 Days">75 Days</option>
              <option value="90 Days">90 Days</option>
            </select>
          </div>
        </div>

        <div className="form-group full-width">
          <label className="input-label">Job Description *</label>
          <textarea
            name="description"
            className="form-input form-textarea"
            placeholder="Detailed job description..."
            value={job.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="input-label">Salary *</label>
            <input
              type="text"
              name="salary"
              className="form-input"
              placeholder="e.g. 10LPA"
              value={job.salary}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="input-label">Experience Required *</label>
            <input
              type="text"
              name="experience"
              className="form-input"
              placeholder="e.g. 2-3 years"
              value={job.experience}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="input-label">Status *</label>
            <select
              name="status"
              className="form-input"
              value={job.status}
              onChange={handleChange}
              required
            >
              <option value="LIVE">LIVE</option>
              <option value="CLOSED">CLOSED</option>
            </select>
          </div>
        </div>

        <button 
          type="submit" 
          className="submit-button" 
          disabled={isLoading || jobIdValidation.isValid !== true}
        >
          {isLoading ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  );
};

export default PostJobs;