import React, { HTMLAttributes } from 'react';
import { Container } from './styles';
import Payments from '../Payments';

interface IPayment {
  id: string;
  description: string;
  status: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}

interface IListProps extends HTMLAttributes<HTMLElement> {
  name?: string;
  data?: IPayment;
}

const List: React.FC<IListProps> = ({ data, children }) => {
  return (
    <Container>
      <header>
        <h2>{data?.status}</h2>
      </header>
      <ul>{children}</ul>
    </Container>
  );
};

export default List;
