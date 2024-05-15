import React from 'react'
import image1 from './style/image/image1.jpeg';
import image2 from './style/image/image2.jpg';
import image3 from './style/image/image3.jpg';
import image4 from './style/image/image4.jpg';
import image5 from './style/image/image5.jpg';
import './style/styleSlider.css'
import { useState } from 'react';
import { useEffect } from 'react';

function Slider() {
    const images = [image1, image2, image3, image4, image5];
    const [index, setIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(true);

    useEffect(() => {
    const intervalId = isAnimating ? setInterval(() => {
    setIndex((prevIndex) => (prevIndex + 2) % images.length);
    }, 3000) : null; // Изменение изображений каждые 3 секунды
    
    return () => {
    if (intervalId) {
    clearInterval(intervalId);
    }
    };
    }, [index, isAnimating]);
    
    const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 2) % images.length);
    setIsAnimating(false);
    };
    
    const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex - 2 + images.length) % images.length);
    setIsAnimating(false);
    };
    return (
        <div className='slider'>
            <div className='slide' style={{ backgroundImage: `url(${images[index]})` }}></div>
            <div className='slide' style={{ backgroundImage: `url(${images[(index + 1) % images.length]})` }}></div>
            <button className='prev' onClick={prevSlide}>
                <i className="fas fa-chevron-left"></i>
            </button>
            <button className='next' onClick={nextSlide}>
                <i className="fas fa-chevron-right"></i>
            </button>
        </div>
    );
}

export default Slider
