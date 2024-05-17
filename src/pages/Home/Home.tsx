import React from 'react'
import './style/styleHome.css'
import Slider from '../../components/Slider/Slider'
import Favorits from '../../components/Favorits/Favorits'
import eko from '../../image/hq720.jpg'
import seed from '../../image/1.jpg'
import planting from '../../image/3.jpg'
import germination from '../../image/2.jpg'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'

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
           <div className='blog'>
                <h1 className='h1-main'>инфо блоки</h1>
                    <div className="line"> </div>
                <div className='home-blog'> 
                    <div className='blok-link'>
                        <Link to='/mistakes'><img src={eko} alt="Eko"  className='blog-img'/></Link> 
                    </div>
                    <div className='blok-link'>
                        <Link to='/cultivation'><img src={seed} alt="seed"  className='blog-img'/></Link>
                    </div>
                    <div className='blok-link'>
                        <Link to='/plantingSeeds'><img src={planting} alt="seed"  className='blog-img'/></Link>
                    </div>
                    <div className='blok-link'>
                        <Link to='/seedGermination'><img src={germination} alt="seed"  className='blog-img'/></Link>
                    </div>
                </div>
           </div>

           <Footer />
        </div>
    )
}

export default Home
