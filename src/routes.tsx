import { Navigate, createBrowserRouter } from 'react-router-dom';
import { App, Error } from 'layouts';
import { Boards, Dashboard, NotAuthorized, NotFound, Profile, Search, Settings } from 'views';

export const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        element: <App />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: 'boards',
            element: <Boards />,
          },
          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: 'search',
            element: <Search />,
          },
          {
            path: 'settings',
            element: <Settings />,
          },
        ],
      },
      {
        element: <Error />,
        children: [
          {
            path: 'not-found',
            element: <NotFound />,
          },
          {
            path: 'not-authorized',
            element: <NotAuthorized />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/not-found" />,
  },
]);
