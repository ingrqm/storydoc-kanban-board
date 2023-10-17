import { Fragment } from 'react';

import type { Item as ItemProps } from 'store/items/types';
import * as Styled from '../list.styled';
import { Item } from '.';

type ItemsProps = {
  items: ItemProps[];
  onItemEdit?: (title: string) => void;
  onItemStartEdit?: () => void;
  onItemCancelEdit?: () => void;
  onItemDelete?: () => void;
  parent?: string;
};

export const Items = ({ items, onItemEdit, onItemStartEdit, onItemCancelEdit, onItemDelete, parent }: ItemsProps) =>
  items
    .filter((item) => item.parent === parent)
    .map(({ id, list, parent, title }) => {
      const isNested = items.some((item) => item.parent === id);

      return (
        <Fragment key={id}>
          <Item
            id={id}
            list={list}
            onItemEdit={onItemEdit}
            onItemStartEdit={onItemStartEdit}
            onItemCancelEdit={onItemCancelEdit}
            onItemDelete={onItemDelete}
            parent={parent}
            title={title}
          />

          {isNested && (
            <Styled.Nested>
              <Items items={items} parent={id} />
            </Styled.Nested>
          )}
        </Fragment>
      );
    });
