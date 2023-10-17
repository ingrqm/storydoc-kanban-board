import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: auto;
  justify-content: flex-start;
  align-items: flex-start;
  min-height: 100%;
`;

export const Container = styled.div`
  min-width: 294px;
`;

export const Droppable = styled.div`
  display: flex;
  flex-shrink: 0;
  gap: 16px;
  justify-content: flex-start;
  align-items: flex-start;
  min-height: 100%;
`;
