import { ChangeEventHandler } from 'react';
import styles from './index.module.scss';
import { OptionType } from './types';

type PropType = {
  value: string | number;
  options: OptionType[];
  onChange: ChangeEventHandler<HTMLSelectElement>;
};

const Select = (props: PropType) => {
  return (
    <select
      value={props.value}
      className={styles.select}
      onChange={props.onChange}
    >
      {props.options.map((v) => (
        <option key={v.value} value={v.value}>
          {v.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
