import React, { useCallback } from 'react';
import { useDrop, DragObjectWithType } from 'react-dnd';
import { Container } from './styles';
import { items } from '../../utils/DnDItem';
import api from '../../services/api';

interface IPayment {
  id: string;
  description: string;
  status: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}

interface IListProps {
  title: string;
  payments: IPayment[];
  setPayments: (payments: IPayment[]) => void;
}

interface changeStatus {
  type: string;
  id: string;
  status: string;
  description: string;
}

interface DragObject extends DragObjectWithType {
  id: string;
  type: string;
  status: string;
  description: string;
}

const List: React.FC<IListProps> = ({
  setPayments,
  payments,
  title,
  children,
}) => {
  const changeStatus = useCallback(
    async ({ id, description }: changeStatus): Promise<void> => {
      const newPayments = payments.map((payment) => {
        if (payment.id !== id) {
          return payment;
        }
        const newPayment = { ...payment, status: title };
        return newPayment;
      });

      setPayments(newPayments);

      await api.put(`/payment/${id}`, {
        status: title,
        description,
      });
    },
    [payments, setPayments, title],
  );

  const [{ isOver }, drop] = useDrop({
    accept: [items.PAYMENT],
    drop: (item: DragObject) => changeStatus(item),

    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      drop: !!monitor.didDrop(),
    }),
  });

  return (
    <Container ref={drop} isOver={isOver}>
      <header>
        <h2>{title}</h2>
      </header>
      <ul>{children}</ul>
    </Container>
  );
};

export default List;
