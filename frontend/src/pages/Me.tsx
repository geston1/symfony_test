import React from 'react'
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth'
import Cabinet from "../components/Cabinet/Cabinet";

const Me = () => {

    const { logedin, logout } = useAuth();

    return (
        <div className='flex items-center justify-center'>
            <Cabinet/>
        </div>
    )
}

export default Me;