import { NavLink } from 'react-router-dom';
import styles from './listingItem.module.css';
import { backendUrl } from '../../constants/api';
import { formatPricePln } from '../../utils/formatPrice';

function ListingItem({ listing, user }) {
  if (user && typeof listing.userRef !== 'object') {
    listing.userRef = user;
  }

  return (
    <NavLink
      to={`/listings/${listing._id}`}
      className={styles.listingRow}
    >
      <div className={styles.listingImage}>
        <img
          src={`${backendUrl}/public${listing.imageUrls[0]}`}
          alt="Nieruchomość"
        />
      </div>

      <div className={styles.listingInformation}>
        <p className={styles.listingPrice}>{formatPricePln(listing.price)}</p>
        <p className={styles.listingTitle}>{listing.title}</p>
        <p className={styles.listingLocation}>
          {listing.locality}
          {listing.voivodeship && ', ' + listing.voivodeship}
        </p>
        <p className={styles.listingProperties}>
          <ul className={styles.propertiesList}>
            <li>
              {listing.size} m<sup>2</sup>
            </li>
            <li>
              {formatPricePln(listing.price / listing.size)} / m<sup>2</sup>
            </li>
            <li>{listing.floor === 0 ? 'parter' : `${listing.floor} piętro`}</li>
            <li>
              {listing.rooms} {listing.rooms === 1 ? 'pokój' : 'pokoje'}
            </li>
          </ul>
        </p>
        <div className={styles.userInformation}>
          <img
            src={`${backendUrl}/public${listing.userRef.avatar}`}
            alt="Avatar"
          />
          <div>{listing.privateOffer ? 'Oferta prywatna' : listing.userRef.username}</div>
        </div>
      </div>
    </NavLink>
  );
}

export default ListingItem;
