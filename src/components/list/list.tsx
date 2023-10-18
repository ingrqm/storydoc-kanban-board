import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { Button, Icon, SortableItem, Textarea } from 'components';
import { useClickOutside, useDispatch, useFocus, useTranslation } from 'hooks';
import { addItem } from 'store/items/actions';
import { selectItems } from 'store/items/selectors';
import { addList, deleteList, editList } from 'store/lists/actions';
import { selectWorkspace } from 'store/workspace/selectors';

import { Items } from './components';
import * as Styled from './list.styled';
import type { ListProps } from './list.type';
import { getDepth } from './list.utils';
import { selectList } from 'store/lists/selectors';
import { SortableContext } from '@dnd-kit/sortable';

export const List = ({
  id,
  title,
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
  isOverlay = false,
}: ListProps) => {
  const { t } = useTranslation('component.list');
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const itemsByListId = items.filter((item) => item.list === id);
  const workspace = useSelector(selectWorkspace);
  const list = id && !title ? useSelector(selectList(id)) : undefined;
  const [isListEdit, setIsListEdit] = useState(false);
  const [isItemAdd, setIsItemAdd] = useState(false);
  const [textareaListAddRef, setTextareaListAddFocus] = useFocus();
  const [textareaListEditRef, setTextareaListEditFocus] = useFocus();
  const [textareaItemAddRef, setTextareaItemAddFocus] = useFocus();
  const nestedLevels = useMemo(() => getDepth(itemsByListId), [itemsByListId]);
  const isItemsNotEmpty = items.length > 0;
  const isListAdd = !id;
  const titleDisplay = title || list?.title;

  console.log(isListAdd);

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
    <SortableItem id={id} data={{ type: 'list', accepts: ['item'] }}>
      <Styled.List $nestedLevels={nestedLevels} $isListAdd={isListAdd}>
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
              defaultValue={titleDisplay}
              placeholder={t('header.textarea.placeholder')}
            />
          )}
          {!isListAdd && !isListEdit && titleDisplay && <Styled.Title>{titleDisplay}</Styled.Title>}
          {!isListAdd && !isListEdit && !isOverlay && id && (
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
        <SortableContext items={items}>
          {(isItemsNotEmpty || isItemAdd) && (
            <Styled.Body>
              <Items
                items={itemsByListId}
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
        </SortableContext>
        {id && (
          <Styled.Footer>
            <Button variant="ghost" size="sm" onClick={handleItemStartAdd} isBlock>
              <Icon variant="fill" name="plus" size={16} />
              {t('footer.button.add-card')}
            </Button>
          </Styled.Footer>
        )}
      </Styled.List>
    </SortableItem>
  );
};
