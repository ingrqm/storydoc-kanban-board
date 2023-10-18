import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from 'store';
import type { Workspace } from 'store/workspaces/types';

import type { List } from './types';

export const selectLists = createSelector(
  (state: RootState) => state.lists,
  (lists) => lists.value,
);

export const selectList = (id: List['id']) =>
  createSelector(
    (state: RootState) => state.lists.value.find((list) => list.id === id),
    (lists) => lists,
  );

export const selectListsByWorkspaceId = (workspace?: Workspace['id']) =>
  createSelector(
    (state: RootState) => state.lists.value.filter((list) => list.workspace === workspace),
    (lists) => lists,
  );
