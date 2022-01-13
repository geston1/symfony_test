import React, {useEffect} from 'react';
import LoginForm from '../components/LoginForm/LoginForm';
import useAuth from "../hooks/useAuth";
import {Navigate} from "react-router";

const Login = () => {
    const { logedin } = useAuth();

    return (
        <div className='w-full h-full flex items-center justify-center'>
            <LoginForm/>
        </div>
    )
}

export default Login
