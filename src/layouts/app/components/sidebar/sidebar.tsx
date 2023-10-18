import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';

import JohnDoeImg from 'assets/images/john-doe.jpeg';
import { Button, Icon } from 'components';
import { useDispatch, useTranslation } from 'hooks';
import { selectWorkspace } from 'store/workspace/selectors';
import { addWorkspace } from 'store/workspaces/actions';
import { selectWorkspaces } from 'store/workspaces/selectors';

import { items } from './sidebar.data';
import * as Styled from './sidebar.styled';
import { Workspace } from '..';

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

  const { setNodeRef } = useDroppable({
    id: 'workspaces',
    data: {
      accepts: ['workspace', 'list'],
    },
  });

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

        <SortableContext items={workspaces}>
          <Styled.Droppable ref={setNodeRef}>
            {workspaces.map(({ id, title }) => (
              <Workspace key={id} id={id} title={title} isActive={isWorkspaceAdd ? false : id === workspace} />
            ))}
          </Styled.Droppable>
        </SortableContext>

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
              isOverlay={false}
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
