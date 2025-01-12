import { useState } from 'react';
import styles from './searchBar.module.css';
import { Link, useSearchParams } from 'react-router-dom';
import { propertyTypes, roomsOptions, transactionTypeOptions } from '../../constants/api';
import CenteredContent from '../centeredContent/centeredContent';

function SearchBar({ setPage }) {
  const [searchParams] = useSearchParams();

  const [query, setQuery] = useState({
    propertyType: searchParams.get('propertyType') || 'mieszkanie',
    type: searchParams.get('type') || 'sprzedaż',
    locality: searchParams.get('locality') || '',
    minSize: searchParams.get('minSize') || '',
    maxSize: searchParams.get('maxSize') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    rooms: searchParams.get('rooms') || '',
  });

  const handleChange = (e) => {
    setQuery((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSearch = () => {
    setPage(1);
  };

  let url = '/listings?&page=1';

  if (query.propertyType) {
    url += `&propertyType=${query.propertyType}`;
  }

  if (query.type) {
    url += `&type=${query.type}`;
  }

  if (query.locality) {
    url += `&locality=${query.locality}`;
  }

  if (query.minSize) {
    url += `&minSize=${query.minSize}`;
  }

  if (query.maxSize) {
    url += `&maxSize=${query.maxSize}`;
  }

  if (query.minPrice) {
    url += `&minPrice=${query.minPrice}`;
  }

  if (query.maxPrice) {
    url += `&maxPrice=${query.maxPrice}`;
  }

  if (query.rooms) {
    url += `&rooms=${query.rooms}`;
  }

  return (
    <CenteredContent>
      <div className={styles.searchBar}>
        <div className={styles.searchBarField}>
          <label htmlFor="propertyTypeSelect">Typ nieruchomości:</label>
          <select
            name="propertyType"
            id="propertyTypeSelect"
            value={query.propertyType}
            onChange={handleChange}
          >
            {propertyTypes.map((type) => (
              <option
                key={type}
                value={type}
              >
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.searchBarField}>
          <label htmlFor="typeSelect">Typ transakcji:</label>
          <select
            name="type"
            id="typeSelect"
            value={query.type}
            onChange={handleChange}
          >
            {transactionTypeOptions.map((transactionType) => (
              <option
                key={transactionType}
                value={transactionType}
              >
                {transactionType}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.searchBarField}>
          <label htmlFor="locality">Miasto:</label>
          <div className={styles.searchBarRow}>
            <input
              type="text"
              name="locality"
              id="locality"
              placeholder="Miasto"
              value={query.locality}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.searchBarField}>
          <label>Cena w zł:</label>
          <div className={styles.searchBarRow}>
            <input
              type="text"
              name="minPrice"
              placeholder="Od"
              value={query.minPrice}
              onChange={handleChange}
            />
            <input
              type="text"
              name="maxPrice"
              placeholder="Do"
              value={query.maxPrice}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.searchBarField}>
          <label>
            Powierzchnia w m<sup>2</sup>:
          </label>
          <div className={styles.searchBarRow}>
            <input
              type="text"
              name="minSize"
              placeholder="Od"
              value={query.minSize}
              onChange={handleChange}
            />
            <input
              type="text"
              name="maxSize"
              placeholder="Do"
              value={query.maxSize}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={`${styles.searchBarField} ${styles.searchBarFieldSmall}`}>
          <label>Ilość pokoi:</label>
          <select
            name="rooms"
            value={query.rooms}
            onChange={handleChange}
          >
            <option
              key="none"
              value=""
            >
              {' '}
            </option>
            {roomsOptions.map((rooms) => (
              <option
                key={rooms}
                value={rooms}
              >
                {rooms}
              </option>
            ))}
          </select>
        </div>

        <div className={`${styles.searchBarField} ${styles.searchBarFieldButton}`}>
          <Link
            onClick={handleSearch}
            to={url}
          >
            <button className={styles.searchBarButton}>Szukaj</button>
          </Link>
        </div>
      </div>
    </CenteredContent>
  );
}

export default SearchBar;
