import { Outlet } from 'react-router-dom';

export const App = () => {
  return (
    <div>
      <h1>App</h1>
      <Outlet />
    </div>
  );
};