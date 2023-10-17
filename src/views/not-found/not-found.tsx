import { useTranslation } from 'hooks';

import { Helmet } from 'react-helmet-async';

export const NotFound = () => {
  const { t } = useTranslation('page.error.not-found');

  return (
    <>
      <Helmet>
        <title>{t('meta.title')}</title>
      </Helmet>

      <div>
        <h1>Not Found</h1>
      </div>
    </>
  );
};
