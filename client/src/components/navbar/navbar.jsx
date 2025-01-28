import { useContext } from 'react';
import styles from './navbar.module.css';
import { FaUser } from 'react-icons/fa';
import { AuthContext } from '../../context/authContext';
import CenteredContent from '../centeredContent/centeredContent';
import { NavLink } from 'react-router-dom';
import { backendUrl } from '../../constants/api';
import AddListingButton from './addListingButton/addListingButton';
import { isAdmin } from '../../auth/auth';
import AdminNavbar from '../../admin/components/adminNavbar/adminNavbar';

function Navbar() {
  const { userData } = useContext(AuthContext);

  return (
    <CenteredContent>
      {userData && isAdmin(userData) && <AdminNavbar />}
      <nav className={styles.navbar}>
        <NavLink to="/">
          <img
            src={`${backendUrl}/public/img/naszdom/logo/naszdom_logo.png`}
            alt="logo"
          />
        </NavLink>
        <ul className={styles.navbarList}>
          {userData ? (
            <>
              <li>
                <NavLink to={`/profiles/${userData._id}`}>
                  <FaUser /> Moje konto
                </NavLink>
              </li>
              <li>
                <NavLink to="/logout">Wyloguj</NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/register">Rejestracja</NavLink>
              </li>
              <li>
                <NavLink to="/login">Logowanie</NavLink>
              </li>
            </>
          )}
          <li>
            <AddListingButton />
          </li>
        </ul>
      </nav>
    </CenteredContent>
  );
}

export { Navbar };
