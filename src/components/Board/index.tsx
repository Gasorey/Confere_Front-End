import React, { useState } from 'react';
import List from '../List';
import api from '../../services/api';

import { Container } from './styles';

interface IPayment {
  id: string;
  description: string;
  status: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}

const Board: React.FC = ({ children }) => {
  const [payments, setPayments] = useState<IPayment[]>([]);

  async function loadPaymentsType(): Promise<void> {
    await api.get('/payments').then((response) => {
      const userPayments = response.data;

      setPayments(userPayments);
    });
  }

  return (
    <Container>
      {payments.map((payment) => (
        <List key={payment.id} data={payment} />
      ))}
      {children}
    </Container>
  );
};
export default Board;
