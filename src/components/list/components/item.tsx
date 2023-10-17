import { useEffect, useState } from 'react';

import { Button, Icon, Textarea } from 'components';
import { useClickOutside, useDispatch, useFocus, useTranslation } from 'hooks';
import { deleteItem, editItem } from 'store/items/actions';
import type { Item as ItemSlice } from 'store/items/types';

import * as Styled from '../list.styled';

type ItemProps = {
  onItemEdit?: (title: string) => void;
  onItemStartEdit?: () => void;
  onItemCancelEdit?: () => void;
  onItemDelete?: () => void;
} & ItemSlice;

export const Item = ({ id, list, onItemEdit, onItemStartEdit, onItemCancelEdit, onItemDelete, title }: ItemProps) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('component.list');
  const [isItemEdit, setIsItemEdit] = useState(false);
  const [textareaItemEditRef, setTextareaItemEditFocus] = useFocus();

  const handleItemStartEdit = () => {
    setIsItemEdit(true);
    onItemStartEdit?.();
  };

  const handleItemCancelEdit = () => {
    setIsItemEdit(false);
    onItemCancelEdit?.();
  };

  const handleItemEdit = (title: string) => {
    if (!id) return;

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
    <Styled.Item>
      {!isItemEdit && title}
      {isItemEdit && (
        <Textarea
          ref={textareaItemEditRef}
          onSubmit={handleItemEdit}
          onCancel={handleItemCancelEdit}
          defaultValue={title}
          placeholder={t('body.textarea.placeholder')}
        />
      )}
      {!isItemEdit && (
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
  );
};
