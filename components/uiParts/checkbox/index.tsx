import { ChangeEventHandler } from 'react';
import styles from './index.module.scss';

type PropType = {
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const Checkbox = (props: PropType) => {
  return (
    <div className={styles.checkbox}>
      <input
        type='checkbox'
        checked={props.checked}
        onChange={props.onChange}
      />
    </div>
  );
};

export default Checkbox;
