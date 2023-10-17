import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { WorkspaceState } from './types';
import { readSavedState, saveState } from './utils';
import { Workspace } from 'store/workspaces/types';

const initialState: WorkspaceState = {
  value: readSavedState(),
};

export const slice = createSlice({
  name: 'workspaces',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Workspace['id'] | undefined>) => {
      state.value = action.payload;

      saveState(state);
    },
  },
});

export default slice.reducer;
