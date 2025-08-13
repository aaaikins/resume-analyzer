import React from 'react';
import { CheckCircle, AlertTriangle } from 'lucide-react';

const ATSOptimization = ({ atsData }) => {
  return (
    <div className="ats-card">
      <h3>
        <CheckCircle size={20} />
        ATS Optimization
      </h3>
      <div className="ats-score">
        <span className={`ats-status ${atsData.status.toLowerCase()}`}>
          {atsData.status}
        </span>
        <span className="ats-percentage">{atsData.score}%</span>
      </div>
      <div className="ats-issues">
        <h4>Issues Found:</h4>
        {atsData.issues.map((issue, index) => (
          <div key={index} className="ats-issue">
            <AlertTriangle size={14} />
            <span>{issue}</span>
          </div>
        ))}\n      </div>
    </div>
  );
};

export default ATSOptimization;