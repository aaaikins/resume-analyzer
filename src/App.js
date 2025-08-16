import React, { useEffect, useState } from 'react';
import './App.css';
import { ClerkProvider, SignedIn, SignedOut, useUser } from '@clerk/clerk-react';
import FileUpload from './components/FileUpload';
import AnalysisResults from './components/AnalysisResults';
import LoadingAnalysis from './components/LoadingAnalysis';
import Header from './components/Header';
import ResumeVersions from './components/ResumeVersions';
import { getResumeVersions } from './services/awsService';

const publishableKey =
  process.env.REACT_APP_CLERK_PUBLISHABLE_KEY ||
  process.env.VITE_CLERK_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
  '';

const AppContent = () => {
  const [analysisData, setAnalysisData] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [resumeVersions, setResumeVersions] = useState([]);
  const { isLoaded, user } = useUser();

  // Load versions dynamically for the signed-in user
  useEffect(() => {
    const loadVersions = async () => {
      if (!user?.id) return;
      try {
        const resp = await getResumeVersions(user.id);
        const list = Array.isArray(resp?.versions) ? resp.versions : [];
        setResumeVersions(list);
      } catch (e) {
        // If the API is not configured, the service returns mock results; keep empty list
        console.warn('Unable to load resume versions; showing none for now.', e);
      }
    };
    if (isLoaded) {
      loadVersions();
    }
  }, [isLoaded, user?.id]);

  const handleAnalysisComplete = (data) => {
    setAnalysisData(data);
    setIsAnalyzing(false);
  };

  const handleAnalysisStart = () => {
    setIsAnalyzing(true);
    setAnalysisData(null);
  };
  
  const handleVersionSaved = (newVersion) => {
    // Optimistically add the new version to the list
    setResumeVersions((prev) => [
      { ...newVersion, id: newVersion.id || Date.now() },
      ...prev,
    ]);
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
  if (!publishableKey) {
    return (
      <div className="App">
        <div className="error-message">
          <h2>Configuration Error</h2>
          <p>Missing Clerk publishable key. Please check your environment variables.</p>
        </div>
      </div>
    );
  }

  return (
    <ClerkProvider publishableKey={publishableKey}>
      <AppContent />
    </ClerkProvider>
  );
}

export default App;
