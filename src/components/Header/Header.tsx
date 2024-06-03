import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../store/slice/userSlice';
import logoUser from './style/icon_profile.svg';
import { useState } from 'react';
import { RootState } from '../../store/store'
import {signInWithGoogle} from '../../firebase'
import './style/styleHeader.css';


function Header() {
    const [isFormVisible, setIsFormVisible] = useState(false);
    // const user = useSelector((state: RootState) => state.user.user);
    const user = useSelector((state: RootState) => {
        console.log(state.user.user); // Для отладки
        return state.user.user;
        });
    const dispatch = useDispatch();
    
    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
        console.log(setIsFormVisible);
    };

    

    const handleGoogleSignIn = async () => {
        console.log('Начало входа через Google');
        try {
        const result = await signInWithGoogle();
        console.log('Результат входа через Google:', result);
        if (result) {
        console.log('Пользователь успешно вошел через Google:', result);
        dispatch(setUser({ uid: result.uid, email: result.email }));
        }
        } catch (error) {
        console.error('Ошибка при входе через Google:', error);
        }
        };

        useEffect(() => {
            const savedUser = localStorage.getItem('user');
            if (savedUser) {
                const userObject = JSON.parse(savedUser);
                dispatch(setUser(userObject));
            }
        }, [dispatch]);


    useEffect(() => { 
        if (user) {
            handleGoogleSignIn(); 
            console.log('Пользователь успешно зарегистрирован');
        }
    }, [user]);

    const hideForm = () => {
        if (isFormVisible) {
            setIsFormVisible(false);
            localStorage.clear();
        }
    };


    return (
        <div className='header-link' onClick={hideForm}>
            <h1>Зелёный Урожай</h1>
            <ul className='list-header' data-title={!user ? 'Зарегистрируйтесь или войдите в личный кабинет' : ''}>
                <li>
                    <Link to='/'>Главнaя</Link>
                  </li>
                <li className={!user ? 'inactive' : ''}>
                    <Link to='/seeds'>Семена</Link>
                </li>
                <li className={!user ? 'inactive' : ''}>
                    <Link to='/seedlings'>Саженцы</Link>
                </li>
            </ul>
            <div className='menu-burger'>
                <div className="menu">
                    <input type="checkbox" id="burger-checkbox" className="burger-checkbox"/>
                        <label htmlFor="burger-checkbox" className="burger"/>
                        <ul className="menu-list" data-title={!user ? 'Зарегистрируйтесь или войдите в личный кабинет' : ''}>
                            <li>
                                <Link to='/' className="menu-item">Главная</Link>
                            </li>
                            <li className={!user ? 'inactive' : ''}>
                                <Link to='/seeds'>Семена</Link>
                            </li>
                            <li className={!user ? 'inactive' : ''}>
                                <Link to='/seedlings'>Саженцы</Link>
                            </li>
                        </ul>
                </div>
            
                <img src={logoUser} alt="Logo" onClick={(e) => {
                    e.stopPropagation();
                    toggleFormVisibility();
                }} className='register-img'/>

                {isFormVisible && (
                    <div className="logo-form">
                    <h1>Profile</h1>
                    <div className="line"></div>
                        <Link to='/office'>Личный кабинет</Link>
                        <Link to='user/register'>Зарегистрироваться</Link>
                        <h1 onClick={hideForm} className='logo-form-exit'>Выйти</h1>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Header
