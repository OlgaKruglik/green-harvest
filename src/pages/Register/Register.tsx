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
    console.log(myRef);
    const navigate = useNavigate();
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const dispatch = useDispatch<AppDispatch>();
    const userStatus = useSelector((state: RootState) => state.user.status);
    const userError = useSelector((state: RootState) => state.user.error);



    const handlerRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (email.value && password.value) {
            dispatch(register({ email: email.value, password: password.value }))
        try {
        await signUp(email.value, password.value);
        setEmail({ value: '', error: '' });
        setPassword({ value: '', error: '' });
        } catch (error) {
        console.error(error);
        }
        }
        };

        useEffect(() => {
            if (userStatus === 'succeeded') {
            navigate('/'); // Перенаправление на главную страницу
            }
            }, [userStatus, navigate]);
        
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
                        <img src={googleLogo} alt="Google Logo" onClick={signInWithGoogle} className='register-img'/>
                    </div>
                    <button onClick={handlerRegister}>Зарегистрироваться</button>
                    {userStatus === 'loading' && <p>Регистрация...</p>}
                    {userStatus === 'succeeded' && <p>Регистрация успешна!</p>}
                    {userStatus === 'failed' && <p>Ошибка регистрации: {userError}</p>}
                </>
            
        </div>
    )
}

export default Register
