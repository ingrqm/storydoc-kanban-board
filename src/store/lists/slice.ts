import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import type { List, ListsState } from './types';
import { readSavedState, saveState } from './utils';

const initialState: ListsState = {
  value: readSavedState(),
};

export const slice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Omit<List, 'id'>>) => {
      state.value.push({
        id: uuidv4(),
        ...action.payload,
      });

      saveState(state);
    },
    edit: (state, action: PayloadAction<List>) => {
      const index = state.value.findIndex((list) => list.id === action.payload.id);

      if (index !== -1) {
        state.value[index] = action.payload;
      }

      saveState(state);
    },
    delete: (state, action: PayloadAction<List['id']>) => {
      state.value = state.value.filter((list) => list.id !== action.payload);

      saveState(state);
    },
  },
});

export default slice.reducer;
