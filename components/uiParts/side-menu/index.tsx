import styles from './index.module.scss';
import SideMenuItem from './side-menu-item';

function SideMenu() {
  return (
    <div className={styles['side-menu']}>
      <div className={styles['side-menu__item']}>
        <SideMenuItem />
      </div>
    </div>
  );
}

export default SideMenu;
