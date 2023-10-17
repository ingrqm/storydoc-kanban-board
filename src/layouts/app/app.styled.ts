import styled from 'styled-components';

export const Wrapper = styled.div`
  background: ${({ theme }) => theme.layout.app.wrapper.background};
  position: relative;
  padding: 16px;
  width: 100%;
  height: 100%;
`;

export const Main = styled.div`
  display: flex;
  padding-left: calc(294px + 16px);
  min-height: calc(100vh - 32px);
`;
