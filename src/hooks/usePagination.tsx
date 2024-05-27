import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

type DataType = {
    id: number;
    name: string;
    };

function usePagination(data: DataType[], itemsPerPage: number) {
const [currentPage, setCurrentPage] = useState(1);
const { pageNumber } = useParams();
const navigate = useNavigate();

const setCurrentPageWithNavigation = useCallback((page: number) => {
    setCurrentPage(page);
    navigate(`/seeds/${page}`);
}, [navigate]);

useEffect(() => {
    if (pageNumber) {
        setCurrentPage(parseInt(pageNumber, 10));
    }
}, [pageNumber]);

const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

return { currentItems, currentPage, setCurrentPageWithNavigation };
}

export default usePagination
