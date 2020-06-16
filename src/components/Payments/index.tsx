import React, { useRef, createContext } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { FiEdit2, FiTrash2, FiCreditCard, FiInfo } from 'react-icons/fi';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { Container } from './styles';

export const PaymentContext = createContext({
  paymentChange: null,
});

interface IPayment {
  id: string;
  description: string;
  status: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}

interface IProps {
  payment: IPayment;
  handleDelete: (id: string) => {};
  handleEditPayment: (payment: IPayment) => void;
  handleTransactionPayment: (payment: IPayment) => void;
  handlePaymentToShowTransaction: (payment: IPayment) => void;
}

const Payment: React.FC<IProps> = ({
  payment,
  handleDelete,
  handleEditPayment,
  handleTransactionPayment,
  handlePaymentToShowTransaction,
}: IProps) => {
  function setEditingPayment(): void {
    handleEditPayment(payment);
  }
  function setTransactionPayment(): void {
    handleTransactionPayment(payment);
  }
  function setPaymentToShowTransaction(): void {
    handlePaymentToShowTransaction(payment);
  }

  const formatedDate = format(
    parseISO(String(payment.created_at)),
    'dd-MM-yyyy',
    {
      locale: ptBR,
    },
  );

  return (
    <Container>
      <section className="body">
        <h1>Descrição:</h1>
        <p>{payment.description}</p>
        <h1>Status:</h1>
        <p>{payment.status}</p>
        <h1>Data de criação:</h1>
        <p>{formatedDate}</p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={() => setTransactionPayment()}
          >
            <FiCreditCard size={20} />
          </button>
          <button
            type="button"
            className="icon"
            onClick={() => setEditingPayment()}
          >
            <FiEdit2 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(payment.id)}
          >
            <FiTrash2 size={20} />
          </button>
          <button
            type="button"
            className="icon"
            onClick={() => {
              setPaymentToShowTransaction();
            }}
          >
            <FiInfo size={20} />
          </button>
        </div>
      </section>
    </Container>
    // </PaymentContext.Provider>
  );
};

export default Payment;
