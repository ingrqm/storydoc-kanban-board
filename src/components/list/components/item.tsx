import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Button, Icon, SortableItem, Textarea } from 'components';
import { useClickOutside, useDispatch, useFocus, useTranslation } from 'hooks';
import { deleteItem, editItem } from 'store/items/actions';
import { selectItem } from 'store/items/selectors';
import type { Item as ItemSlice } from 'store/items/types';

import * as Styled from '../list.styled';

type ItemProps = {
  onItemEdit?: (title: string) => void;
  onItemStartEdit?: () => void;
  onItemCancelEdit?: () => void;
  onItemDelete?: () => void;
  isOverlay?: boolean;
} & Partial<ItemSlice>;

export const Item = ({
  id,
  list,
  title,
  onItemEdit,
  onItemStartEdit,
  onItemCancelEdit,
  onItemDelete,
  isOverlay = false,
}: ItemProps) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('component.list');
  const [isItemEdit, setIsItemEdit] = useState(false);
  const [textareaItemEditRef, setTextareaItemEditFocus] = useFocus();
  const item = id && !title ? useSelector(selectItem(id)) : undefined;

  const titleDisplay = title || item?.title;

  const handleItemStartEdit = () => {
    setIsItemEdit(true);
    onItemStartEdit?.();
  };

  const handleItemCancelEdit = () => {
    setIsItemEdit(false);
    onItemCancelEdit?.();
  };

  const handleItemEdit = (title: string) => {
    if (!id || !list) return;

    dispatch(editItem({ id, title, list }));
    setIsItemEdit(false);
    onItemEdit?.(title);
  };

  const handleItemDelete = () => {
    if (!id) return;

    dispatch(deleteItem(id));
    onItemDelete?.();
  };

  useEffect(() => {
    if (isItemEdit) {
      setTextareaItemEditFocus();
    }
  }, [isItemEdit, setTextareaItemEditFocus]);

  useClickOutside([textareaItemEditRef], handleItemCancelEdit);

  return (
    <SortableItem id={id} data={{ type: 'item' }}>
      <Styled.Item>
        {!isItemEdit && titleDisplay}
        {isItemEdit && (
          <Textarea
            ref={textareaItemEditRef}
            onSubmit={handleItemEdit}
            onCancel={handleItemCancelEdit}
            defaultValue={titleDisplay}
            placeholder={t('body.textarea.placeholder')}
          />
        )}
        {!isItemEdit && !isOverlay && (
          <Styled.Actions>
            <Button variant="ghost" size="sm" onClick={handleItemStartEdit} isIcon>
              <Icon variant="fill" name="edit" size={16} />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleItemDelete} isIcon>
              <Icon variant="fill" name="trash" size={16} />
            </Button>
          </Styled.Actions>
        )}
      </Styled.Item>
    </SortableItem>
  );
};
