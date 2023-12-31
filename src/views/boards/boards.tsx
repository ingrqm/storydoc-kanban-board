import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';

import { Button, Icon, List } from 'components';
import { useTranslation } from 'hooks';
import { selectListsByWorkspaceId } from 'store/lists/selectors';
import { selectWorkspace } from 'store/workspace/selectors';

import * as Styled from './boards.styled';

export const Boards = () => {
  const { t } = useTranslation('page.app.boards');
  const workspace = useSelector(selectWorkspace);
  const lists = useSelector(selectListsByWorkspaceId(workspace));

  const [isAddingList, setIsAddingList] = useState(false);

  const handleStartAddingList = () => {
    setIsAddingList(true);
  };

  const handleStopAddingList = () => {
    setIsAddingList(false);
  };

  return (
    <>
      <Helmet>
        <title>{t('meta.title')}</title>
      </Helmet>

      {workspace && (
        <Styled.Wrapper>
          <SortableContext items={lists} strategy={horizontalListSortingStrategy}>
            {lists.map((list) => (
              <List key={list.id} id={list.id} title={list.title} />
            ))}
          </SortableContext>

          {isAddingList ? (
            <List onListAdd={handleStopAddingList} onListCancelAdd={handleStopAddingList} />
          ) : (
            <Styled.Container>
              <Button variant="ghost" size="sm" onClick={handleStartAddingList} isBlock>
                <Icon variant="fill" name="plus" size={16} />
                {t('add-list')}
              </Button>
            </Styled.Container>
          )}
        </Styled.Wrapper>
      )}
    </>
  );
};
