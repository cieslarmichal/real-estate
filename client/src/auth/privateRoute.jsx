import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { Navigate, useLocation } from 'react-router-dom';

function PrivateRoute({ children }) {
  const { userData } = useContext(AuthContext);

  const location = useLocation();

  if (!userData) {
    <Navigate
      to="/login"
      state={{ from: location }}
    />;

    return;
  }

  return <>{children}</>;
}

export default PrivateRoute;
