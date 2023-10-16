import { useTranslation } from 'hooks';
import { Helmet } from 'react-helmet-async';

export const Profile = () => {
  const { t } = useTranslation('page.app.profile');

  return (
    <>
      <Helmet>
        <title>{t('meta.title')}</title>
      </Helmet>

      <div>
        <h1>Profile</h1>
      </div>
    </>
  );
};
