import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('user')) || null);

  const updateUserData = (data) => {
    setUserData(data);
  };

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(userData));
  }, [userData]);

  return <AuthContext.Provider value={{ user: userData, updateUserData }}>{children}</AuthContext.Provider>;
};
