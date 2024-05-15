import React from 'react';
import { Link } from 'react-router-dom'
import logoUser from './style/icon_profile.svg';
import { useState } from 'react';
import './style/styleHeader.css'


function Header() {
    const [isFormVisible, setIsFormVisible] = useState(false);

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
            <ul>
                <li>
                    <Link to='/'>Главнaя</Link>
                </li>
                <li>
                    <Link to='/seeds' >Семена</Link>
                </li>
                <li>
                    <Link to='/seedlings' >Саженцы</Link>
                </li>
                    
                    
            </ul>
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
    )
}

export default Header
