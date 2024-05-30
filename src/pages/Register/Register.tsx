import React, { useState, useRef, useEffect } from 'react'
import {register} from '../../store/slice/userSlice'
import { useDispatch, useSelector } from 'react-redux';
import { auth, signUp, signInWithGoogle } from '../../firebase';
import googleLogo from './style/google-logo.png';
import './style/styleRegister.css'
import { RootState, AppDispatch } from '../../store/store';
import { useNavigate } from 'react-router-dom';




function Register() {
    const myRef = useRef(null);
    const user = useSelector((state: RootState) => state.user.user);
    const navigate = useNavigate();
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const dispatch = useDispatch<AppDispatch>();
    const userStatus = useSelector((state: RootState) => state.user.status);
    const userError = useSelector((state: RootState) => state.user.error);
    const [authSuccess, setAuthSuccess] = useState(false);

    
    const handleAuthSuccess = () => {
        console.log('handleAuthSuccess called'); 
        setAuthSuccess(true);
        setTimeout(() => {
            console.log('Navigating to home page'); 
            navigate('/');
        }, 2000);
    };

    const handlerRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (email.value && password.value) {
            dispatch(register({ email: email.value, password: password.value }));
        try {
            await signUp(email.value, password.value);
            setEmail({ value: '', error: '' });
            setPassword({ value: '', error: '' });
            console.log(setAuthSuccess);
            handleAuthSuccess(); 
        } catch (error) {
            console.error(error);
        }}
    };

        const handleGoogleSignIn = async (e: React.FormEvent) => {
            console.log('handleGoogleSignIn called');
            e.preventDefault();
            try {
                const user = await signInWithGoogle();
                if (user) {
                handleAuthSuccess(); 
            }
            } catch (error) {
                console.error('Sign in failed:', error);
            }
        };

    useEffect(() => {
        if (userStatus === 'succeeded') {
            handleAuthSuccess();
        }
    }, [userStatus, navigate, user]);
        
    return (
        <div className='register'>
            <>
                <p>Регистрация</p>
                <div className='register-email'>
                    <h1>Введите Email</h1>
                    <input 
                        type="email"
                        value={email.value}
                        onChange={(e) => setEmail({ ...email, value: e.target.value })}
                        placeholder='Введите email'
                        />
                    <h1>Введите пароль</h1>
                    <input 
                        type="password"
                        value={password.value}
                        onChange={(e) => setPassword({ ...password, value: e.target.value })}
                        placeholder='password'
                        />
                </div>
                    
                    
                    <div className='register-google'>
                        <p>Войдите через Google</p>
                        <img src={googleLogo} alt="Google Logo" onClick={handleGoogleSignIn} className='register-img'/>
                    </div>
                    <button onClick={handlerRegister} className='register-button'>Зарегистрироваться</button>
                        {userStatus === 'loading' && <p>Регистрация...</p>}
                        {userStatus === 'succeeded' && <p>Регистрация успешна!</p>}
                        {userStatus === 'failed' && <p>Ошибка регистрации: {userError}</p>}
                        {authSuccess && <p>Аутентификация прошла успешно!</p>} 
            </>
        </div>
    )
}

export default Register
