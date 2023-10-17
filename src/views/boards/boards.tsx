import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';

import { Button, Icon, List } from 'components';
import { useTranslation } from 'hooks';
import { selectors } from 'store/lists/slice';

import * as Styled from './boards.styled';

export const Boards = () => {
  const { t } = useTranslation('page.app.boards');
  const lists = useSelector(selectors.selectLists);
  const [isListAdd, setIsListAdd] = useState(false);

  const handleListStartAdd = () => {
    setIsListAdd(true);
  };

  const handleListCancelAdd = () => {
    setIsListAdd(false);
  };

  const handleListAdd = () => {
    setIsListAdd(false);
  };

  const handleListEdit = () => {
    setIsListAdd(false);
  };

  return (
    <>
      <Helmet>
        <title>{t('meta.title')}</title>
      </Helmet>

      <Styled.Wrapper>
        {lists.map((list) => (
          <List key={list.id} id={list.id} title={list.title} />
        ))}

        {isListAdd ? (
          <List onListEdit={handleListEdit} onListAdd={handleListAdd} onListCancelAdd={handleListCancelAdd} />
        ) : (
          <Styled.Container>
            <Button variant="ghost" size="sm" onClick={handleListStartAdd} isBlock>
              <Icon variant="fill" name="plus" size={16} />
              {t('add-list')}
            </Button>
          </Styled.Container>
        )}
      </Styled.Wrapper>
    </>
  );
};
