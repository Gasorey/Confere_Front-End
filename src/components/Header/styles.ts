import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  background: #0bb5a7;
  padding: 30px 0;
  header {
    width: 100%;
    margin: 0 auto;
    padding: 0 20px 150px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    div.login {
      display: flex;
      align-items: flex-start;
      flex-direction: column;

      h1 {
        margin-top: 8px;
      }
      h2 {
      }
    }

    nav {
      margin-left: 60%;
      div {
        max-width: 100%;
        display: flex;
        .power-button {
          background: transparent;
        }
        button {
          font-weight: 600;
          border-radius: 8px;
          border: 0;
          background: transparent;
          color: #fff;
          margin: 16px;
          font-size: 24px;

          display: flex;
          flex-direction: row;
          align-items: center;
          transition: background-color 0.2s;

          .text {
            padding: 16px 24px;
          }

          &:hover {
            color: ${shade(0.2, '#39b100')};
          }
        }
      }
    }
  }
`;
