import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { Navigate, useLocation } from 'react-router-dom';

function AdminRoute({ children }) {
  const { userData } = useContext(AuthContext);

  const location = useLocation();

  if (!userData || !userData.role || userData.role !== 'admin') {
    <Navigate
      to="/login"
      state={{ from: location }}
    />;

    return;
  }

  return <>{children}</>;
}

export default AdminRoute;
