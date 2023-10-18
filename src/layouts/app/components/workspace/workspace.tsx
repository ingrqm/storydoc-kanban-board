import { useEffect, useState } from 'react';
import type { MouseEvent } from 'react';
import { useSelector } from 'react-redux';

import { Button, Icon, SortableItem, Textarea } from 'components';
import { useClickOutside, useDispatch, useFocus, useTranslation } from 'hooks';
import { setWorkspace } from 'store/workspace/actions';
import { addWorkspace, deleteWorkspace, editWorkspace } from 'store/workspaces/actions';
import { selectWorkspace } from 'store/workspaces/selectors';

import * as Styled from './workspace.styled';
import type { WorkspaceProps } from './workspace.types';

export const Workspace = ({
  id,
  letter,
  saveButtonRef,
  onWorkspaceTitleChange,
  onWorkspaceAdd,
  onWorkspaceCancelAdd,
  onWorkspaceStartEdit,
  onWorkspaceCancelEdit,
  onWorkspaceEdit,
  onWorkspaceDelete,
  onWorkspaceSet,
  isActive = false,
  isOverlay,
}: WorkspaceProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const workspace = id ? useSelector(selectWorkspace(id)) : undefined;
  const [isWorkspaceEdit, setIsWorkspaceEdit] = useState(false);
  const [textareaWorkspaceAddRef, setTextareaWorkspaceAddFocus] = useFocus();
  const [textareaWorkspaceEditRef, setTextareaWorkspaceEditFocus] = useFocus();
  const isWorkspaceAdd = !id;
  const title = workspace?.title;

  const handleWorkspaceChange = (title: string) => {
    onWorkspaceTitleChange?.(title);
  };

  const handleWorkspaceCancelAdd = () => {
    onWorkspaceCancelAdd?.();
  };

  const handleWorkspaceAdd = (title: string) => {
    dispatch(addWorkspace(title));
    onWorkspaceAdd?.(title);
  };

  const handleWorkspaceStartEdit = () => {
    setIsWorkspaceEdit(true);
    onWorkspaceStartEdit?.();
  };

  const handleWorkspaceCancelEdit = () => {
    setIsWorkspaceEdit(false);
    onWorkspaceCancelEdit?.();
  };

  const handleWorkspaceEdit = (title: string) => {
    if (!id) return;

    dispatch(
      editWorkspace({
        id,
        title,
      }),
    );
    setIsWorkspaceEdit(false);
    onWorkspaceEdit?.(title);
  };

  const handleWorkspaceDelete = () => {
    if (!id) return;

    dispatch(deleteWorkspace(id));
    onWorkspaceDelete?.();
  };

  const handleWorkspaceSet = (event: MouseEvent) => {
    const forbiddenTags = ['button', 'svg', 'g', 'path'];

    if (!id) return;
    if (isWorkspaceAdd || isWorkspaceEdit) return;
    if (!(event.target instanceof HTMLElement)) return;
    if (forbiddenTags.includes(event.target?.nodeName.toLocaleLowerCase())) return;

    dispatch(setWorkspace(id));
    onWorkspaceSet?.();
  };

  useEffect(() => {
    isWorkspaceAdd && setTextareaWorkspaceAddFocus();
  }, [isWorkspaceAdd, setTextareaWorkspaceAddFocus]);

  useEffect(() => {
    isWorkspaceEdit && setTextareaWorkspaceEditFocus();
  }, [isWorkspaceEdit, setTextareaWorkspaceEditFocus]);

  useClickOutside([textareaWorkspaceAddRef, saveButtonRef!], handleWorkspaceCancelAdd);

  useClickOutside([textareaWorkspaceEditRef], handleWorkspaceCancelEdit);

  return (
    <SortableItem id={id} data={{ type: 'workspace', accepts: ['workspace', 'list'] }}>
      <Styled.Workspace $isActive={isActive} onClick={handleWorkspaceSet}>
        <Styled.Logo>{letter ? letter : title?.[0].toUpperCase()}</Styled.Logo>
        {!isWorkspaceAdd && !isWorkspaceEdit && title && <Styled.Title>{title}</Styled.Title>}
        {isWorkspaceAdd && (
          <Textarea
            ref={textareaWorkspaceAddRef}
            onSubmit={handleWorkspaceAdd}
            onChange={handleWorkspaceChange}
            onCancel={handleWorkspaceCancelAdd}
            placeholder={t('header.textarea.placeholder')}
          />
        )}
        {isWorkspaceEdit && (
          <Textarea
            ref={textareaWorkspaceEditRef}
            onSubmit={handleWorkspaceEdit}
            onCancel={handleWorkspaceCancelEdit}
            defaultValue={title}
            placeholder={t('header.textarea.placeholder')}
          />
        )}
        {!isWorkspaceAdd && !isWorkspaceEdit && !isOverlay && id && (
          <Styled.Actions>
            <Button variant="ghost" size="sm" onClick={() => handleWorkspaceStartEdit()} isIcon>
              <Icon variant="fill" name="edit" size={16} />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleWorkspaceDelete} isIcon>
              <Icon variant="fill" name="trash" size={16} />
            </Button>
          </Styled.Actions>
        )}
      </Styled.Workspace>
    </SortableItem>
  );
};
