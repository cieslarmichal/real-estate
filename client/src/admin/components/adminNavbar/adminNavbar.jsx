import styles from './adminNavbar.module.css';
import { useContext } from 'react';
import { AuthContext } from '../../../context/authContext';
import { isAdmin } from '../../../auth/auth';
import CenteredContent from '../../../components/centeredContent/centeredContent';
import { NavLink } from 'react-router-dom';

function AdminNavbar() {
  const { userData } = useContext(AuthContext);

  return (
    <>
      {userData && isAdmin(userData) && (
        <CenteredContent>
          <nav className={styles.adminNavbar}>
            <ul className={styles.navbarList}>
              <li id={styles.adminLogo}>Administrator</li>
              <li>
                <NavLink to="/admin/cities">Miasta</NavLink>
              </li>
              <li>
                <NavLink to="/admin/users">Użytkownicy</NavLink>
              </li>
            </ul>
          </nav>
        </CenteredContent>
      )}
    </>
  );
}

export default AdminNavbar;
