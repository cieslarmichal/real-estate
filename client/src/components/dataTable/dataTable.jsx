import styles from './dataTable.module.css';

function DataTable({ data, labelValueMode = false }) {
  if (labelValueMode) {
    return (
      <table className={styles.dataTable}>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>{row.label}</td>
              <td>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default DataTable;
