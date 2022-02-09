import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginConstants = {
    SIGN_IN: 'Sign In',
    EMAIL_ADDRESS: 'Email address',
    PASSWORD: 'Password'
}

const Login = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleInput = (e, inputType) => {
        const inputValue = e.target.value
        inputType === 'email' ? setEmail(inputValue) : setPassword(inputValue)
    }

    const handleSignIn = (e) => {
        e.preventDefault()
        navigate('/gallery')
    }

    return <div>
        <div className='row justify-content-center'>
            <div className='col-4 ps-4 pe-2 align-self-center'>
                <h1 className='font-weight-bold text-center mb-3'>{LoginConstants.SIGN_IN}</h1>
                <form onSubmit={handleSignIn}>
                    <div className='form-group mb-3'>
                        <label htmlFor='email-address' className='form-label'>{LoginConstants.EMAIL_ADDRESS}</label>
                        <input
                            className='form-control'
                            id='email-address'
                            placeholder='name@address.com'
                            value={email}
                            onChange={(e) => handleInput(e, 'email')}
                        />
                    </div>
                    <div className='form-group mb-3'>
                        <label htmlFor='password' className='form-label'>{LoginConstants.PASSWORD}</label>
                        <input
                            className='form-control'
                            id='password'
                            placeholder='Enter your password'
                            type='password'
                            value={password}
                            onChange={(e) => handleInput(e, 'password')}
                        />
                    </div>
                    <button
                        className='btn btn-lg w-100 btn-primary mb-3'
                    >
                        {LoginConstants.SIGN_IN}
                    </button>
                </form>
            </div>
            <img alt='Login background' className='col-8 vh-100' src='https://images.pexels.com/photos/1034662/pexels-photo-1034662.jpeg?cs=srgb&dl=pexels-jiarong-deng-1034662.jpg&fm=jpg' />
        </div>
    </div>
}


export default Login