import React, { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';
const GuestRoute = ({ children }) => {

    const { user, loading } = useAuth();
    // const navigate = useNavigate()
    if(loading){
        return null;
    }
    if (user) {
        return <Navigate to="/" replace />

    }

    return children;
}

export default GuestRoute