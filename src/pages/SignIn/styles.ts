import styled from 'styled-components';
import { shade } from 'polished';
import signInImg from '../../assets/Cliente.svg';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 700px;

  form {
    margin: 80px 0;
    width: 520px;
    text-align: center;
    h1 {
      margin-bottom: 50px;
      color: #312e38;
    }
  }

  a {
    color: #312e38;
    display: flex;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;
    font-weight: bold;
    font-size: 20px;

    > svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#312e38')};
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signInImg}) no-repeat center;
  background-size: cover;
`;
