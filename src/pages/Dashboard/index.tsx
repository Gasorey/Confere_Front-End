import React, { useState, useEffect } from 'react';
import { FiPower } from 'react-icons/fi';
import Header from '../../components/Header';
import Board from '../../components/Board';
import api from '../../services/api';
import ModalAddPayment from '../../components/ModalAddPayments';
import ModalEditPayment from '../../components/ModalMakeUpdates';
import ModalTransactionToPayment from '../../components/ModalMakeTransactions';
import Payment from '../../components/Payments';
import { PaymentContainer } from './styles';
import { useAuth } from '../../context/AuthContext';
import List from '../../components/List';

interface IPayment {
  id: string;
  description: string;
  status: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}

interface ICreateTransactions {
  value: number;
  description: string;
  type: 'debit' | 'credit' | 'installment_credit' | string;
  installment: number | undefined;
  number: string;
  expiry: Date;
  cvv: string;
  holder: string;
}

const Dashboard: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [transactionModalOpen, setTransactionModalOpen] = useState(false);

  const { signOut } = useAuth();

  const [editingPayment, setEditingPayment] = useState<IPayment>(
    {} as IPayment,
  );
  const [transactionPayment, setTransactionPayment] = useState<IPayment>(
    {} as IPayment,
  );
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

  async function handleUpdatePayment(
    payment: Omit<IPayment, 'created_at' | 'updated_at'>,
  ): Promise<void> {
    const updatedPayment = { ...editingPayment, ...payment };

    await api.put(`/payment/${editingPayment.id}`, updatedPayment);

    const newPayment = payments.map((paymentItem) =>
      paymentItem.id === editingPayment.id ? updatedPayment : paymentItem,
    );

    setPayments(newPayment);
  }

  async function handleCreateTransaction(
    data: ICreateTransactions,
  ): Promise<void> {
    const { id } = transactionPayment;

    const {
      cvv,
      expiry,
      holder,
      number,
      description,
      installment,
      type,
      value,
    } = data;

    const transactionCard = {
      number,
      holder,
      expiry,
      cvv,
    };

    const transaction = {
      card: transactionCard,
      value,
      description,
      installment,
      type,
    };

    await api.post(`/transaction/${id}`, transaction);
  }

  async function handleDeletePayment(id: string): Promise<void> {
    await api.delete(`/payment/${id}`);

    const newPayments = payments.filter((paymentItem) => paymentItem.id !== id);

    setPayments(newPayments);
  }

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }
  function toggleTransactionModal(): void {
    setTransactionModalOpen(!transactionModalOpen);
  }

  function handleTransactionPayment(payment: IPayment): void {
    setTransactionPayment(payment);
    toggleTransactionModal();
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
      <ModalEditPayment
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        handleEditPayment={handleUpdatePayment}
      />
      <ModalTransactionToPayment
        isOpen={transactionModalOpen}
        setIsOpen={toggleTransactionModal}
        handleCreateTransaction={handleCreateTransaction}
      />
      <Board>
        <List>
          <PaymentContainer data-testid="payments-list">
            {payments &&
              payments.map((payment) => (
                <Payment
                  key={payment.id}
                  payment={payment}
                  handleTransactionPayment={handleTransactionPayment}
                  handleDelete={handleDeletePayment}
                  handleEditPayment={handleEditPayment}
                />
              ))}
          </PaymentContainer>
        </List>
      </Board>
    </>
  );
};

export default Dashboard;
