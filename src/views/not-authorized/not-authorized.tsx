import { Helmet } from 'react-helmet-async';

import { useTranslation } from 'hooks';

export const NotAuthorized = () => {
  const { t } = useTranslation('page.error.not-authorized');

  return (
    <>
      <Helmet>
        <title>{t('meta.title')}</title>
      </Helmet>

      <div>
        <h1>Not Authorized</h1>
      </div>
    </>
  );
};
