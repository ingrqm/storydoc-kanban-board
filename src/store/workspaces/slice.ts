import { createSlice, createSelector } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';

type Workspace = {
  id: string;
  title: string;
};

type WorkspacesState = {
  value: Workspace[];
};

const storedWorkspaces = localStorage.getItem('workspaces');
const isWorkspacesValid =
  storedWorkspaces && JSON.parse(storedWorkspaces).every((workspace: Workspace) => workspace.id && workspace.title);

if (!isWorkspacesValid) {
  localStorage.removeItem('workspaces');
}

const initialState: WorkspacesState = {
  value: isWorkspacesValid ? JSON.parse(storedWorkspaces) : [],
};

export const slice = createSlice({
  name: 'workspaces',
  initialState,
  reducers: {
    addWorkspace: (state, action: PayloadAction<Workspace>) => {
      state.value.push(action.payload);
      localStorage.setItem('workspaces', JSON.stringify(state.value));
    },
    editWorkspace: (state, action: PayloadAction<Workspace>) => {
      const index = state.value.findIndex((workspace) => workspace.id === action.payload.id);

      if (index !== -1) {
        state.value[index] = action.payload;
      }

      localStorage.setItem('workspaces', JSON.stringify(state.value));
    },
    deleteWorkspace: (state, action: PayloadAction<{ id: string }>) => {
      state.value = state.value.filter((workspace) => workspace.id !== action.payload.id);
      localStorage.setItem('workspaces', JSON.stringify(state.value));
    },
  },
});

export const { addWorkspace, editWorkspace, deleteWorkspace } = slice.actions;

const getWorkspaces = (state: RootState) => state.workspaces;

export const selectors = {
  selectWorkspaces: createSelector(getWorkspaces, (workspaces) => workspaces.value),
};

export default slice.reducer;
