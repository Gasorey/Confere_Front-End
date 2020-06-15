import React from 'react';

import {} from 'polished';
import { FiPower } from 'react-icons/fi';
import { Container } from './styles';
import { useAuth } from '../../context/AuthContext';

interface IHeaderProps {
  openModal: () => void;
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
              <div className="text">Novo Pagamento</div>
            </button>

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
