import React, { useState } from 'react';
import { Shield, Loader2 } from 'lucide-react';
import { useAuth } from '../AuthContext';

const ConfirmationForm = ({ email, onSwitchToLogin }) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { confirmSignUp } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await confirmSignUp(email, code);
      onSwitchToLogin();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <div className="auth-header">
        <h2>Verify Your Email</h2>
        <p>We sent a confirmation code to <strong>{email}</strong></p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form-content">
        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="code">Confirmation Code</label>
          <div className="input-wrapper">
            <Shield size={20} className="input-icon" />
            <input
              id="code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter 6-digit code"
              maxLength="6"
              required
            />
          </div>
        </div>

        <button type="submit" className="auth-submit" disabled={loading}>
          {loading ? (
            <div className="loading">
              <Loader2 size={20} />
              Verifying...
            </div>
          ) : (
            'Verify Email'
          )}
        </button>
      </form>

      <div className="auth-footer">
        <p>
          Didn't receive the code?{' '}
          <button type="button" className="auth-link">
            Resend
          </button>
        </p>
        <p>
          <button type="button" onClick={onSwitchToLogin} className="auth-link">
            Back to Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default ConfirmationForm;