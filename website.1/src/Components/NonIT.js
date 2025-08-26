import React, { useState } from "react";
import "../Styles/JobPortal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faLocationDot } from "@fortawesome/free-solid-svg-icons";

function NonIT() {
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);

  const companies = ["Info-Tech", "Tech-mahendra", "24/7", "IBM", "BioCon"];
  const specializations = [
    "Data Entry",
    "Voice Process",
    "Non-Voice",
    "HR Recruiter",
    "Program Manager",
  ];

  const jobs = [
    {
      id: 1,
      title: "Data Entry",
      company: "Info-Tech",
      location: "Bangalore",
      experience: "2 years",
      category: "Data Entry",
      salary: "3.5 LPA",
      description:
        "We are seeking a detail-oriented and highly organized Data Entry Specialist to join our team.",
      requiredSkills:
        "Fast and accurate typing, Microsoft Office proficiency, data management skills, attention to detail, time management, confidentiality, and adaptability.",
    },
    {
      id: 2,
      title: "Voice Process",
      company: "Tech-mahendra",
      location: "Hyderabad",
      experience: "Fresher",
      category: "Voice Process",
      salary: "2.5 LPA",
      description:
        "A voice process job involves handling inbound or outbound calls to assist customers.",
      requiredSkills:
        "Excellent communication, active listening, problem-solving, multitasking, patience, and adaptability.",
    },
    {
      id: 3,
      title: "Non-Voice",
      company: "24/7",
      location: "Chennai",
      experience: "2 years",
      category: "Non-Voice",
      salary: "3.5 LPA",
      description:
        "A non-voice process job involves handling customer queries, email support, and data management.",
      requiredSkills:
        "Typing speed, written communication, email etiquette, attention to detail, and problem-solving.",
    },
    {
      id: 4,
      title: "HR Recruiter",
      company: "IBM",
      location: "Pune",
      experience: "4 years",
      category: "HR Recruiter",
      salary: "4.5 LPA",
      description:
        "An HR Recruiter is responsible for sourcing, screening, and hiring candidates.",
      requiredSkills:
        "Talent sourcing, interview coordination, negotiation skills, time management, and employer branding.",
    },
    {
      id: 5,
      title: "Program Manager",
      company: "Biocon",
      location: "Bangalore",
      experience: "2 years",
      category: "Program Manager",
      salary: "5 LPA",
      description:
        "A Program Manager oversees multiple projects, ensuring alignment with business goals.",
      requiredSkills:
        "Project management, stakeholder management, risk management, leadership, and team coordination.",
    },
  ];

  const handleCheckboxChange = (category, setState) => {
    setState((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };
  

  const filteredJobs = jobs.filter((job) => {
    const matchesSpecialization =
      selectedSpecializations.length === 0 ||
      selectedSpecializations.includes(job.category);
    const matchesCompany =
      selectedCompanies.length === 0 || selectedCompanies.includes(job.company);
    return matchesSpecialization && matchesCompany;
  });

  const handleApply = (job) => {
    alert(`Applied for ${job.title} at ${job.company}`);
  };

  return (
    <div className="mainContainer">
      <div className="jobPortalContainer">
        <div className="filterSection">
          <h2>
            <FontAwesomeIcon icon={faFilter} className="filterIcon" /> ALL FILTERS
          </h2>
          <h3 className="sectionTitlej">Companies</h3>
          <ul>
            {companies.map((company, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  id={`company-${index}`}
                  checked={selectedCompanies.includes(company)}
                  onChange={() => handleCheckboxChange(company, setSelectedCompanies)}
                />
                <label htmlFor={`company-${index}`}>{company}</label>
              </li>
            ))}
          </ul>
          <h3 className="sectionTitlej">Specialization</h3>
          <ul>
            {specializations.map((specialization, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  id={`spec-${index}`}
                  checked={selectedSpecializations.includes(specialization)}
                  onChange={() => handleCheckboxChange(specialization, setSelectedSpecializations)}
                />
                <label htmlFor={`spec-${index}`}>{specialization}</label>
              </li>
            ))}
          </ul>
        </div>
        <div className="jobsSection">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div key={job.id} className="job-card">
                <h4 style={{ color: "red", fontSize: "28px" }}>{job.title}</h4>
                <h2 style={{ marginTop: "25px" }}>{job.company}</h2>
                <p>
                  Required Position: Multiple | Experience: {job.experience} | {job.salary} |
                  <FontAwesomeIcon icon={faLocationDot} className="locationIcon" /> {job.location}
                </p>
                {job.description && <><h4>Job Description</h4><p>{job.description}</p></>}
                {job.requiredSkills && <><h4>Required Skills</h4><p>{job.requiredSkills}</p></>}
                <button className="jbtn1" onClick={() => handleApply(job)}>Apply</button>
              </div>
            ))
          ) : (
            <p>No jobs found for the selected filters.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default NonIT;