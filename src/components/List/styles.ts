import styled, { css } from 'styled-components';

interface IContainerProps {
  isOver: boolean;
}
export const Container = styled.div<IContainerProps>`
  padding: 0 15px;
  height: 100%;
  flex: 0 0 25%;
  margin-left: 32px;
  color: black;

  h2 {
    color: black;
  }
  ${(props) =>
    props.isOver &&
    css`
      border: 2px dashed rgba(0, 0, 0, 0.2);
      padding-top: 31px;
      border-radius: 0;
      background: transparent;
      box-shadow: none;
      cursos: grabbing;

       h2, section, svg, header {
        opacity: 0;
    `}
`;
