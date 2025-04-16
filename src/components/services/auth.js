import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const SESSION_EXPIRY_HOURS = 24;
const SESSION_WARNING_MINUTES = 5;

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [sessionWarning, setSessionWarning] = useState(false);

  useEffect(() => {
    // Check for existing session on load
    const session = JSON.parse(localStorage.getItem('currentSession'));
    if (session && session.expires > Date.now()) {
      setCurrentUser(session.email);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.email === email);
      
      if (!user) throw new Error('User not found');
      if (user.password !== password) throw new Error('Incorrect password');
      
      createSession(email);
      return true;
    } catch (error) {
      throw error;
    }
  };

  const signup = async (email, password) => {
    try {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      if (users.some(u => u.email === email)) {
        throw new Error('User already exists');
      }
      
      users.push({ email, password });
      localStorage.setItem('users', JSON.stringify(users));
      createSession(email);
      return true;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('currentSession');
    localStorage.removeItem('userEmail');
    setCurrentUser(null);
  };

  const createSession = (email) => {
    const session = {
      email,
      token: 'simulated-token-' + Math.random().toString(36).substr(2),
      expires: Date.now() + (SESSION_EXPIRY_HOURS * 60 * 60 * 1000)
    };
    localStorage.setItem('currentSession', JSON.stringify(session));
    localStorage.setItem('userEmail', email);
    setCurrentUser(email);
  };

  const checkSessionTimeout = () => {
    const session = JSON.parse(localStorage.getItem('currentSession'));
    if (!session || session.expires < Date.now()) {
      logout();
      return false;
    }

    const warningTime = SESSION_WARNING_MINUTES * 60 * 1000;
    const timeLeft = session.expires - Date.now();
    
    if (timeLeft < warningTime && timeLeft > 0) {
      setSessionWarning(true);
    } else if (timeLeft <= 0) {
      logout();
    }
    return true;
  };

  const extendSession = () => {
    const session = JSON.parse(localStorage.getItem('currentSession'));
    if (session) {
      session.expires = Date.now() + (SESSION_EXPIRY_HOURS * 60 * 60 * 1000);
      localStorage.setItem('currentSession', JSON.stringify(session));
      setSessionWarning(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      login, 
      signup, 
      logout, 
      checkSessionTimeout,
      sessionWarning,
      extendSession
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
