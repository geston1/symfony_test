import React, {useEffect} from 'react'
import {logout} from "../../store/actions/auth";
import useAuth from "../../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

const Cabinet = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { logedin } = useAuth();

    //Redirect after logout
    useEffect(() => {
        if (!logedin)
            navigate('/login');
    }, [logedin]);

    return (
        <>
            <h1>Welcome</h1>
            <button onClick={() => dispatch(logout())}>Logout</button>
        </>
    )
}

export default Cabinet;