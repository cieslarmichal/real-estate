import { backendUrl } from '../constants/api';

export async function cityLoader({ params: { name } }) {
  const response = await fetch(`${backendUrl}/api/v1/cities?name=${name}`);

  if (!response.ok) {
    throw new Error('Error while fetching city by name: ' + name);
  }

  const jsonResponse = await response.json();

  return jsonResponse.data;
}
