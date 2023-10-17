import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from 'store';

export const selectWorkspaces = createSelector(
  (state: RootState) => state.workspaces,
  (workspaces) => workspaces.value,
);
