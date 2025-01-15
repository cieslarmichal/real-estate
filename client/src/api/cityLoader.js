import { backendUrl } from '../constants/api';

export async function cityLoader({ params: { name } }) {
  const response = fetch(`${backendUrl}/api/v1/cities/${name}`);

  if (!response.ok) {
    throw new Error('Error while fetching city by name: ' + name);
  }

  const data = await response.json();

  return data;
}
