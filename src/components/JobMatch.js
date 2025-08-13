import React from 'react';
import { Target } from 'lucide-react';

const JobMatch = ({ matchData }) => {
  if (!matchData) {
    return null;
  }

  return (
    <div className="match-card">
      <h3>
        <Target size={20} />
        Job Match Analysis
      </h3>
      <div className="match-percentage">
        <span className="match-number">{matchData.overall || matchData.percentage || 0}%</span>
        <span className="match-label">Match</span>
      </div>
      <div className="match-details">
        <div className="match-item">
          <span className="match-category">Skills Match</span>
          <div className="match-bar">
            <div 
              className="match-fill" 
              style={{ width: `${matchData.skills || matchData.skillsMatch || 0}%` }}
            ></div>
          </div>
          <span>{matchData.skills || matchData.skillsMatch || 0}%</span>
        </div>
        <div className="match-item">
          <span className="match-category">Experience</span>
          <div className="match-bar">
            <div 
              className="match-fill" 
              style={{ width: `${matchData.experience || matchData.experienceMatch || 0}%` }}
            ></div>
          </div>
          <span>{matchData.experience || matchData.experienceMatch || 0}%</span>
        </div>
      </div>
    </div>
  );
};

export default JobMatch;