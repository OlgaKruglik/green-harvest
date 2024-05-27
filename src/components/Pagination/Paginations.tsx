import React from 'react'
import { useNavigate } from 'react-router-dom';

    type PaginationProps = {
        currentPage: number;
        itemsPerPage: number;
        totalItems: number;
        setCurrentPage: (pageNumber: number) => void;
        itemType: 'seeds' | 'seedlings';
    };

    const Paginations: React.FC<PaginationProps> = ({ currentPage, itemsPerPage, totalItems, setCurrentPage, itemType }) => {
    const navigate = useNavigate();
    const pageNumbers: number[] = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        if (itemType === 'seeds') {
            navigate(`/seeds/${pageNumber}`);
        } else if (itemType === 'seedlings') {
            navigate(`/seedlings/${pageNumber}`);
        }
        };

    return (
    <div className='pagination'>
        {pageNumbers.map((number) => (
            <button key={number} onClick={() => paginate(number)} className={currentPage === number ? 'active' : ''}>
            {number}
            </button>
        ))}
    </div>
    );
    };
    export default Paginations
