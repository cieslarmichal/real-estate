import styles from './cityCard.module.css';
import { NavLink } from 'react-router-dom';
import { backendUrl } from '../../constants/api';

function CityCard({ cityName }) {
  const cityNameLowerCase = cityName.toLowerCase();

  const cityImage = `${backendUrl}/public/img/cities/${cityNameLowerCase}.jpg`;

  return (
    <NavLink to={`/listings/location/${cityNameLowerCase}`}>
      <div className={styles.imageContainer}>
        <img
          src={cityImage}
          alt={cityName}
        />
      </div>
      <div className={styles.cityName}>
        <strong>{cityName}</strong>
      </div>
    </NavLink>
  );
}

export default CityCard;
