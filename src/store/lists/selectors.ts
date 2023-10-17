import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from 'store';

export const selectLists = createSelector(
  (state: RootState) => state.lists,
  (lists) => lists.value,
);
