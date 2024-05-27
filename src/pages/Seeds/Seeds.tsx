import React, { useState, useEffect } from 'react';
import useSeeds from '../../hooks/useSeeds';
import './style/slyleSeeds.css'
import {  useNavigate, useParams } from 'react-router-dom';
import Pagination from '../../components/Pagination/Paginations';




function Seeds() {
    const seeds = useSeeds();
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const seedsPerPage = 10;
    const { pageNumber } = useParams();

    
    
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchTerm(e.target.value); 
        setCurrentPage(1);
    };
    
    const filteredSeeds = seeds.filter(seed => seed.type === 'seeds' && seed.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const indexOfLastSeed = currentPage * seedsPerPage;
    const indexOfFirstSeed = indexOfLastSeed - seedsPerPage;
    const currentSeeds = filteredSeeds.slice(indexOfFirstSeed, indexOfLastSeed);
    
    const navigate = useNavigate();
    
    const handleSeedClick = (seedName: string, event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        const isPaginationButton = event.target instanceof HTMLButtonElement && event.target.closest('.pagination');
        
        if (!isPaginationButton) {
            navigate(`/seeds/${pageNumber}/calendar/${seedName}`, { state: { seedName } });
        }
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
            {currentSeeds.map((seed) => (
            <div
                key={seed.id}
                className={`item ${seed.type}`}
                onClick={(event) => handleSeedClick(seed.name, event)}
                style={{ textDecoration: 'none' }}
            >
                <h1>{seed.name}</h1>
                <p>{seed.description}</p>
                <p className='rating-text'>Рейтинг <span className='rating'>{seed.rating}</span></p>
                <img src={seed.image} alt={seed.name} />
            </div>
            ))}
        </div>
        
        <Pagination
            currentPage={currentPage}
            itemsPerPage={seedsPerPage}
            totalItems={filteredSeeds.length}
            setCurrentPage={setCurrentPage}
            itemType='seeds'
        />
    </div>
    );
    }

export default Seeds
