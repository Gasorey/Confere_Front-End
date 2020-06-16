import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  /* display: flex; */
`;

export const Header = styled.header`
  background: #0bb5a7;
  padding: 32px 0;
`;

export const HeaderContent = styled.div`
  width: 100%;
  margin: 0 50px;
  display: flex;

  nav {
    button {
      background: transparent;
      border: 0;
      color: #fff;
      flex-direction: row;

      &:hover {
        color: ${shade(0.2, '#39b100')};
      }
    }
  }
`;
