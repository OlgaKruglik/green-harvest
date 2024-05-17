import React from 'react'
import './style/Footer.css'
import { FaTwitter, FaInstagram, FaFacebookF } from 'react-icons/fa';

function Footer() {
    return (
        <div className='footer'>
            <div className='footer-info'>
                <div className='footer-top'>
                    <p>Юр.адрес: 211177, Витебская обл., Лепельский район, Стайский с/с д.Кривцы</p>
                </div>
                <div className='footer-top'>
                    <p className='footer-p'>Наши контакты: +375298996969<br/>
                +375292158989</p>
                </div>
            </div>

            <div className='social-media'>
                <div className='favicon-media'>
                    <a href='https://twitter.com/yourprofile' target='_blank' rel='noopener noreferrer' className='social-media-favicon'><FaTwitter /></a>
                    <a href='https://instagram.com/yourprofile' target='_blank' rel='noopener noreferrer' className='social-media-favicon'><FaInstagram /></a>
                    <a href='https://facebook.com/yourprofile' target='_blank' rel='noopener noreferrer' className='social-media-favicon'><FaFacebookF /></a>
                </div>
                <div>
                    <p>ВСЕ ДЛЯ САДА и огорода</p>
                </div>
            </div>

            <div className="line-footer"></div>
            <div className='footer-bottom'>
                <p>2024</p>
                <p>Innodom</p>
                <p>Круглик Ольга</p>
            </div>
        </div>
        )
}

export default Footer
