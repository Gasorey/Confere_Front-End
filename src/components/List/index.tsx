import React from 'react';
import { Container } from './styles';

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
}

const List: React.FC<IListProps> = ({ title, children }) => {
  return (
    <Container>
      <header>
        <h2>{title}</h2>
      </header>
      <ul>{children}</ul>
    </Container>
  );
};

export default List;
