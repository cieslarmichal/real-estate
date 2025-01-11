import { backendUrl } from '../constants/api';

export function userPageLoader({ params: { id } }) {
  return fetch(`${backendUrl}/api/v1/users/${id}`);
}
