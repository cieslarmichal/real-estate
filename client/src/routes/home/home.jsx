import Hero from '../../components/hero/hero';
import CenteredContent from '../../components/centeredContent/centeredContent';
import LatestListings from '../../components/latestListings/latestListings';
import ContentBox from '../../components/contentBox/contentBox';
import PopularCities from '../../components/popularCities/popularCities';

function Home() {
  return (
    <div>
      Home
      <Hero />
      <CenteredContent>
        <ContentBox title="Najnowsze nieruchomości na sprzedaż">
          <LatestListings type="sprzedaż" />
        </ContentBox>

        <ContentBox title="Najnowsze nieruchomości na wynajem">
          <LatestListings type="wynajem" />
        </ContentBox>

        <ContentBox title="Popularne miasta">
          <PopularCities />
        </ContentBox>
      </CenteredContent>
    </div>
  );
}

export default Home;
