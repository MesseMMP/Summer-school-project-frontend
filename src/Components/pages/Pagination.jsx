import React from 'react';
import { Pagination as BootstrapPagination } from 'react-bootstrap';

const Pagination = ({ jokesPerPage, totalJokes, currentPage, paginate }) => {
    const pageNumbers = [];
    const totalPages = Math.ceil(totalJokes / jokesPerPage);

    // Генерируем все номера страниц
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    // Выводим только часть номеров страниц для удобства при большом количестве
    let displayPages = [];
    if (totalPages <= 7) {
        displayPages = pageNumbers;
    } else {
        if (currentPage <= 4) {
            displayPages = [...pageNumbers.slice(0, 5), '...', totalPages];
        } else if (currentPage >= totalPages - 3) {
            displayPages = [1, '...', ...pageNumbers.slice(totalPages - 5, totalPages)];
        } else {
            displayPages = [1, '...', ...pageNumbers.slice(currentPage - 2, currentPage + 1), '...', totalPages];
        }
    }

    return (
        <BootstrapPagination>
            <BootstrapPagination.Prev
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
            />
            {displayPages.map((page, index) => (
                <BootstrapPagination.Item
                    key={index}
                    active={page === currentPage}
                    onClick={() => {
                        if (page !== '...') {
                            paginate(page);
                        }
                    }}
                >
                    {page}
                </BootstrapPagination.Item>
            ))}
            <BootstrapPagination.Next
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
            />
        </BootstrapPagination>
    );
}

export default Pagination;