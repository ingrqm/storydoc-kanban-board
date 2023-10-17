import { createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import type { AppDispatch, RootState } from 'store';
import { deleteAllListsByWorkspaceId } from 'store/lists/actions';
import { setWorkspace } from 'store/workspace/actions';

import { slice } from './slice';
import type { Workspace } from './types';

export const { edit: editWorkspace, move: moveWorkspace } = slice.actions;

const { add: addWorkspaceRaw, delete: deleteWorkspaceRaw } = slice.actions;

export const addWorkspace = createAsyncThunk<void, Workspace['title'], { dispatch: AppDispatch }>(
  'workspaces/deleteWorkspaceAndLists',
  async (title, { dispatch }) => {
    const id = uuidv4();

    dispatch(addWorkspaceRaw({ id, title }));
    dispatch(setWorkspace(id));
  },
);

export const deleteWorkspace = createAsyncThunk<void, Workspace['id'], { dispatch: AppDispatch; state: RootState }>(
  'workspaces/deleteWorkspaceAndLists',
  async (id: string, { dispatch, getState }) => {
    await dispatch(deleteWorkspaceRaw(id));
    dispatch(deleteAllListsByWorkspaceId(id));

    const { workspaces } = getState();

    const lastWorkspace = workspaces.value.length > 0 ? workspaces.value[workspaces.value.length - 1].id : undefined;

    dispatch(setWorkspace(lastWorkspace));
  },
);
