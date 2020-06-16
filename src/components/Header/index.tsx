import React from 'react';
import { FiPower, FiUser } from 'react-icons/fi';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { Container } from './styles';
import { useAuth } from '../../context/AuthContext';

interface IHeaderProps {
  openModal: () => void | undefined;
}

const Header: React.FC<IHeaderProps> = ({ openModal }) => {
  const { user, signOut } = useAuth();

  return (
    <Container>
      <header>
        <div className="login">
          <h2>Seja bem vindo: </h2>
          <h1>{user.name}</h1>
        </div>
        <nav>
          <div>
            <button
              type="button"
              onClick={() => {
                openModal();
              }}
            >
              <RiMoneyDollarCircleLine size={30} />
              <div className="text">Novo Pagamento</div>
            </button>
            <Link to="/profile">
              <button type="button">
                <FiUser size={24} />
              </button>
            </Link>
            <button
              type="button"
              onClick={() => signOut()}
              className="power-button"
            >
              <FiPower size={24} />
            </button>
          </div>
        </nav>
      </header>
    </Container>
  );
};

export default Header;
