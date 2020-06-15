import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import api from '../../services/api';
import ModalAddPayment from '../../components/ModalAddPayments';
import Payment from '../../components/Payments';
import { PaymentContainer } from './styles';

interface IPayment {
  id: string;
  description: string;
  status: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}

const Dashboard: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPayment, setEditingPayment] = useState<IPayment>(
    {} as IPayment,
  );
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [payments, setPayments] = useState<IPayment[]>([]);

  useEffect(() => {
    async function loadPayments(): Promise<void> {
      await api.get('/payment').then((response) => {
        const payment = response.data;

        setPayments(payment);
      });
    }
    loadPayments();
  }, []);

  async function handleAddPayment(
    payment: Omit<IPayment, 'id' | 'user_id' | 'created_at' | 'updated_at'>,
  ): Promise<void> {
    try {
      const newPayment = await api.post('/payment', {
        ...payment,
      });
      setPayments([...payments, newPayment.data]);
    } catch (err) {
      console.log(err);
    }
  }
  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  async function handleUpdatePayment(
    payment: Omit<IPayment, 'user_id' | 'created_at' | 'updated_at'>,
  ): Promise<void> {
    const updatedPayment = { ...editingPayment, ...payment };

    await api.put(`/payment/${editingPayment.id}`, updatedPayment);

    const newPayment = payments.map((paymentItem) =>
      paymentItem.id === editingPayment.id ? updatedPayment : paymentItem,
    );

    setPayments(newPayment);
  }

  async function handleDeletePayment(id: string): Promise<void> {
    await api.delete(`/payment/${id}`);

    const newPayments = payments.filter((paymentItem) => paymentItem.id !== id);

    setPayments(newPayments);
  }

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditPayment(payment: IPayment): void {
    setEditingPayment(payment);
    toggleEditModal();
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddPayment
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddPayment={handleAddPayment}
      />

      <PaymentContainer data-testid="payments-list">
        {payments &&
          payments.map((payment) => (
            <Payment
              key={payment.id}
              payment={payment}
              handleDelete={handleDeletePayment}
              handleEditPayment={handleEditPayment}
            />
          ))}
      </PaymentContainer>
    </>
  );
};

export default Dashboard;
