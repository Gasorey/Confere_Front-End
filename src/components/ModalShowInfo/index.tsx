import React, { useRef, useCallback } from 'react';
import Modal from '../Modal';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleIndexTransaction: (id: string) => void;
}

const ModalShowInfo: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleIndexTransaction,
}) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <h1>Transação para esse pagamento</h1>
      <h2>Card:</h2>
    </Modal>
  );
};
export default ModalShowInfo;
