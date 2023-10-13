import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { selectors } from 'store/theme/slice';
import { themes } from 'styles/theme';

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const theme = useSelector(selectors.selectTheme);

  return <StyledThemeProvider theme={themes[theme]}>{children}</StyledThemeProvider>;
};
