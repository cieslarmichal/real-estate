import { useContext } from 'react';
import { AuthContext } from '../../../context/authContext';
import { useNavigate } from 'react-router-dom';
import styles from './addListingButton.module.css';

function AddListingButton() {
  const { userData } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleAddClick = () => {
    if (userData) {
      navigate('/listings/add');
    } else {
      navigate('/login', { state: { from: '/listings/add' } });
    }
  };

  return (
    <div className={styles.addButtonWrapper}>
      <button
        className={styles.addListing}
        onClick={handleAddClick}
      >
        Dodaj ogłoszenie
      </button>
    </div>
  );
}

export default AddListingButton;
