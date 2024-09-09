import React from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../../services/authService'
const ProtectedRoute = ({ children }) => {
    const isAuthenticated = authService.isAuthenticated()
    console.log('ProtectedRoute, user is ',{isAuthenticated});
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;