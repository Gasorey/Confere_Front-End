import React, { useState, useEffect, useMemo } from 'react';
import socketio from 'socket.io-client';
import Header from '../../components/Header';
import Board from '../../components/Board';
import api from '../../services/api';
import ModalAddPayment from '../../components/ModalAddPayments';
import ModalEditPayment from '../../components/ModalMakeUpdates';
import ModalTransactionToPayment from '../../components/ModalMakeTransactions';
import ModalUserInfo from '../../components/ModalUserInfo';
import ModalShowTransaction from '../../components/ModalShowTransaction';
import Payment from '../../components/Payments';
import { PaymentContainer } from './styles';
import List from '../../components/List';
import { useAuth } from '../../context/AuthContext';

interface IPayment {
  id: string;
  description: string;
  status: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}

interface IReceived {
  id: string;
  status: string;
  transaction_id: string;
  value: number;
  received_date: Date;
}

interface ITransaction {
  id: string;
  value: number;
  description: string;
  type: string;
  installment: number;
  payment_id: string;
  card: {
    id: string;
    number: string;
    expiry: Date;
    cvv: string;
    holder: string;
    transaction_id: string;
  };
}

interface ICard {
  card: {
    id: string;
    number: string;
    expiry: Date;
    cvv: string;
    holder: string;
    transaction_id: string;
  };
}

interface IUserTransaction {
  transaction: ITransaction;
  received: IReceived;
  card: ICard;
}

interface IUserInfo {
  payment: {
    id: string;
    description: string;
    status: string;
    user_id: string;
    created_at: Date;
    updated_at: Date;
  };
  transaction: IUserTransaction;
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
interface IBringInfo {
  create_at: Date;
  description: string;
  id: string;
  status: string;
  transaction: {
    card: {
      id: string;
      cvv: string;
      number: string;
      holder: string;
      expiry: Date;
    };
    received: {
      value: number;
      received_date: Date;
      transaction_id: string;
      status: string;
    };
    id: string;
    value: number;
    description: string;
    type: string;
    installment: number;
    payment_id: string;
  };
  updated_at: string;
  user_id: string;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const [modalOpen, setModalOpen] = useState(false);

  const [userModalOpen, setUserModalOpen] = useState(false);

  const [editModalOpen, setEditModalOpen] = useState(false);

  const [transactionModalOpen, setTransactionModalOpen] = useState(false);

  const [openTransactionInfo, setOpenTransactionInfo] = useState(false);

  const [editingPayment, setEditingPayment] = useState<IPayment>(
    {} as IPayment,
  );

  const [transactionToModal, setTransactionToModal] = useState<ITransaction>(
    {} as ITransaction,
  );

  const [userInfo, setUserInfo] = useState<IBringInfo[]>([]);

  const [
    showTransactionFromThisPayment,
    setShowTransactionFromThisPayment,
  ] = useState<IPayment>({} as IPayment);

  const [transactionPayment, setTransactionPayment] = useState<IPayment>(
    {} as IPayment,
  );
  const [payments, setPayments] = useState<IPayment[]>([]);

  const socket = useMemo(
    () =>
      socketio('http://localhost:3333/', {
        query: { user_id: user.id },
      }),
    [user.id],
  );

  useEffect(() => {
    socket.on('payment.create', (data: IPayment) => {
      setPayments([...payments, data]);
    });
  }, [payments, socket]);

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
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }

  async function getUserInfo(): Promise<void> {
    try {
      await api.get('/payment').then((response) => {
        const userInformation = response.data;

        setUserInfo(userInformation);
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function getTransaction(payment: IPayment): Promise<void> {
    try {
      await api.get(`/transaction/${payment.id}`).then((response) => {
        const transactions = response.data;

        setTransactionToModal(transactions);
      });
    } catch (err) {
      // eslint-disable-next-line no-console
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

  function toggleUserModal(): void {
    getUserInfo();
    setUserModalOpen(!userModalOpen);
  }

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }
  function toggleTransactionModal(): void {
    setTransactionModalOpen(!transactionModalOpen);
  }
  function toggleShowTransactionModal(): void {
    setOpenTransactionInfo(!openTransactionInfo);
  }

  function handleTransactionPayment(payment: IPayment): void {
    setTransactionPayment(payment);
    toggleTransactionModal();
  }

  function handleEditPayment(payment: IPayment): void {
    setEditingPayment(payment);
    toggleEditModal();
  }

  function putPaymentIntoState(payment: IPayment): void {
    setShowTransactionFromThisPayment(payment);
    getTransaction(payment);
    toggleShowTransactionModal();
  }

  function alterPayments(paymentsAltered: IPayment[]): void {
    setPayments(paymentsAltered);
  }

  return (
    <>
      <Header openModal={toggleModal} openUserModal={toggleUserModal} />
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
      <ModalShowTransaction
        isOpen={openTransactionInfo}
        setIsOpen={toggleShowTransactionModal}
        bringPaymentToModal={showTransactionFromThisPayment}
        bringTransactionToModal={transactionToModal}
      />
      <ModalUserInfo
        isOpen={userModalOpen}
        setIsOpen={toggleUserModal}
        bringInfo={userInfo}
      />
      <Board>
        <List
          title="Aguardando pagamento"
          payments={payments}
          setPayments={setPayments}
        >
          <PaymentContainer>
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
                    getPayment={putPaymentIntoState}
                  />
                ))}
          </PaymentContainer>
        </List>
        <List
          title="Pagamento efetuado"
          payments={payments}
          setPayments={alterPayments}
        >
          <PaymentContainer>
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
                    getPayment={putPaymentIntoState}
                  />
                ))}
          </PaymentContainer>
        </List>
        <List title="Recebido" payments={payments} setPayments={alterPayments}>
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
                    getPayment={putPaymentIntoState}
                  />
                ))}
          </PaymentContainer>
        </List>
      </Board>
    </>
  );
};

export default Dashboard;
