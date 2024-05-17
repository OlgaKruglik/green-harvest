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
            <ul className='list-header'>
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
            <div className='menu-burger'>
            <div className="menu">
            <input type="checkbox" id="burger-checkbox" className="burger-checkbox"/>
                <label htmlFor="burger-checkbox" className="burger"/>
                <ul className="menu-list">
                    <li>
                        <Link to='/' className="menu-item">Главная</Link>
                    </li>
                    <li>
                        <Link to='/seeds' className="menu-item">Семена</Link>
                    </li>
                    <li>
                    <Link to='/seedlings' className="menu-item">Саженцы</Link>
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
