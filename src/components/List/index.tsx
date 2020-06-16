import React from 'react';
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
}

interface changeStatus {
  type: string;
  id: string;
  status: string;
  description: string;
}

const List: React.FC<IListProps> = ({ title, children }) => {
  async function changeStatus({
    type,
    id,
    status,
    description,
  }: changeStatus): Promise<void> {
    await api.put(`/payment/${id}`, {
      status: title,
      description,
    });
  }

  interface DragObject extends DragObjectWithType {
    id: string;
    type: string;
    status: string;
    description: string;
  }

  const [{ isOver }, drop] = useDrop({
    accept: [items.PAYMENT],
    drop: (item: DragObject, monitor) => changeStatus(item),

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
