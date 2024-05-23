import React from 'react'
import './style/styleFavorits.css'
import { useState, useEffect } from 'react';
import useSeeds from '../../hooks/useSeeds';




function Favorits() {
    const [showSeeds, setShowSeeds] = useState(false);
    const [showSaplings, setShowSaplings] = useState(false);
    const seeds = useSeeds();
    
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
        if (name === 'seed') {
            setShowSeeds(checked);
            setShowSaplings(!checked);
        } else if (name === 'seedling') {
            setShowSaplings(checked);
            setShowSeeds(!checked);
        }
    };

    
    const filteredSeeds = seeds.filter(seed => seed.type === 'seeds' && parseFloat(seed.rating) > 4.7);
    const filteredSaplings = seeds.filter(seed => seed.type === 'seedlings' && parseFloat(seed.rating) > 4.7);
    
    return (
    <div className='favoritos'>
        <h1>Популярное</h1>
        <div className="line"></div>
    
        <div className="popular">
        <div className="radio-item">
            <input type="checkbox" id="seed" name="seed" value="seed" onChange={handleCheckboxChange} />
            <label htmlFor="seed"><span title="seed">Семена</span></label>
        </div>
    
        <div className="radio-item">
            <input type="checkbox" id="seedling" name="seedling" value="seedling" onChange={handleCheckboxChange} />
            <label htmlFor="seedling"><span title="seedling">Саженцы</span></label>
        </div>
    </div>
    
    <div className='favorits-item'>
        {showSeeds && filteredSeeds.map((seed) => (
            <div className={`item ${seed.type}`} key={seed.id}>
                <h1>{seed.name}</h1>
                <p>{seed.description}</p>
                <img src={seed.image} alt={seed.name} />
            </div>
        ))}
    
    {showSaplings && filteredSaplings.map((seed) => (
        <div className={`item ${seed.type}`} key={seed.id}>
            <h1>{seed.name}</h1>
            <p>{seed.description}</p>
            <img src={seed.image} alt={seed.name} />
        </div>
    ))}
    
    {!showSeeds && !showSaplings && (
        <>
            {filteredSaplings.slice(0, 2).map((seed) => (
                <div className={`item ${seed.type}`} key={seed.id}>
                    <h1>{seed.name}</h1>
                    <p>{seed.description}</p>
                    <img src={seed.image} alt={seed.name} />
                </div>
            ))}
            {filteredSeeds.slice(0, 2).map((seed) => (
                <div className={`item ${seed.type}`} key={seed.id}>
                    <h1>{seed.name}</h1>
                    <p>{seed.description}</p>
                    <img src={seed.image} alt={seed.name} />
                </div>
            ))}
        </>
    )}
    </div>
    </div>
    );
    }

export default Favorits
