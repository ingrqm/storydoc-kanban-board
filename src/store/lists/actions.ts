import { createAsyncThunk } from '@reduxjs/toolkit';

import type { RootState } from 'store';
import { deleteAllItemsByListId } from 'store/items/actions';
import type { Workspace } from 'store/workspaces/types';

import { slice } from './slice';
import type { Element, List } from './types';

export const { add: addList, edit: editList } = slice.actions;

const { delete: deleteListRaw, move: moveListRaw } = slice.actions;

export const moveList = createAsyncThunk<void, { target: Element; source: Element }, { state: RootState }>(
  'lists/moveList',
  async ({ target, source }, { dispatch, getState }) => {
    const { lists } = getState();

    const targetList = lists.value.find(({ id }) => id === target.id);
    const sourceList = lists.value.find(({ id }) => id === source.id);

    if (!targetList || !sourceList) {
      return;
    }

    const targetIndex = lists.value.indexOf(targetList);
    const sourceIndex = lists.value.indexOf(sourceList);

    dispatch(moveListRaw({ target: targetIndex, source: sourceIndex }));
  },
);

export const moveListToWorkspace = createAsyncThunk<void, { target: Element; source: Element }, { state: RootState }>(
  'lists/moveListToWorkspace',
  async ({ target, source }, { dispatch, getState }) => {
    const { lists } = getState();

    const targetList = lists.value.find(({ id }) => id === source.id);

    if (!targetList) {
      return;
    }

    dispatch(editList({ ...targetList, workspace: target.id }));
  },
);

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
