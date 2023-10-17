import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { Button, Icon, Textarea } from 'components';
import { useClickOutside, useDispatch, useFocus, useTranslation } from 'hooks';
import { addItem } from 'store/items/actions';
import { selectItems } from 'store/items/selectors';
import { addList, deleteList, editList } from 'store/lists/actions';
import { selectWorkspace } from 'store/workspace/selectors';

import { Items } from './components';
import * as Styled from './list.styled';
import type { ListProps } from './list.type';
import { getDepth } from './list.utils';
import { useSortable } from '@dnd-kit/sortable';

export const List = ({
  title,
  id,
  onListAdd,
  onListCancelAdd,
  onListEdit,
  onListStartEdit,
  onListCancelEdit,
  onListDelete,
  onItemAdd,
  onItemStartAdd,
  onItemCancelAdd,
  onItemEdit,
  onItemStartEdit,
  onItemCancelEdit,
  onItemDelete,
}: ListProps) => {
  const { t } = useTranslation('component.list');
  const dispatch = useDispatch();
  const items = useSelector(selectItems).filter((item) => item.list === id);
  const workspace = useSelector(selectWorkspace);
  const [isListEdit, setIsListEdit] = useState(false);
  const [isItemAdd, setIsItemAdd] = useState(false);
  const [textareaListAddRef, setTextareaListAddFocus] = useFocus();
  const [textareaListEditRef, setTextareaListEditFocus] = useFocus();
  const [textareaItemAddRef, setTextareaItemAddFocus] = useFocus();
  const nestedLevels = useMemo(() => getDepth(items), [items]);
  const isItemsNotEmpty = items.length > 0;
  const isListAdd = !id && !title;

  const { attributes, listeners, setNodeRef, transform, isDragging } = useSortable({
    id: id as string,
    disabled: !id,
  });

  const handleListAdd = (title: string) => {
    if (!workspace) return;

    dispatch(addList({ title, workspace }));
    onListAdd?.(title);
  };

  const handleListCancelAdd = () => {
    onListCancelAdd?.();
  };

  const handleListStartEdit = () => {
    setIsListEdit(true);
    onListStartEdit?.();
  };

  const handleListCancelEdit = () => {
    setIsListEdit(false);
    onListCancelEdit?.();
  };

  const handleListEdit = (title: string) => {
    if (!id || !workspace) return;

    dispatch(editList({ id, title, workspace }));
    setIsListEdit(false);
    onListEdit?.(title);
  };

  const handleListDelete = () => {
    if (!id) return;

    dispatch(deleteList(id));
    onListDelete?.();
  };

  const handleItemStartAdd = () => {
    setIsItemAdd(true);
    onItemStartAdd?.();
  };

  const handleItemCancelAdd = () => {
    setIsItemAdd(false);
    onItemCancelAdd?.();
  };

  const handleItemAdd = (title: string) => {
    if (!id) return;

    dispatch(addItem({ title, list: id }));
    setIsItemAdd(false);
    onItemAdd?.(title);
  };

  useEffect(() => {
    isListAdd && setTextareaListAddFocus();
  }, [isListAdd, setTextareaListAddFocus]);

  useEffect(() => {
    isListEdit && setTextareaListEditFocus();
  }, [isListEdit, setTextareaListEditFocus]);

  useEffect(() => {
    isItemAdd && setTextareaItemAddFocus();
  }, [isItemAdd, setTextareaItemAddFocus]);

  useClickOutside([textareaListAddRef], handleListCancelAdd);

  useClickOutside([textareaListEditRef], handleListCancelEdit);

  useClickOutside([textareaItemAddRef], handleItemCancelAdd);

  return (
    <Styled.List
      ref={setNodeRef}
      $nestedLevels={nestedLevels}
      $isListAdd={isListAdd}
      $transform={transform}
      $isDragging={isDragging}
      {...listeners}
      {...attributes}
    >
      <Styled.Header>
        {isListAdd && (
          <Textarea
            ref={textareaListAddRef}
            onSubmit={handleListAdd}
            onCancel={handleListCancelAdd}
            placeholder={t('header.textarea.placeholder')}
          />
        )}
        {isListEdit && (
          <Textarea
            ref={textareaListEditRef}
            onSubmit={handleListEdit}
            onCancel={handleListCancelEdit}
            defaultValue={title}
            placeholder={t('header.textarea.placeholder')}
          />
        )}
        {!isListAdd && !isListEdit && title && <Styled.Title>{title}</Styled.Title>}
        {!isListAdd && !isListEdit && id && (
          <Styled.Actions>
            <Button variant="ghost" size="sm" onClick={() => handleListStartEdit()} isIcon>
              <Icon variant="fill" name="edit" size={16} />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleListDelete} isIcon>
              <Icon variant="fill" name="trash" size={16} />
            </Button>
          </Styled.Actions>
        )}
      </Styled.Header>
      {(isItemsNotEmpty || isItemAdd) && (
        <Styled.Body>
          <Items
            items={items}
            onItemEdit={onItemEdit}
            onItemStartEdit={onItemStartEdit}
            onItemCancelEdit={onItemCancelEdit}
            onItemDelete={onItemDelete}
          />

          {isItemAdd && (
            <Styled.Item>
              <Textarea
                ref={textareaItemAddRef}
                onSubmit={handleItemAdd}
                onCancel={handleItemCancelAdd}
                placeholder={t('body.textarea.placeholder')}
              />
            </Styled.Item>
          )}
        </Styled.Body>
      )}
      {id && (
        <Styled.Footer>
          <Button variant="ghost" size="sm" onClick={handleItemStartAdd} isBlock>
            <Icon variant="fill" name="plus" size={16} />
            {t('footer.button.add-card')}
          </Button>
        </Styled.Footer>
      )}
    </Styled.List>
  );
};
