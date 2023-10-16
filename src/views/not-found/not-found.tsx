import { Helmet } from 'react-helmet-async';

export const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Not Found</title>
      </Helmet>

      <div>
        <h1>Not Found</h1>
      </div>
    </>
  );
};
