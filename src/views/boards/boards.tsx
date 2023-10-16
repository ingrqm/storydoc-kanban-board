import { useTranslation } from 'hooks';
import { Helmet } from 'react-helmet-async';

export const Boards = () => {
  const { t } = useTranslation('page.app.boards');

  return (
    <>
      <Helmet>
        <title>{t('meta.title')}</title>
      </Helmet>

      <div>
        <h1>Boards</h1>
      </div>
    </>
  );
};
