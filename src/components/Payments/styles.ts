import styled from 'styled-components';
import {} from 'react-dnd';

export const Container = styled.div`
  background: #f0f0f5;
  border-radius: 8px;
  position: relative;
  margin-bottom: 8px;
  box-shadow: 0 1px 4px 0 rgba(192, 208, 230, 0.8);
  border-top: 20px solid rgba(230, 236, 245, 0.4);

  header {
    background: #ffb84d;
    border-radius: 8px 8px 0px 0px;
    height: 120px;
    overflow: hidden;
    transition: 0.3 opacity;
    text-align: center;
    position: absolute;
  }

  section.body {
    padding: 30px;
    h1 {
      font-weight: bold;
      color: #3d3d4d;
    }
    h2 {
      color: #3d3d4d;
    }
    p {
      color: #3d3d4d;
      font-size: 18px;
      margin-top: 16px;
      margin-bottom: 8px;
    }
  }
  section.footer {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 20px 30px;
    background: #e4e4eb;
    border-radius: 0px 0px 8px 8px;

    div.icon-containter {
      display: flex;
    }

    button {
      background: #fff;
      padding: 10px;
      border-radius: 8px;
      border: none;
      transition: 0.2s;

      svg {
        color: #3d3d4d;
      }

      & + button {
        margin-left: 6px;
      }
    }
  }
`;
