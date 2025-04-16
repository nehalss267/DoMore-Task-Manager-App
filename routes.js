import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './services/auth';

export const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
};

export const PublicRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? <Navigate to="/" /> : children;
};