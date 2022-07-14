import Where from './where';
import { Modal } from 'components/uiParts';
import { memo } from 'react';

type PropType = {
  title: string;
  fade: string;
  funcClose: () => void;
};

const ModalWhere = memo((props: PropType) => {
  return (
    <Modal title={props.title} fade={props.fade} funcClose={props.funcClose}>
      <Where />
    </Modal>
  );
});
ModalWhere.displayName = 'modal-where';

export default ModalWhere;
