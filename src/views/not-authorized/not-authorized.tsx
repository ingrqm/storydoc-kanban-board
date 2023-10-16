import { Helmet } from 'react-helmet-async';

export const NotAuthorized = () => {
  return (
    <>
      <Helmet>
        <title>Not Authorized</title>
      </Helmet>

      <div>
        <h1>Not Authorized</h1>
      </div>
    </>
  );
};
