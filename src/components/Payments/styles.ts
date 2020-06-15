import styled, { css } from 'styled-components';

export const Container = styled.div`
  background: #f0f0f5;
  border-radius: 8px;

  header {
    background: #ffb84d;
    border-radius: 8px 8px 0px 0px;
    height: 192px;
    overflow: hidden;
    transition: 0.3 opacity;
    text-align: center;
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
`;
