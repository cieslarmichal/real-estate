// import styles from './mapPicker.module.css';

import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';

function MapPicker({ setLatitude, setLongitude, latitude, longitude, readOnly }) {
  const [position, setPosition] = useState([52.231641, 21.00618]);

  const zoom = 15;

  useEffect(() => {
    if (latitude && longitude) {
      setPosition([latitude, longitude]);
    }
  }, [latitude, longitude]);

  const MapEvents = () => {
    const map = useMap();

    useEffect(() => {
      if (latitude && longitude) {
        map.setView([latitude, longitude], zoom);
      }
    }, [map]);

    map.on('click', (e) => {
      if (readOnly) {
        return;
      }

      const { lat, lng } = e.latlng;

      setPosition([lat, lng]);
      setLatitude(lat);
      setLongitude(lng);
      map.setView([lat, lng], map.getZoom());
    });

    return null;
  };

  return (
    <MapContainer
      center={position}
      zoom={zoom}
      scrollWheelZoom
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'> OpenStreetMap </a>"
      />
      <Marker position={position} />
      <MapEvents />
    </MapContainer>
  );
}

export default MapPicker;
