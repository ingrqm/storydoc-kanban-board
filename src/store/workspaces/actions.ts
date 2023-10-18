import { createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import type { AppDispatch, RootState } from 'store';
import { deleteAllListsByWorkspaceId } from 'store/lists/actions';
import { setWorkspace } from 'store/workspace/actions';

import { slice } from './slice';
import type { Element, Workspace } from './types';

export const { edit: editWorkspace } = slice.actions;

const { add: addWorkspaceRaw, delete: deleteWorkspaceRaw, move: moveWorkspaceRaw } = slice.actions;

export const moveWorkspace = createAsyncThunk<void, { target: Element; source: Element }, { state: RootState }>(
  'lists/moveWorkspace',
  async ({ target, source }, { dispatch, getState }) => {
    const { workspaces } = getState();

    const targetWorkspace = workspaces.value.find(({ id }) => id === target.id);
    const sourceWorkspace = workspaces.value.find(({ id }) => id === source.id);

    if (!targetWorkspace || !sourceWorkspace) {
      return;
    }

    const targetIndex = workspaces.value.indexOf(targetWorkspace);
    const sourceIndex = workspaces.value.indexOf(sourceWorkspace);

    dispatch(moveWorkspaceRaw({ target: targetIndex, source: sourceIndex }));
  },
);

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
