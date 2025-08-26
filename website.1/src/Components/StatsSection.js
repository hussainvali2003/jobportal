
import React, { useState, useEffect } from 'react';
import { Users, Briefcase, Building, Award } from 'lucide-react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import '../Styles/StatsSection.css';

const StatsSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.3, // Trigger when 30% visible
  });

  const [countKey, setCountKey] = useState(0);

  useEffect(() => {
    if (inView) {
      // change the key to force CountUp to re-render
      setCountKey(prev => prev + 1);
    }
  }, [inView]);

  return (
    <section className="stats-section" ref={ref}>
      <div className="container">
        <div className="header">
          <h2>Trusted by Job Seekers & Employers</h2>
          <p>
            Join thousands of job seekers and employers who trust MomentumMerge for their career and hiring needs
          </p>
        </div>
        <div className="stats-grid">
          <div className="stat-card blue">
            <div className="icon-wrapper">
              <Users className="icon" />
            </div>
            <h3>
              <CountUp key={`${countKey}-1`} end={1.5} decimals={1} suffix="M+" duration={2} />
            </h3>
            <p>Job Seekers</p>
          </div>
          <div className="stat-card green">
            <div className="icon-wrapper">
              <Briefcase className="icon" />
            </div>
            <h3>
              <CountUp key={`${countKey}-2`} end={100} suffix="K+" duration={2} />
            </h3>
            <p>Active Jobs</p>
          </div>
          <div className="stat-card orange">
            <div className="icon-wrapper">
              <Building className="icon" />
            </div>
            <h3>
              <CountUp key={`${countKey}-3`} end={5} suffix="K+" duration={2} />
            </h3>
            <p>Companies</p>
          </div>
          <div className="stat-card purple">
            <div className="icon-wrapper">
              <Award className="icon" />
            </div>
            <h3>
              <CountUp key={`${countKey}-4`} end={98} suffix="%" duration={2} />
            </h3>
            <p>Success Rate</p>
          </div>
        </div>
      </div>
      <section className="cta-section1">
        {/* Floating gradient blobs */}
        <div className="floating-element"></div>
        <div className="floating-element"></div>

        <div className="container1">
          <div className="cta-content">
            <h2>Ready to Take the Next Step in Your Career?</h2>
            <p>
              Join thousands of job seekers who have found their dream jobs through MomentumMerge
            </p>
            <div className="cta-buttons">
              <a href="/register" className="btn-primary">
                Create Account
              </a>
              <a href="/jobs" className="btn-secondary">
                Browse Jobs
              </a>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default StatsSection;



