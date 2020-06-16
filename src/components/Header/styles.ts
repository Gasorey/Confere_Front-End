import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  background: #0bb5a7;
  padding: 30px 0;
  header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    div.login {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      margin-left: 24px;
      h1 {
        margin-left: 24px;
        margin-top: 8px;
      }
      h2 {
        margin-left: 24px;
      }
    }

    nav {
      width: 20%;
      /* background: black; */

      div {
        max-width: 100%;
        display: flex;

        button,
        a {
          font-weight: 600;
          border-radius: 8px;
          border: 0;
          background: transparent;
          color: #fff;
          margin: 8px;
          font-size: 24px;

          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          transition: background-color 0.2s;

          .text {
            padding: 0px 0px;
          }

          &:hover {
            color: ${shade(0.2, '#39b100')};
          }
        }
      }
    }
  }
`;
