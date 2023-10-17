import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from 'store';

export const selectItems = createSelector(
  (state: RootState) => state.items,
  (items) => items.value,
);
