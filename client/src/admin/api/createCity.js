import { backendUrl } from '../../constants/api';

export const createCity = async (cityData, token) => {
  try {
    const response = await fetch(`${backendUrl}/api/v1/cities`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',

        contentType: 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(cityData),
    });

    if (response.status === 400) {
      throw new Error('Invalid data');
    }

    if (response.status === 409) {
      throw new Error('Listing already exists');
    }

    if (!response.ok) {
      throw new Error('Error while creating a city');
    }

    const jsonResponse = await response.json();

    return jsonResponse;
  } catch (error) {
    console.error(error);

    throw error;
  }
};
