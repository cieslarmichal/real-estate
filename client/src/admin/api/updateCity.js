import { backendUrl } from '../../constants/api';

export const updateCity = async (id, cityData, token) => {
  try {
    const response = await fetch(`${backendUrl}/api/v1/cities/${id}`, {
      method: 'PATCH',
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

    if (response.status === 404) {
      throw new Error('City does not exist');
    }

    if (!response.ok) {
      throw new Error('Error while updating a city');
    }

    const jsonResponse = await response.json();

    return jsonResponse;
  } catch (error) {
    console.error(error);

    throw error;
  }
};
