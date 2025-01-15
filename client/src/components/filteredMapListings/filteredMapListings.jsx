import styles from './filteredMapListings.module.css';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef, useState } from 'react';
import { backendUrl, propertyTypes, roomsOptions, transactionTypeOptions } from '../../constants/api';
import { formatPricePln } from '../../utils/formatPrice';
import { NavLink } from 'react-router-dom';

function FilteredMapListings({ initialLat, initialLng, initialZoom = 13 }) {
  const initialFilters = {
    propertyType: 'mieszkanie',
    type: 'sprzedaż',
    minPrice: '',
    maxPrice: '',
    minSize: '',
    maxSize: '',
    rooms: '',
  };

  const [listings, setListings] = useState([]);
  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(initialZoom);
  const [filters, setFilters] = useState(initialFilters);

  const previousInitialLat = useRef(initialLat);

  const previousInitialLng = useRef(initialLng);

  const mapRef = useRef(null);

  const minZoom = 10;

  const fetchListings = async (southWest, northEast) => {
    try {
      if (zoom < minZoom) {
        return;
      }

      let url = `${backendUrl}/api/v1/listings?pageSize=50`;

      for (const key in filters) {
        if (filters[key]) {
          url += `&${key}=${filters[key]}`;
        }
      }

      if (southWest && northEast) {
        url += `&southWest=${southWest}&northEast=${northEast}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Error while fetching listings');
      }

      const jsonResponse = await response.json();

      setListings(jsonResponse.data);
    } catch (error) {
      console.error('Error while fetching listings:', error);
    }
  };

  const getBoundsFromMap = (map) => {
    const bounds = map.getBounds();

    const southWest = bounds.getSouthWest();
    const northEast = bounds.getNorthEast();

    return [`${southWest.lat},${southWest.lng}`, `${northEast.lat},${northEast.lng}`];
  };

  const generatePopupContent = (listing) => {
    const title = listing.title;

    const price = formatPricePln(listing.price);

    const pricePerMeter = formatPricePln(listing.price / listing.size);

    const rooms = listing.rooms;

    const size = `${listing.size} m²`;

    const floor = listing.floor;

    const imageUrl = listing.imageUrls[0];

    return (
      <div className={styles.popup}>
        <div>
          <strong>{title}</strong>
        </div>
        <div>
          <img
            className={styles.listingPopupImage}
            src={`${backendUrl}/public${imageUrl}`}
            alt={title}
          />
        </div>
        <div>
          <strong>Cena:</strong> {price}
        </div>
        <div>
          <strong>Ilość pokoi:</strong> {rooms}
        </div>
        <div>
          <strong>Metraż:</strong> {size}
        </div>
        <div>
          <strong>Cena za metr:</strong> {pricePerMeter}
        </div>
        <div>
          <strong>Piętro:</strong> {floor}
        </div>
        <div>
          <NavLink to={`/listings/${listing._id}`}>Zobacz ofertę</NavLink>
        </div>
      </div>
    );
  };

  const MapEvents = () => {
    const map = useMapEvents({
      moveend: () => {
        setBounds(getBoundsFromMap(map));
        setZoom(map.getZoom());
      },
    });

    return null;
  };

  const MapUpdater = () => {
    const map = useMap();

    useEffect(() => {
      if (map && previousInitialLat.current !== initialLat && previousInitialLng.current !== initialLng) {
        map.setView([initialLat, initialLng], initialZoom);

        previousInitialLat.current = initialLat;
        previousInitialLng.current = initialLng;

        const newBounds = getBoundsFromMap(map);

        setBounds(newBounds);
        setZoom(map.getZoom());

        if (map.getZoom() >= minZoom) {
          fetchListings(newBounds[0], newBounds[1]);
        }
      }
    }, [map, initialLat, initialLng, initialZoom]);

    return null;
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;

    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    if (!bounds) {
      return;
    }

    fetchListings(bounds[0], bounds[1]);
  };

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialLat, initialLng]);

  useEffect(() => {
    if (!bounds || zoom < minZoom) {
      return;
    }

    fetchListings(bounds[0], bounds[1]);
  }, [bounds, zoom, filters]);

  return (
    <div>
      <div className={styles.filterForm}>
        <div className={styles.filterField}>
          <label htmlFor="propertyTypeSelect">Nieruchomość:</label>
          <select
            name="propertyType"
            id="propertyTypeSelect"
            value={filters.propertyType}
            onChange={handleFilterChange}
          >
            {propertyTypes.map((type) => (
              <option
                key={type}
                value={type}
              >
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filterField}>
          <label htmlFor="typeSelect">Typ transakcji:</label>
          <select
            name="type"
            id="typeSelect"
            value={filters.type}
            onChange={handleFilterChange}
          >
            {transactionTypeOptions.map((type) => (
              <option
                key={type}
                value={type}
              >
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filterField}>
          <label>Powierzchnia:</label>
          <div className={styles.filterRow}>
            <input
              type="text"
              name="minSize"
              value={filters.minSize}
              onChange={handleFilterChange}
              placeholder="Minimalna"
            />
            <input
              type="text"
              name="maxSize"
              value={filters.maxSize}
              onChange={handleFilterChange}
              placeholder="Maksymalna"
            />
          </div>
        </div>

        <div className={styles.filterField}>
          <label>Cena w zł:</label>
          <div className={styles.filterRow}>
            <input
              type="text"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleFilterChange}
              placeholder="Od"
            />
            <input
              type="text"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              placeholder="Do"
            />
          </div>
        </div>

        <div className={`${styles.filterField} ${styles.filterFieldSmall}`}>
          <label>Ilość pokoi:</label>
          <select
            name="rooms"
            value={filters.rooms}
            onChange={handleFilterChange}
          >
            <option value=""></option>
            {roomsOptions.map((type) => (
              <option
                key={type}
                value={type}
              >
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filterFieldButton}>
          <button
            className={styles.filterButton}
            onClick={handleSearch}
          >
            Szukaj
          </button>
        </div>
      </div>

      <MapContainer
        center={[initialLat, initialLng]}
        zoom={initialZoom}
        style={{ height: '600px', width: '100%' }}
        whenReady={(mapInstance) => {
          const map = mapInstance.target;

          mapRef.current = map;

          const bounds = getBoundsFromMap(map);

          setBounds(bounds);

          setZoom(map.getZoom());

          if (map.getZoom() >= minZoom) {
            fetchListings(bounds[0], bounds[1]);
          }
        }}
      >
        <MapUpdater />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">'
        />
        {listings.map((listing) => (
          <Marker
            position={[listing.latitude, listing.longitude]}
            key={listing._id}
          >
            <Popup>{generatePopupContent(listing)}</Popup>
          </Marker>
        ))}
        <MapEvents />
      </MapContainer>
    </div>
  );
}

export default FilteredMapListings;
