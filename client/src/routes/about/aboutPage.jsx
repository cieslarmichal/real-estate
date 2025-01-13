import CenteredContent from '../../components/centeredContent/centeredContent';
import ContentBox from '../../components/contentBox/contentBox';
import Accordion from '../../components/accordion/accordion';
import { backendUrl } from '../../constants/api';
import styles from './aboutPage.module.css';

import { FaHome, FaCity, FaUser } from 'react-icons/fa';

function AboutPage() {
  const heroImageUrl = `${backendUrl}/public/img/naszdom/hero/hero12.jpg`;

  return (
    <>
      <div
        className={styles.aboutHero}
        style={{ backgroundImage: `url(${heroImageUrl})` }}
      >
        <h1>NaszDom</h1>
        <p>Twój zaufany partner w świecie nieruchomości</p>
      </div>
      <CenteredContent>
        <ContentBox title="O naszym serwisie">
          <p>NaszDom to serwis internetowy, który pomaga w znalezieniu wymarzonego miejsca na ziemi.</p>
        </ContentBox>

        <ContentBox title="Nasze statystyki">
          <div className={styles.statsContainer}>
            <div className={styles.stat}>
              <FaHome size={40} />
              <h3>1000+</h3>
              <p>Aktualnych ofert</p>
            </div>

            <div className={styles.stat}>
              <FaCity size={40} />
              <h3>100+</h3>
              <p>Popularnych miast</p>
            </div>

            <div className={styles.stat}>
              <FaUser size={40} />
              <h3>5000+</h3>
              <p>Zadowolonych użytkowników</p>
            </div>
          </div>
        </ContentBox>

        <ContentBox title="Często zadawane pytania">
          <Accordion
            items={[
              {
                title: 'Jak zarejestrować się w serwisie?',
                content: 'Lorem ipsum...',
              },
              {
                title: 'Jak dodać ogłoszenie?',
                content: 'Lorem ipsum...',
              },
              {
                title: 'Jak usunąć ogłoszenie?',
                content: 'Lorem ipsum...',
              },
            ]}
          />
        </ContentBox>
      </CenteredContent>
    </>
  );
}

export default AboutPage;
