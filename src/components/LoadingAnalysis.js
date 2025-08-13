import React from 'react';
import { Brain, Zap, Target, CheckCircle } from 'lucide-react';

const LoadingAnalysis = () => {
  const steps = [
    { icon: Brain, text: 'Processing document...', delay: '0s' },
    { icon: Zap, text: 'Analyzing content...', delay: '1s' },
    { icon: Target, text: 'Calculating scores...', delay: '2s' },
    { icon: CheckCircle, text: 'Generating insights...', delay: '3s' }
  ];

  return (
    <div className="loading-analysis">
      <div className="loading-header">
        <div className="loading-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
        <h3>Analyzing Your Resume</h3>
        <p>Our AI is working hard to provide you with detailed insights</p>
      </div>
      
      <div className="loading-steps">
        {steps.map((step, index) => {
          const IconComponent = step.icon;
          return (
            <div 
              key={index} 
              className="loading-step"
              style={{ animationDelay: step.delay }}
            >
              <div className="step-icon">
                <IconComponent size={20} />
              </div>
              <span className="step-text">{step.text}</span>
            </div>
          );
        })}
      </div>
      
      <div className="loading-progress">
        <div className="progress-bar">
          <div className="progress-fill"></div>
        </div>
        <p className="progress-text">This usually takes 10-15 seconds</p>
      </div>
    </div>
  );
};

export default LoadingAnalysis;