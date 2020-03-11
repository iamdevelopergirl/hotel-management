import React from 'react';
import './styles/pagination.css';

/**
* @function Pagination
* @desc Component to decide how many page numbers needs to be shown
*/
const Pagination = ({ itemsPerPage , totalItems, paginate}) => {
    
    const pageNumbers = [];
    for(let i=1; i<= Math.ceil(totalItems/itemsPerPage); i++){
        pageNumbers.push(i);
    }
    return (
        <div className="navigation">
            <div className="to-center">
            <div className="to-center">
                <ul className="pagination">
                    {pageNumbers.map((pageNumber) => (
                        <li key={pageNumber} className="page-item">
                            <a href="!#" onClick={() => paginate(pageNumber)} className="page-link">
                                {pageNumber}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            </div>
        </div>
    )
}
export default Pagination;