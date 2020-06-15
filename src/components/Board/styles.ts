import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  padding: 30px 0;
  height: calc(100% - 80px);

  & + div {
    border-left: 1px solid rgba(0, 0, 0, 0.05);
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 42px;
    h2 {
      font-weight: 500;
      font-size: 24px;
      padding: 0 10px;
    }
  }
`;
