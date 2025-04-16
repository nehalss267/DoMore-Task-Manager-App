import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/auth';
import AuthForm from '../components/Auth/AuthForm';
import '../styles/entry-page.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row height-full">
      <div className="left-column flex flex-column height-full justify-center items-center">
        <h1 className="welcoming-title">Do More</h1>
        <h1 className="welcoming-title">The Minimalist Task Manager App</h1>
        
        <AuthForm 
          type="login"
          email={email}
          password={password}
          error={error}
          loading={loading}
          showPassword={showPassword}
          onEmailChange={(e) => setEmail(e.target.value)}
          onPasswordChange={(e) => setPassword(e.target.value)}
          onTogglePassword={() => setShowPassword(!showPassword)}
          onSubmit={handleSubmit}
        />
        
        <p className="sign-up-prompt">
          Don't have an account?
          <a href="/signup" className="sign-up-link">Sign up</a>
        </p>
      </div>
      <div className="right-column"></div>
    </div>
  );
};

export default LoginPage;
