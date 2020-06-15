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

const Board: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};
export default Board;
