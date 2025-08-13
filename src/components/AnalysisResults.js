import React, { useEffect, useState } from 'react';
import { Heart, Users, Key, TrendingUp, Sparkles } from 'lucide-react';
import ResumeScore from './ResumeScore';
import JobMatch from './JobMatch';
import SkillsGap from './SkillsGap';
import ATSOptimization from './ATSOptimization';

const AnalysisResults = ({ data }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'POSITIVE': return <TrendingUp className="sentiment-positive" />;
      case 'NEGATIVE': return <TrendingUp className="sentiment-negative" style={{ transform: 'rotate(180deg)' }} />;
      default: return <TrendingUp className="sentiment-neutral" />;
    }
  };

  const getSentimentClass = (sentiment) => {
    switch (sentiment) {
      case 'POSITIVE': return 'sentiment-positive';
      case 'NEGATIVE': return 'sentiment-negative';
      default: return 'sentiment-neutral';
    }
  };

  return (
    <div className={`results-container ${isVisible ? 'visible' : ''}`}>
      <div className="results-header">
        <Sparkles className="results-icon" size={24} />
        <h2>Analysis Results</h2>
        <p>Here's what our AI discovered about your resume</p>
      </div>
      
      {/* Core Features Row */}
      <div className="core-features">
        <ResumeScore score={data.resumeScore} />
        <JobMatch matchData={data.jobMatch} />
        <SkillsGap skillsData={data.skillsGap} />
        <ATSOptimization atsData={data.atsOptimization} />
      </div>

      {/* Original Analysis Grid */}
      <div className="results-grid">
        <div className="result-card">
          <h3>
            <Heart size={20} />
            Sentiment Analysis
          </h3>
          <div className={getSentimentClass(data.sentiment.sentiment)}>
            {getSentimentIcon(data.sentiment.sentiment)}
            <strong>{data.sentiment.sentiment}</strong>
            <span className="confidence">
              {Math.round(data.sentiment.confidence * 100)}% confidence
            </span>
          </div>
        </div>

        <div className="result-card">
          <h3>
            <Users size={20} />
            Key Entities
          </h3>
          {data.entities.map((entity, index) => (
            <div key={index} className="entity-item">
              <div className="entity-type">{entity.type}</div>
              <div>{entity.text}</div>
              <div className="confidence">{Math.round(entity.confidence * 100)}%</div>
            </div>
          ))}
        </div>

        <div className="result-card">
          <h3>
            <Key size={20} />
            Key Phrases
          </h3>
          {data.keyPhrases.map((phrase, index) => (
            <div key={index} className="phrase-item">
              <div>{phrase.text}</div>
              <div className="confidence">{Math.round(phrase.confidence * 100)}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;