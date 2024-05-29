import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logoUser from './style/icon_profile.svg';
import { useState } from 'react';
import { RootState } from '../../store/store'
import './style/styleHeader.css';


function Header() {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const user = useSelector((state: RootState) => state.user.user);

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
    };
        
    const hideForm = () => {
        if (isFormVisible) {
            setIsFormVisible(false);
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
