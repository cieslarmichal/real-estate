import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/form.module.css';
import CenteredContent from '../../components/centeredContent/centeredContent.jsx';
import { createListing } from '../../api/listingAction.js';
import { voivodeships } from '../../constants/api.js';
import MapPicker from '../../components/mapPicker/mapPicker.jsx';
import CityInputAutocomplete from '../../components/cityAutocompleteInput/cityAutocompleteInput.jsx';
import ContentBox from '../../components/contentBox/contentBox.jsx';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AuthContext } from '../../context/authContext.jsx';

function AddListingPage() {
  const { userData } = useContext(AuthContext);

  const [values, setValues] = useState({
    title: '',
    description: '',
    price: '',
    rooms: '',
    bathrooms: '',
    floor: '',
    size: '',
    locality: '',
    address: '',
    voivodeship: '',
    latitude: '',
    longitude: '',
    type: 'sprzedaż',
    propertyType: 'mieszkanie',
    imageUrls: [],
  });

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('name, value', name, value);

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    setError(null);
  };

  const handleDescriptionChange = (value) => {
    setValues((prevValues) => ({
      ...prevValues,
      description: value,
    }));

    setError(null);
  };

  const handleSelectCity = (city) => {
    setValues((prevValues) => ({
      ...prevValues,
      locality: city,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      formData.set(key, values[key]);
    });

    Array.from(images).forEach((image) => {
      formData.append('images', image);
    });

    try {
      const data = await createListing(formData, userData.token);

      if (!data) {
        setError('Nie udało się dodać nieruchomości');
      } else {
        console.log({ data });

        setSuccess(true);

        navigate(`/listings/${data._id}`);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CenteredContent>
      <ContentBox title="Dodaj nieruchomość:">
        <div className={styles.formContainer}>
          <form
            onSubmit={handleSubmit}
            noValidate
          >
            <div className={styles.formGroup}>
              <label htmlFor="title">Tytuł</label>
              <div>
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Wprowadź tytuł"
                  value={values.title}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description">Opis</label>
              <div>
                <ReactQuill
                  value={values.description}
                  onChange={handleDescriptionChange}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="price">Cena</label>
              <div>
                <input
                  type="number"
                  name="price"
                  id="price"
                  placeholder="Wprowadź cenę"
                  value={values.price}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="rooms">Liczba pokoi</label>
              <div>
                <input
                  type="number"
                  name="rooms"
                  id="rooms"
                  placeholder="Wprowadź liczbę pokoi"
                  value={values.rooms}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="bathrooms">Liczba łazienek</label>
              <div>
                <input
                  type="number"
                  name="bathrooms"
                  id="bathrooms"
                  placeholder="Wprowadź liczbę łazienek"
                  value={values.bathrooms}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="floor">Piętro</label>
              <div>
                <input
                  type="number"
                  name="floor"
                  id="floor"
                  placeholder="Wprowadź piętro"
                  value={values.floor}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="size">Rozmiar (m²)</label>
              <div>
                <input
                  type="number"
                  name="size"
                  id="size"
                  placeholder="Wprowadź rozmiar"
                  value={values.size}
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
              <label htmlFor="locality">Miejscowość</label>
              <div>
                <CityInputAutocomplete
                  voivodeship={values.voivodeship}
                  city={values.locality}
                  onChange={(val) =>
                    setValues((prevValues) => ({
                      ...prevValues,
                      locality: val,
                    }))
                  }
                  onSelect={handleSelectCity}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="address">Adres</label>
              <div>
                <input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Wprowadź adres"
                  value={values.address}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="type">Typ transakcji</label>
              <div>
                <select
                  name="type"
                  id="type"
                  value={values.type}
                  onChange={handleChange}
                >
                  <option value="sprzedaż">Sprzedaż</option>
                  <option value="wynajem">Wynajem</option>
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="propertyType">Typ nieruchomości</label>
              <div>
                <select
                  name="propertyType"
                  id="propertyType"
                  value={values.propertyType}
                  onChange={handleChange}
                >
                  <option value="mieszkanie">Mieszkanie</option>
                  <option value="dom">Dom</option>
                  <option value="lokal użytkowy">Lokal użytkowy</option>
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="mapPicker">Lokalizacja</label>
              <div>
                <MapPicker
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
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="images">Zdjęcia nieruchomości (max 10)</label>
              <div>
                <input
                  type="file"
                  name="images"
                  id="images"
                  accept=".jpg,.jpeg,.png"
                  multiple
                  onChange={(e) => setImages(e.target.files)}
                />
              </div>
            </div>

            {error && (
              <div className={styles.formGroup}>
                <span className={styles.generalError}>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={styles.buttonSubmit}
            >
              {isLoading ? 'Dodawanie...' : 'Dodaj nieruchomość'}
            </button>
          </form>

          {success && <div className={styles.successMessage}>Nieruchomość dodana pomyślnie! Przekierowanie...</div>}
        </div>
      </ContentBox>
    </CenteredContent>
  );
}

export default AddListingPage;
