import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { ThemeProvider } from 'providers';
import { store } from 'store';
import { GlobalStyles } from 'styles';
import { router } from 'routes';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <ThemeProvider>
          <GlobalStyles />
          <RouterProvider router={router} />
        </ThemeProvider>
      </HelmetProvider>
    </Provider>
  </React.StrictMode>,
);
