import React, { useState } from 'react';
import useSeeds from '../../hooks/useSeeds';
import './style/slyleSeeds.css'
import {  useNavigate } from 'react-router-dom';

function Seeds() {
    const seeds = useSeeds();
    const [searchTerm, setSearchTerm] = useState('');
    
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchTerm(e.currentTarget.value);
    };
    
    const filteredSeeds = seeds.filter(seed => seed.type === 'seeds' && seed.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const navigate = useNavigate();

    const handleSeedClick = (seedName: string) => {
        navigate(`/seeds/calendar/${seedName}`, { state: { seedName } });
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
    );
    }

export default Seeds
