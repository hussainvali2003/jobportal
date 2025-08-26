import React, { useState, useRef, useEffect } from "react";

function Scroll() {
    const jobs = [
        {
          img: "/c9.png",
          company: "Wipro",
          role: "Java Developer",
          experience: "2+ years",
          location: "Bangalore",
          salary: "6 LPA",
          skills: "Core Java, Spring Boot, REST APIs",
        },
        {
          img: "/c11.jpg",
          company: "Infosys",
          role: "Full Stack Developer",
          experience: "3+ years",
          location: "Hyderabad",
          salary: "8 LPA",
          skills: "React, Node.js, MongoDB",
        },
        {
          img: "/c3.jpg",
          company: "IBM",
          role: "Software Tester",
          experience: "1+ years",
          location: "Chennai",
          salary: "4 LPA",
          skills: "Manual Testing, API Testing, Automation Testing",
        },
        {
          img: "/c2.jpg",
          company: "Tech Info",
          role: "Data Analyst",
          experience: "2+ years",
          location: "Hyderabad",
          salary: "3.5 LPA",
          skills: "Python, SQL, R, Tableau, Power BI",
        },
      ];
const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollPosition = 0;
    const scrollSpeed = 1;

    const scrollInterval = setInterval(() => {
      if (scrollContainer) {
        scrollPosition += scrollSpeed;
        if (scrollPosition >= scrollContainer.scrollHeight / 2) {
          scrollPosition = 0;
        }
        scrollContainer.style.transform = `translateY(-${scrollPosition}px)`;
      }
    }, 30);

    return () => clearInterval(scrollInterval);
  }, []);      
  return (
           <div className="image-scroll-container">
          <div className="image-content" ref={scrollRef}>
            {jobs.concat(jobs).map((job, index) => (
              <div key={index} className="job-card">
                <img src={job.img} alt="Company Logo" />
                <h3>{job.company}</h3>
                <h2>{job.role}</h2>
                <p><i className="fa-solid fa-briefcase"></i> {job.experience}</p>
                <p><i className="fa-solid fa-location-dot"></i> {job.location}</p>
                <p><i className="fa-solid fa-indian-rupee-sign"></i> {job.salary}</p>
                <p><i className="fa-solid fa-book"></i> {job.skills}</p>
              </div>
            ))}
          </div>

    </div>
  )
}

export default Scroll;