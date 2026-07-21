import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedRoutes = ({children}) => {
  const {user,loading}=useAuth();
  const location = useLocation();

  if(!user){
    // toast.info("Please sign in to continue.", { toastId: 'auth-required' });
    return( <Navigate to="/login" state={{ from: location }} replace />
  );}

  return children;
}

export default ProtectedRoutes;