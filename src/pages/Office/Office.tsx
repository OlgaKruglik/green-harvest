import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, signInWithGoogleThunk } from '../../store/slice/userSlice';
import googleLogo from './style/google-logo.png';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../../store/store';

function Office() {

    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const userStatus = useSelector((state: RootState) => state.user.status);
    const userError = useSelector((state: RootState) => state.user.error);
    const user = useSelector((state: RootState) => state.user)

    
    
    const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.value && password.value) {
    dispatch(login({ email: email.value, password: password.value }));
    console.log(user);
    }
    };
    
    const handleGoogleSignIn = async (e: React.MouseEvent<HTMLImageElement>) => {
        e.preventDefault();
        try {
            dispatch(signInWithGoogleThunk());
            console.log(user);
        } catch (error) {
            console.error('Ошибка авторизации через Google:', error);
        }
        console.log(signInWithGoogleThunk());
        console.log(userStatus);
    };

        useEffect(() => {
            if (userStatus === 'succeeded') {
            navigate('/'); 
            }
            }, [userStatus, navigate]);

    return (
        <div className='register'>
            <p>Авторизация</p>
            <form onSubmit={loginHandler} className='register-email'>
            <h1>Введите Email</h1>
                <input 
                type='email'
                value={email.value}
                onChange={(e) => setEmail({ ...email, value: e.target.value })}
                placeholder='Введите email'
                required />

            <h1>Введите пароль</h1>

                <input 
                type='password'
                value={password.value}
                onChange={(e) => setPassword({ ...password, value: e.target.value })}
                placeholder='password'
                required />
                <div className='register-google'>
                    <p>Войти через Google</p>
                    <img src={googleLogo} alt="Google Logo" onClick={handleGoogleSignIn} className='register-img'/>
                </div>
                <button type='submit'>Авторизоваться</button>
                {userStatus === 'loading' && <p>Авторизация...</p>}
                {userStatus === 'succeeded' && <p>Добро пожаловать!</p>}
                {userStatus === 'failed' && <p>Ошибка Авторизации: {userError}</p>}
            </form>
        </div>
    )
}

export default Office
