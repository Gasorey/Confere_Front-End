import React, { useState } from 'react';
import Modal from '../Modal';
import { Container } from './styles';

interface IBringInfo {
  create_at: Date;
  description: string;
  id: string;
  status: string;
  transaction: {
    card: {
      id: string;
      cvv: string;
      number: string;
      holder: string;
      expiry: Date;
    };
    received: {
      value: number;
      received_date: Date;
      transaction_id: string;
      status: string;
    };
    id: string;
    value: number;
    description: string;
    type: string;
    installment: number;
    payment_id: string;
  };
  updated_at: string;
  user_id: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  bringInfo: IBringInfo[];
}

interface IReceived {
  value: number;
  received_date: Date;
  transaction_id: string;
  status: string;
}

const ModalUserInfo: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  bringInfo,
}) => {
  if (bringInfo) {
    return (
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Container>
          <h2>Feature em desenvolvimento</h2>
          <h2>
            Será utilizada para aprensentar o valor que o usuario tem a receber
            e quanto já recebeu
          </h2>

          <h2>A estrutura que será apresentada está no seu console</h2>
        </Container>
      </Modal>
    );
  }
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Container>
        <h2>
          Desculpe mas não existe nenhum pagamento lançado para esse usuário
        </h2>
      </Container>
    </Modal>
  );
};

export default ModalUserInfo;
