import styles from './index.module.scss';
import { MdBuild } from 'react-icons/md';

function SideMenuItem() {
  return (
    <button className={styles['side-menu-item']}>
      <MdBuild className={styles.icon} />
      <label className={styles.caption}>Query</label>
    </button>
  );
}

export default SideMenuItem;
