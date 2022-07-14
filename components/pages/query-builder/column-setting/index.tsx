import styles from './index.module.scss';
import { ColumnSettingType } from 'types/query-builder';
import { Checkbox, Label, Select, Textbox } from 'components/uiParts';
import { MdOutlineDragIndicator, MdDelete } from 'react-icons/md';
import { memo } from 'react';

type PropType = {
  columns: ColumnSettingType[];
  handleChangeDisplayName: Function;
  handleChangeGroupBy: Function;
  handleChangeOrder: Function;
  handleChangeDisplay: Function;
  handleDeleteSource: Function;
};

const GROUP_BY = [
  {
    label: '指定なし',
    value: '',
  },
  {
    label: 'グループ化',
    value: 'group by',
  },
  {
    label: '件数',
    value: 'count',
  },
  {
    label: '合計',
    value: 'sum',
  },
  {
    label: '最大',
    value: 'max',
  },
  {
    label: '最小',
    value: 'min',
  },
  {
    label: '平均',
    value: 'avg',
  },
];

const ORDER = [
  {
    label: '指定なし',
    value: '',
  },
  {
    label: '昇順',
    value: 'asc',
  },
  {
    label: '降順',
    value: 'desc',
  },
];

const ColumnSetting = memo((props: PropType) => {
  return (
    <div className={styles['column-setting']}>
      <div className={styles['line-hover']}>
        <div className={styles['line']}></div>
      </div>
      <div className={styles.editor}>
        <div className={styles.caption}>
          <div></div>
          <div>テーブル</div>
          <div>カラム</div>
          <div>表示名</div>
          <div>グループ</div>
          <div>ソート順</div>
          <div>表示</div>
          {/* <div>検索条件</div> */}
        </div>
        <div className={styles.content}>
          <div className={styles['scroll-x']}>
            <div className={styles.row}>
              {props.columns.map((column, columnIndex) => (
                <div
                  key={columnIndex}
                  className={styles.item}
                  style={{ width: `${column.width}px` }}
                >
                  <MdOutlineDragIndicator className={styles.drag} />
                  <div className={styles.header}>
                    <MdDelete
                      className={styles.delete}
                      onClick={props.handleDeleteSource.bind(this, columnIndex)}
                    />
                  </div>
                  <Label value={column.sourceName} />
                  <Label value={column.columnName} />
                  <Textbox
                    value={column.columnName}
                    onChange={props.handleChangeDisplayName.bind(
                      this,
                      columnIndex
                    )}
                  />
                  <Select
                    value={column.methodOrGroupBy}
                    options={GROUP_BY}
                    onChange={props.handleChangeGroupBy.bind(this, columnIndex)}
                  />
                  <Select
                    value={column.order}
                    options={ORDER}
                    onChange={props.handleChangeOrder.bind(this, columnIndex)}
                  />
                  <Checkbox
                    checked={column.display}
                    onChange={props.handleChangeDisplay.bind(this, columnIndex)}
                  />
                  {/* <div className={styles.where}>
                    <div className={styles.control}>
                      <MdAddCircle className={styles.plus} />
                      <MdRemoveCircle className={styles.minus} />
                    </div>
                    <input className={styles['where-input']} />
                  </div> */}
                  {/* {column.where.length <= 0 ? (
                    <div className={styles['where-control']}>
                      <MdAddCircle className={styles['where-plus']} />
                      <MdRemoveCircle className={styles['where-minus']} />
                      <input></input>
                    </div>
                  ) : (
                    column.where.map((_) => {
                      <div className={styles['where-control']}>
                        <MdAddCircle className={styles['where-plus']} />
                        <MdRemoveCircle className={styles['where-minus']} />
                        <input></input>
                      </div>;
                    })
                  )} */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
ColumnSetting.displayName = 'column-setting';

export default ColumnSetting;
