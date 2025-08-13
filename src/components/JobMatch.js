import React from 'react';
import { Target } from 'lucide-react';

const JobMatch = ({ matchData }) => {
  return (
    <div className="match-card">
      <h3>
        <Target size={20} />
        Job Match Analysis
      </h3>
      <div className="match-percentage">
        <span className="match-number">{matchData.percentage}%</span>
        <span className="match-label">Match</span>
      </div>
      <div className="match-details">
        <div className="match-item">
          <span className="match-category">Skills Match</span>
          <div className="match-bar">
            <div 
              className="match-fill" 
              style={{ width: `${matchData.skillsMatch}%` }}
            ></div>
          </div>
          <span>{matchData.skillsMatch}%</span>
        </div>
        <div className="match-item">
          <span className="match-category">Experience</span>
          <div className="match-bar">
            <div 
              className="match-fill" 
              style={{ width: `${matchData.experienceMatch}%` }}
            ></div>
          </div>
          <span>{matchData.experienceMatch}%</span>
        </div>
      </div>
    </div>
  );
};

export default JobMatch;