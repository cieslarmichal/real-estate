import { NavLink } from 'react-router-dom';
import styles from './userInfo.module.css';
import { backendUrl } from '../../constants/api';
import DataTable from '../dataTable/dataTable';

function UserInfo({ user, loggedInUser, showUserEdit = false }) {
  const userDetails = [
    { label: 'Nazwa użytkownika:', value: <NavLink to={`/profiles/${user._id}`}>{user.username}</NavLink> },
    {
      label: 'Email:',
      value: user.email,
    },
  ];

  if (user.firstName) {
    userDetails.push({ label: 'Imię:', value: user.firstName });
  }

  if (user.lastName) {
    userDetails.push({ label: 'Nazwisko:', value: user.lastName });
  }

  if (user.companyName) {
    userDetails.push({ label: 'Nazwa firmy:', value: user.companyName });
  }

  if (user.telephone) {
    userDetails.push({ label: 'Numer telefonu:', value: user.telephone });
  }

  return (
    <div className={styles.userInfo}>
      <p>
        <img
          src={`${backendUrl}/public${user.avatar}`}
          alt="Avatar"
          className={styles.userImage}
        />
      </p>

      <DataTable
        data={userDetails}
        labelValueMode
      />

      {showUserEdit && loggedInUser && loggedInUser._id === user._id && (
        <NavLink
          to={`/profiles/edit/${user._id}`}
          className={styles.editLink}
        >
          Edytuj profil
        </NavLink>
      )}
    </div>
  );
}

export default UserInfo;
