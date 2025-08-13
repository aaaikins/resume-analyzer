import React from 'react';
import { AlertTriangle } from 'lucide-react';

const SkillsGap = ({ skillsData = {} }) => {
  const missing = skillsData.missing || [];
  const matched = skillsData.matched || [];
  return (
    <div className="skills-card">
      <h3>
        <AlertTriangle size={20} />
        Skills Gap Analysis
      </h3>
      <div className="skills-summary">
        <div className="skills-stat">
          <span className="stat-number">{missing.length}</span>
          <span className="stat-label">Missing Skills</span>
        </div>
        <div className="skills-stat">
          <span className="stat-number">{matched.length}</span>
          <span className="stat-label">Matched Skills</span>
        </div>
      </div>
      <div className="missing-skills">
        <h4>Top Missing Skills:</h4>
        {missing.slice(0, 3).map((skill, index) => (
          <span key={index} className="missing-skill">{skill}</span>
        ))}\n      </div>
    </div>
  );
};

export default SkillsGap;