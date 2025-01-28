import { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { getCity } from '../../api/getCity';
import CenteredContent from '../../../components/centeredContent/centeredContent';
import ContentBox from '../../../components/contentBox/contentBox';
import DataTable from '../../../components/dataTable/dataTable';
import MapPicker from '../../../components/mapPicker/mapPicker';
import { useState } from 'react';

function AdminCityPage() {
  const { id } = useParams();
  const [city, setCity] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        const cityData = await getCity(id);
        setCity(cityData);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCityData();
  }, [id]);

  if (isLoading) {
    return (
      <CenteredContent>
        <div>Ładowanie danych miasta...</div>
      </CenteredContent>
    );
  }

  if (error) {
    return (
      <CenteredContent>
        <div>Wystąpił błąd: {error}</div>
        <NavLink to="/admin/cities">Powrót do listy miast</NavLink>
      </CenteredContent>
    );
  }

  const cityData = [
    { label: 'ID', value: city._id },
    { label: 'Nazwa miasta', value: city.name },
    { label: 'Województwo', value: city.voivodeship },
    { label: 'Typ', value: city.type },
    { label: 'Powiat', value: city.district },
    { label: 'Gmina', value: city.commune },
    { label: 'Opis', value: city.description },
    { label: 'Szerokość geograficzna', value: city.latitude },
    { label: 'Długość geograficzna', value: city.longitude },
  ];

  return (
    <CenteredContent>
      <ContentBox title="Szczeżegóły miasta">
        <div className="singlePage">
          <DataTable
            data={cityData}
            labelValueMode
          />

          <div className="cityMap">
            <h4>Mapa lokalizacji:</h4>

            <MapPicker
              latitude={city.latitude}
              longitude={city.longitude}
              readOnly
            />

            <div className="cityActions">
              <p>
                <NavLink to={`/admin/cities/${city._id}/edit`}>Edytuj</NavLink>
              </p>
              <p>
                <NavLink to="/admin/cities">Powrót do listy miast</NavLink>
              </p>
            </div>
          </div>
        </div>
      </ContentBox>
    </CenteredContent>
  );
}

export default AdminCityPage;
