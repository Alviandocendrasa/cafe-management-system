import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
    const location = useLocation();

    const getComponent = () => {        
        const authObj = JSON.parse(localStorage.getItem("auth"));
        
        if (authObj.isAuth && localStorage.getItem('jwtToken')){
            if (allowedRoles) {
                if(allowedRoles.includes(authObj.role)) {                
                    return <Outlet />
                } else {
                    return <Navigate to="/" state={{from: location}} replace />
                }
            } else {                
                return <Outlet />
            }
        }              

        return <Navigate to="/login" state={{from: location}} replace />
    }

    return getComponent()
};

export default ProtectedRoute;
