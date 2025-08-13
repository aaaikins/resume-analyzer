import React from 'react';
import { AlertTriangle } from 'lucide-react';

const SkillsGap = ({ skillsData }) => {
  return (
    <div className="skills-card">
      <h3>
        <AlertTriangle size={20} />
        Skills Gap Analysis
      </h3>
      <div className="skills-summary">
        <div className="skills-stat">
          <span className="stat-number">{skillsData.missing.length}</span>
          <span className="stat-label">Missing Skills</span>
        </div>
        <div className="skills-stat">
          <span className="stat-number">{skillsData.matched.length}</span>
          <span className="stat-label">Matched Skills</span>
        </div>
      </div>
      <div className="missing-skills">
        <h4>Top Missing Skills:</h4>
        {skillsData.missing.slice(0, 3).map((skill, index) => (
          <span key={index} className="missing-skill">{skill}</span>
        ))}\n      </div>
    </div>
  );
};

export default SkillsGap;