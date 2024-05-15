import React from 'react'
import './style/styleHome.css'
import Slider from '../../components/Slider/Slider'
import Favorits from '../../components/Favorits/Favorits'

function Home() {

    return (
        <div className='home-main'>
            <div className='welcome'>
                <div className='wrapper_main'>
                <h1 className="into_title">Добро пожаловать</h1>
                </div>
            </div>

            <div className='about'>
                <h1>О нас</h1>
                <div className="line"> </div>
                <p>Зелёный Урожай — ваша гарантия спокойствия за плоды труда на земле.</p>
            </div>
            <Slider />
            
            <Favorits />
            <h1 className='h1-main'>инфо блоки</h1>
           <div className='home-blog'>
                <div className='blog'>
                    <h1>О посеве в каждом районе</h1>
                </div>
                <div className='blog'>
                    <h1>Экономте время</h1>
                </div>
                <div className='blog'>
                    <h1>Будьте в курсе событий</h1>
                </div>
                <div className='blog'>
                    <h1>Защита от болезней</h1>
                </div>
           </div>
        </div>
    )
}

export default Home
