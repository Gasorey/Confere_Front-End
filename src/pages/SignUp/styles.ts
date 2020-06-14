import React from 'react';
import styled from 'styled-components';
import { shade } from 'polished';
import signUpImg from '../../assets/Cadastro.svg';

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
  margin-left: 50px;
  margin-right: 50px;
  h1 {
    margin-top: 50px;
    margin-bottom: 50px;
    color: #312e38;
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
  background: url(${signUpImg}) no-repeat center;
  background-size: cover;
`;
