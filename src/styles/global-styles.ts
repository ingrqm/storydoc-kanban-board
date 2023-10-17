import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    font-size: 16px;
    font-family: 'Inter Variable', sans-serif;
  }

  * {
    font-family: 'Inter Variable', sans-serif;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    outline: none;
  }
`;
