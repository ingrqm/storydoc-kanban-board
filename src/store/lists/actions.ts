import { createAsyncThunk } from '@reduxjs/toolkit';

import type { RootState } from 'store';
import { deleteAllItemsByListId } from 'store/items/actions';
import type { Workspace } from 'store/workspaces/types';

import { slice } from './slice';
import type { List } from './types';

export const { add: addList, edit: editList, move: moveList } = slice.actions;

const { delete: deleteListRaw } = slice.actions;

export const deleteList = createAsyncThunk<void, List['id']>('lists/deleteList', async (id, { dispatch }) => {
  dispatch(deleteListRaw(id));
  dispatch(deleteAllItemsByListId(id));
});

export const deleteAllListsByWorkspaceId = createAsyncThunk<void, Workspace['id'], { state: RootState }>(
  'lists/deleteAllListByWorkspaceId',
  async (id, { dispatch, getState }) => {
    const { lists } = getState();

    const filteredLists = lists.value.filter((list) => list.workspace === id);

    filteredLists.forEach((list) => dispatch(deleteList(list.id)));
  },
);
