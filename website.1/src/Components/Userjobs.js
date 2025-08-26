import React from "react";

const Userjobs = ({ jobs }) => {
    return (
        <div>
            <h2>All Jobs</h2>
            <ul>
                {jobs.map((job) => (
                    <li key={job.id}>
                        <h3>{job.title}</h3>
                        <p>{job.company} - {job.location}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Userjobs;
