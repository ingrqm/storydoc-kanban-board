import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { DndContext, MouseSensor, TouchSensor, useDroppable, useSensor, useSensors } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';

import { Button, Icon, List } from 'components';
import { useDispatch, useTranslation } from 'hooks';
import { selectListsByWorkspaceId } from 'store/lists/selectors';
import { selectWorkspace } from 'store/workspace/selectors';

import * as Styled from './boards.styled';
import { moveList } from 'store/lists/actions';

export const Boards = () => {
  const { t } = useTranslation('page.app.boards');
  const dispatch = useDispatch();
  const workspace = useSelector(selectWorkspace);
  const lists = useSelector(selectListsByWorkspaceId(workspace));
  const [isAddingList, setIsAddingList] = useState(false);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor),
  );

  const { setNodeRef } = useDroppable({
    id: 'lists',
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const items = lists;

    const source = items.findIndex((item) => item.id === active.id);
    const target = items.findIndex((item) => item.id === over.id);

    if (source !== target) {
      dispatch(moveList({ target, source }));
    }
  };

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
          <DndContext modifiers={[restrictToHorizontalAxis]} onDragEnd={handleDragEnd} sensors={sensors}>
            <SortableContext items={lists} strategy={horizontalListSortingStrategy}>
              <Styled.Droppable ref={setNodeRef}>
                {lists.map((list) => (
                  <List key={list.id} id={list.id} title={list.title} />
                ))}
              </Styled.Droppable>
            </SortableContext>
          </DndContext>

          {isAddingList ? (
            <List
              onListEdit={handleStopAddingList}
              onListAdd={handleStopAddingList}
              onListCancelAdd={handleStopAddingList}
            />
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
