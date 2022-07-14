import { ChangeEventHandler } from 'react';
import styles from './index.module.scss';

type PropType = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const Textbox = (props: PropType) => {
  return (
    <input
      type='textbox'
      defaultValue={props.value}
      className={styles.text}
      onChange={props.onChange}
    />
  );
};

export default Textbox;
