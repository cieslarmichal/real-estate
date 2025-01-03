import styles from './contentBox.module.css';

function ContentBox({ title, children }) {
  return (
    <div className={styles.contentBox}>
      {title && <h4 className={styles.contentBoxTitle}>{title}</h4>}
      {children}
    </div>
  );
}

export default ContentBox;
