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

  if (!response.ok) {
    throw new Error('Error while registering user: ' + userData);
  }

  const data = await response.json();

  return data;
};

export const loginUser = async (userData) => {
  const response = await fetch(`${backendUrl}/api/v1/users/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error('Error while logging in user: ' + userData);
  }

  const data = await response.json();

  return data;
};
