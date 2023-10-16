import { useTranslation } from 'hooks';
import { Helmet } from 'react-helmet-async';

export const Settings = () => {
  const { t } = useTranslation('page.app.settings');

  return (
    <>
      <Helmet>
        <title>{t('meta.title')}</title>
      </Helmet>

      <div>
        <h1>Settings</h1>
      </div>
    </>
  );
};
