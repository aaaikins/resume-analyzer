import React, { useState } from 'react';
import { X } from 'lucide-react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ConfirmationForm from './ConfirmationForm';

const AuthModal = ({ isOpen, onClose }) => {
  const [currentView, setCurrentView] = useState('login');
  const [confirmationEmail, setConfirmationEmail] = useState('');

  if (!isOpen) return null;

  const handleSwitchToRegister = () => setCurrentView('register');
  const handleSwitchToLogin = () => setCurrentView('login');
  const handleSwitchToConfirm = (email) => {
    setConfirmationEmail(email);
    setCurrentView('confirm');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'register':
        return (
          <RegisterForm
            onSwitchToLogin={handleSwitchToLogin}
            onSwitchToConfirm={handleSwitchToConfirm}
          />
        );
      case 'confirm':
        return (
          <ConfirmationForm
            email={confirmationEmail}
            onSwitchToLogin={handleSwitchToLogin}
          />
        );
      default:
        return (
          <LoginForm
            onSwitchToRegister={handleSwitchToRegister}
          />
        );
    }
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose}>
          <X size={24} />
        </button>
        {renderCurrentView()}
      </div>
    </div>
  );
};

export default AuthModal;