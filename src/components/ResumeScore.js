import React, { useEffect, useState } from 'react';
import { Star, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const ResumeScore = ({ score }) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setAnimatedScore(prev => {
          if (prev >= score) {
            clearInterval(interval);
            return score;
          }
          return prev + 1;
        });
      }, 20);
      return () => clearInterval(interval);
    }, 200);
    return () => clearTimeout(timer);
  }, [score]);

  const getScoreColor = (score) => {
    if (score >= 80) return '#22c55e';
    if (score >= 60) return '#f59e0b';
    return '#ef4444';
  };

  const getScoreStatus = (score) => {
    if (score >= 80) return { text: 'Excellent', icon: TrendingUp };
    if (score >= 60) return { text: 'Good', icon: Minus };
    return { text: 'Needs Work', icon: TrendingDown };
  };

  const getCircumference = () => 2 * Math.PI * 45; // radius = 45
  const getStrokeDasharray = () => {
    const circumference = getCircumference();
    const progress = (animatedScore / 100) * circumference;
    return `${progress} ${circumference}`;
  };

  const status = getScoreStatus(score);
  const StatusIcon = status.icon;

  return (
    <div className={`score-card ${isVisible ? 'visible' : ''}`}>
      <h3>
        <Star size={20} />
        Resume Score
      </h3>
      <div className="score-display">
        <div className="score-circle-container">
          <svg className="score-circle-svg" width="120" height="120">
            <circle
              cx="60"
              cy="60"
              r="45"
              fill="none"
              stroke="rgba(226, 232, 240, 0.3)"
              strokeWidth="8"
            />
            <circle
              cx="60"
              cy="60"
              r="45"
              fill="none"
              stroke={getScoreColor(score)}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={getStrokeDasharray()}
              transform="rotate(-90 60 60)"
              className="score-progress"
            />
          </svg>
          <div className="score-content">
            <span className="score-number" style={{ color: getScoreColor(score) }}>
              {animatedScore}
            </span>
            <span className="score-total">/100</span>
          </div>
        </div>
        <div className="score-status" style={{ color: getScoreColor(score) }}>
          <StatusIcon size={16} />
          <span>{status.text}</span>
        </div>
      </div>
      <div className="score-breakdown">
        <div className="breakdown-item">
          <span>Content Quality</span>
          <div className="breakdown-bar">
            <div 
              className="breakdown-fill"
              style={{ 
                width: `${(Math.round(score * 0.4) / 40) * 100}%`,
                backgroundColor: getScoreColor(Math.round(score * 0.4) * 2.5)
              }}
            />
          </div>
          <span>{Math.round(score * 0.4)}/40</span>
        </div>
        <div className="breakdown-item">
          <span>Formatting</span>
          <div className="breakdown-bar">
            <div 
              className="breakdown-fill"
              style={{ 
                width: `${(Math.round(score * 0.3) / 30) * 100}%`,
                backgroundColor: getScoreColor(Math.round(score * 0.3) * 3.33)
              }}
            />
          </div>
          <span>{Math.round(score * 0.3)}/30</span>
        </div>
        <div className="breakdown-item">
          <span>Keywords</span>
          <div className="breakdown-bar">
            <div 
              className="breakdown-fill"
              style={{ 
                width: `${(Math.round(score * 0.3) / 30) * 100}%`,
                backgroundColor: getScoreColor(Math.round(score * 0.3) * 3.33)
              }}
            />
          </div>
          <span>{Math.round(score * 0.3)}/30</span>
        </div>
      </div>
    </div>
  );
};

export default ResumeScore;