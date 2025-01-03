import styles from './popularCities.module.css';
import CityCard from '../cityCard/cityCard';

function PopularCities() {
  const cities = ['Warszawa', 'Kraków', 'Wrocław', 'Gdańsk'];

  const renderedCities = cities.map((city) => (
    <CityCard
      key={city}
      cityName={city}
    />
  ));

  return <div className={styles.popularCities}>{renderedCities}</div>;
}

export default PopularCities;
