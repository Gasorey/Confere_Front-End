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

interface ICreatePayment {
  description: string;
  status: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddPayment: (
    payment: Omit<IPayment, 'id' | 'user_id' | 'created_at' | 'updated_at'>,
  ) => void;
}

const ModalAddPayment: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddPayment,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: ICreatePayment) => {
      handleAddPayment(data);

      setIsOpen();
    },
    [handleAddPayment, setIsOpen],
  );
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Pagamento</h1>
        <Input name="description" placeholder="Descrição do seu pagamento" />
        <Input name="status" placeholder="Qual o status do pagamento" />
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
export default ModalAddPayment;
