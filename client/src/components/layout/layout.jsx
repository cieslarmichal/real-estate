import { Outlet } from 'react-router-dom';
import styles from './layout.module.css';
import Footer from '../footer/footer';

function Layout() {
  return (
    <>
      <div className={styles.layout}>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Layout;
