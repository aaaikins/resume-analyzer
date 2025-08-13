import React from 'react';
import { Brain, Zap, Target } from 'lucide-react';
import { SignInButton, UserButton, useUser } from '@clerk/clerk-react';

const Header = () => {
  const { isSignedIn } = useUser();

  return (
    <>
      <header className="header">
        <div className="header-content">
          <div className="header-top">
            <div className="header-brand">
              <div className="header-icon">
                <Brain size={40} />
              </div>
              <h1>AI Resume Analyzer</h1>
            </div>
            <div className="header-auth">
              {isSignedIn ? (
                <UserButton afterSignOutUrl="/" />
              ) : (
                <SignInButton mode="modal">
                  <button className="auth-trigger">
                    <span>Sign In</span>
                  </button>
                </SignInButton>
              )}
            </div>
          </div>
          <p>Get instant AI-powered insights to optimize your resume for success</p>
          <div className="header-features">
            <div className="feature-item">
              <Zap size={16} />
              <span>Instant Analysis</span>
            </div>
            <div className="feature-item">
              <Target size={16} />
              <span>ATS Optimization</span>
            </div>
            <div className="feature-item">
              <Brain size={16} />
              <span>AI-Powered</span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;