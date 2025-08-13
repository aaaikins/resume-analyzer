import React, { useState } from 'react';
import './App.css';
import { ClerkProvider, SignedIn, SignedOut, useUser } from '@clerk/clerk-react';
import FileUpload from './components/FileUpload';
import AnalysisResults from './components/AnalysisResults';
import LoadingAnalysis from './components/LoadingAnalysis';
import Header from './components/Header';
import ResumeVersions from './components/ResumeVersions';

const publishableKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

const AppContent = () => {
  const [analysisData, setAnalysisData] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { isLoaded } = useUser();
  
  // Sample resume versions data - in a real app, this would come from your backend
  const [resumeVersions] = useState([
    {
      id: 1,
      name: 'Software Engineer Resume',
      uploadDate: '2024-01-15',
      score: 85,
      atsScore: 78,
      jobMatch: 92,
      keywordCount: 24,
      improvements: ['Added technical skills section', 'Improved formatting for ATS compatibility']
    },
    {
      id: 2,
      name: 'Updated Resume v2',
      uploadDate: '2024-01-10',
      score: 72,
      atsScore: 65,
      jobMatch: 78,
      keywordCount: 18,
      improvements: ['Enhanced work experience descriptions', 'Added quantifiable achievements']
    },
    {
      id: 3,
      name: 'Initial Resume',
      uploadDate: '2024-01-05',
      score: 58,
      atsScore: 45,
      jobMatch: 62,
      keywordCount: 12,
      improvements: ['Basic formatting improvements needed', 'Missing key technical skills']
    }
  ]);

  const handleAnalysisComplete = (data) => {
    setAnalysisData(data);
    setIsAnalyzing(false);
  };

  const handleAnalysisStart = () => {
    setIsAnalyzing(true);
    setAnalysisData(null);
  };
  
  const handleVersionSaved = (newVersion) => {
    // In a real app, you would refresh the versions from the backend
    // For now, we'll just log it
    console.log('New version saved:', newVersion);
  };

  if (!isLoaded) {
    return (
      <div className="App">
        <div className="loading-app">
          <div className="loading-spinner">
            <div className="spinner-ring"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <SignedIn>
          <FileUpload 
            onAnalysisStart={handleAnalysisStart}
            onAnalysisComplete={handleAnalysisComplete}
            onVersionSaved={handleVersionSaved}
            isAnalyzing={isAnalyzing}
          />
          {isAnalyzing && <LoadingAnalysis />}
          {analysisData && !isAnalyzing && <AnalysisResults data={analysisData} />}
          <ResumeVersions versions={resumeVersions} />
        </SignedIn>
        <SignedOut>
          <div className="welcome-message">
            <h2>Welcome to AI Resume Analyzer</h2>
            <p>Sign in to start analyzing your resume and get AI-powered insights to boost your career prospects.</p>
          </div>
        </SignedOut>
      </main>
    </div>
  );
};

function App() {
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <AppContent />
    </ClerkProvider>
  );
}

export default App;
