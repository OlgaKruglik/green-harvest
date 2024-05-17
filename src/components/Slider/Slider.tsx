import React from 'react'
import image1 from './style/image/image1.jpeg';
import image2 from './style/image/image2.jpg';
import image3 from './style/image/image3.jpg';
import image4 from './style/image/image4.jpg';
import image5 from './style/image/image5.jpg';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import './style/styleSlider.css'
import { useState } from 'react';
import { useEffect } from 'react';

function Slider() {
    const images = [image1, image2, image3, image4, image5];
    const [current, setCurrent] = useState(0);
    const numpics = images.length;
    const degInt = 360 / numpics;
    
    const galleryspin = (sign: '-' | '+') => {
    const newCurrent = sign === '-' ? (current - 1 + numpics) % numpics : (current + 1) % numpics;
    setCurrent(newCurrent);
    };

    const nextSlide = () => {
        setCurrent(current === images.length - 1 ? 0 : current + 1);
    };
        
    const prevSlide = () => {
        setCurrent(current === 0 ? images.length - 1 : current - 1);
    };

    return (
        <div id='carousel'>
            <div id='spinner' style={{ transform: `rotateY(${current * degInt}deg)` }}>
                {images.map((src, index) => (
                    <figure key={index} className={index === current ? 'current' : ''} style={{ transform: `rotateY(${index * degInt}deg)` }}>
                    <img src={src} alt={`Slide ${index}`} />
                </figure>
                ))}
            </div>
                <span style={{ float: 'left' }} className='ss-icon' onClick={() => galleryspin('-')}>
                    <FaAngleDoubleLeft />
                </span>
                <span style={{ float: 'right' }} className='ss-icon' onClick={() => galleryspin('+')}>
                    <FaAngleDoubleRight />
                </span>

                <div className='slider'>
                    <FaAngleDoubleLeft className='left-arrow' onClick={prevSlide} />
                    <FaAngleDoubleRight className='right-arrow' onClick={nextSlide} />
                    {images.map((src, index) => (
                    <div
                    className={index === current ? 'slide active' : 'slide'}
                    key={index}
                    >
                    {index === current && (
                    <img src={src} alt={`Slide ${index}`} />
                    )}
                    </div>
                    ))}
                </div>
        </div>
        
        );
}

export default Slider
