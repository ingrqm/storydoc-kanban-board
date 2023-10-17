import { useEffect, useState } from 'react';

import { Button, Icon, Textarea } from 'components';
import { useClickOutside, useDispatch, useFocus, useTranslation } from 'hooks';
import { addWorkspace, deleteWorkspace, editWorkspace } from 'store/workspaces/actions';

import * as Styled from './workspace.styled';
import { setWorkspace } from 'store/workspace/actions';
import type { WorkspaceProps } from './workspace.types';

export const Workspace = ({
  id,
  title,
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
}: WorkspaceProps) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isWorkspaceEdit, setIsWorkspaceEdit] = useState(false);
  const [textareaWorkspaceAddRef, setTextareaWorkspaceAddFocus] = useFocus();
  const [textareaWorkspaceEditRef, setTextareaWorkspaceEditFocus] = useFocus();
  const isWorkspaceAdd = !id && !title;

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

  const handleWorkspaceSet = () => {
    if (!id) return;
    if (isWorkspaceAdd || isWorkspaceEdit) return;

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
      {!isWorkspaceAdd && !isWorkspaceEdit && id && (
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
  );
};