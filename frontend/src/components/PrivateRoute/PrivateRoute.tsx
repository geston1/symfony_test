import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

interface PrivateRouteProps{
    condition: boolean,
    redirect: string
}

const PrivateRoute = ({condition, redirect}: PrivateRouteProps) => {
    return condition ? <Outlet /> : <Navigate to={redirect} />;
}

export default PrivateRoute;