import React, { useState } from 'react';
import { User, LogOut, Settings, FileText } from 'lucide-react';
import { useAuth } from '../AuthContext';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <div className="user-menu">
      <button
        className="user-menu-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="user-avatar">
          <User size={20} />
        </div>
        <span className="user-name">{user?.name || user?.email}</span>
      </button>

      {isOpen && (
        <div className="user-menu-dropdown">
          <div className="user-menu-header">
            <div className="user-info">
              <div className="user-avatar large">
                <User size={24} />
              </div>
              <div>
                <div className="user-name">{user?.name}</div>
                <div className="user-email">{user?.email}</div>
              </div>
            </div>
          </div>
          
          <div className="user-menu-items">
            <button className="user-menu-item">
              <FileText size={16} />
              <span>My Analyses</span>
            </button>
            <button className="user-menu-item">
              <Settings size={16} />
              <span>Settings</span>
            </button>
            <button className="user-menu-item logout" onClick={handleLogout}>
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;