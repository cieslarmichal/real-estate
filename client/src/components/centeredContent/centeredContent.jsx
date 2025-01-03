import styles from './centeredContent.module.css'

function CenteredContent({ children }) {
  return <div className={styles.wrapper}>{children}</div>
}

export default CenteredContent;
