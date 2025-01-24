import styles from '../../styles/form.module.css';
import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loginUser } from '../../auth/auth';
import CenteredContent from '../../components/centeredContent/centeredContent';
import { AuthContext } from '../../context/authContext';

function Login() {
  const { updateUserData } = useContext(AuthContext);

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    setError(null);

    setSuccess(false);

    try {
      const userData = await loginUser(values);

      console.log(userData);

      updateUserData(userData);

      setSuccess(true);

      setValues({
        email: '',
        password: '',
      });

      const redirectPath = location.state?.from || '/';

      navigate(redirectPath);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CenteredContent>
      <div className={styles.formWrapper}>
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>Logowanie</h2>
          <form
            onSubmit={handleSubmit}
            noValidate
          >
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

            {error && <div className={styles.errorMessage}>{error}</div>}

            <button
              type="submit"
              className={styles.buttonSubmit}
              disabled={isLoading}
            >
              {isLoading ? 'Logowanie...' : 'Zaloguj się'}
            </button>

            <div className={styles.additionalAction}>
              <Link to="/register">Nie masz konta? Zarejestruj się</Link>
            </div>
          </form>

          {success && <div className={styles.successMessage}>Logowanie zakończona sukcesem</div>}
        </div>
      </div>
    </CenteredContent>
  );
}

export default Login;
