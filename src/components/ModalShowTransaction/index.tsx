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

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  bringPaymentToModal: IPayment;
  bringTransactionToModal: ITransaction;
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

const ModalShowTransaction: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  bringPaymentToModal,
  bringTransactionToModal,
}) => {
  const {
    description,
    installment,
    type,
    value,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    card,
  } = bringTransactionToModal;

  // eslint-disable-next-line no-shadow
  function getType(type: string): string {
    // const { } = bringTransactionToModal;

    if (type === 'credit') {
      return 'crédito à vist';
    }
    if (type === 'debit') {
      return 'débito';
    }
    return 'crédito parcelado';
  }

  if (!bringTransactionToModal) {
    return (
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <h1>
          Desculpe esse pagamento não possui transação, clique no icone do
          cartão para realizar a transação
        </h1>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Container>
        <h1>Foi realizada uma transação para o pagamento:</h1>
        <h2>{bringPaymentToModal.description}</h2>
        <h2>Transação: {description}</h2>
        <h2>Valor: {value}</h2>
        <h2>Tipo: {getType(type)}</h2>
        <h2>Número de parcelas: {installment}</h2>
      </Container>
    </Modal>
  );
};
export default ModalShowTransaction;
