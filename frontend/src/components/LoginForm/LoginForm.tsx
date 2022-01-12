import React from 'react'
import './LoginForm.scss'

function LoginForm() {
    return (
        <div className='w-full max-w-[450px]  rounded-lg p-5'>
            <div className='text-center font-[Roboto] text-3xl font-black mb-5 uppercase'>
                Custom Login
            </div>
            <form className='flex flex-col'>
                <input type="text" name="__username" placeholder='Username' max={20} required/>
                <input type="password" name='__password' placeholder='Password' max={20} required/>
                <button className='w-full transition-colors ease-linear duration-200 bg-[#6fb555] hover:bg-[#80d362] rounded-full h-12 text-white font-[Roboto] font-medium mt-10 uppercase'>Login</button>
            </form>
        </div>
    )
}

export default LoginForm
