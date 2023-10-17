import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from 'store';
import type { Workspace } from 'store/workspaces/types';

export const selectLists = createSelector(
  (state: RootState) => state.lists,
  (lists) => lists.value,
);

export const selectListsByWorkspaceId = (workspace?: Workspace['id']) =>
  createSelector(
    (state: RootState) => state.lists.value.filter((list) => list.workspace === workspace),
    (lists) => lists,
  );
