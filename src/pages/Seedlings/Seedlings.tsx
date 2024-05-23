
import React, { useState } from 'react';
import useSeeds from '../../hooks/useSeeds';
import './style/styleSeedling.css'
import {  useNavigate } from 'react-router-dom';

function Seedlings() {
    const seedlidling = useSeeds();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchTerm(e.currentTarget.value);
    };

    const navigate = useNavigate();

    const filteredSeeds = seedlidling.filter(seedling => seedling.type === 'seedlings' && seedling.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleSeedClick = (seedlingName: string) => {
        navigate(`/seeds/calendar/${seedlingName}`, { state: { seedlingName } });
    };

    return (
        <div className='favoritos seed'>
            <div className='seeds-container'>
                <input
                    type='text'
                    placeholder='Поиск семян...'
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className='search-input'
                />
            </div>
            
            <div className='favorites-item'>
            {filteredSeeds.map((seed) => (
                    <div
                        key={seed.id}
                        className={`item ${seed.type}`}
                        onClick={() => handleSeedClick(seed.name)}
                        style={{ textDecoration: 'none' }}
                        >
                        <h1>{seed.name}</h1>
                        <p>{seed.description}</p>
                        <p className='rating-text'>Рейтинг <span className='rating'>{seed.rating}</span></p>
                        <img src={seed.image} alt={seed.name} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Seedlings
