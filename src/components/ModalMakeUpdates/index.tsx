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
  handleEditPayment: (payment: IPayment) => void;
}

const ModalEditPayment: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleEditPayment,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: IPayment) => {
      handleEditPayment(data);

      setIsOpen();
    },
    [handleEditPayment, setIsOpen],
  );
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Atualize o status do seu pagamento</h1>
        <h2>As opções são:</h2>
        <ul>
          <li>Aguardando pagamento</li>
          <li>Pagamento efetuado</li>
          <li>Recebido</li>
        </ul>
        <Input name="status" placeholder="Qual o status do pagamento" />
        <button type="submit">
          <p className="text">Atualizar pagamento</p>
          <div className="icon">
            <FiCheckCircle size={20} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};
export default ModalEditPayment;
