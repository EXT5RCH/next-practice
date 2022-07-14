import styles from './index.module.scss';
import { MdViewHeadline, MdOutlineMoreHoriz } from 'react-icons/md';

function Header() {
  return (
    <div className={styles.header}>
      <button className={styles.header__left}>
        <MdViewHeadline className={styles.header__menu} />
      </button>
      <button className={styles.header__right}>
        <MdOutlineMoreHoriz className={styles.header__personal} />
      </button>
    </div>
  );
}

export default Header;
