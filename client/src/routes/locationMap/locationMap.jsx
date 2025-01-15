import CenteredContent from '../../components/centeredContent/centeredContent';
import ContentBox from '../../components/contentBox/contentBox';
import FilteredMapListings from '../../components/filteredMapListings/filteredMapListings';
import { useParams, useLoaderData } from 'react-router-dom';

function LocationMap() {
  const { name } = useParams();

  const cityData = useLoaderData();

  if (!cityData) {
    return <div>Ładowanie danych...</div>;
  }

  const initialLat = parseFloat(cityData.latitude);

  const initialLng = parseFloat(cityData.longitude);

  return (
    <CenteredContent>
      <ContentBox title={`Lista nieruchomości dla lokalizacji: ${name.charAt(0).toUpperCase() + name.slice(1)}`}>
        <FilteredMapListings
          initialLat={initialLat}
          initialLng={initialLng}
        />
      </ContentBox>
    </CenteredContent>
  );
}

export default LocationMap;
