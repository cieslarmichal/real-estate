import { Outlet } from 'react-router-dom'
import styles from './layout.module.css'

function Layout(){
  return (
    <div className={styles.layout}>
      <div className={styles.content}>
        <Outlet/>
      </div>
    </div>
  )
}

export default Layout;
