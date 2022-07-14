import styles from './index.module.scss';
import { MdPlayCircleOutline } from 'react-icons/md';

type PropType = {
  handleClickOpenWhere: () => void;
};

const Menu = (props: PropType) => {
  return (
    <div className={styles.menu}>
      <div className={styles.left}>
        <div className={styles.start} onClick={() => alert('検索処理を実行')}>
          <MdPlayCircleOutline />
          実行
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.start} onClick={props.handleClickOpenWhere}>
          検索条件
        </div>
      </div>
    </div>
  );
};

export default Menu;
