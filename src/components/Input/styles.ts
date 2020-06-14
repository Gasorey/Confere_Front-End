import React from 'react';
import styled from 'styled-components';

export const Container = styled.div`
  background: #0bb5a7;
  border-radius: 10px;
  padding: 16px;
  width: 100%;

  color: #ffffff;
  border: 2px solid #0bb5a7;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #ffffff;
    font-weight: bold;
    font-size: 20px;

    &::placeholder {
      color: #ffffff;
    }
  }

  > svg {
    margin-right: 16px;
  }
`;
