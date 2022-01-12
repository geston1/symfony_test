import React, {useRef, useState} from 'react'
import './LoginForm.scss'
import useAuth from "../../hooks/useAuth";

function LoginForm() {

    const {login, token} = useAuth();

    const [fields, setFields] = useState({
        __username: '',
        __password: ''
    })

    const onChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFields({
            ...fields,
            [e.target.name]: e.currentTarget.value
        })
    }

    const onSubmitEvent = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        login(fields.__username, fields.__password);
    }

    return (
        <div className='w-full max-w-[450px]  rounded-lg p-5'>
            <div className='text-center font-[Roboto] text-3xl font-black mb-5 uppercase'>
                Custom Login
            </div>
            <form className='flex flex-col' onSubmit={onSubmitEvent}>
                <input type="text" name="__username" value={fields.__username} onChange={onChangeEvent} placeholder='Username' max={20} required/>
                <input type="password" name="__password" value={fields.__password} onChange={onChangeEvent} placeholder='Password' max={20} required/>
                <button type="submit" className='w-full transition-colors ease-linear duration-200 bg-[#6fb555] hover:bg-[#80d362] rounded-full h-12 text-white font-[Roboto] font-medium mt-10 uppercase'>Login</button>
            </form>
        </div>
    )
}

export default LoginForm
