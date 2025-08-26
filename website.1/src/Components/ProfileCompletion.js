import React from "react";
import { useProfileCompletion } from "../Context/ProfileCompletionContext";
const CircularProfileCompletion = () => {
  const { getCompletionPercentage } = useProfileCompletion();
  const percentage = getCompletionPercentage();
  const radius = 40;
  const stroke = 6;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  return (
    <div className="completion-indicator">
      <svg className="completion-circle" width="100" height="100">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#667EEA" />
            <stop offset="100%" stopColor="#764BA2" />
          </linearGradient>
        </defs>
        <circle
          className="completion-bg"
          cx="50"
          cy="50"
          r={normalizedRadius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={stroke}
        />
        <circle
          className="completion-progress"
          cx="50"
          cy="50"
          r={normalizedRadius}
          fill="none"
          stroke="url(#gradient)"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 50 50)"
          strokeLinecap="round"
        />
      </svg>
      <div className="completion-text">
        <span className="completion-percentage">{percentage}%</span>
        <span className="completion-label">Complete</span>
      </div>
    </div>
  );
};
export default CircularProfileCompletion;