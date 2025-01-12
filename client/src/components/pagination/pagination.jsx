import { useEffect } from 'react';
import styles from './pagination.module.css';

function Pagination({ page, totalPages, onPageChange }) {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [page]);

  const handlePrevious = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      onPageChange(page + 1);
    }
  };

  const handlePageClick = (pageNumer) => {
    onPageChange(pageNumer);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxButtons = 8;

    let startPage = Math.max(1, page - Math.floor(maxButtons / 2));

    let endPage = Math.min(totalPages, startPage + maxButtons - 1);

    if (endPage - startPage < maxButtons - 1) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`${styles.button} ${styles.pageButton} ${i === page ? styles.active : ''}`}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </button>,
      );
    }

    return pageNumbers;
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.button}
        onClick={handlePrevious}
        disabled={page === 1}
      >
        Poprzednia
      </button>
      {renderPageNumbers()}
      <button
        className={styles.button}
        onClick={handleNext}
        disabled={page === totalPages}
      >
        Następna
      </button>
    </div>
  );
}

export default Pagination;
