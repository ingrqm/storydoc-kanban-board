import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from 'store';

export const selectItems = createSelector(
  (state: RootState) => state.items,
  (items) => items.value,
);

export const selectItem = (id: string) =>
  createSelector(
    (state: RootState) => state.items.value.find((item) => item.id === id),
    (items) => items,
  );
