import styles from './index.module.scss';
import WhereItem from './where-item';

const Where = () => {
  return (
    <div className={styles['where']}>
      <WhereItem />
    </div>
  );
};

export default Where;
