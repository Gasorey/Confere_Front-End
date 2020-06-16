import React, { useState, useEffect, useCallback } from 'react';
import Header from '../../components/Header';
import Board from '../../components/Board';
import api from '../../services/api';
import ModalAddPayment from '../../components/ModalAddPayments';
import ModalEditPayment from '../../components/ModalMakeUpdates';
import ModalTransactionToPayment from '../../components/ModalMakeTransactions';
import ModalShowInfo from '../../components/ModalShowInfo';
import Payment from '../../components/Payments';
import { PaymentContainer } from './styles';
import List from '../../components/List';

interface IPayment {
  id: string;
  description: string;
  status: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}

interface ITransaction {
  id: string;
  value: number;
  description: string;
  type: string;
  installment: number;
  payment_id: string;
  Card: {
    id: string;
    number: string;
    expiry: Date;
    cvv: string;
    holder: string;
    transaction_id: string;
  };
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
  const [showInfoModalOpen, setShowInfoModalOpen] = useState(false);
  const [showTransaction, setShowTransaction] = useState<ITransaction>(
    {} as ITransaction,
  );

  const [editingPayment, setEditingPayment] = useState<IPayment>(
    {} as IPayment,
  );
  const [transactionPayment, setTransactionPayment] = useState<IPayment>(
    {} as IPayment,
  );
  const [payments, setPayments] = useState<IPayment[]>([]);
  const [paymentToShowTransaction, setPaymentToShowTransaction] = useState<
    IPayment
  >({} as IPayment);

  useEffect(() => {
    async function loadPayments(): Promise<void> {
      await api.get('/payment').then((response) => {
        const payment = response.data;

        setPayments(payment);
      });
    }
    loadPayments();
  }, []);

  // useEffect(() => {
  //   async function loadTransaction(): Promise<void> {
  //     const { id } = paymentToShowTransaction;
  //     await api.get(`/transaction/${id}`).then((response) => {
  //       const myTransaction = response.data;

  //       setShowTransaction(myTransaction);
  //       console.log(showTransaction);
  //     });
  //   }
  //   loadTransaction();
  // }, []);

 export const transactionInfo = useCallback(() => {
  async function loadTransaction(): Promise<void> {
    const { id } = paymentToShowTransaction;
    await api.get(`/transaction/${id}`)
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

  async function handleIndexTransaction(teste: string): Promise<void> {
    const { id } = paymentToShowTransaction;
    await api.get(`/transaction/${id}`).then((response) => {
      const transaction = response.data;
    });
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
  function toggleShowInfoModal(): void {
    setShowInfoModalOpen(!showInfoModalOpen);
  }

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }
  function toggleTransactionModal(): void {
    setTransactionModalOpen(!transactionModalOpen);
  }

  function handlePaymentToShowTransaction(payment: IPayment): void {
    setPaymentToShowTransaction(payment);

    toggleShowInfoModal();
  }

  function handleTransactionPayment(payment: IPayment): void {
    setTransactionPayment(payment);
    handleIndexTransaction(payment.id);
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
      <ModalShowInfo
        isOpen={showInfoModalOpen}
        setIsOpen={toggleShowInfoModal}
        handleIndexTransaction={handleIndexTransaction}
      />
      <Board>
        <List title="Aguardando pagamento">
          <PaymentContainer data-testid="payments-list">
            {payments &&
              payments
                .filter((payment) => payment.status === 'Aguardando pagamento')
                .map((payment) => (
                  <Payment
                    key={payment.id}
                    payment={payment}
                    handleTransactionPayment={handleTransactionPayment}
                    handleDelete={handleDeletePayment}
                    handleEditPayment={handleEditPayment}
                    handlePaymentToShowTransaction={
                      handlePaymentToShowTransaction
                    }
                  />
                ))}
          </PaymentContainer>
        </List>
        <List title="Pagamento efetuado">
          <PaymentContainer data-testid="payments-list">
            {payments &&
              payments
                .filter((payment) => payment.status === 'Pagamento efetuado')
                .map((payment) => (
                  <Payment
                    key={payment.id}
                    payment={payment}
                    handleTransactionPayment={handleTransactionPayment}
                    handleDelete={handleDeletePayment}
                    handleEditPayment={handleEditPayment}
                    handlePaymentToShowTransaction={
                      handlePaymentToShowTransaction
                    }
                  />
                ))}
          </PaymentContainer>
        </List>
        <List title="Recebido">
          <PaymentContainer data-testid="payments-list">
            {payments &&
              payments
                .filter((payment) => payment.status === 'Recebido')
                .map((payment) => (
                  <Payment
                    key={payment.id}
                    payment={payment}
                    handleTransactionPayment={handleTransactionPayment}
                    handleDelete={handleDeletePayment}
                    handleEditPayment={handleEditPayment}
                    handlePaymentToShowTransaction={
                      handlePaymentToShowTransaction
                    }
                  />
                ))}
          </PaymentContainer>
        </List>
      </Board>
    </>
  );
};

export default Dashboard;
