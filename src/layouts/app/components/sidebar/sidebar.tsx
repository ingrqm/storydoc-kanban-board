import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DndContext, MouseSensor, TouchSensor, useDroppable, useSensor, useSensors } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import JohnDoeImg from 'assets/images/john-doe.jpeg';
import { Button, Icon } from 'components';
import { useDispatch, useTranslation } from 'hooks';
import { selectWorkspace } from 'store/workspace/selectors';
import { selectWorkspaces } from 'store/workspaces/selectors';

import { items } from './sidebar.data';
import * as Styled from './sidebar.styled';
import { Workspace } from '..';
import { addWorkspace, moveWorkspace } from 'store/workspaces/actions';

export const Sidebar = () => {
  const { t } = useTranslation('layout.app.sidebar');
  const saveButtonRef = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch();
  const workspaces = useSelector(selectWorkspaces);
  const workspace = useSelector(selectWorkspace);
  const [title, setTitle] = useState('');
  const [isWorkspaceAdd, setIsWorkspaceAdd] = useState(false);
  const navigate = useNavigate();
  const letter = title[0];
  const isSaveDisabled = title.length === 0;

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor),
  );

  const { setNodeRef } = useDroppable({
    id: 'workspaces',
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const items = workspaces;

    const source = items.findIndex((item) => item.id === active.id);
    const target = items.findIndex((item) => item.id === over.id);

    if (source !== target) {
      dispatch(moveWorkspace({ target, source }));
    }
  };

  const handleNavigateSettings = () => {
    navigate('/settings');
  };

  const handleStartAddingWorkspace = () => {
    setIsWorkspaceAdd(true);
  };

  const handleStopAddingWorkspace = () => {
    setIsWorkspaceAdd(false);
  };

  const handleWorkspaceTitleChange = (title: string) => {
    setTitle(title);
  };

  const handleWorkspaceAdd = () => {
    dispatch(addWorkspace(title));
    setIsWorkspaceAdd(false);
  };

  return (
    <Styled.Sidebar>
      <Styled.Header>
        {workspaces.length === 0 && !isWorkspaceAdd && (
          <Styled.Message>{t('header.message.no-workspaces')}</Styled.Message>
        )}

        <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={handleDragEnd} sensors={sensors}>
          <SortableContext items={workspaces} strategy={verticalListSortingStrategy}>
            <Styled.Droppable ref={setNodeRef}>
              {workspaces.map(({ id, title }) => (
                <Workspace key={id} id={id} title={title} isActive={isWorkspaceAdd ? false : id === workspace} />
              ))}
            </Styled.Droppable>
          </SortableContext>
        </DndContext>

        {isWorkspaceAdd ? (
          <>
            <Workspace
              letter={letter}
              saveButtonRef={saveButtonRef}
              onWorkspaceTitleChange={handleWorkspaceTitleChange}
              onWorkspaceAdd={handleStopAddingWorkspace}
              onWorkspaceCancelAdd={handleStopAddingWorkspace}
              onWorkspaceEdit={handleStopAddingWorkspace}
              isActive={true}
            />
            <Button variant="primary" disabled={isSaveDisabled} onClick={handleWorkspaceAdd} isBlock>
              <Icon variant="fill" name="plus" size={16} />
              {t('header.button.save')}
            </Button>
          </>
        ) : (
          <Button ref={saveButtonRef} onClick={handleStartAddingWorkspace} isBlock>
            <Icon variant="fill" name="plus" size={16} />
            {t('header.button.create')}
          </Button>
        )}
      </Styled.Header>
      <Styled.Nav>
        {items.map(({ key, icon, url }) => (
          <Styled.Link key={key} to={url}>
            {icon}
            {t(`nav.link.${key}`)}
          </Styled.Link>
        ))}
      </Styled.Nav>
      <Styled.Footer>
        <Styled.Avatar>
          <img src={JohnDoeImg} alt="John doe" /> John Doe
        </Styled.Avatar>

        <Button variant="ghost" onClick={handleNavigateSettings} isIcon>
          <Icon variant="outline" name="settings" />
        </Button>
      </Styled.Footer>
    </Styled.Sidebar>
  );
};
