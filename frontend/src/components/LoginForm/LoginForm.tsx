import React, {useEffect, useState} from 'react'
import './LoginForm.scss'
import useAuth from "../../hooks/useAuth";
import {useNavigate} from "react-router-dom";

function LoginForm() {

    /**
     * Hooks
     */

    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const {login, logedin} = useAuth();
    const [fields, setFields] = useState({
        __username: '',
        __password: ''
    })

    //Redirect after auth
    useEffect(() => {
        if (logedin)
            navigate('/');
        setLoading(false);
    }, [logedin]);

    /**
     * Event Handlers
     */

    const onChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFields({
            ...fields,
            [e.target.name]: e.currentTarget.value
        })
    }

    const onSubmitEvent = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        login(fields.__username, fields.__password);
        setLoading(true);
    }

    /**
     * Render
     */

    return (
        <div className='w-full max-w-[450px]  rounded-lg p-5'>
            <div className='text-center font-[Roboto] text-3xl font-black mb-5 uppercase'>
                Custom Login
            </div>
            <form className='flex flex-col' onSubmit={onSubmitEvent}>
                <input type="text" name="__username" value={fields.__username} onChange={onChangeEvent} placeholder='Username' max={20} required/>
                <input type="password" name="__password" value={fields.__password} onChange={onChangeEvent} placeholder='Password' max={20} required/>
                <button type="submit" className='w-full transition-colors ease-linear duration-200 bg-[#6fb555] hover:bg-[#80d362] rounded-full h-12 text-white font-[Roboto] font-medium mt-10 uppercase' disabled={loading}>
                    { loading ? <i className="fa fa-circle-o-notch fa-spin text-2xl"/> : 'Login'}
                </button>
            </form>
        </div>
    )
}

export default LoginForm
