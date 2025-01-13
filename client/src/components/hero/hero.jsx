import { backendUrl } from '../../constants/api';
import SearchBar from '../searchBar/searchBar';
import styles from './hero.module.css';

function Hero() {
  const heroImageUrl = `${backendUrl}/public/img/naszdom/hero/hero15.jpg`;

  return (
    <div
      className={styles.hero}
      style={{ backgroundImage: `url(${heroImageUrl})` }}
    >
      <SearchBar />
    </div>
  );
}

export default Hero;
