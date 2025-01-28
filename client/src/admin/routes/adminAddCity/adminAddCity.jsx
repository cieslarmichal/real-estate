import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { createCity } from '../../api/createCity';
import styles from '../../../styles/form.module.css';
import CenteredContent from '../../../components/centeredContent/centeredContent';
import ContentBox from '../../../components/contentBox/contentBox';
import { voivodeships } from '../../../constants/api';
import MapPicker from '../../../components/mapPicker/mapPicker';
import { AuthContext } from '../../../context/authContext';

function AdminAddCity() {
  const [values, setValues] = useState({
    name: '',
    voivodeship: '',
    district: '',
    commune: '',
    type: 'miasto',
    description: '',
    latitude: '',
    longitude: '',
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const { userData } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleLatitudeChange = (e) => {
    const { value } = e.target;

    setValues({
      ...values,
      latitude: value,
    });

    setMapCoordinates(value, values.longitude);
  };

  const handleLongitudeChange = (e) => {
    const { value } = e.target;

    setValues({
      ...values,
      longitude: value,
    });

    setMapCoordinates(values.latitude, value);
  };

  const setMapCoordinates = (latitude, longitude) => {
    if (latitude && longitude) {
      latitude = parseFloat(latitude);
      longitude = parseFloat(longitude);

      if (!isNaN(latitude) && !isNaN(longitude)) {
        setValues({
          ...values,
          latitude,
          longitude,
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setLoading(true);

    try {
      const cityData = {
        name: values.name,
        voivodeship: values.voivodeship,
        latitude: values.latitude,
        longitude: values.longitude,
        type: values.type,
      };

      if (values.district) {
        cityData.district = values.district;
      }

      if (values.commune) {
        cityData.commune = values.commune;
      }

      await createCity(cityData, userData.token);

      setLoading(false);

      setSuccess(true);

      setTimeout(() => {
        navigate('/admin/cities');
      }, 1000);
    } catch (error) {
      console.error('Error while creating a city:', error);

      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CenteredContent>
      <ContentBox title="Dodanie nowego miasta">
        <div className={styles.formContainer}>
          <form
            onSubmit={handleSubmit}
            noValidate
          >
            <div className={styles.formGroup}>
              <label htmlFor="name">Nazwa miasta</label>
              <div>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Wprowadź nazwę miasta"
                  value={values.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="voivodeship">Województwo</label>
              <div>
                <select
                  name="voivodeship"
                  id="voivodeship"
                  value={values.voivodeship}
                  onChange={handleChange}
                >
                  <option value="">Wybierz województwo</option>
                  {voivodeships.map((voivodeship) => (
                    <option
                      key={voivodeship}
                      value={voivodeship}
                    >
                      {voivodeship}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="district">Powiat (opcjonalnie)</label>
              <div>
                <input
                  type="text"
                  name="district"
                  id="district"
                  placeholder="Wprowadź powiat"
                  value={values.district}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="commune">Gmina (opcjonalnie)</label>
              <div>
                <input
                  type="text"
                  name="commune"
                  id="commune"
                  placeholder="Wprowadź gminę"
                  value={values.commune}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="type">Typ miejscowości</label>
              <div>
                <select
                  name="type"
                  id="type"
                  value={values.type}
                  onChange={handleChange}
                >
                  <option value="miasto">Miasto</option>
                  <option value="miasteczko">Miasteczko</option>
                  <option value="wieś">Wieś</option>
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description">Opis (opcjonalnie)</label>
              <div>
                <textarea
                  name="description"
                  id="description"
                  placeholder="Wprowadź opis"
                  value={values.description}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="latitude">Szerokość geograficzna (latitude)</label>
              <div>
                <input
                  type="number"
                  name="latitude"
                  id="latitude"
                  placeholder="Wprowadź szerokość geograficzną"
                  value={values.latitude}
                  onChange={handleLatitudeChange}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="longitude">Długość geograficzna (longitude)</label>
              <div>
                <input
                  type="number"
                  name="longitude"
                  id="longitude"
                  placeholder="Wprowadź długość geograficzną"
                  value={values.longitude}
                  onChange={handleLongitudeChange}
                />
              </div>
            </div>

            <div className={styles.mapGroup}>
              <label>Wybierz lokalizację na mapie:</label>
              <MapPicker
                latitude={values.latitude}
                longitude={values.longitude}
                setLatitude={(lat) =>
                  setValues((prevValues) => ({
                    ...prevValues,
                    latitude: lat,
                  }))
                }
                setLongitude={(lng) =>
                  setValues((prevValues) => ({
                    ...prevValues,
                    longitude: lng,
                  }))
                }
              />
            </div>

            {error && <span className={styles.generalError}>{error}</span>}

            <button
              type="submit"
              disabled={loading}
              className={styles.buttonSubmit}
            >
              {loading ? 'Dodawanie...' : 'Dodaj miasto'}
            </button>
          </form>

          {success && <div className={styles.successMessage}>Miasto dodane pomyślnie! Przekierowanie...</div>}
        </div>
      </ContentBox>
    </CenteredContent>
  );
}

export default AdminAddCity;
