import { NavLink } from 'react-router-dom';
import styles from './dataTable.module.css';

function DataTable({ columns, data, labelValueMode = false }) {
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

  return (
    <table className={styles.dataTable}>
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((col, colIndex) => {
              const cellData = row[col.field];

              if (col.isLink && cellData) {
                return (
                  <td key={colIndex}>
                    <NavLink to={cellData.link}>{cellData.text}</NavLink>
                  </td>
                );
              }

              if (col.bold) {
                return (
                  <td key={colIndex}>
                    <strong>{cellData}</strong>
                  </td>
                );
              }

              return <td key={colIndex}>{cellData}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
