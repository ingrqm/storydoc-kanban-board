import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'hooks';

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
