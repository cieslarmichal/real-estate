import styles from './footer.module.css';
import CenteredContent from '../../components/centeredContent/centeredContent';
import { NavLink } from 'react-router-dom';

function Footer() {
  return (
    <footer className={styles.footer}>
      <CenteredContent>
        <div className={styles.footerContent}>
          <div className={styles.footerColumn}>
            <h3 className={styles.footerTitle}>Kontakt:</h3>
            <p>NaszDom Sp z o. o.</p>
            <p>31-881, Kraków</p>
            <p>Telefon: +48 798 242 544</p>
            <p>Email: kontakt@naszdom.com</p>
          </div>

          <div className={styles.footerColumn}>
            <h3 className={styles.footerTitle}>Popularne lokalizacje</h3>
            <ul className={styles.footerLinks}>
              <li>
                <NavLink to={'/listings/locations/kraków'}>Kraków</NavLink>
              </li>
              <li>
                <NavLink to={'/listings/locations/warszawa'}>Warszawa</NavLink>
              </li>
              <li>
                <NavLink to={'/listings/locations/wrocław'}>Wrocław</NavLink>
              </li>
              <li>
                <NavLink to={'/listings/locations/gdańsk'}>Gdańsk</NavLink>
              </li>
            </ul>
          </div>

          <div className={styles.footerColumn}>
            <h3 className={styles.footerTitle}>O nas</h3>
            <p>Jesteśmy wiodącą firmą na rynku nieruchomości oferującą najlepsze oferty w Polsce.</p>
            <p>
              <NavLink to={'/about'}>Dowiedz się więcej</NavLink>
            </p>
          </div>
        </div>
      </CenteredContent>
    </footer>
  );
}

export default Footer;
