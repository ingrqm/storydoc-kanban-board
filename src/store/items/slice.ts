import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import type { List } from 'store/lists/types';

import type { Item, ItemsState } from './types';
import { readSavedState, saveState } from './utils';

const initialState: ItemsState = {
  value: readSavedState(),
};

export const slice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Omit<Item, 'id'>>) => {
      state.value.push({
        id: uuidv4(),
        ...action.payload,
      });

      saveState(state);
    },
    edit: (state, action: PayloadAction<Item>) => {
      const index = state.value.findIndex((item) => item.id === action.payload.id);

      if (index !== -1) {
        state.value[index] = action.payload;
      }

      saveState(state);
    },
    delete: (state, action: PayloadAction<Item['id']>) => {
      state.value = state.value.filter((item) => item.id !== action.payload);

      saveState(state);
    },

    deleteAllByListId: (state, action: PayloadAction<List['id']>) => {
      state.value = state.value.filter((item) => item.list !== action.payload);

      saveState(state);
    },
    move: (state, action: PayloadAction<{ target: number; source: number }>) => {
      const { target, source } = action.payload;

      const item = state.value[source];

      state.value.splice(source, 1);
      state.value.splice(target, 0, item);

      saveState(state);
    },
  },
});

export default slice.reducer;
