import React from 'react';

import {} from 'polished';
import { FiPlusSquare } from 'react-icons/fi';
import { Container } from './styles';

interface IHeaderProps {
  openModal?: () => void;
}

const Header: React.FC<IHeaderProps> = ({ openModal }) => (
  <Container>
    <header>
      <nav>
        <div>
          <button
            type="button"
            // onClick={() => {
            //   openModal();
            // }}
          >
            <div className="text">Novo Pagamento</div>
            <div className="icon">
              <FiPlusSquare size={20} />
            </div>
          </button>
        </div>
      </nav>
    </header>
  </Container>
);

export default Header;
