import { createAsyncThunk } from '@reduxjs/toolkit';

import type { RootState } from 'store';

import { slice } from './slice';
import type { Element } from './types';

export const {
  add: addItem,
  edit: editItem,
  delete: deleteItem,
  deleteAllByListId: deleteAllItemsByListId,
} = slice.actions;

const { move: moveItemRaw } = slice.actions;

export const moveItem = createAsyncThunk<void, { target: Element; source: Element }, { state: RootState }>(
  'items/moveItem',
  async ({ target, source }, { dispatch, getState }) => {
    const { items } = getState();

    const targetItem = items.value.find(({ id, list }) => {
      switch (target.type) {
        case 'list':
          return list === target.id;
        case 'item':
          return id === target.id;
        default:
          return false;
      }
    });
    const sourceItem = items.value.find(({ id, list }) => {
      switch (source.type) {
        case 'list':
          return list === source.id;
        case 'item':
          return id === source.id;
        default:
          return false;
      }
    });

    const targetIndex = targetItem ? items.value.indexOf(targetItem) : items.value.length;
    const sourceIndex = sourceItem ? items.value.indexOf(sourceItem) : items.value.length;

    if (sourceItem && target.type === 'list') {
      await dispatch(editItem({ ...sourceItem, list: target.id }));
    }

    if (targetItem && sourceItem && target.type === 'item') {
      await dispatch(editItem({ ...sourceItem, list: targetItem?.list }));
    }

    await dispatch(moveItemRaw({ target: targetIndex, source: sourceIndex }));
  },
);
