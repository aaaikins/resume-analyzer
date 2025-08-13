import React, { useState, useEffect } from 'react';
import { FileText, Calendar, TrendingUp, TrendingDown, MoreVertical, Download, Eye, X } from 'lucide-react';

const ResumeVersions = ({ versions = [] }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const getScoreColor = (score) => {
    if (score >= 80) return '#22c55e';
    if (score >= 60) return '#f59e0b';
    return '#ef4444';
  };

  const getScoreStatus = (score) => {
    if (score >= 80) return { text: 'Excellent', icon: TrendingUp };
    if (score >= 60) return { text: 'Good', icon: TrendingUp };
    return { text: 'Needs Work', icon: TrendingDown };
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (!versions.length) {
    return (
      <div className={`versions-container ${isVisible ? 'visible' : ''}`}>
        <div className="versions-header">
          <FileText className="versions-icon" size={24} />
          <h2>Resume Versions</h2>
          <p>No resume versions found. Upload your first resume to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`versions-container ${isVisible ? 'visible' : ''}`}>
      <div className="versions-header">
        <FileText className="versions-icon" size={24} />
        <h2>Resume Versions</h2>
        <p>Compare your resume versions and track improvements over time</p>
      </div>

      <div className="versions-grid">
        {versions.map((version, index) => {
          const status = getScoreStatus(version.score);
          const StatusIcon = status.icon;
          
          return (
            <div key={version.id || index} className="version-card">
              <div className="version-header">
                <div className="version-info">
                  <h3>{version.name || `Resume v${index + 1}`}</h3>
                  <div className="version-meta">
                    <Calendar size={14} />
                    <span>{formatDate(version.uploadDate)}</span>
                  </div>
                </div>
                <div className="version-actions">
                  <button 
                    className="action-btn" 
                    title="View Details"
                    onClick={() => setSelectedVersion(version)}
                  >
                    <Eye size={16} />
                  </button>
                  <button 
                    className="action-btn" 
                    title="Download"
                    onClick={() => console.log('Download:', version.name)}
                  >
                    <Download size={16} />
                  </button>
                  <button 
                    className="action-btn" 
                    title="More Options"
                    onClick={() => console.log('More options:', version.name)}
                  >
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>

              <div className="version-score">
                <div className="score-circle">
                  <svg width="80" height="80">
                    <circle
                      cx="40"
                      cy="40"
                      r="30"
                      fill="none"
                      stroke="rgba(226, 232, 240, 0.3)"
                      strokeWidth="6"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="30"
                      fill="none"
                      stroke={getScoreColor(version.score)}
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={`${(version.score / 100) * 188.5} 188.5`}
                      transform="rotate(-90 40 40)"
                    />
                  </svg>
                  <div className="score-content">
                    <span className="score-number" style={{ color: getScoreColor(version.score) }}>
                      {version.score}
                    </span>
                  </div>
                </div>
                <div className="score-status" style={{ color: getScoreColor(version.score) }}>
                  <StatusIcon size={14} />
                  <span>{status.text}</span>
                </div>
              </div>

              <div className="version-highlights">
                <div className="highlight-item">
                  <span className="highlight-label">ATS Score</span>
                  <span className="highlight-value">{version.atsScore || 'N/A'}%</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-label">Job Match</span>
                  <span className="highlight-value">{version.jobMatch || 'N/A'}%</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-label">Keywords</span>
                  <span className="highlight-value">{version.keywordCount || 0}</span>
                </div>
              </div>

              {version.improvements && version.improvements.length > 0 && (
                <div className="version-improvements">
                  <h4>Key Improvements</h4>
                  <ul>
                    {version.improvements.slice(0, 2).map((improvement, idx) => (
                      <li key={idx}>{improvement}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {selectedVersion && (
        <div className="version-modal-overlay" onClick={() => setSelectedVersion(null)}>
          <div className="version-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedVersion.name}</h3>
              <button 
                className="modal-close"
                onClick={() => setSelectedVersion(null)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="modal-content">
              <div className="version-details">
                <div className="detail-row">
                  <span className="detail-label">Upload Date:</span>
                  <span className="detail-value">{formatDate(selectedVersion.uploadDate)}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Overall Score:</span>
                  <span className="detail-value" style={{ color: getScoreColor(selectedVersion.score) }}>
                    {selectedVersion.score}/100
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">ATS Compatibility:</span>
                  <span className="detail-value">{selectedVersion.atsScore}%</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Job Match:</span>
                  <span className="detail-value">{selectedVersion.jobMatch}%</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Keywords Found:</span>
                  <span className="detail-value">{selectedVersion.keywordCount}</span>
                </div>
              </div>
              
              {selectedVersion.improvements && selectedVersion.improvements.length > 0 && (
                <div className="improvements-section">
                  <h4>Improvements Made</h4>
                  <ul>
                    {selectedVersion.improvements.map((improvement, idx) => (
                      <li key={idx}>{improvement}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeVersions;