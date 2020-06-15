import React from 'react';

import { NavLink } from 'react-router-dom';
import {} from 'polished';
import { Container } from './styles';

interface HeaderProps {
  size?: 'small' | 'large';
}

const Header: React.FC<HeaderProps> = ({ size = 'large' }) => (
  <Container size={size}>
    <header>
      <nav>
        <NavLink
          activeStyle={{
            borderBottom: 'solid',
            borderBottomColor: '#187dc9',
            paddingBottom: '5px',
          }}
          to="/"
        >
          Novo pagamento
        </NavLink>
        <NavLink
          activeStyle={{
            borderBottom: 'solid',
            borderBottomColor: '#187dc9',
            paddingBottom: '5px',
          }}
          to="/"
        >
          Novo pagamento
        </NavLink>
      </nav>
    </header>
  </Container>
);

export default Header;
