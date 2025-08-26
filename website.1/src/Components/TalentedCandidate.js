import React from 'react';
import { useNavigate } from "react-router-dom";
import { User, Settings, Star, Edit3, TrendingUp, Target, ArrowRight, Zap, Users, Award } from 'lucide-react';
import '../Styles/TalentedCandidate.css';



function Talent() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/jobs");
  };
  const features = [
    {
      icon: User,
      title: "Create a Standout Profile",
      description: "Showcase your professional background, key skills, and achievements to attract top recruiters and hiring managers. A well-crafted profile is your first step towards landing the right opportunities. Ensure it reflects your true potential to stand out in a competitive job market.",
      color: "cyan",
      delay: 0
    },
    {
      icon: Settings,
      title: "Customize Your Presence",
      description: "Tailor your profile to reflect your career goals, industry experience, and unique value proposition to employers. Customizing your profile increases your chances of aligning with companies seeking your specific expertise. Take control of your professional narrative and demonstrate your unique skills and qualifications.",
      color: "purple",
      delay: 0.1
    },
    {
      icon: Star,
      title: "Get Featured",
      description: "Increase your profile visibility by featuring it across recruiter searches and industry-relevant opportunities. Featured profiles get prioritized, ensuring you reach a wider network of hiring managers. This higher visibility puts you in the spotlight for top career offers.",
      color: "pink",
      delay: 0.2
    },
    {
      icon: Edit3,
      title: "Build a Strong First Impression",
      description: "Craft a compelling, well-structured profile that highlights your strengths and positions you as the ideal candidate. Employers make quick judgments, and a strong first impression is key. Showcase your best qualities and experience upfront to capture their attention.",
      color: "green",
      delay: 0.3
    },
    {
      icon: TrendingUp,
      title: "Boost Your Visibility",
      description: "Gain exposure to top companies and let your profile speak for itself. Be discovered by employers actively hiring. The more visible your profile is, the higher the likelihood of being contacted for exciting opportunities.",
      color: "orange",
      delay: 0.4
    },
    {
      icon: Target,
      title: "Attract the Right Opportunities",
      description: "Optimize your profile to align with your desired roles. Stand out in searches and receive relevant job offers. Tailored profiles are more likely to match the specific job criteria, giving you access to the best-fitting roles.",
      color: "blue",
      delay: 0.5
    }
  ];



  return (
    <div className="talent-showcase">
      {/* Animated Background */}
      <div className="bg-animation">
        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
        <div className="floating-orb orb-3"></div>
      </div>

      <div className="talent-container">
        {/* Header Section */}
        <div className="talent-header">
          <div className="talent-badge">
            <Zap size={16} />
            <span>Elite Talent Network</span>
          </div>
          <h1 className="talent-title">
            Next-Gen <span className="neon-text">Talent</span> Hub
          </h1>
          <p className="talent-subtitle">
            Where exceptional professionals meet cutting-edge opportunities
          </p>
          <p className="talent-description">
            Join the future of remote work. Our AI-powered platform connects elite talent
            with innovative companies. Experience the next evolution of career advancement.
          </p>
        </div>

        {/* Features Grid */}
        <div className="features-grid">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className={`feature-card ${feature.color}`}
                style={{
                  animationDelay: `${feature.delay}s`
                }}
              >
                <div className="card-glow"></div>
                <div className="feature-icon">
                  <IconComponent size={24} />
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
                <div className="feature-arrow">
                  <ArrowRight size={18} />
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="talent-cta">
          <button className="cta-button" onClick={handleClick}>
            <div className="button-glow"></div>
            <span>Launch Your Career</span>
            <ArrowRight size={20} />
          </button>
          <p className="cta-note">Join 25,000+ elite professionals worldwide</p>
        </div>

        {/* Stats Section */}

      </div>
    </div>
  );
}

export default Talent;
