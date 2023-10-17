import { createAsyncThunk } from '@reduxjs/toolkit';

import type { AppDispatch } from 'store';
import { deleteAllListsByWorkspaceId } from 'store/lists/actions';

import { slice } from './slice';
import type { Workspace } from './types';

export const { add: addWorkspace, edit: editWorkspace, delete: deleteWorkspaceRaw } = slice.actions;

export const deleteWorkspace = createAsyncThunk<void, Workspace['id'], { dispatch: AppDispatch }>(
  'workspaces/deleteWorkspaceAndLists',
  async (id: string, { dispatch }) => {
    dispatch(deleteWorkspaceRaw(id));
    dispatch(deleteAllListsByWorkspaceId(id));
  },
);
