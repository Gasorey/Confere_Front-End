import React from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { Container } from './styles';

interface IPayment {
  id: string;
  description: string;
  status: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}
// interface IUpdatingPayment {
//   id: string;
//   description: string;
//   status: string;
// }

interface IProps {
  payment: IPayment;
  handleDelete: (id: string) => {};
  handleEditPayment: (payment: IPayment) => void;
}

const Payment: React.FC<IProps> = ({
  payment,
  handleDelete,
  handleEditPayment,
}: IProps) => {
  function setEditingPayment(): void {
    handleEditPayment(payment);
  }
  return (
    <Container>
      <section className="body">
        <h1>Descrição:</h1>
        <p>{payment.description}</p>
        <h1>Status:</h1>
        <p>{payment.status}</p>
        <h1>Data de criação:</h1>
        <p>{payment.created_at}</p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={() => setEditingPayment()}
            data-testid={`edit-payment-${payment.id}`}
          >
            <FiEdit2 size={20} />
          </button>
          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(payment.id)}
            data-testid={`remove-payment-${payment.id}`}
          >
            <FiTrash2 size={20} />
          </button>
        </div>
      </section>
    </Container>
  );
};

export default Payment;
