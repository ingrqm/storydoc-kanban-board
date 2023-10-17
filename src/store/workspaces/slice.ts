import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import type { Workspace, WorkspacesState } from './types';
import { readSavedState, saveState } from './utils';

const initialState: WorkspacesState = {
  value: readSavedState(),
};

export const slice = createSlice({
  name: 'workspaces',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Workspace['title']>) => {
      state.value.push({
        id: uuidv4(),
        title: action.payload,
      });

      saveState(state);
    },
    edit: (state, action: PayloadAction<Workspace>) => {
      const index = state.value.findIndex((workspace) => workspace.id === action.payload.id);

      if (index !== -1) {
        state.value[index] = action.payload;
      }

      saveState(state);
    },
    delete: (state, action: PayloadAction<Workspace['id']>) => {
      state.value = state.value.filter((workspace) => workspace.id !== action.payload);

      saveState(state);
    },
  },
});

export default slice.reducer;
