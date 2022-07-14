import styles from './index.module.scss';
import { memo, ReactNode } from 'react';
import { MdClose } from 'react-icons/md';

type PropType = {
  title: string;
  fade: string;
  children: ReactNode;
  funcClose: () => void;
};

const Modal = memo((props: PropType) => {
  if (props.fade === '') return <></>;
  return (
    <div
      className={`${styles.overlay} ${styles[props.fade]}`}
      onClick={props.funcClose}
    >
      <div
        className={styles.content}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={styles.header}>
          <div className={styles.title}>{props.title}</div>
          <button onClick={props.funcClose}>
            <MdClose />
          </button>
        </div>
        <section className={styles.section}>{props.children}</section>
      </div>
    </div>
  );
});
Modal.displayName = 'modal';

export default Modal;
