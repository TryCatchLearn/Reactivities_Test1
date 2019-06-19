import React from 'react';
import { Modal } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import { ModalStore } from '../../stores/ModalStore';

interface IProps {
  modalStore?: ModalStore;
}

const ModalContainer: React.FC<IProps> = ({ modalStore }) => {
  const {modal: {open, component, header}, closeModal} = modalStore!;
  return (
    <Modal open={open} onClose={closeModal} size='mini'>
      <Modal.Header>{header}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          {component}
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default inject('modalStore')(observer(ModalContainer));
