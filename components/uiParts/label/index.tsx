import styles from './index.module.scss';

type PropType = {
  value: string;
};

const Label = (props: PropType) => {
  return (
    <div className={styles.background}>
      <label className={styles.text}>{props.value}</label>
    </div>
  );
};

export default Label;
