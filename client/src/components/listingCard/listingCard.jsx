import { NavLink } from 'react-router-dom';
import styles from './listingCard.module.css';
import { backendUrl } from '../../constants/api';
import { formatPricePln } from '../../utils/formatPrice';

function ListingCard({ listing }) {
  const { title, imageUrls, locality, size, rooms, price } = listing;

  return (
    <NavLink
      to={`/listings/${listing._id}`}
      className={styles.listingCard}
    >
      <div className={styles.imageContainer}>
        <img
          src={`${backendUrl}/public${imageUrls[0]}`}
          alt={title}
        />
      </div>
      <div className={styles.listingDetails}>
        <h3 className={styles.listingTitle}>{title}</h3>
        <div className={styles.listingInfo}>
          <div className={styles.leftColumn}>
            <p className={styles.city}>
              <strong>{locality}</strong>
            </p>
            <p>
              {size} m<sup>2</sup>
            </p>
            <p>
              {rooms} {rooms === 1 ? 'pokój' : 'pokoje'}
            </p>
          </div>
          <div className={styles.rightColumnn}></div>
          <p className={styles.price}>
            <strong>{formatPricePln(price)}</strong>
          </p>
          <p className={styles.price}>
            {formatPricePln(price / size)} / m<sup>2</sup>
          </p>
        </div>
      </div>
    </NavLink>
  );
}

export default ListingCard;
