import { backendUrl } from '../constants/api';

export const registerUser = async (userData) => {
  const response = await fetch(`${backendUrl}/api/v1/users/register`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (response.status === 409) {
    throw new Error('User already exists');
  }

  if (response.status === 400) {
    throw new Error('Invalid data');
  }

  if (!response.ok) {
    throw new Error('Unknown error');
  }

  const data = await response.json();

  return data;
};

export const loginUser = async (userData) => {
  const response = await fetch(`${backendUrl}/api/v1/users/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (response.status === 404) {
    throw new Error('Invalid credentials');
  }

  if (response.status === 400) {
    throw new Error('Invalid data');
  }

  if (!response.ok) {
    throw new Error('Unknown error');
  }

  const data = await response.json();

  return data;
};

export const logoutUser = async (userData) => {
  const response = await fetch(`${backendUrl}/api/v1/users/logout`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error('Unknown error');
  }
};
