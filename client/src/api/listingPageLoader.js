import { backendUrl } from '../constants/api';

export function listingPageLoader({ params: { id } }) {
  return fetch(`${backendUrl}/api/v1/listings/${id}`);
}
