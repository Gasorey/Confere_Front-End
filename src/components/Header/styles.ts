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

    nav {
      div {
        button {
          font-weight: 600;
          border-radius: 8px;
          border: 0;
          background: #39b100;
          color: #fff;

          display: flex;
          flex-direction: row;
          align-items: center;
          transition: background-color 0.2s;

          .text {
            padding: 16px 24px;
          }
          .icon {
            display: flex;
            padding: 16px 16px;
            background: #41c900;
            border-radius: 0 8px 8px 0;
            margin: 0 auto;
          }
          &:hover {
            color: ${shade(0.2, '#39b100')};
          }
        }
      }
    }
  }
`;
