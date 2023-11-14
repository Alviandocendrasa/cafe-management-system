import React, {useContext} from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts';

const ProtectedRoute = ({ allowedRoles }) => {
    const { auth } = useContext(AuthContext);

    const location = useLocation();

    const getComponent = () => {        
        if (auth.isAuth && localStorage.getItem('jwtToken')){
            if (allowedRoles) {
                if(allowedRoles.includes(auth.role)) {                
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
