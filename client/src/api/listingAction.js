import { backendUrl } from '../constants/api';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

export const getLatestListings = async (page = 1, pageSize = 10, type = 'sprzedaż') => {
  try {
    const response = await fetch(
      `${backendUrl}/api/v1/listings?page=${page}&pageSize=${pageSize}&type=${encodeURIComponent(type)}`,
    );

    if (!response.ok) {
      throw new Error('Error while fetching latest listings');
    }

    const jsonResponse = await response.json();

    return jsonResponse.data;
  } catch (error) {
    console.error(error);

    return [];
  }
};

export const getListingById = async (listingId) => {
  try {
    const response = await fetch(`${backendUrl}/api/v1/listings/${listingId}`);

    if (!response.ok) {
      throw new Error('Error while fetching listing by id: ' + listingId);
    }

    const jsonResponse = await response.json();

    return jsonResponse;
  } catch (error) {
    console.error(error);

    return null;
  }
};

export const createListing = async (listingData, token) => {
  try {
    const response = await fetch(`${backendUrl}/api/v1/listings`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: listingData,
    });

    if (response.status === 400) {
      throw new Error('Invalid data');
    }

    if (!response.ok) {
      throw new Error('Error while creating a listing');
    }

    const jsonResponse = await response.json();

    return jsonResponse;
  } catch (error) {
    console.error(error);

    return null;
  }
};

export const updateListing = async (listingId, listingData) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { userData } = useContext(AuthContext);

  if (!userData) {
    return null;
  }

  try {
    const response = await fetch(`${backendUrl}/api/v1/listings/${listingId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${userData.token}`,
      },
      body: JSON.stringify(listingData),
    });

    if (!response.ok) {
      throw new Error('Error while updating a listing');
    }

    const jsonResponse = await response.json();

    return jsonResponse;
  } catch (error) {
    console.error(error);

    return null;
  }
};

export const finishListing = async (listingId) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { userData } = useContext(AuthContext);

  if (!userData) {
    return null;
  }

  try {
    const response = await fetch(`${backendUrl}/api/v1/listings/${listingId}/finish`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${userData.token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error while finishing a listing');
    }

    const jsonResponse = await response.json();

    return jsonResponse;
  } catch (error) {
    console.error(error);

    return null;
  }
};
