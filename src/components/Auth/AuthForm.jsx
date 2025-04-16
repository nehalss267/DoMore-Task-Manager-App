import React from 'react';
// import iconify from 'iconify-icon';

const AuthForm = ({
  type,
  email,
  password,
  confirmPassword,
  error,
  loading,
  showPassword,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onTogglePassword,
  onSubmit
}) => {
  return (
    <form className="form" onSubmit={onSubmit} autocomplete="off">
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      <label htmlFor="email" className="label">Email</label>
      <input 
        type="email" 
        name="email" 
        id="email" 
        className="input" 
        value={email}
        onChange={onEmailChange}
        required 
      />

      <div className="input-container">
        <label htmlFor="password" className="label">Password</label>
        <input 
          type={showPassword ? "text" : "password"} 
          name="password" 
          id="password" 
          className="input" 
          value={password}
          onChange={onPasswordChange}
          required 
        />
        <div className="password-toggle" onClick={onTogglePassword}>
          <iconify-icon 
            icon={showPassword ? "mdi:eye-off-outline" : "mdi:eye-outline"} 
            width="20" 
            height="20"
          ></iconify-icon>
        </div>
      </div>

      {type === 'signup' && (
        <>
          <label htmlFor="confirmPassword" className="label">Confirm Password</label>
          <input 
            type={showPassword ? "text" : "password"} 
            name="confirmPassword" 
            id="confirmPassword" 
            className="input" 
            value={confirmPassword}
            onChange={onConfirmPasswordChange}
            required 
          />
        </>
      )}

      <button 
        type="submit" 
        className={`button regular-button pink-background cta-btn ${loading ? 'loading' : ''}`}
        disabled={loading}
      >
        {type === 'login' ? 'Log in' : 'Sign up'}
      </button>
    </form>
  );
};

export default AuthForm;
