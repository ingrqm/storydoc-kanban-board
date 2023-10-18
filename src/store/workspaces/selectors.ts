import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from 'store';

export const selectWorkspaces = createSelector(
  (state: RootState) => state.workspaces,
  (workspaces) => workspaces.value,
);

export const selectWorkspace = (id: string) =>
  createSelector(
    (state: RootState) => state.workspaces.value.find((workspace) => workspace.id === id),
    (workspaces) => workspaces,
  );
