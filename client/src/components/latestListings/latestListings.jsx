import styles from './latestListings.module.css';

import { useEffect, useState } from "react";
import { getLatestListings } from "../../api/listingAction";

function LatestListings({type = "sprzedaż"}) {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    getLatestListings(1, 3, type).then((listings) => {
      setListings(listings);
    }).catch((error) => {
      console.error(error);
    });
  }, [type]);

  const renderedListings = listings.map((listing) => {
    return (
      <div key={listing._id}>
        {listing.title}
      </div>
    )
  });

  return (
    <div className={styles.latestListings}>
      {renderedListings}
    </div>
  )
}

export default LatestListings;
