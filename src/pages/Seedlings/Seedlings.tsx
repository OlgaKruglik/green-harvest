
import React, { useState, useEffect } from 'react';
import useSeeds from '../../hooks/useSeeds';
import './style/styleSeedling.css'
import {  useNavigate, useParams } from 'react-router-dom';
import Pagination from '../../components/Pagination/Paginations';

function Seedlings() {
    const seedlings = useSeeds();
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const seedlingsPerPage = 10;
    const { pageNumber } = useParams();
    
    useEffect(() => {
        if (pageNumber) {
            setCurrentPage(parseInt(pageNumber, 10));
    }
    }, [pageNumber]);
    
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };
    
    const filteredSeedlings = seedlings.filter(seedling => seedling.type === 'seedlings' && seedling.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const indexOfLastSeedling = currentPage * seedlingsPerPage;
    const indexOfFirstSeedling = indexOfLastSeedling - seedlingsPerPage;
    const currentSeedlings = filteredSeedlings.slice(indexOfFirstSeedling, indexOfLastSeedling);
    
    const navigate = useNavigate();
    
    const handleSeedlingClick = (seedlingName: string, event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        navigate(`/seedlings/${pageNumber}/calendar/${seedlingName}`, { state: { seedlingName } });
    };
    
    return (
    <div className='favoritos seed'>
        <div className='seeds-container'>
            <input
            type='text'
            placeholder='Поиск рассады...'
            value={searchTerm}
            onChange={handleSearchChange}
            className='search-input'
            />
        </div>
        
        <div className='favorites-item'>
            {currentSeedlings.map((seedling) => (
            <div
                key={seedling.id}
                className={`item ${seedling.type}`}
                onClick={(event) => handleSeedlingClick(seedling.name, event)}
                style={{ textDecoration: 'none' }}
            >
                <h1>{seedling.name}</h1>
                <p>{seedling.description}</p>
                <p className='rating-text'>Рейтинг <span className='rating'>{seedling.rating}</span></p>
                <img src={seedling.image} alt={seedling.name} />
            </div>
            ))}
        </div>
        
        <Pagination
            currentPage={currentPage}
            itemsPerPage={seedlingsPerPage}
            totalItems={filteredSeedlings.length}
            setCurrentPage={setCurrentPage}
            itemType='seedlings'
        />
    </div>
    );
    }

export default Seedlings
