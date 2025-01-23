import styles from '../../styles/form.module.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../auth/auth';
import CenteredContent from '../../components/centeredContent/centeredContent';

function Register() {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    setErrors([]);

    setSuccess(false);

    try {
      const response = await registerUser(values);

      setSuccess(true);

      setValues({
        username: '',
        email: '',
        password: '',
      });

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        form: error.message,
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CenteredContent>
      <div className={styles.formWrapper}>
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>Register</h2>
          <form
            onSubmit={handleSubmit}
            noValidate
          >
            <div className={styles.formGroup}>
              <label htmlFor="username">Nazwa użytkownika</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Nazwa użytkownika"
                value={values.username}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Hasło</label>
              <input
                type="text"
                id="password"
                name="password"
                placeholder="Hasło"
                value={values.password}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className={styles.buttonSubmit}
              disabled={isLoading}
            >
              {isLoading ? 'Ładowanie...' : 'Zarejestruj'}
            </button>

            <div className={styles.additionalAction}>
              <Link to="/login">Masz już konto? Zaloguj się</Link>
            </div>
          </form>

          {success && <div className={styles.successMessage}>Rejestracja zakończona sukcesem</div>}
        </div>
      </div>
    </CenteredContent>
  );
}

export default Register;
