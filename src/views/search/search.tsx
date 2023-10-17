import { Helmet } from 'react-helmet-async';

import { useTranslation } from 'hooks';

export const Search = () => {
  const { t } = useTranslation('page.app.search');

  return (
    <>
      <Helmet>
        <title>{t('meta.title')}</title>
      </Helmet>

      <div>
        <h1>Search</h1>
      </div>
    </>
  );
};
