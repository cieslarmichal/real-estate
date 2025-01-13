import { useCallback, useEffect, useState } from 'react';
import { backendUrl } from '../../constants/api';
import AutocompleteInput from '../autocompleteInput/autocompleteInput';

function CityInputAutocomplete({ voivodeship, city, onChange, onSelect }) {
  const [citySuggestions, setCitySuggestions] = useState([]);

  const fetchCitySuggestions = useCallback(async (voivodeship, city) => {
    if (city.length < 2) {
      return;
    }

    let citiesEndpoint = `${backendUrl}/api/v1/cities?name=${city}`;

    if (voivodeship) {
      citiesEndpoint += `&voivodeship=${voivodeship}`;
    }

    try {
      const response = await fetch(citiesEndpoint);

      const jsonResponse = await response.json();

      setCitySuggestions(jsonResponse.data.map((city) => city.name));
    } catch (error) {
      console.error('Error fetching city suggestions:', error);
    }
  }, []);

  useEffect(() => {
    if (citySuggestions.find((city) => city === name)) {
      setCitySuggestions([]);

      return;
    }

    fetchCitySuggestions(voivodeship, city);
  }, [city, voivodeship]);

  return (
    <AutocompleteInput
      suggestions={citySuggestions}
      value={city}
      onChange={onChange}
      onSelect={onSelect}
      placeholder={'Wprowadź miasto'}
    />
  );
}

export default CityInputAutocomplete;
