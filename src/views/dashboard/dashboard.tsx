import { Helmet } from 'react-helmet-async';

import { useTranslation } from 'hooks';

export const Dashboard = () => {
  const { t } = useTranslation('page.app.dashboard');

  return (
    <>
      <Helmet>
        <title>{t('meta.title')}</title>
      </Helmet>

      <div>
        <h1>Dashboard</h1>
      </div>
    </>
  );
};
