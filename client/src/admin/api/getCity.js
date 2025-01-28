import { backendUrl } from '../../constants/api';

export async function getCity(id) {
  const response = await fetch(`${backendUrl}/api/v1/cities/${id}`);

  if (!response.ok) {
    throw new Error('Error while fetching city by id: ' + id);
  }

  const jsonResponse = await response.json();

  return jsonResponse;
}
