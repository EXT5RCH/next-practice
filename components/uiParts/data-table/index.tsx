import styles from './index.module.scss';
import { DataTableType } from './types';

type PropType = {
  table: DataTableType;
};

const DataTable = (props: PropType) => {
  return (
    <div className={styles['data-table']}>
      <div className={styles['data-table__scroll-x']}>
        <div className={styles['data-table__header']}>
          <div className={styles['data-table__header-no']}>No</div>
          {props.table.columns.map((column, Index) => (
            <div
              key={Index}
              className={styles['data-table__header-item']}
              style={{ width: `${column.width}px` }}
            >
              {column.columnName}
            </div>
          ))}
        </div>
        <div>
          {props.table.rows.map((row, rowIndex) => (
            <div key={rowIndex} className={styles['data-table__row']}>
              <div className={styles['data-table__row-no']}>{rowIndex}</div>
              {props.table.columns.map((column, columnIndex) => (
                <div
                  key={columnIndex}
                  className={styles['data-table__row-item']}
                  style={{ width: `${column.width}px` }}
                >
                  {row[columnIndex]}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataTable;
