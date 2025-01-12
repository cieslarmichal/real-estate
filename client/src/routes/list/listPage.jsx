import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { backendUrl } from '../../constants/api';
import styles from './listPage.module.css';
import ListingItem from '../../components/listingItem/listingItem';
import CenteredContent from '../../components/centeredContent/centeredContent';

function ListPage() {
  const [searchParams, setSearchParams] = useSearchParams('');

  const [values, setValues] = useState({
    listings: [],
    page: parseInt(searchParams.get('page')) || 1,
    limit: 20,
    total: 0,
  });

  const setPage = (page) => {
    setSearchParams({
      ...searchParams,
      page,
    });

    setValues({
      ...values,
      page,
    });
  };

  useEffect(() => {
    const fetchListings = async () => {
      const response = await fetch(
        `${backendUrl}/api/v1/listings?${searchParams.toString()}&limit=${values.limit}&page=${values.page}`,
      );

      if (!response.ok) {
        throw new Error('Failed to fetch listings');
      }

      const data = await response.json();

      setValues({
        ...values,
        listings: data.listings,
        total: data.total,
      });
    };

    fetchListings();
  }, [searchParams, values.limit]);

  return (
    <>
      <CenteredContent>
        <h3>Ogłoszenia</h3>
        <div className={styles.listings}>
          {values.listings.map((listing) => (
            <ListingItem
              key={listing._id}
              listing={listing}
            />
          ))}
        </div>
      </CenteredContent>
    </>
  );
}

export default ListPage;
