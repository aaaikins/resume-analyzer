import React from 'react';
import { CheckCircle, AlertTriangle } from 'lucide-react';

const ATSOptimization = ({ atsData }) => {
  if (!atsData) {
    return null;
  }

  const score = atsData.score || 0;
  const issues = atsData.issues || [];
  const status = atsData.status || (score >= 80 ? 'Good' : score >= 60 ? 'Fair' : 'Poor');

  return (
    <div className="ats-card">
      <h3>
        <CheckCircle size={20} />
        ATS Optimization
      </h3>
      <div className="ats-score">
        <span className={`ats-status ${status.toLowerCase()}`}>
          {status}
        </span>
        <span className="ats-percentage">{score}%</span>
      </div>
      <div className="ats-issues">
        <h4>Issues Found:</h4>
        {issues.map((issue, index) => (
          <div key={index} className="ats-issue">
            <AlertTriangle size={14} />
            <span>{issue}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ATSOptimization;