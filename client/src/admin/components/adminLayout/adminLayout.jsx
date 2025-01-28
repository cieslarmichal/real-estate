import { Navigate, Outlet } from 'react-router-dom';
import { isAdmin } from '../../../auth/auth';
import AdminNavbar from '../adminNavbar/adminNavbar';
import { AuthContext } from '../../../context/authContext';
import { useContext } from 'react';

function AdminLayout() {
  const { userData } = useContext(AuthContext);

  if (!userData || !userData.role || !isAdmin(userData)) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="adminLayout">
      <div className="content">
        <AdminNavbar />
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
