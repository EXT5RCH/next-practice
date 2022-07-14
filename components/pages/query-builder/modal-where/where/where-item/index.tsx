import { MdAdd, MdClear } from 'react-icons/md';
import styles from './index.module.scss';
import Select from 'react-select';

const options1 = [
  { value: 'and', label: 'かつ' },
  { value: 'or', label: 'または' },
];

const options2 = [{ value: 'employee_id', label: 'employee_id' }];

const options3 = [
  { value: 'equal', label: '等しい' },
  { value: 'not equal', label: '等しくない' },
];

const WhereItem = () => {
  return (
    <div className={styles['where-line']}>
      <MdAdd className={`${styles['where-line__icon']} ${styles['add']}`} />
      <MdClear
        className={`${styles['where-line__icon']}  ${styles['clear']}`}
      />
      <Select
        instanceId={'join'}
        options={options1}
        className={styles['where-line__select']}
      />
      <Select
        instanceId={'field'}
        options={options2}
        className={styles['where-line__select']}
      />
      <Select
        instanceId={'judgement'}
        options={options3}
        className={styles['where-line__select']}
      />
      <input className={styles['where-line__input']} />
    </div>
  );
};

export default WhereItem;
