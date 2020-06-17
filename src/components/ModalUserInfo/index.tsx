import React from 'react';
import Modal from '../Modal';
import { Container } from './styles';

interface IPayment {
  id: string;
  description: string;
  status: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}

interface IReceived {
  id: string;
  status: string;
  transaction_id: string;
  value: number;
  received_date: Date;
}

interface ITransaction {
  id: string;
  value: number;
  description: string;
  type: string;
  installment: number;
  payment_id: string;
  card: {
    id: string;
    number: string;
    expiry: Date;
    cvv: string;
    holder: string;
    transaction_id: string;
  };
}

interface ICard {
  card: {
    id: string;
    number: string;
    expiry: Date;
    cvv: string;
    holder: string;
    transaction_id: string;
  };
}

interface IUserTransaction {
  transaction: ITransaction;
  received: IReceived;
  card: ICard;
}

interface IUserInfo {
  payment: IPayment;
  transaction: IUserTransaction;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  bringInfo: IUserInfo;
}

const ModalUserInfo: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  bringInfo,
}) => {
  console.log(bringInfo);
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Container>
        <h2>Feature em desenvolvimento</h2>
        <h2>
          Será utilizada para aprensentar o valor que o usuario tem a receber e
          quanto já recebeu
        </h2>
        <h2>A estrutura que será apresentada está no seu console</h2>
      </Container>
    </Modal>
  );
};

export default ModalUserInfo;
