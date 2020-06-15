import React, { useRef, useCallback } from 'react';
import { FormHandles } from '@unform/core';
import { FiCheckCircle } from 'react-icons/fi';
import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';

interface IPayment {
  id: string;
  description: string;
  status: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}

interface ICreateTransactions {
  value: number;
  description: string;
  type: 'debit' | 'credit' | 'installment_credit' | string;
  installment: undefined | number;

  number: string;
  expiry: Date;
  cvv: string;
  holder: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleCreateTransaction: (data: ICreateTransactions) => void;
}

const ModalMakeTransactionToPayment: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleCreateTransaction,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: ICreateTransactions) => {
      handleCreateTransaction(data);

      setIsOpen();
    },
    [handleCreateTransaction, setIsOpen],
  );
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Transação para esse pagamento</h1>
        <h2>Card:</h2>
        <Input name="number" placeholder="Número do cartão" />
        <Input type="Date" name="expiry" placeholder="Validade" />
        <Input type="text" name="cvv" placeholder="cvv" />
        <Input type="text" name="holder" placeholder="Nome no cartão" />
        <h2>Transação:</h2>
        <Input type="number" name="value" placeholder="Valor da transação" />
        <Input
          type="text"
          name="description"
          placeholder="Descrição da transação"
        />
        <Input type="text" name="type" placeholder="Tipo de Transação" />
        <Input
          type="number"
          name="installment"
          placeholder="Quantidade de parcelas"
        />

        <button type="submit" data-testid="add-payment">
          <p className="text">Adicionar novo pagamento</p>
          <div className="icon">
            <FiCheckCircle size={20} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};
export default ModalMakeTransactionToPayment;
