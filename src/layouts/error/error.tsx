import { Outlet } from 'react-router-dom';

export const Error = () => {
  return (
    <div>
      <h1>Error</h1>
      <Outlet />
    </div>
  );
};
