import { Outlet } from 'react-router-dom';

import { Sidebar } from './components';
import * as Styled from './app.styled';

export const App = () => {
  return (
    <Styled.Wrapper>
      <Sidebar />

      <Styled.Main>
        <Outlet />
      </Styled.Main>
    </Styled.Wrapper>
  );
};
