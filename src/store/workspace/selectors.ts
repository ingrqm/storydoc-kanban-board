import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from 'store';

export const selectWorkspace = createSelector(
  (state: RootState) => state.workspace,
  (workspace) => workspace.value,
);
